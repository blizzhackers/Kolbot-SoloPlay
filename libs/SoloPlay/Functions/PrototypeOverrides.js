/**
*  @filename    PrototypeOverrides.js
*  @author      theBGuy
*  @credit      Jaenster
*  @desc        additions for improved Kolbot-SoloPlay functionality and code readability
*
*/

!isIncluded('libs/common/Prototypes.js') && include('libs/common/Prototypes.js');

Unit.prototype.getResPenalty = function (difficulty) {
	difficulty > 2 && (difficulty = 2);
	return me.gametype === sdk.game.gametype.Classic ? [0, 20, 50][difficulty] : [0, 40, 100][difficulty];
};

Unit.prototype.getItemType = function () {
	switch (this.itemType) {
	case sdk.itemtype.Shield:
	case sdk.itemtype.AuricShields:
	case sdk.itemtype.VoodooHeads:
		return "Shield";
	case sdk.itemtype.Armor:
		return "Armor";
	case sdk.itemtype.Helm:
	case sdk.itemtype.PrimalHelm:
	case sdk.itemtype.Circlet:
	case sdk.itemtype.Pelt:
		return "Helmet";
	case sdk.itemtype.Scepter:
	case sdk.itemtype.Wand:
	case sdk.itemtype.Staff:
	case sdk.itemtype.Bow:
	case sdk.itemtype.Axe:
	case sdk.itemtype.Club:
	case sdk.itemtype.Sword:
	case sdk.itemtype.Hammer:
	case sdk.itemtype.Knife:
	case sdk.itemtype.Spear:
	case sdk.itemtype.Polearm:
	case sdk.itemtype.Crossbow:
	case sdk.itemtype.Mace:
	case sdk.itemtype.ThrowingKnife:
	case sdk.itemtype.ThrowingAxe:
	case sdk.itemtype.Javelin:
	case sdk.itemtype.Orb:
	case sdk.itemtype.AmazonBow:
	case sdk.itemtype.AmazonSpear:
	case sdk.itemtype.AmazonJavelin:
	case sdk.itemtype.MissilePotion:
	case sdk.itemtype.HandtoHand:
	case sdk.itemtype.AssassinClaw:
		return "Weapon";
	// currently only use this function for socket related things so might as well make non-socketable things return false
	// case sdk.itemtype.BowQuiver:
	// case sdk.itemtype.CrossbowQuiver:
	// 	//return "Quiver";
	// case sdk.itemtype.Ring:
	// 	//return "Ring";
	// case sdk.itemtype.Amulet:
	// 	//return "Amulet";
	// case sdk.itemtype.Boots:
	// 	//return "Boots";
	// case sdk.itemtype.Gloves:
	// 	//return "Gloves";
	// case sdk.itemtype.Belt:
	// 	//return "Belt";
	// default:
	// 	return "";
	}

	return "";
};

Object.defineProperties(Unit.prototype, {
	isCharm: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			return [sdk.items.SmallCharm, sdk.items.LargeCharm, sdk.items.GrandCharm].includes(this.classid);
		},
	},
	isGem: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			return (this.itemType >= sdk.itemtype.Amethyst && this.itemType <= sdk.itemtype.Skull);
		},
	},
	isInsertable: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			return [sdk.itemtype.Jewel, sdk.itemtype.Rune].includes(this.itemType) || this.isGem;
		},
	},
	isRuneword: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			return !!this.getFlag(0x4000000);
		},
	},
	isStunned: {
		get: function () {
			return this.getState(sdk.states.Stunned);
		},
	},
	isUnderCoS: {
		get: function () {
			return this.getState(sdk.states.Cloaked);
		},
	},
	isUnderLowerRes: {
		get: function () {
			return this.getState(sdk.states.LowerResist);
		},
	},
	isBaseType: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			return [sdk.itemquality.Normal, sdk.itemquality.Superior].includes(this.quality) && !this.questItem && !this.isRuneword
				&& getBaseStat("items", this.classid, "gemsockets") > 0 && [sdk.itemtype.Ring, sdk.itemtype.Amulet].indexOf(this.itemType) === -1;
		}
	},
	rawStrength: {
		get: function () {
			let lvl = this.getStat(sdk.stats.Level);
			let rawBonus = function (i) { return i.getStat(sdk.stats.Strength); };
			let perLvlBonus = function (i) { return lvl * i.getStat(sdk.stats.PerLevelStrength) / 8; };
			let bonus = ~~(this.getItemsEx()
				.filter(function (i) { return i.isEquipped || i.isEquippedCharm; })
				.map(function (i) { return rawBonus(i) + perLvlBonus(i); })
				.reduce(function (acc, v) { return acc + v; }, 0));
			return this.getStat(sdk.stats.Strength) - bonus;
		},
	},
	rawDexterity: {
		get: function () {
			let lvl = this.getStat(sdk.stats.Level);
			let rawBonus = function (i) { return i.getStat(sdk.stats.Dexterity); };
			let perLvlBonus = function (i) { return lvl * i.getStat(sdk.stats.PerLevelDexterity) / 8; };
			let bonus = ~~(this.getItemsEx()
				.filter(function (i) { return i.isEquipped || i.isEquippedCharm; })
				.map(function (i) { return rawBonus(i) + perLvlBonus(i); })
				.reduce(function (acc, v) { return acc + v; }, 0));
			return this.getStat(sdk.stats.Dexterity) - bonus;
		},
	},
	upgradedStrReq: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			let code, id, baseReq, finalReq, ethereal = this.getFlag(0x400000),
				reqModifier = this.getStat(91);

			switch (this.itemclass) {
			case sdk.itemclass.Normal:
				code = getBaseStat("items", this.classid, "ubercode").trim();

				break;
			case sdk.itemclass.Exceptional:
				code = getBaseStat("items", this.classid, "ultracode").trim();

				break;
			case sdk.itemclass.Elite:
				return this.strreq;
			}

			id = NTIPAliasClassID[code];
			baseReq = getBaseStat("items", id, "reqstr");
			finalReq = baseReq + Math.floor(baseReq * reqModifier / 100);
			if (ethereal) { finalReq -= 10; }
			return Math.max(finalReq, 0);
		}
	},
	upgradedDexReq: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			let code, id, baseReq, finalReq, ethereal = this.getFlag(0x400000),
				reqModifier = this.getStat(91);

			switch (this.itemclass) {
			case sdk.itemclass.Normal:
				code = getBaseStat("items", this.classid, "ubercode").trim();

				break;
			case sdk.itemclass.Exceptional:
				code = getBaseStat("items", this.classid, "ultracode").trim();

				break;
			case sdk.itemclass.Elite:
				return this.dexreq;
			}

			id = NTIPAliasClassID[code];
			baseReq = getBaseStat("items", id, "reqdex");
			finalReq = baseReq + Math.floor(baseReq * reqModifier / 100);
			if (ethereal) { finalReq -= 10; }
			return Math.max(finalReq, 0);
		}
	},
	upgradedLvlReq: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return false;
			let code, id;

			switch (this.itemclass) {
			case sdk.itemclass.Normal:
				code = getBaseStat("items", this.classid, "ubercode").trim();

				break;
			case sdk.itemclass.Exceptional:
				code = getBaseStat("items", this.classid, "ultracode").trim();

				break;
			case sdk.itemclass.Elite:
				return this.lvlreq;
			}

			id = NTIPAliasClassID[code];
			return Math.max(getBaseStat("items", id, "levelreq"), 0);
		}
	},
	allRes: {
		get: function () {
			if (this.type !== sdk.unittype.Item) return 0;
			let fr = this.getStat(sdk.stats.FireResist);
			let cr = this.getStat(sdk.stats.ColdResist);
			let lr = this.getStat(sdk.stats.LightningResist);
			let pr = this.getStat(sdk.stats.PoisonResist);
			return (fr && cr && lr && pr) ? fr : 0;
		}
	}
});

Object.defineProperties(me, {
	maxNearMonsters: {
		get: function () {
			return Math.floor((4 * (1 / me.hpmax * me.hp)) + 1);
		}
	},
	duelWielding: {
		get: function () {
			// only classes that can duel wield
			if (!me.assassin && !me.barbarian) return false;
			let items = me.getItemsEx()
				.filter((item) => item.isEquipped && [4, 5].includes(item.bodylocation));
			return !!items.length && items.length >= 2 && items.every((item) => ![2, 69, 70].includes(item.itemType) && !getBaseStat("items", item.classid, "block"));
		}
	},
	// for visual purposes really, return res with cap
	FR: {
		get: function () {
			return Math.min(75 + this.getStat(sdk.stats.MaxFireResist), this.getStat(sdk.stats.FireResist) - me.resPenalty);
		}
	},
	CR: {
		get: function () {
			return Math.min(75 + this.getStat(sdk.stats.MaxColdResist), this.getStat(sdk.stats.ColdResist) - me.resPenalty);
		}
	},
	LR: {
		get: function () {
			return Math.min(75 + this.getStat(sdk.stats.MaxLightResist), this.getStat(sdk.stats.LightResist) - me.resPenalty);
		}
	},
	PR: {
		get: function () {
			return Math.min(75 + this.getStat(sdk.stats.MaxPoisonResist), this.getStat(sdk.stats.PoisonResist) - me.resPenalty);
		}
	},
});

Unit.prototype.castChargedSkillEx = function (...args) {
	let skillId, x, y, unit, chargedItem, charge;
	let chargedItems = [];

	switch (args.length) {
	case 0: // item.castChargedSkill()
		break;
	case 1:
		if (args[0] instanceof Unit) { // hellfire.castChargedSkill(monster);
			unit = args[0];
		} else {
			skillId = args[0];
		}

		break;
	case 2:
		if (typeof args[0] === 'number') {
			if (args[1] instanceof Unit) { // me.castChargedSkill(skillId,unit)
				[skillId, unit] = [...args];
			} else if (typeof args[1] === 'number') { // item.castChargedSkill(x,y)
				[x, y] = [...args];
			}
		} else {
			throw new Error(' invalid arguments, expected (skillId, unit) or (x, y)');
		}

		break;
	case 3:
		// If all arguments are numbers
		if (typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
			[skillId, x, y] = [...args];
		}

		break;
	default:
		throw new Error("invalid arguments, expected 'me' object or 'item' unit");
	}

	// Charged skills can only be casted on x, y coordinates
	unit && ([x, y] = [unit.x, unit.y]);

	if (this !== me && this.type !== 4) {
		Developer.debugging.skills && print("ÿc9CastChargedSkillÿc0 :: Wierd Error, invalid arguments, expected 'me' object or 'item' unit" + " unit type : " + this.type);
		return false;
	}

	// Called the function the unit, me.
	if (this === me) {
		if (!skillId) throw Error('Must supply skillId on me.castChargedSkill');

		chargedItems = [];

		CharData.skillData.chargedSkills.forEach(chargeSkill => {
			if (chargeSkill.skill === skillId) {
				Config.DebugMode && console.debug(chargeSkill);
				let item = me.getItem(-1, sdk.itemmode.Equipped, chargeSkill.gid);
				!!item && chargedItems.push({
					charge: chargeSkill.skill,
					level: chargeSkill.level,
					item: item
				});
			}
		});

		if (chargedItems.length === 0) {
			print("ÿc9CastChargedSkillÿc0 :: Don't have the charged skill (" + skillId + "), or not enough charges");
			return false;
		}

		chargedItem = chargedItems.sort((a, b) => a.charge.level - b.charge.level).first().item;

		// Check if item with charges is equipped on the switch spot
		if (me.weaponswitch === 0 && chargedItem.isOnSwap) {
			me.switchWeapons(1);
		}

		return chargedItem.castChargedSkillEx.apply(chargedItem, args);
	} else if (this.type === 4) {
		charge = this.getStat(-2)[204]; // WARNING. Somehow this gives duplicates

		if (!charge) {
			print("ÿc9CastChargedSkillÿc0 :: No charged skill on this item");
			return false;
		}

		if (skillId) {
			if (charge instanceof Array) {
				charge = charge.filter(item => (item && item.skill === skillId) && !!item.charges); // Filter out all other charged skills
				charge = charge.first();
			} else {
				if (charge.skill !== skillId || !charge.charges) {
					print("No charges matching skillId");
					charge = false;
				}
			}
		} else if (charge.length > 1) {
			throw new Error('multiple charges on this item without a given skillId');
		}

		if (charge) {
			let usePacket = ([
				sdk.skills.Valkyrie, sdk.skills.Decoy, sdk.skills.RaiseSkeleton, sdk.skills.ClayGolem, sdk.skills.RaiseSkeletalMage, sdk.skills.BloodGolem, sdk.skills.Shout,
				sdk.skills.IronGolem, sdk.skills.Revive, sdk.skills.Werewolf, sdk.skills.Werebear, sdk.skills.OakSage, sdk.skills.SpiritWolf, sdk.skills.PoisonCreeper, sdk.skills.BattleOrders,
				sdk.skills.SummonDireWolf, sdk.skills.Grizzly, sdk.skills.HeartofWolverine, sdk.skills.SpiritofBarbs, sdk.skills.ShadowMaster, sdk.skills.ShadowWarrior, sdk.skills.BattleCommand,
			].indexOf(skillId) === -1);

			if (!usePacket) {
				return Skill.cast(skillId, 0, x || me.x, y || me.y, this); // Non packet casting
			}

			// Packet casting
			// Setting skill on hand
			sendPacket(1, 0x3c, 2, charge.skill, 1, 0x0, 1, 0x00, 4, this.gid);
			// No need for a delay, since its TCP, the server recv's the next statement always after the send cast skill packet

			// The result of "successfully" casted is different, so we cant wait for it here. We have to assume it worked
			sendPacket(1, 0x0C, 2, x || me.x, 2, y || me.y); // Cast the skill

			return true;
		}
	}

	return false;
};

Unit.prototype.castSwitchChargedSkill = function (...args) {
	let skillId, x, y, unit, chargedItem;
	let chargedItems = [];

	switch (args.length) {
	case 0: // item.castChargedSkill()
	case 1: // hellfire.castChargedSkill(monster);
		break;
	case 2:
		if (typeof args[0] === 'number') {
			if (args[1] instanceof Unit) {
				// me.castChargedSkill(skillId, unit)
				[skillId, unit] = [...args];
			} else if (typeof args[1] === 'number') {
				// item.castChargedSkill(x, y)
				[x, y] = [...args];
			}
		} else {
			throw new Error(' invalid arguments, expected (skillId, unit) or (x, y)');
		}

		break;
	case 3: // If all arguments are numbers
		if (typeof args[0] === 'number' && typeof args[1] === 'number' && typeof args[2] === 'number') {
			[skillId, x, y] = [...args];
		}

		break;
	default:
		throw new Error("invalid arguments, expected 'me' object");
	}

	if (this !== me) throw Error("invalid arguments, expected 'me' object");

	// Charged skills can only be casted on x, y coordinates
	unit && ([x, y] = [unit.x, unit.y]);

	if (x === undefined || y === undefined) return false;

	// Called the function the unit, me.
	if (this === me) {
		if (!skillId) throw Error('Must supply skillId on me.castChargedSkill');

		chargedItems = [];

		CharData.skillData.chargedSkillsOnSwitch.forEach(chargeSkill => {
			if (chargeSkill.skill === skillId) {
				Config.DebugMode && console.debug(chargeSkill);
				let item = me.getItem(-1, sdk.itemmode.Equipped, chargeSkill.gid);
				!!item && chargedItems.push({
					charge: chargeSkill.skill,
					level: chargeSkill.level,
					item: item
				});
			}
		});

		if (chargedItems.length === 0) {
			print("ÿc9SwitchCastChargedSkillÿc0 :: Don't have the charged skill (" + skillId + "), or not enough charges");
			return false;
		}

		me.weaponswitch === 0 && me.switchWeapons(1);

		chargedItem = chargedItems.sort((a, b) => a.charge.level - b.charge.level).first().item;

		return chargedItem.castChargedSkillEx.apply(chargedItem, args);
	}

	return false;
};

Unit.prototype.getStatEx = function (id, subid) {
	let i, temp, rval, regex;

	switch (id) {
	case 555: //calculates all res, doesnt exists trough
	{ // Block scope due to the variable declaration
		// Get all res
		let allres = [this.getStatEx(39), this.getStatEx(41), this.getStatEx(43), this.getStatEx(45)];

		// What is the minimum of the 4?
		let min = Math.min.apply(null, allres);

		// Cap all res to the minimum amount of res
		allres = allres.map(res => res > min ? min : res);

		// Get it in local variables, its more easy to read
		let [fire, cold, light, psn] = allres;

		return fire === cold && cold === light && light === psn ? min : 0;
	}

	case 9: // Max mana
		rval = this.getStat(9);

		if (rval > 446) {
			return rval - 16777216; // Fix for negative values (Gull knife)
		}

		return rval;
	case 20: // toblock
		switch (this.classid) {
		case 328: // buckler
			return this.getStat(20);
		case 413: // preserved
		case 483: // mummified
		case 503: // minion
			return this.getStat(20) - 3;
		case 329: // small
		case 414: // zombie
		case 484: // fetish
		case 504: // hellspawn
			return this.getStat(20) - 5;
		case 331: // kite
		case 415: // unraveller
		case 485: // sexton
		case 505: // overseer
			return this.getStat(20) - 8;
		case 351: // spiked
		case 374: // deefender
		case 416: // gargoyle
		case 486: // cantor
		case 506: // succubus
		case 408: // targe
		case 478: // akaran t
			return this.getStat(20) - 10;
		case 330: // large
		case 375: // round
		case 417: // demon
		case 487: // hierophant
		case 507: // bloodlord
			return this.getStat(20) - 12;
		case 376: // scutum
			return this.getStat(20) - 14;
		case 409: // rondache
		case 479: // akaran r
			return this.getStat(20) - 15;
		case 333: // goth
		case 379: // ancient
			return this.getStat(20) - 16;
		case 397: // barbed
			return this.getStat(20) - 17;
		case 377: // dragon
			return this.getStat(20) - 18;
		case 502: // vortex
			return this.getStat(20) - 19;
		case 350: // bone
		case 396: // grim
		case 445: // luna
		case 467: // blade barr
		case 466: // troll
		case 410: // heraldic
		case 480: // protector
			return this.getStat(20) - 20;
		case 444: // heater
		case 447: // monarch
		case 411: // aerin
		case 481: // gilded
		case 501: // zakarum
			return this.getStat(20) - 22;
		case 332: // tower
		case 378: // pavise
		case 446: // hyperion
		case 448: // aegis
		case 449: // ward
			return this.getStat(20) - 24;
		case 412: // crown
		case 482: // royal
		case 500: // kurast
			return this.getStat(20) - 25;
		case 499: // sacred r
			return this.getStat(20) - 28;
		case 498: // sacred t
			return this.getStat(20) - 30;
		}

		break;
	case 21: // plusmindamage
	case 22: // plusmaxdamage
		if (subid === 1) {
			temp = this.getStat(-1);
			rval = 0;

			for (i = 0; i < temp.length; i += 1) {
				switch (temp[i][0]) {
				case id: // plus one handed dmg
				case id + 2: // plus two handed dmg
					// There are 2 occurrences of min/max if the item has +damage. Total damage is the sum of both.
					// First occurrence is +damage, second is base item damage.

					if (rval) { // First occurence stored, return if the second one exists
						return rval;
					}

					if (this.getStat(temp[i][0]) > 0 && this.getStat(temp[i][0]) > temp[i][2]) {
						rval = temp[i][2]; // Store the potential +dmg value
					}

					break;
				}
			}

			return 0;
		}

		break;
	case 31: // plusdefense
		if (subid === 0) {
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			switch (this.itemType) {
			case 58: // jewel
			case 82: // charms
			case 83:
			case 84:
				// defense is the same as plusdefense for these items
				return this.getStat(31);
			}

			if (!this.desc) {
				this.desc = this.description;
			}

			temp = this.desc.split("\n");
			regex = new RegExp("\\+\\d+ " + getLocaleString(3481).replace(/^\s+|\s+$/g, ""));

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(regex, "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		}

		break;
	case 57:
		if (subid === 1) {
			return Math.round(this.getStat(57) * this.getStat(59) / 256);
		}

		break;
	case 83: // itemaddclassskills
		if (subid === undefined) {
			for (i = 0; i < 7; i += 1) {
				if (this.getStat(83, i)) {
					return this.getStat(83, i);
				}
			}

			return 0;
		}

		break;
	case 188: // itemaddskilltab
		if (subid === undefined) {
			temp = [0, 1, 2, 8, 9, 10, 16, 17, 18, 24, 25, 26, 32, 33, 34, 40, 41, 42, 48, 49, 50];

			for (i = 0; i < temp.length; i += 1) {
				if (this.getStat(188, temp[i])) {
					return this.getStat(188, temp[i]);
				}
			}

			return 0;
		}

		break;
	case 195: // itemskillonattack
	case 196: // itemskillonkill
	case 197: // itemskillondeath
	case 198: // itemskillonhit
	case 199: // itemskillonlevelup
	case 201: // itemskillongethit
	case 204: // itemchargedskill
		if (subid === 1) {
			temp = this.getStat(-2);

			if (temp.hasOwnProperty(id)) {
				if (temp[id] instanceof Array) {
					for (i = 0; i < temp[id].length; i += 1) {
						if (temp[id][i] !== undefined && temp[id][i].skill !== undefined) { // fix reference to undefined property temp[id][i].skill.
							return temp[id][i].skill;
						}
					}
				} else {
					return temp[id].skill;
				}
			}

			return 0;
		}

		if (subid === 2) {
			temp = this.getStat(-2);

			if (temp.hasOwnProperty(id)) {
				if (temp[id] instanceof Array) {
					for (i = 0; i < temp[id].length; i += 1) {
						if (temp[id][i] !== undefined) {
							return temp[id][i].level;
						}
					}
				} else {
					return temp[id].level;
				}
			}

			return 0;
		}

		break;
	case 216: // itemhpperlevel (for example Fortitude with hp per lvl can be defined now with 1.5)
		return this.getStat(216) / 2048;
	}

	if (this.getFlag(0x04000000)) { // Runeword
		switch (id) {
		case 16: // enhanceddefense
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			this.desc === undefined && (this.desc = this.description);

			temp = !!this.desc ? this.desc.split("\n") : "";

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(getLocaleString(3520).replace(/^\s+|\s+$/g, ""), "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		case 18: // enhanceddamage
			if ([0, 1].indexOf(this.mode) < 0) {
				break;
			}

			this.desc === undefined && (this.desc = this.description);

			temp = !!this.desc ? this.desc.split("\n") : "";

			for (i = 0; i < temp.length; i += 1) {
				if (temp[i].match(getLocaleString(10038).replace(/^\s+|\s+$/g, ""), "i")) {
					return parseInt(temp[i].replace(/ÿc[0-9!"+<;.*]/, ""), 10);
				}
			}

			return 0;
		}
	}

	if (subid === undefined) {
		return this.getStat(id);
	}

	return this.getStat(id, subid);
};

// D2BS Improvements @Jaenster

/**
 * @description Polyfill for setTimeout, as the version of d2bs isnt thread safe
 * @author Jaenster
 */

(function (global, _original) {
	let __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
	}) : (function(o, m, k, k2) {
		if (k2 === undefined) k2 = k;
		o[k2] = m[k];
	}));
	let __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
		Object.defineProperty(o, "default", { enumerable: true, value: v });
	}) : function(o, v) {
		o.default = v;
	});
	let __importStar = (this && this.__importStar) || function (mod) {
		if (mod && mod.__esModule) return mod;
		let result = {};
		if (mod != null) for (let k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
		__setModuleDefault(result, mod);
		return result;
	};
	let Worker = __importStar(require("../../modules/Worker"));
	global._setTimeout = _original;
	/**
         * @param {function} cb
         * @param {number} time
         * @param args
         * @constructor
         */
	function Timer(cb, time, args) {
		let _this = this;
		if (time === void 0) { time = 0; }
		if (args === void 0) { args = []; }
		Timer.instances.push(this);
		Worker.runInBackground['__setTimeout__' + (Timer.counter++)] = (function (startTick) {
			return function () {
				let finished = getTickCount() - startTick >= time;
				if (finished) {
					let index = Timer.instances.indexOf(_this);
					// only if not removed from the time list
					if (index > -1) {
						Timer.instances.splice(index, 1);
						cb.apply(undefined, args);
					}
				}
				return !finished;
			};
		})(getTickCount());
	}
	Timer.instances = [];
	Timer.counter = 0;
	global.setTimeout = function (cb, time) {
		if (time === void 0) { time = 0; }
		let args = [];
		for (let _i = 2; _i < arguments.length; _i++) {
			args[_i - 2] = arguments[_i];
		}
		if (typeof cb === 'string') {
			console.debug('Warning: Do not use raw code @ setTimeout and does not support lexical scoping');
			cb = [].filter.constructor(cb);
		}
		if (typeof cb !== 'function') {
			throw new TypeError('setTimeout callback needs to be a function');
		}
		return new Timer(cb, time, args);
	};
	/**
         *
         * @param {Timer} timer
         */
	global.clearTimeout = function (timer) {
		let index = Timer.instances.indexOf(timer);
		if (index > -1) {
			Timer.instances.splice(index, 1);
		}
	};
	// getScript(true).name.toString() !== 'default.dbj' && setTimeout(function () {/* test code*/}, 1000)
})([].filter.constructor('return this')(), setTimeout);

if (!Object.setPrototypeOf) {
	// Only works in Chrome and FireFox, does not work in IE:
	Object.defineProperty(Object.prototype, 'setPrototypeOf', {
		value: function (obj, proto) {
			// @ts-ignore
			if (obj.__proto__) {
				// @ts-ignore
				obj.__proto__ = proto;
				return obj;
			} else {
				// If you want to return prototype of Object.create(null):
				let Fn = function () {
					for (let key in obj) {
						Object.defineProperty(this, key, {
							value: obj[key],
						});
					}
				};
				Fn.prototype = proto;
				return new Fn();
			}
		},
		enumerable: false,
	});
}

if (!Object.values) {
	Object.values = function (source) {
		return Object.keys(source).map(function (k) { return source[k]; });
	};
}

if (!Object.entries) {
	Object.entries = function (source) {
		return Object.keys(source).map(function (k) { return [k, source[k]]; });
	};
}

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is#polyfill
// @ts-ignore
if (!Object.is) {
	Object.defineProperty(Object, "is", {
		value: function (x, y) {
			// SameValue algorithm
			if (x === y) {
				// return true if x and y are not 0, OR
				// if x and y are both 0 of the same sign.
				// This checks for cases 1 and 2 above.
				return x !== 0 || 1 / x === 1 / y;
			} else {
				// return true if both x AND y evaluate to NaN.
				// The only possibility for a variable to not be strictly equal to itself
				// is when that variable evaluates to NaN (example: Number.NaN, 0/0, NaN).
				// This checks for case 3.
				// eslint-disable-next-line no-self-compare
				return x !== x && y !== y;
			}
		}
	});
}

// if (!Object.fromEntries) {
//   Object.defineProperty(Object, 'fromEntries', {
//     value: function (entries) {
//       if (!entries /*|| !entries[Symbol.iterator]*/) { throw new Error('Object.fromEntries() requires a single iterable argument'); }

//       const o = {};

//       Object.keys(entries).forEach((key) => {
//         const [k, v] = entries[key];

//         o[k] = v;
//       });

//       return o;
//     },
//   });
// }

// // filter an object
// Object.filter = function (obj, predicate) {
// 	return Object.fromEntries(Object.entries(obj).filter(predicate));
// };

// https://stackoverflow.com/questions/7837456/how-to-compare-arrays-in-javascript
if (!Array.prototype.equals) {
	// Warn if overriding existing method
	!!Array.prototype.equals && console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
	// attach the .equals method to Array's prototype to call it on any array
	Array.prototype.equals = function (array) {
		// if the other array is a falsy value, return
		if (!array) return false;

		// compare lengths - can save a lot of time
		if (this.length !== array.length) return false;

		// call basic sort method, (my addition as I don't care if its the same order just if it contains the same values)
		this.sort();
		array.sort();

		for (let i = 0, l = this.length; i < l; i++) {
			// Check if we have nested arrays
			if (this[i] instanceof Array && array[i] instanceof Array) {
				// recurse into the nested arrays
				if (!this[i].equals(array[i])) return false;
			} else if (this[i] !== array[i]) {
				// Warning - two different object instances will never be equal: {x:20} != {x:20}
				return false;
			}
		}
		return true;
	};
	// Hide method from for-in loops
	Object.defineProperty(Array.prototype, "equals", {enumerable: false});
}

/**
 * @description Returns boolean if we have all the runes given by itemInfo array
 * @param itemInfo: Array of rune classids -
 * @returns Boolean
 */
Unit.prototype.haveRunes = function (itemInfo = []) {
	if (this === undefined || this.type > 1) return false;
	if (!Array.isArray(itemInfo) || typeof itemInfo[0] !== "number") return false;
	let itemList = this.getItemsEx().filter(i => i.isInStorage && i.itemType === sdk.itemtype.Rune);
	if (!itemList.length || itemList.length < itemInfo.length) return false;
	let checkedGids = [];

	for (let i = 0; i < itemInfo.length; i++) {
		let rCheck = itemInfo[i];
		
		if (!itemList.some(i => {
			if (i.classid === rCheck && checkedGids.indexOf(i.gid) === -1) {
				checkedGids.push(i.gid);
				return true;
			}
			return false;
		})) {
			return false;
		}
	}

	return true;
};
