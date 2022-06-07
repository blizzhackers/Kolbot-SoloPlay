/**
*  @filename    barbarian.ImmortalwhirlBuild.js
*  @author      theBGuy
*  @desc        Immortal King Whirlwind based final build
*
*/

const finalBuild = {
	caster: false,
	skillstab: sdk.skills.tabs.CombatBarb,
	wantedskills: [sdk.skills.Bash, sdk.skills.Whirlwind],
	usefulskills: [sdk.skills.Howl, sdk.skills.Shout],
	precastSkills: [sdk.skills.BattleOrders, sdk.skills.WarCry], // Battle orders, War Cry
	mercDiff: sdk.difficulty.Nightmare,
	mercAct: 2,
	mercAuraWanted: "Might",
	stats: [
		["strength", 187], ["vitality", "all"]
	],
	skills: [
		[sdk.skills.MaceMastery, 20],
		[sdk.skills.Whirlwind, 20],
		[sdk.skills.Shout, 20],
		[sdk.skills.BattleCry, 1],
		[sdk.skills.BattleCommand, 1],
		[sdk.skills.NaturalResistance, 1],
		[sdk.skills.IncreasedSpeed, 1],
		[sdk.skills.BattleOrders, 20],
	],
	autoEquipTiers: [ // autoequip final gear
		// Weapon - IK Maul
		"[name] == ogremaul && [quality] == set # [enhanceddamage] >= 200 && [ias] >= 40 # [tier] == 110000",
		// Helmet - IK Helm
		"[name] == avengerguard && [quality] == set && [flag] != ethereal # [warcriesskilltab] == 2 # [tier] == 110000",
		// Belt - IK Belt
		"[name] == warbelt && [quality] == set && [flag] != ethereal # [strength] >= 25 && [fireresist] >= 28 # [tier] == 110000",
		// Boots - IK Boots
		"[name] == warboots && [quality] == set && [flag] != ethereal # [frw] >= 40 && [tohit] >= 110 # [tier] == 110000",
		// Armor - IK Armor
		"[name] == sacredarmor && [quality] == set && [flag] != ethereal # [barbcombatskilltab] == 2 # [tier] == 110000",
		// Gloves - IK Gauntlets
		"[name] == wargauntlets && [quality] == set && [flag] != ethereal # [strength] >= 20 && [dexterity] >= 20 # [tier] == 110000",
		// Amulet - Metalgrid
		"[type] == amulet && [quality] == unique # [defense] >= 300 # [tier] == 110000 + tierscore(item)",
		// Final Rings - Perfect Raven Frost & Bul-Kathos' Wedding Band
		"[type] == ring && [quality] == unique # [dexterity] == 20 && [tohit] == 250 # [tier] == # [tier] == 110000",
		"[type] == ring && [quality] == unique # [maxstamina] == 50 && [lifeleech] == 5 # [tier] == 110000",
		// Rings - Raven Frost && Bul-Kathos' Wedding Band
		"[type] == ring && [quality] == unique # [dexterity] >= 15 && [tohit] >= 150 # [tier] == # [tier] == 100000",
		"[type] == ring && [quality] == unique # [maxstamina] == 50 && [lifeleech] >= 3 # [tier] == 100000",
		// Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [masteriesskilltab] == 1 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == charmscore(item)",
		// Switch - BO sticks
		"([type] == club || [type] == sword || [type] == knife || [type] == throwingknife || [type] == mace) && ([quality] == magic || [flag] == runeword) && [2handed] == 0 # [itemallskills]+[warcriesskilltab]+[barbarianskills] >= 1 # [secondarytier] == 100000 + secondaryscore(item)",
		// Merc Armor - Fortitude
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",
		// Merc Final Helmet - Eth Andy's
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000 + mercscore(item)",
		// Merc Helmet - Andy's
		"[name] == demonhead && [quality] == unique && [flag] != ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 40000 + mercscore(item)",
	],

	AutoBuildTemplate: {
		1:	{
			Update: function () {
				Config.AttackSkill = [sdk.skills.BattleCry, sdk.skills.Whirlwind, -1, sdk.skills.Whirlwind, -1];
				Config.LowManaSkill = [0, -1];
				Config.BeltColumn = ["hp", "hp", "mp", "rv"];
				Config.MPBuffer = 2;
				Config.HPBuffer = 2;
			}
		},
	},

	respec: function () {
		if (me.classic) {
			return false;
		} else {
			return Check.haveItem("mace", "set", "Immortal King's Stone Crusher") && Check.haveItem("boots", "set", "Immortal King's Pillar") &&
				Check.haveItem("belt", "set", "Immortal King's Detail") && Check.haveItem("armor", "set", "Immortal King's Soul Cage") &&
				Check.haveItem("primalhelm", "set", "Immortal King's Will") && Check.haveItem("gloves", "set", "Immortal King's Forge");
		}
	},

	active: function () {
		return this.respec && me.getSkill(sdk.skills.MaceMastery, 0) === 20;
	},
};
