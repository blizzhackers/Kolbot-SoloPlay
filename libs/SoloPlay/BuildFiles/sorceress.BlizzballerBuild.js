/**
*  @filename    Sorceress.BlizzballerBuild.js
*  @author      isid0re, theBGuy
*  @desc        Blizzard + Fireball based final build
*
*/

const finalBuild = {
	caster: true,
	skillstab: sdk.skills.tabs.Cold,
	wantedskills: [sdk.skills.Blizzard, sdk.skills.FireBall, sdk.skills.ColdMastery],
	usefulskills: [sdk.skills.GlacialSpike, sdk.skills.Meteor, sdk.skills.FireMastery, sdk.skills.StaticField],
	precastSkills: [sdk.skills.FrozenArmor],
	usefulStats: [sdk.stats.PassiveColdPierce, sdk.stats.PassiveColdMastery, sdk.stats.PassiveFireMastery, sdk.stats.PassiveFirePierce],
	mercDiff: sdk.difficulty.Nightmare,
	mercAct: 2,
	mercAuraWanted: "Holy Freeze",
	stats: [
		["energy", 50], ["strength", 48], ["vitality", 165],
		["strength", 61], ["vitality", 252], ["strength", 127],
		["dexterity", "block"], ["vitality", "all"]
	],
	skills: [
		[sdk.skills.FireBolt, 1],
		[sdk.skills.Warmth, 1],
		[sdk.skills.FrozenArmor, 1],
		[sdk.skills.IceBolt, 1],
		[sdk.skills.IceBlast, 1],
		[sdk.skills.StaticField, 1],
		[sdk.skills.Telekinesis, 1],
		[sdk.skills.Inferno, 1],
		[sdk.skills.Blaze, 1],
		[sdk.skills.FrostNova, 1],
		[sdk.skills.FireBall, 7],
		[sdk.skills.Teleport, 1],
		[sdk.skills.GlacialSpike, 1],
		[sdk.skills.FireWall, 1],
		[sdk.skills.FireBall, 15],
		[sdk.skills.Blizzard, 1],
		[sdk.skills.Meteor, 1],
		[sdk.skills.FireMastery, 1, false],
		[sdk.skills.ColdMastery, 1, false],
		[sdk.skills.FireBall, 20],
		[sdk.skills.Blizzard, 20],
		[sdk.skills.GlacialSpike, 20],
		[sdk.skills.Meteor, 20],
		[sdk.skills.ColdMastery, 5],
		[sdk.skills.FireBolt, 20],
	],
	autoEquipTiers: [ // autoequip final gear
		// Weapon
		"[name] == swirlingcrystal && [quality] == set && [flag] != ethereal # [skilllightningmastery]+[skillfiremastery]+[skillcoldmastery] >= 3 # [tier] == 100000 + tierscore(item)", // Tals Orb
		// Helmet
		"[name] == deathmask && [quality] == set && [flag] != ethereal # [coldresist]+[lightresist]+[fireresist]+[poisonresist] >= 60 # [tier] == 100000 + tierscore(item)", // Tals Mask
		// Belt
		"[name] == meshbelt && [quality] == set && [flag] != ethereal # [itemmagicbonus] >= 10 # [tier] == 100000 + tierscore(item)", // Tals Belt
		// Boots
		"[name] == battleboots && [quality] == unique && [flag] != ethereal # [itemmagicbonus] >= 50 # [tier] == 5000 + tierscore(item)", // War Traveler
		"[name] == scarabshellboots && [quality] == unique # [strength]+[vitality] >= 20 # [tier] == 100000 + tierscore(item)", // Sandstorm Treks
		// Armor
		"[name] == lacqueredplate && [quality] == set # [coldresist] >= 1 # [tier] == 100000", // Tals Armor
		// Shield
		"[name] == roundshield && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 180 # [tier] == 50000 + tierscore(item)", // Mosers
		"[name] == hyperion && [flag] == runeword # [fhr] >= 20 && [enhanceddefense] >= 130 && [fireresist] >= 50 # [tier] == 100000", // Sanctuary
		// Gloves
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 20 && [addfireskills] == 1 # [tier] == 100000 + tierscore(item)",		// Magefist
		"[name] == battlegauntlets && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 20 && [addfireskills] == 1 # [tier] == 100000 + tierscore(item)",	// Upp'ed Magefist
		"[name] == battlegauntlets && [quality] == unique && [flag] != ethereal # [enhanceddefense] == 30 && [addfireskills] == 1 # [tier] == 110000",	// Perfect Upp'ed Magefist
		// Amulet
		"[name] == amulet && [quality] == set # [lightresist] == 33 # [tier] == 100000", // Tals Ammy
		// Rings
		"[type] == ring && [quality] == unique # [dexterity] >= 20 # [tier] == 100000", // Raven Frost
		"[type] == ring && [quality] == unique # [itemmagicbonus] >= 30 # [tier] == 100000", // Nagelring
		// Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [coldskilltab] == 1 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [fireskilltab] == 1 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		// Switch
		"[minimumsockets] >= 5 && [flag] == runeword # [plusskillbattleorders] >= 1 # [secondarytier] == 100000",
		"[type] == shield # [itemallskills] >= 1 # [secondarytier] == 100000 + tierscore(item)", // Any 1+ all skill shield
		// Merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	// Fortitude
		"[name] == demonhead && [quality] == unique && [flag] != ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 40000 + mercscore(item)",	// Andy's
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000 + mercscore(item)",	// Eth Andy's
	],

	AutoBuildTemplate: {
		1:	{
			Update: function () {
				Config.AttackSkill = [-1, sdk.skills.Blizzard, sdk.skills.FireBall, sdk.skills.Blizzard, sdk.skills.FireBall, sdk.skills.Meteor, sdk.skills.GlacialSpike];
				Config.LowManaSkill = [-1, -1];
				Config.SkipImmune = ["fire and cold"];
				Config.HPBuffer = me.expansion ? 1 : 5;
				Config.MPBuffer = me.expansion ? 1 : 5;
			}
		},
	},

	respec: function () {
		if (me.classic) {
			return me.charlvl >= 75 && me.diablo;
		} else {
			return Check.haveItem("amulet", "set", "Tal Rasha's Adjudication") && Check.haveItem("belt", "set", "Tal Rasha's Fine-Spun Cloth") &&
				Check.haveItem("armor", "set", "Tal Rasha's Guardianship") && Check.haveItem("swirlingcrystal", "set", "Tal Rasha's Lidless Eye");
		}
	},

	active: function () {
		return this.respec && me.getSkill(sdk.skills.FireBall, 0) === 20 && me.getSkill(sdk.skills.Blizzard, 0) === 20;
	},
};
