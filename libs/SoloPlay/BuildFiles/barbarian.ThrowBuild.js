/**
*  @filename    barbarian.ThrowBuild.js
*  @author      theBGuy
*  @desc        Double throw based final build
*
*/

const finalBuild = {
	caster: false,
	skillstab: sdk.skills.tabs.BarbCombat,
	wantedskills: [sdk.skills.BattleOrders, sdk.skills.DoubleThrow, sdk.skills.DoubleSwing],
	usefulskills: [sdk.skills.NaturalResistance, sdk.skills.IronSkin, sdk.skills.IncreasedSpeed],
	precastSkills: [sdk.skills.BattleOrders, sdk.skills.BattleCommand],
	mercDiff: sdk.difficulty.Nightmare,
	mercAct: 2,
	mercAuraWanted: "Holy Freeze",
	stats: [
		["strength", 103], ["dexterity", 79], ["vitality", 90],
		["dexterity", 136], ["strength", 150], ["vitality", "all"],
	],
	skills: [
		[sdk.skills.DoubleThrow, 20],
		[sdk.skills.Howl, 9],
		[sdk.skills.BattleOrders, 20],
		[sdk.skills.BattleCommand, 1],
		[sdk.skills.ThrowMastery, 20],
		[sdk.skills.NaturalResistance, 1],
		[sdk.skills.NaturalResistance, 1],
		[sdk.skills.DoubleSwing, 20],
		[sdk.skills.Frenzy, 1],
		[sdk.skills.Berserk, 1],
	],
	autoEquipTiers: [ // autoequip final gear
		// Weapon
		"[name] == wingedaxe && [quality] == unique && [flag] == ethereal # [ias] == 30 && [enhanceddamage] >= 150 # [tier] == 100000", // Eth Lacerator
		"[name] == wingedknife && [quality] == unique && [flag] == ethereal # [ias] == 30 && [enhanceddamage] >= 200 # [tier] == 100000", // Eth Warshrike
		// Helmet
		"[name] == slayerguard && [quality] == unique && [flag] != ethereal # [barbarianskills] == 2 # [tier] == 100000", // Arreat's Face
		// Belt
		"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100000", // Arach's
		// Boots
		"[name] == warboots && [quality] == set && [flag] != ethereal # [frw] >= 40 && [tohit] >= 110 # [tier] == 110000", // IK Boots
		// Armor
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [itemallskills] == 2 # [tier] == 100000", // Enigma
		// Gloves
		"[name] == bramblemitts && [quality] == set && [flag] != ethereal # [ias] == 20 # [tier] == 100000", // Laying of Hands
		// Amulet
		"[type] == amulet && [quality] == unique # [lightresist] == 35 # [tier] == 100000", // Highlords
		// Rings
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000", // Raven Frost
		"[type] == ring && [quality] == unique # [lifeleech] >= 5 && [maxstamina] == 50 # [tier] == 100000", // Bul-Kathos' Wedding Band
		// Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 4 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 4 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [masteriesskilltab] == 1 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [barbcombatskilltab] == 1 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		// Switch
		"([type] == club || [type] == sword || [type] == knife || [type] == throwingknife || [type] == mace) && ([quality] == magic || [flag] == runeword) && [2handed] == 0 # [itemallskills]+[warcriesskilltab]+[barbarianskills] >= 1 # [secondarytier] == 100000 + secondaryscore(item)",
		// Merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	// Fortitude
		"[name] == demonhead && [quality] == unique && [flag] != ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 40000 + mercscore(item)",	// Andy's
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000 + mercscore(item)",	// Eth Andy's
	],

	AutoBuildTemplate: {
		1:	{
			Update: function () {
				Config.AttackSkill = [-1, sdk.skills.DoubleThrow, sdk.skills.Frenzy, sdk.skills.DoubleThrow, sdk.skills.Berserk];
				Config.LowManaSkill = [sdk.skills.DoubleSwing, sdk.skills.DoubleSwing];
				Config.BeltColumn = ["hp", "hp", "mp", "rv"];
			}
		},
	},

	respec: function () {
		if (me.classic) {
			return false;
		} else {
			return Check.haveItem("throwingknife", "unique", "Warshrike") && Check.haveItem("throwingaxe", "unique", "Lacerator");
		}
	},

	active: function () {
		return this.respec && me.getSkill(sdk.skills.DoubleThrow, 0) === 20;
	},
};
