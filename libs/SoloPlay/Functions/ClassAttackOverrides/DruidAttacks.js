/**
*  @filename    DruidAttacks.js
*  @author      theBGuy
*  @desc        Druid fixes to improve class attack functionality
*
*/

!isIncluded("common/Attacks/Druid.js") && include("common/Attacks/Druid.js");

ClassAttack.doAttack = function (unit, preattack) {
	if (!unit) return 1;
	let gid = unit.gid;

	if (Config.MercWatch && Town.needMerc()) {
		console.log("mercwatch");

		if (Town.visitTown()) {
			// lost reference to the mob we were attacking
			if (!unit || !copyUnit(unit).x || !Game.getMonster(-1, -1, gid) || unit.dead) {
				return 1;
			}
		}
	}

	let checkSkill;
	let mercRevive = 0;
	let timedSkill = -1;
	let untimedSkill = -1;
	let gold = me.gold;
	let index = ((unit.spectype & 0x7) || unit.type === 0) ? 1 : 3;

	// Rebuff Hurricane
	Skill.canUse(sdk.skills.Hurricane) && !me.getState(sdk.states.Hurricane) && Skill.cast(sdk.skills.Hurricane, 0);

	// Rebuff Cyclone Armor
	Skill.canUse(sdk.skills.CycloneArmor) && !me.getState(sdk.states.CycloneArmor) && Skill.cast(sdk.skills.CycloneArmor, 0);

	if (index === 1 && !unit.dead && unit.curseable) {
		let commonCheck = (gold > 500000 || Attack.bossesAndMiniBosses.includes(unit.classid) || [sdk.areas.ChaosSanctuary, sdk.areas.ThroneofDestruction].includes(me.area));

		if (CharData.skillData.haveChargedSkill(sdk.skills.SlowMissiles) && unit.getEnchant(sdk.enchant.LightningEnchanted) && !unit.getState(sdk.states.SlowMissiles)
			&& (gold > 500000 && Attack.bossesAndMiniBosses.indexOf(unit.classid) === -1) && !checkCollision(me, unit, 0x4)) {
			// Cast slow missiles
			Attack.castCharges(sdk.skills.SlowMissiles, unit);
		}

		if (CharData.skillData.haveChargedSkill(sdk.skills.InnerSight) && !unit.getState(sdk.states.InnerSight)
			&& gold > 500000 && !checkCollision(me, unit, 0x4)) {
			// Cast slow missiles
			Attack.castCharges(sdk.skills.InnerSight, unit);
		}

		if (CharData.skillData.haveChargedSkillOnSwitch(sdk.skills.Decrepify)
			&& !unit.getState(sdk.states.Decrepify) && commonCheck && !checkCollision(me, unit, 0x4)) {
			// Switch cast decrepify
			Attack.switchCastCharges(sdk.skills.Decrepify, unit);
		}
		
		if (CharData.skillData.haveChargedSkillOnSwitch(sdk.skills.Weaken)
			&& !unit.getState(sdk.states.Weaken) && !unit.getState(sdk.states.Decrepify) && commonCheck && !checkCollision(me, unit, 0x4)) {
			// Switch cast weaken
			Attack.switchCastCharges(sdk.skills.Weaken, unit);
		}
	}

	// specials and dolls for now, should make dolls much less dangerous with the reduction of their damage
	if (Precast.haveCTA > -1 && !unit.dead && (index === 1 || [212, 213, 214, 215, 216, 690, 691].includes(unit.classid))
		&& unit.distance < 5 && !unit.getState(sdk.states.BattleCry) && unit.curseable) {
		Skill.switchCast(sdk.skills.BattleCry, {oSkill: true});
	}

	if (preattack && Config.AttackSkill[0] > 0 && Attack.checkResist(unit, Config.AttackSkill[0])
		&& (!me.getState(sdk.states.SkillDelay) || !Skill.isTimed(Config.AttackSkill[0]))) {
		if (unit.distance > Skill.getRange(Config.AttackSkill[0]) || checkCollision(me, unit, 0x4)) {
			if (!Attack.getIntoPosition(unit, Skill.getRange(Config.AttackSkill[0]), 0x4)) {
				return 0;
			}
		}

		Skill.cast(Config.AttackSkill[0], Skill.getHand(Config.AttackSkill[0]), unit);

		return 1;
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

	if (me.normal && me.charlvl > 12 && gold < 5000 && Skill.getManaCost(timedSkill) > me.mp) {
		switch (SetUp.currentBuild) {
		case "Start":
			if (Skill.canUse(sdk.skills.Firestorm) && Skill.getManaCost(sdk.skills.Firestorm) < me.mp) {
				timedSkill = sdk.skills.Firestorm;
			} else if (me.getMobCount(6, Coords_1.Collision.BLOCK_MISSILE | Coords_1.BlockBits.BlockWall) >= 1) {
				// I have no mana and there are mobs around me, just attack
				timedSkill = sdk.skills.Attack;
			}

			break;
		default:
			break;
		}
	}

	let result = this.doCast(unit, timedSkill, untimedSkill);

	if (result === 2 && Config.TeleStomp && Config.UseMerc && Pather.canTeleport() && Attack.checkResist(unit, "physical") && !!me.getMerc() && Attack.validSpot(unit.x, unit.y)) {
		let merc = me.getMerc();

		while (unit.attackable) {
			if (Misc.townCheck()) {
				if (!unit || !copyUnit(unit).x) {
					unit = Misc.poll(() => Game.getMonster(-1, -1, gid), 1000, 80);
				}
			}

			if (!unit) return 1;

			if (Town.needMerc()) {
				if (Config.MercWatch && mercRevive++ < 1) {
					Town.visitTown();
				} else {
					return 2;
				}

				(merc === undefined || !merc) && (merc = me.getMerc());
			}

			if (!!merc && getDistance(merc, unit) > 5) {
				Pather.moveToUnit(unit);

				let spot = Attack.findSafeSpot(unit, 10, 5, 9);
				!!spot && Pather.walkTo(spot.x, spot.y);
			}

			let closeMob = Attack.getNearestMonster({skipGid: gid});
			!!closeMob && this.doCast(closeMob, timedSkill, untimedSkill);
		}

		return 1;
	}

	return result;
};

ClassAttack.doCast = function (unit, timedSkill, untimedSkill) {
	let walk;

	// No valid skills can be found
	if (timedSkill < 0 && untimedSkill < 0) return 2;

	// Rebuff Hurricane
	Skill.canUse(sdk.skills.Hurricane) && !me.getState(sdk.states.Hurricane) && Skill.cast(sdk.skills.Hurricane, 0);

	if (timedSkill > -1 && (!me.getState(sdk.states.SkillDelay) || !Skill.isTimed(timedSkill))) {
		switch (timedSkill) {
		case sdk.skills.Tornado:
			if (Math.ceil(getDistance(me, unit)) > (Skill.getRange(timedSkill)) || checkCollision(me, unit, 0x4)) {
				if (!Attack.getIntoPosition(unit, (Skill.getRange(timedSkill)), 0x4)) {
					return 0;
				}
			}

			// Randomized x coord changes tornado path and prevents constant missing
			if (!unit.dead) {
				Skill.cast(timedSkill, Skill.getHand(timedSkill), unit.x + rand(-1, 1), unit.y);
			}

			return 1;
		default:
			if (Skill.getRange(timedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
				return 0;
			}

			if (Math.ceil(getDistance(me, unit)) > (Skill.getRange(timedSkill)) || checkCollision(me, unit, 0x4)) {
				// Allow short-distance walking for melee skills
				walk = Skill.getRange(timedSkill) < 4 && getDistance(me, unit) < 10 && !checkCollision(me, unit, 0x1);

				if (!Attack.getIntoPosition(unit, (Skill.getRange(timedSkill)), 0x4, walk)) {
					return 0;
				}
			}

			if (!unit.dead) {
				Skill.cast(timedSkill, Skill.getHand(timedSkill), unit);
			}

			return 1;
		}
	}

	if (untimedSkill > -1) {
		if (Skill.getRange(untimedSkill) < 4 && !Attack.validSpot(unit.x, unit.y)) {
			return 0;
		}

		if (Math.ceil(getDistance(me, unit)) > (Skill.getRange(untimedSkill)) || checkCollision(me, unit, 0x4)) {
			// Allow short-distance walking for melee skills
			walk = Skill.getRange(untimedSkill) < 4 && getDistance(me, unit) < 10 && !checkCollision(me, unit, 0x1);

			if (!Attack.getIntoPosition(unit, (Skill.getRange(untimedSkill)), 0x4, walk)) {
				return 0;
			}
		}

		if (!unit.dead) {
			Skill.cast(untimedSkill, Skill.getHand(untimedSkill), unit);
		}

		return 1;
	}

	Misc.poll(() => !me.skillDelay, 1000, 40);

	return 1;
};

