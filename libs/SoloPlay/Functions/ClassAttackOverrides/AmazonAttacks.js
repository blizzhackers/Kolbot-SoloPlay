/**
*  @filename    AmazonAttacks.js
*  @author      theBGuy
*  @desc        Amazon fixes to improve class attack functionality
*
*/

// TODO: clean up this whole file

includeIfNotIncluded("common/Attacks/Amazon.js");

ClassAttack.decoyTick = getTickCount();

ClassAttack.doAttack = function (unit, preattack) {
	// unit became invalidated
	if (!unit || !unit.attackable) return Attack.Result.SUCCESS;
	
	let gid = unit.gid;
	let needRepair = me.charlvl < 5 ? [] : Town.needRepair();

	if ((Config.MercWatch && Town.needMerc()) || needRepair.length > 0) {
		console.log("towncheck");

		if (Town.visitTown(!!needRepair.length)) {
			// lost reference to the mob we were attacking
			if (!unit || !copyUnit(unit).x || !Game.getMonster(-1, -1, gid) || unit.dead) {
				return Attack.Result.SUCCESS;
			}
		}
	}

	let preattackRange = Skill.getRange(Config.AttackSkill[0]);
	let decoyDuration = Skill.getDuration(sdk.skills.Dopplezon);
	let gold = me.gold;
	let index = (unit.isSpecial || unit.isPlayer) ? 1 : 3;

	let useInnerSight = Skill.canUse(sdk.skills.InnerSight);
	let useSlowMissiles = Skill.canUse(sdk.skills.SlowMissiles);
	let useDecoy = (Skill.canUse(sdk.skills.Dopplezon) && !me.normal);
	let usePlague = (!me.normal && Skill.canUse(sdk.skills.PlagueJavelin));
	let useJab = (Item.getEquippedItem(sdk.body.RightArm).tier >= 1000 && Skill.canUse(sdk.skills.Jab));
	let useLightFury = me.getSkill(sdk.skills.LightningFury, sdk.skills.subindex.SoftPoints) >= 10;
	let forcePlague = (me.getSkill(sdk.skills.PlagueJavelin, sdk.skills.subindex.SoftPoints) >= 15);	//Extra poison damage then attack

	// Precast Section -----------------------------------------------------------------------------------------------------------------//
	if (useSlowMissiles) {
		if (!unit.getState(sdk.states.SlowMissiles)) {
			if ((unit.distance > 3 || unit.getEnchant(sdk.enchant.LightningEnchanted)) && unit.distance < 13 && !checkCollision(me, unit, sdk.collision.Ranged)) {
				// Act Bosses and mini-bosses are immune to Slow Missles and pointless to use on lister or Cows, Use Inner-Sight instead
				if ([sdk.monsters.HellBovine].includes(unit.classid) || unit.isBoss) {
					// Check if already in this state
					if (useInnerSight && !unit.getState(sdk.states.InnerSight)) {
						Skill.cast(sdk.skills.InnerSight, sdk.skills.hand.Right, unit);
					}
				} else {
					Skill.cast(sdk.skills.SlowMissiles, sdk.skills.hand.Right, unit);
				}
			}
		}
	}

	if (Skill.canUse(sdk.skills.LightningFury) && unit.getEnchant(sdk.enchant.ManaBurn) && unit.getMobCount(7) > 2) {
		useLightFury = true;
	}

	if (Skill.canUse(sdk.skills.PlagueJavelin) && unit.getEnchant(sdk.enchant.ManaBurn) && unit.getMobCount(7) > 2) {
		forcePlague = true;
	}

	if (useInnerSight) {
		if (!unit.getState(sdk.states.InnerSight) && unit.distance > 3 && unit.distance < 13 && !checkCollision(me, unit, sdk.collision.Ranged)) {
			Skill.cast(sdk.skills.InnerSight, sdk.skills.hand.Right, unit);
		}
	}

	// Handle Switch casting
	let commonCheck = (gold > 500000 || Attack.bossesAndMiniBosses.includes(unit.classid) || [sdk.areas.ChaosSanctuary, sdk.areas.ThroneofDestruction].includes(me.area));
	if (me.expansion && index === 1 && unit.curseable) {
		if (CharData.skillData.haveChargedSkillOnSwitch(sdk.skills.LowerResist)
			&& !unit.getState(sdk.states.LowerResist) && commonCheck && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Switch cast lower resist
			Attack.switchCastCharges(sdk.skills.LowerResist, unit);
		}

		if (CharData.skillData.haveChargedSkillOnSwitch(sdk.skills.Weaken) && !unit.getState(sdk.states.Weaken)
			&& !unit.getState(sdk.states.LowerResist) && commonCheck && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Switch cast weaken
			Attack.switchCastCharges(sdk.skills.Weaken, unit);
		}
	}

	// specials and dolls for now, should make dolls much less dangerous with the reduction of their damage
	if (Precast.haveCTA > -1 && unit.curseable && (index === 1 || unit.isDoll)
		&& unit.distance < 5 && !unit.getState(sdk.states.BattleCry) && unit.curseable) {
		Skill.switchCast(sdk.skills.BattleCry, {oSkill: true});
	}

	if (useDecoy) {
		// Act Bosses or Immune to my main boss skill
		if ((Attack.mainBosses.includes(unit.classid)) || !Attack.checkResist(unit, Config.AttackSkill[1])) {
			Misc.poll(() => !me.skillDelay, 1000, 40);

			// Don't use decoy if within melee distance
			if (unit.distance > 4) {
				// Check to see if decoy has already been cast
				let decoy = Misc.poll(() => Game.getMonster(sdk.summons.Dopplezon), 1000, 10);
				
				if (!decoy && (getTickCount() - this.decoyTick >= decoyDuration) && unit.distance > 4) {
					if (unit.distance > 10 || checkCollision(me, unit, sdk.collision.Ranged)) {
						if (!Attack.getIntoPosition(unit, 10, sdk.collision.Ranged)) {
							return Attack.Result.FAILED;
						}
					}

					let coord = CollMap.getRandCoordinate(unit.x, -2, 2, unit.y, -2, 2);
					!!coord && Skill.cast(sdk.skills.Decoy, sdk.skills.hand.Right, coord.x, coord.y);

					// Check if it was a sucess
					!!me.getMinionCount(sdk.summons.type.Dopplezon) && (this.decoyTick = getTickCount());
				}
			}
		}
	}

	// Only try attacking light immunes if I have my end game javelin - preAttack with Plague Javelin
	if ((usePlague) && !Attack.checkResist(unit, "lightning")) {
		if ((unit.distance <= 15) && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Cast Slow-Missles, then proceed with Plague Jav. Lowers amount of damage from projectiles.
			!unit.getState(sdk.states.SlowMissiles) && useSlowMissiles && Skill.cast(sdk.skills.SlowMissiles, sdk.skills.hand.Right, unit);

			// Handle Switch casting
			if (!unit.dead) {
				if (CharData.skillData.haveChargedSkillOnSwitch(sdk.skills.LowerResist)
					&& !unit.getState(sdk.states.LowerResist) && unit.curseable && commonCheck && !checkCollision(me, unit, sdk.collision.Ranged)) {
					// Switch cast lower resist
					Attack.switchCastCharges(sdk.skills.LowerResist, unit);
				}
			}

			if (Attack.checkResist(unit, "poison") && !me.skillDelay && !unit.dead) {
				Skill.cast(sdk.skills.PlagueJavelin, Skill.getHand(sdk.skills.PlagueJavelin), unit);
			}

			if (!useJab) {
				// We are within melee distance might as well use jab rather than stand there
				// Make sure monster is not physical immune
				if (unit.distance < 4 && Attack.checkResist(unit, "physical")) {
					if (Skill.canUse(sdk.skills.Jab)) {
						if (unit.distance > 3 || checkCollision(me, unit, sdk.collision.Ranged)) {
							if (!Attack.getIntoPosition(unit, 3, sdk.collision.BlockWall)) {
								return Attack.Result.FAILED;
							}
						}

						!unit.dead && Skill.cast(sdk.skills.Jab, Skill.getHand(sdk.skills.Jab), unit);
						
						return Attack.Result.SUCCESS;
					}
				}
				
				return Attack.Result.SUCCESS;
			}
		}
	}

	// Only try attacking immunes if I have my end game javelin and they aren't lightning enchanted - use jab as main attack
	if (useJab && !Attack.checkResist(unit, Config.AttackSkill[1]) && Attack.checkResist(unit, "physical") && !unit.getEnchant(sdk.enchant.LightningEnchanted)) {
		if ((unit.distance > 3 || checkCollision(me, unit, sdk.collision.Ranged)) && !Attack.getIntoPosition(unit, 3, sdk.collision.BlockWall)) {
			return Attack.Result.FAILED;
		}

		!unit.dead && Skill.cast(sdk.skills.Jab, Skill.getHand(sdk.skills.Jab), unit);
		
		return Attack.Result.SUCCESS;
	}

	if (forcePlague && Attack.checkResist(unit, "poison") && !unit.getState(sdk.states.Poison) && !me.skillDelay) {
		if ((unit.distance >= 8 && unit.distance <= 15) && !checkCollision(me, unit, sdk.collision.Ranged)) {
			Skill.cast(sdk.skills.PlagueJavelin, Skill.getHand(sdk.skills.PlagueJavelin), unit);
		}
	}

	if (useLightFury) {
		if ((unit.distance >= 8 && unit.distance <= 15) && !checkCollision(me, unit, sdk.collision.Ranged)) {
			Skill.cast(sdk.skills.LightningFury, Skill.getHand(sdk.skills.LightningFury), unit);
		}
	}

	if (preattack && Config.AttackSkill[0] > 0 && [sdk.skills.InnerSight, sdk.skills.SlowMissiles].indexOf(Config.AttackSkill[0]) === -1
		&& Attack.checkResist(unit, Config.AttackSkill[0]) && (!me.skillDelay || !Skill.isTimed(Config.AttackSkill[0]))) {
		if (unit.distance > preattackRange || checkCollision(me, unit, sdk.collision.Ranged)) {
			if (!Attack.getIntoPosition(unit, preattackRange, sdk.collision.Ranged)) {
				return Attack.Result.FAILED;
			}
		}

		Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);

		return Attack.Result.SUCCESS;
	}

	let mercRevive = 0;
	let skills = this.decideSkill(unit);
	let result = this.doCast(unit, skills.timed, skills.untimed);

	if (result === Attack.Result.CANTATTACK && Attack.canTeleStomp(unit)) {
		let merc = me.getMerc();

		while (unit.attackable) {
			if (Misc.townCheck()) {
				if (!unit || !copyUnit(unit).x) {
					unit = Misc.poll(() => Game.getMonster(-1, -1, gid), 1000, 80);
				}
			}

			if (!unit) return Attack.Result.SUCCESS;

			if (Town.needMerc()) {
				if (Config.MercWatch && mercRevive++ < 1) {
					Town.visitTown();
				} else {
					return Attack.Result.CANTATTACK;
				}

				(merc === undefined || !merc) && (merc = me.getMerc());
			}

			if (!!merc && getDistance(merc, unit) > 5) {
				Pather.moveToUnit(unit);

				let spot = Attack.findSafeSpot(unit, 10, 5, 9);
				!!spot && Pather.walkTo(spot.x, spot.y);
			}

			let closeMob = Attack.getNearestMonster({skipGid: gid});
				
			if (!!closeMob) {
				let findSkill = this.decideSkill(closeMob);
				(this.doCast(closeMob, findSkill.timed, findSkill.untimed) === 1) || (Skill.canUse(sdk.skills.Decoy) && Skill.cast(sdk.skills.Decoy, sdk.skills.hand.Right, unit));
			}
		}

		return Attack.Result.SUCCESS;
	}

	return result;
};

ClassAttack.afterAttack = function () {
	Precast.doPrecast(false);

	let needRepair = me.charlvl < 5 ? [] : Town.needRepair();
	
	// Repair check, make sure i have a tome
	if (needRepair.length > 0 && me.getItem(sdk.items.TomeofTownPortal)) {
		Town.visitTown(true);
	}

	this.lightFuryTick = 0;
};

// Returns: 0 - fail, 1 - success, 2 - no valid attack skills
ClassAttack.doCast = function (unit, timedSkill, untimedSkill) {
	// No valid skills can be found
	if (timedSkill < 0 && untimedSkill < 0) return Attack.Result.CANTATTACK;
	// unit became invalidated
	if (!unit || !unit.attackable) return Attack.Result.SUCCESS;
	
	let walk;

	// Arrow/bolt check
	if (this.bowCheck) {
		switch (true) {
		case this.bowCheck === "bow" && !me.getItem("aqv", sdk.items.mode.Equipped):
		case this.bowCheck === "crossbow" && !me.getItem("cqv", sdk.items.mode.Equipped):
			console.log("Bow check");
			Town.visitTown();

			break;
		}
	}

	if (timedSkill > -1 && (!me.getState(sdk.states.SkillDelay) || !Skill.isTimed(timedSkill))) {
		switch (timedSkill) {
		case sdk.skills.LightningFury:
			if (!this.lightFuryTick || getTickCount() - this.lightFuryTick > Config.LightningFuryDelay * 1000) {
				if (unit.distance > Skill.getRange(timedSkill) || checkCollision(me, unit, sdk.collision.Ranged)) {
					if (!Attack.getIntoPosition(unit, Skill.getRange(timedSkill), sdk.collision.Ranged)) {
						return Attack.Result.FAILED;
					}
				}

				if (!unit.dead && Skill.cast(timedSkill, Skill.getHand(timedSkill), unit)) {
					this.lightFuryTick = getTickCount();
				}

				return Attack.Result.SUCCESS;
			}

			break;
		default:
			// If main attack skill is lightning strike and charged strike's skill level is at least level 15, check current monster count. If monster count is less than 3, use CS as its more effective with small mobs
			if (timedSkill === sdk.skills.LightningStrike && me.getSkill(sdk.skills.ChargedStrike, sdk.skills.subindex.SoftPoints) >= 15) {
				if (me.getMobCount(15, Coords_1.BlockBits.LineOfSight | Coords_1.BlockBits.Ranged | Coords_1.BlockBits.ClosedDoor | Coords_1.BlockBits.BlockWall) <= 3) {
					timedSkill = sdk.skills.ChargedStrike;
				}
			}

			if (Skill.getRange(timedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) return Attack.Result.FAILED;

			if (Math.round(unit.distance) > Skill.getRange(timedSkill) || checkCollision(me, unit, sdk.collision.Ranged)) {
				// Allow short-distance walking for melee skills
				walk = Skill.getRange(timedSkill) < 4 && unit.distance < 10 && !checkCollision(me, unit, sdk.collision.BlockWall);

				if (!Attack.getIntoPosition(unit, Skill.getRange(timedSkill), sdk.collision.Ranged, walk)) {
					return Attack.Result.FAILED;
				}
			}

			!unit.dead && Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);

			return Attack.Result.SUCCESS;
		}
	}

	if (untimedSkill > -1) {
		if (Skill.getRange(untimedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) return Attack.Result.FAILED;

		if (unit.distance > Skill.getRange(untimedSkill) || checkCollision(me, unit, sdk.collision.Ranged)) {
			// Allow short-distance walking for melee skills
			walk = Skill.getRange(untimedSkill) < 4 && unit.distance < 10 && !checkCollision(me, unit, sdk.collision.BlockWall);

			if (!Attack.getIntoPosition(unit, Skill.getRange(untimedSkill), sdk.collision.Ranged, walk)) {
				return Attack.Result.FAILED;
			}
		}

		!unit.dead && Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);

		return Attack.Result.SUCCESS;
	}

	Misc.poll(() => !me.skillDelay, 1000, 40);

	// Wait for Lightning Fury timeout
	while (this.lightFuryTick && getTickCount() - this.lightFuryTick < Config.LightningFuryDelay * 1000) {
		delay(40);
	}

	return Attack.Result.SUCCESS;
};
