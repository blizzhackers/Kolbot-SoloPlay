/**
*  @filename    assassin.WhirlsinBuild.js
*  @author      theBGuy
*  @desc        Whirlwind based final build - uses Chaos runeword
*
*/

const finalBuild = {
	caster: false,
	skillstab: sdk.skills.tabs.ShadowDisciplines,
	wantedskills: [sdk.skills.FireBlast, sdk.skills.LightningSentry, sdk.skills.DeathSentry, sdk.skills.ShadowMaster],
	usefulskills: [sdk.skills.ChargedBoltSentry, sdk.skills.BladeShield, sdk.skills.Fade],
	precastSkills: [sdk.skills.Fade, sdk.skills.ShadowMaster],
	mercDiff: sdk.difficulty.Nightmare,
	mercAct: 2,
	mercAuraWanted: "Holy Freeze",
	stats: [
		["strength", 130], ["dexterity", 99], ["vitality", "all"]
	],
	skills: [
		[sdk.skills.CloakofShadows, 1],
		[sdk.skills.ShadowMaster, 1],
		[sdk.skills.Fade, 1],
		[sdk.skills.Venom, 1],
		[sdk.skills.MindBlast, 1],
		[sdk.skills.BladeShield, 1],
		[sdk.skills.ClawMastery, 20],
		[sdk.skills.DeathSentry, 1],
		[sdk.skills.ShadowMaster, 20, false],
		[sdk.skills.Venom, 20, false],
		[sdk.skills.Fade, 20, false],
		[sdk.skills.BladeShield, 20],
	],
	autoEquipTiers: [ // autoequip final gear
		// Weapon
		"[type] == assassinclaw && [flag] == runeword # [plusskillwhirlwind] == 1 # [tier] == 100000", // Chaos Claw
		"[type] == assassinclaw && [flag] == runeword # [itemallskills] == 2 && [ias] == 40 && [itemdeadlystrike] == 33 # [tier] == 200000", // Fury
		// Helmet
		"[name] == wingedhelm && [quality] == set && [flag] != ethereal # [fhr] >= 30 # [tier] == 100000 + tierscore(item)", // GFace
		// Belt
		"[name] == mithrilcoil && [quality] == unique && [flag] != ethereal # [damageresist] == 15 # [tier] == 110000 + tierscore(item)", // Verdungos
		// Boots
		"[name] == warboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 110000 + tierscore(item)", // Gore Rider
		// Armor
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [tier] == 100000",	// Fortitude
		// Gloves
		"[name] == heavybracers && [quality] == set && [flag] != ethereal # [fcr] == 20 # [tier] == 100000", // Trang-Ouls
		// Amulet
		"[type] == amulet && [quality] == unique # [lightresist] == 35 # [tier] == 100000", // Highlords
		// Rings
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000", // Raven Frost
		"[type] == ring && [quality] == unique # [lifeleech] >= 5 && [maxstamina] == 50 # [tier] == 100000", // Bul-Kathos' Wedding Band
		// Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [maxhp] == 20 && [maxmana] == 17 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [trapsskilltab] == 1 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		// Switch
		"[minimumsockets] >= 5 && [flag] == runeword # [plusskillbattleorders] >= 1 # [secondarytier] == 100000",
		"[type] == shield # [itemallskills] >= 1 # [secondarytier] == 50000 + tierscore(item)", // Any 1+ all skill shield
		"[name] == monarch && [flag] == runeword # [fcr] >= 25 && [maxmana] >= 89 # [secondarytier] == 110000", // Spirit
		// Merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	// Fortitude
		"[name] == demonhead && [quality] == unique && [flag] != ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 40000 + mercscore(item)",	// Andy's
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000 + mercscore(item)",	// Eth Andy's
	],

	AutoBuildTemplate: {
		1:	{
			Update: function () {
				Config.Dodge = false;
				Config.UseVenom = true;
				Config.UseTraps = true;
				Config.AttackSkill = [-1, sdk.skills.Whirlwind, -1, sdk.skills.Whirlwind, -1, -1, -1];
				Config.Traps = [sdk.skills.DeathSentry, sdk.skills.DeathSentry, sdk.skills.DeathSentry, sdk.skills.DeathSentry, sdk.skills.DeathSentry];
				Config.BossTraps = [-1, -1, -1, -1, -1];
			}
		},
	},

	respec: function () {
		return Check.haveItem("assassinclaw", "runeword", "Chaos") && Check.haveItem("assassinclaw", "runeword", "Fury");
	},

	active: function () {
		return this.respec && me.getSkill(sdk.skills.ClawMastery, 0) === 20;
	},
};
