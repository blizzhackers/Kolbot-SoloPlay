/**
*  @filename    NecromancerAttacks.js
*  @author      theBGuy
*  @desc        Necromancer fixes to improve class attack functionality
*
*/

includeIfNotIncluded("common/Attacks/Necromancer.js");

ClassAttack.curseIndex = [
	{
		skillId: sdk.skills.AmplifyDamage,
		state: sdk.states.AmplifyDamage,
		priority: 2,
		useIf: function (unit) {
			return Skill.canUse(this.skillId) && !unit.getState(sdk.states.Decrepify) && !Attack.checkResist(unit, "magic") && !Attack.checkResist(unit, "physical");
		}
	},
	{
		skillId: sdk.skills.DimVision,
		state: sdk.states.DimVision,
		priority: 1,
		skipIf: function (unit) {
			return unit.isSpecial || [sdk.monsters.OblivionKnight1, sdk.monsters.OblivionKnight2, sdk.monsters.OblivionKnight3].includes(unit.classid);
		},
		useIf: function (unit) {
			return !this.skipIf(unit) && Skill.canUse(this.skillId) && unit.distance > 15;
		}
	},
	{
		skillId: sdk.skills.Weaken,
		state: sdk.states.Weaken,
		priority: 3,
		useIf: function (unit) {
			return Skill.canUse(this.skillId) && !unit.getState(sdk.states.Decrepify) && !unit.getState(sdk.states.AmplifyDamage);
		}
	},
	{
		skillId: sdk.skills.IronMaiden,
		state: sdk.states.IronMaiden,
		priority: 1,
		useIf: function (unit) {
			return Skill.canUse(this.skillId) && me.area === sdk.areas.DurielsLair && me.normal && unit;
		}
	},
	{
		skillId: sdk.skills.Terror,
		state: sdk.states.Terror,
		priority: 1,
		useIf: function (unit) {
			return unit.scareable && Skill.canUse(this.skillId) && me.getMobCount(6, Coords_1.Collision.BLOCK_MISSILE | Coords_1.BlockBits.BlockWall | Coords_1.BlockBits.Casting, 0, true) >= 3
				&& Skill.getManaCost(sdk.skills.Terror) < me.mp && me.hpPercent < 75;
		}
	},
	{
		skillId: sdk.skills.Confuse,
		state: sdk.states.Confuse,
		priority: 2,
		useIf: function (unit) {
			return unit.scareable && unit.distance > 8 && Skill.canUse(this.skillId);
		}
	},
	{
		skillId: sdk.skills.LifeTap,
		state: sdk.states.LifeTap,
		priority: 10,
		useIf: function () {
			// false for now, maybe based on health check on merc or would this be summonmancer viable?
			return false;
		}
	},
	{
		skillId: sdk.skills.Attract,
		state: sdk.states.Attract,
		priority: 1,
		useIf: function (unit) {
			return unit.scareable && me.area === sdk.areas.ThroneofDestruction && unit.distance > 8
				&& Skill.canUse(this.skillId);
		}
	},
	{
		skillId: sdk.skills.Decrepify,
		state: sdk.states.Decrepify,
		priority: 1,
		useIf: function () {
			return Skill.canUse(this.skillId);
		}
	},
	{
		skillId: sdk.skills.LowerResist,
		state: sdk.states.LowerResist,
		priority: 1,
		useIf: function (unit) {
			return Skill.canUse(this.skillId) && SetUp.currentBuild === "Poison" && Attack.checkResist(unit, "poison");
		}
	},
];

ClassAttack.smartCurse = function (unit) {
	if (unit === undefined || unit.dead || !unit.curseable) return false;

	let choosenCurse = (this.curseIndex
		.filter((curse) => curse.useIf(unit))
		.sort((a, b) => a.priority - b.priority)
		.find((curse) => this.canCurse(unit, curse.skillId) && Skill.getManaCost(curse.skillId) < me.mp) || false);

	if (choosenCurse) {
		if (!checkCollision(me, unit, sdk.collision.Ranged)) {
			me.overhead("Cursing " + unit.name + " with " + getSkillById(choosenCurse.skillId));
			return Skill.cast(choosenCurse.skillId, sdk.skills.hand.Right, unit);
		} else {
			me.overhead(unit.name + " is blocked, skipping attempt to curse");
			this.doCast(unit, Config.AttackSkill[unit.isSpecial ? 1 : 3], Config.AttackSkill[unit.isSpecial ? 2 : 5]);
		}
	}

	return false;
};

ClassAttack.bpTick = 0;

// TODO: clean this up
ClassAttack.doAttack = function (unit) {
	if (!unit) return Attack.Result.SUCCESS;
	let gid = unit.gid;

	if (Config.MercWatch && Town.needMerc()) {
		console.log("mercwatch");

		if (Town.visitTown()) {
			// lost reference to the mob we were attacking
			if (!unit || !copyUnit(unit).x || !Game.getMonster(-1, -1, gid) || unit.dead) {
				return Attack.Result.SUCCESS;
			}
		}
	}

	let checkSkill;
	let mercRevive = 0;
	let timedSkill = -1;
	let untimedSkill = -1;
	let gold = me.gold;
	let index = (unit.isSpecial || unit.isPlayer) ? 1 : 3;
	let useTerror = Skill.canUse(sdk.skills.Terror);
	let useBP = Skill.canUse(sdk.skills.BonePrison);
	let bpAllowedAreas = [37, 38, 39, 41, 42, 43, 44, 46, 73, 76, 77, 78, 79, 80, 81, 83, 102, 104, 105, 106, 108, 110, 111, 120, 121, 128, 129, 130, 131];

	// Bone prison
	if (useBP && unit.distance > ([73, 120].includes(me.area) ? 6 : 10) && bpAllowedAreas.includes(me.area) && (index === 1 || [571, 391].includes(unit.classid))
		&& !checkCollision(me, unit, sdk.collision.Ranged) && Skill.getManaCost(sdk.skills.BonePrison) * 2 < me.mp && getTickCount() - this.bpTick > 2000) {
		if (Skill.cast(sdk.skills.BonePrison, sdk.skills.hand.Right, unit)) {
			this.bpTick = getTickCount();
		}
	}

	// write terrorCheck function, need to take into account if monsters are even scareable
	if (useTerror && me.getMobCount(6, Coords_1.Collision.BLOCK_MISSILE | Coords_1.BlockBits.BlockWall | Coords_1.BlockBits.Casting, 0, true) >= 3
		&& Skill.getManaCost(sdk.skills.Terror) < me.mp && me.hpPercent < 75) {
		Skill.cast(sdk.skills.Terror, sdk.skills.hand.Right);
	}

	this.smartCurse(unit);

	if (me.expansion && index === 1 && !unit.dead) {
		if (CharData.skillData.haveChargedSkill(sdk.skills.SlowMissiles)
			&& unit.getEnchant(sdk.enchant.LightningEnchanted) && !unit.getState(sdk.states.SlowMissiles)
			&& unit.curseable && (gold > 500000 && Attack.bossesAndMiniBosses.indexOf(unit.classid) === -1) && !checkCollision(me, unit, sdk.collision.Ranged)) {
			// Cast slow missiles
			Attack.castCharges(sdk.skills.SlowMissiles, unit);
		}
	}

	// Get timed skill
	checkSkill = Attack.getCustomAttack(unit) ? Attack.getCustomAttack(unit)[0] : Config.AttackSkill[index];

	if (Attack.checkResist(unit, checkSkill) && Attack.validSpot(unit.x, unit.y, checkSkill)) {
		timedSkill = checkSkill;
	} else if (Config.AttackSkill[5] > -1 && Attack.checkResist(unit, Config.AttackSkill[5]) && Attack.validSpot(unit.x, unit.y, Config.AttackSkill[5])) {
		timedSkill = Config.AttackSkill[5];
	}

	// Get untimed skill
	checkSkill = Attack.getCustomAttack(unit) ? Attack.getCustomAttack(unit)[1] : Config.AttackSkill[index + 1];

	if (Attack.checkResist(unit, checkSkill) && Attack.validSpot(unit.x, unit.y, checkSkill)) {
		untimedSkill = checkSkill;
	} else if (Config.AttackSkill[6] > -1 && Attack.checkResist(unit, Config.AttackSkill[6]) && Attack.validSpot(unit.x, unit.y, Config.AttackSkill[6])) {
		untimedSkill = Config.AttackSkill[6];
	}

	// Low mana timed skill
	if (Config.LowManaSkill[0] > -1 && Skill.getManaCost(timedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[0])) {
		timedSkill = Config.LowManaSkill[0];
	}

	// Low mana untimed skill
	if (Config.LowManaSkill[1] > -1 && Skill.getManaCost(untimedSkill) > me.mp && Attack.checkResist(unit, Config.LowManaSkill[1])) {
		untimedSkill = Config.LowManaSkill[1];
	}

	let result = this.doCast(unit, timedSkill, untimedSkill);

	if (result === 1) {
		Config.ActiveSummon && this.raiseArmy();
		this.explodeCorpses(unit);
	} else if (result === Attack.Result.CANTATTACK && Attack.canTeleStomp(unit)) {
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

			Config.ActiveSummon && this.raiseArmy();
			this.explodeCorpses(unit);
			this.smartCurse(unit);
			let closeMob = Attack.getNearestMonster({skipGid: gid});
			!!closeMob && this.doCast(closeMob, timedSkill, untimedSkill);
		}

		return Attack.Result.SUCCESS;
	}

	return result;
};

// Returns: 0 - fail, 1 - success, 2 - no valid attack skills
ClassAttack.doCast = function (unit, timedSkill, untimedSkill) {
	let walk, timedSkillRange, untimedSkillRange;

	// No valid skills can be found
	if (timedSkill < 0 && untimedSkill < 0) return Attack.Result.CANTATTACK;

	// Check for bodies to exploit for CorpseExplosion before committing to an attack for non-summoner type necros
	if (Config.Skeletons + Config.SkeletonMages + Config.Revives === 0) {
		this.checkCorpseNearMonster(unit) && this.explodeCorpses(unit);
	}

	if (timedSkill > -1 && (!me.getState(sdk.states.SkillDelay) || !Skill.isTimed(timedSkill))) {
		timedSkillRange = Skill.getRange(timedSkill);

		switch (timedSkill) {
		case sdk.skills.PoisonNova:
			if (!this.novaTick || getTickCount() - this.novaTick > Config.PoisonNovaDelay * 1000) {
				if (Math.round(unit.distance) > timedSkillRange || checkCollision(me, unit, sdk.collision.Ranged)) {
					if (!Attack.getIntoPosition(unit, timedSkillRange, 0x4)) {
						return Attack.Result.FAILED;
					}
				}

				if (!unit.dead && Skill.cast(timedSkill, Skill.getHand(timedSkill), unit)) {
					this.novaTick = getTickCount();
				}
			}

			break;
		case 500: // Pure Summoner
			if (Math.round(unit.distance) > timedSkillRange || checkCollision(me, unit, sdk.collision.Ranged)) {
				if (!Attack.getIntoPosition(unit, timedSkillRange, 0x4)) {
					return Attack.Result.FAILED;
				}
			}

			delay(300);

			break;
		default:
			if (timedSkillRange < 4 && !Attack.validSpot(unit.x, unit.y)) return Attack.Result.FAILED;

			if (timedSkill === sdk.skills.Teeth) {
				timedSkillRange = me.getMobCount(6, Coords_1.Collision.BLOCK_MISSILE | Coords_1.BlockBits.BlockWall | Coords_1.BlockBits.Casting) <= 3 ? 6 : timedSkillRange;
			}

			if (Math.round(unit.distance) > timedSkillRange || checkCollision(me, unit, sdk.collision.Ranged)) {
				// Allow short-distance walking for melee skills
				walk = timedSkillRange < 4 && unit.distance < 10 && !checkCollision(me, unit, sdk.collision.BlockWall);

				if (!Attack.getIntoPosition(unit, timedSkillRange, 0x4, walk)) return Attack.Result.FAILED;
			}

			if (!unit.dead) {
				// Try to find better spot
				if (Math.round(unit.distance) < 4 && timedSkillRange > 6) {
					Attack.deploy(unit, 4, 5, 9);
				}

				Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);
			}

			break;
		}
	}

	if (untimedSkill > -1) {
		untimedSkillRange = Skill.getRange(untimedSkill);

		if (untimedSkillRange < 4 && !Attack.validSpot(unit.x, unit.y)) return Attack.Result.FAILED;

		if (Math.round(unit.distance) > untimedSkillRange || checkCollision(me, unit, sdk.collision.Ranged)) {
			// Allow short-distance walking for melee skills
			walk = Skill.getRange(untimedSkill) < 4 && unit.distance < 10 && !checkCollision(me, unit, sdk.collision.BlockWall);

			if (!Attack.getIntoPosition(unit, untimedSkillRange, 0x4, walk)) {
				return Attack.Result.FAILED;
			}
		}

		!unit.dead && Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);

		return Attack.Result.SUCCESS;
	}

	Misc.poll(() => !me.skillDelay, 1000, 40);

	// Delay for Poison Nova
	while (this.novaTick && getTickCount() - this.novaTick < Config.PoisonNovaDelay * 1000) {
		delay(40);
	}

	return Attack.Result.SUCCESS;
};

ClassAttack.farCast = function (unit) {
	let timedSkill = Config.AttackSkill[1], untimedSkill = Config.AttackSkill[2];

	// No valid skills can be found
	if (timedSkill < 0 && untimedSkill < 0) return Attack.Result.CANTATTACK;

	// Far to low a range for far casting
	if (Skill.getRange(timedSkill) < 4 && Skill.getRange(untimedSkill) < 4) return Attack.Result.CANTATTACK;

	// Bone prison
	if (unit.distance > 10 && !checkCollision(me, unit, sdk.collision.Ranged) && Skill.getManaCost(88) * 2 < me.mp && getTickCount() - this.bpTick > 2000) {
		if (Skill.cast(sdk.skills.BonePrison, sdk.skills.hand.Right, unit)) {
			this.bpTick = getTickCount();
		}
	}

	this.smartCurse(unit);

	// Check for bodies to exploit for CorpseExplosion before committing to an attack for non-summoner type necros
	if (Config.Skeletons + Config.SkeletonMages + Config.Revives === 0) {
		this.checkCorpseNearMonster(unit) && this.explodeCorpses(unit);
	}

	if (timedSkill > -1 && (!me.getState(sdk.states.SkillDelay) || !Skill.isTimed(timedSkill))) {
		switch (timedSkill) {
		case sdk.skills.PoisonNova:
		case 500: 	// Pure Summoner (Note: unsure where the 500 is coming from)
			break;
		default:
			if (!unit.dead && !checkCollision(me, unit, sdk.collision.Ranged)) {
				Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);
			}

			break;
		}
	}

	if (untimedSkill > -1) {
		if (Skill.getRange(untimedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) return Attack.Result.FAILED;

		if (!unit.dead && !checkCollision(me, unit, sdk.collision.Ranged)) {
			Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);
		}

		return Attack.Result.SUCCESS;
	}

	Misc.poll(() => !me.skillDelay, 1000, 40);

	return Attack.Result.SUCCESS;
};

ClassAttack.explodeCorpses = function (unit) {
	if (Config.ExplodeCorpses === 0 || unit.mode === 0 || unit.mode === 12) return false;

	let corpseList = [];
	let useAmp = Skill.canUse(sdk.skills.AmplifyDamage);
	let ampManaCost = Skill.getManaCost(sdk.skills.AmplifyDamage);
	let explodeCorpsesManaCost = Skill.getManaCost(Config.ExplodeCorpses);
	let range = Math.floor((me.getSkill(Config.ExplodeCorpses, sdk.skills.subindex.SoftPoints) + 7) / 3);
	let corpse = Game.getMonster(-1, 12);

	if (corpse) {
		do {
			if (getDistance(unit, corpse) <= range && this.checkCorpse(corpse)) {
				corpseList.push(copyUnit(corpse));
			}
		} while (corpse.getNext());

		// Shuffle the corpseList so if running multiple necrobots they explode separate corpses not the same ones
		corpseList.length > 1 && (corpseList = corpseList.shuffle());

		if (this.isArmyFull()) {
			// We don't need corpses as we are not a Summoner Necro, Spam CE till monster dies or we run out of bodies.
			do {
				corpse = corpseList.shift();

				if (corpse) {
					if (!unit.dead && this.checkCorpse(corpse) && getDistance(corpse, unit) <= range) {
						// Added corpse ID so I can see when it blows another monster with the same ClassID and Name
						me.overhead("Exploding: " + corpse.classid + " " + corpse.name + " id:" + corpse.gid);

						if (useAmp && !unit.getState(sdk.states.AmplifyDamage) && !unit.getState(sdk.states.Decrepify) && me.mp > (ampManaCost + explodeCorpsesManaCost)) {
							Skill.cast(sdk.skills.AmplifyDamage, sdk.skills.hand.Right, unit);
						}

						if (Skill.cast(Config.ExplodeCorpses, sdk.skills.hand.Right, corpse)) {
							delay(me.ping + 1);
						}
					}
				}
			} while (corpseList.length > 0);
		} else {
			// We are a Summoner Necro, we should conserve corpses, only blow 2 at a time so we can check for needed re-summons.
			for (let i = 0; i <= 1; i += 1) {
				if (corpseList.length > 0) {
					corpse = corpseList.shift();

					if (corpse) {
						me.overhead("Exploding: " + corpse.classid + " " + corpse.name);

						if (useAmp && !unit.getState(sdk.states.AmplifyDamage) && !unit.getState(sdk.states.Decrepify) && me.mp > (ampManaCost + explodeCorpsesManaCost)) {
							Skill.cast(sdk.skills.AmplifyDamage, sdk.skills.hand.Right, unit);
						}

						if (Skill.cast(Config.ExplodeCorpses, sdk.skills.hand.Right, corpse)) {
							delay(200);
						}
					}
				} else {
					break;
				}
			}
		}
	}

	return true;
};
