/**
*  @filename    assassin.StartBuild.js
*  @author      theBGuy
*  @desc        fire trap build for before respecOne
*
*/

let build = {
	caster: true,
	skillstab: sdk.skills.tabs.Traps,
	wantedskills: [sdk.skills.FireBlast, sdk.skills.WakeofFire],
	usefulskills: [sdk.skills.CloakofShadows, sdk.skills.ShadowWarrior],
	mercDiff: sdk.difficulty.Nightmare,
	mercAct: 2,
	mercAuraWanted: "Holy Freeze",
	stats: [
		["vitality", 35], ["energy", 35], ["strength", 33], ["dexterity", 33],
		["vitality", 50], ["strength", 46], ["dexterity", 46],
		["vitality", 70], ["strength", 50], ["dexterity", 50],
		["energy", 50], ["vitality", "all"]
	],
	skills: [
		[sdk.skills.FireBlast, 4, false],     // level 4
		[sdk.skills.ClawMastery, 1],          // level 5 (den)
		[sdk.skills.PsychicHammer, 1],        // level 6
		[sdk.skills.BurstofSpeed, 5],         // level 11
		[sdk.skills.WakeofFire, 1, false],    // level 12
		[sdk.skills.CloakofShadows, 1, true], // level 13
		[sdk.skills.WakeofFire, 10, false],   // level 24
		[sdk.skills.FireBlast, 6, false],     // level 26
		[sdk.skills.WakeofFire, 20, false],   // level 36
		[sdk.skills.FireBlast, 10],           // level 42
	],

	active: function () {
		return me.charlvl < Config.respecOne && !me.getSkill(sdk.skills.LightningSentry, sdk.skills.subindex.HardPoints);
	},
};
