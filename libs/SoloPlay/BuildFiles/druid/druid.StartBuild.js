/**
*  @filename    druid.StartBuild.js
*  @author      isid0re, theBGuy
*  @desc        Fire elemental build for before respecOne
*
*/

let build = {
	AutoBuildTemplate: {},
	caster: true,
	skillstab: 42, // elemental
	wantedskills: [sdk.skills.Firestorm, sdk.skills.Fissure],
	usefulskills: [sdk.skills.MoltenBoulder],
	mercAuraName: "Blessed Aim",
	mercAuraWanted: 108,
	mercDiff: 0,
	stats: [
		["vitality", 70],
		["strength", 35],
		["energy", 85],
		["vitality", "all"]
	],
	skills: [
		[sdk.skills.PoisonCreeper, 2, false],
		[sdk.skills.Firestorm, 4, false],
		[sdk.skills.MoltenBoulder, 1],
		[sdk.skills.Firestorm, 7, false],
		[sdk.skills.Fissure, 1],
		[sdk.skills.CarrionVine, 1],
		[sdk.skills.Fissure, 8, false],
		[sdk.skills.Firestorm, 11, false],
		[sdk.skills.Fissure, 20, false],
		[sdk.skills.Firestorm, 18, false],
	],

	active: function () {
		return me.charlvl < CharInfo.respecOne && !me.checkSkill(sdk.skills.Tornado, sdk.skills.subindex.HardPoints);
	},
};

build.AutoBuildTemplate[1] = buildAutoBuildTempObj(() => {
	Config.TownHP = me.hardcore ? 0 : 35;
	Config.SkipImmune = ["fire"];
	Config.BeltColumn = me.charlvl < 7 ? ["hp", "hp", "hp", "mp"] : ["hp", "hp", "mp", "mp"];
	Config.HPBuffer = 4;
	Config.MPBuffer = 4;
	Config.AttackSkill = [-1, 0, 0, 0, 0, 0, 0];
	Config.LowManaSkill = [0, 0];
	Config.SummonVine = 1; // "Poison Creeper"
	if (me.checkSkill(sdk.skills.Firestorm, sdk.skills.subindex.HardPoints)) {
		Config.AttackSkill = [-1, sdk.skills.Firestorm, -1, sdk.skills.Firestorm, -1, 0, 0];
	} else {
		Config.AttackSkill = [-1, 0, 0, 0, 0, 0, 0];
	}
	SetUp.belt();
});

build.AutoBuildTemplate[12] = buildAutoBuildTempObj(() => {
	if (me.checkSkill(sdk.skills.Fissure, sdk.skills.subindex.HardPoints)) {
		Config.AttackSkill = [-1, sdk.skills.Fissure, sdk.skills.Firestorm, sdk.skills.Fissure, sdk.skills.Firestorm, 0, 0];
	}
});

build.AutoBuildTemplate[13] = buildAutoBuildTempObj(() => {
	if (Skill.canUse(sdk.skills.Fissure) && Skill.skills.all[sdk.skills.Fissure].hardpoints) {
		Config.AttackSkill = [-1, sdk.skills.Fissure, sdk.skills.Firestorm, sdk.skills.Fissure, sdk.skills.Firestorm, 0, 0];
	}
});
