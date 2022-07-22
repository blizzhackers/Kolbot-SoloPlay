/**
*  @filename    barbarian.js
*  @author      theBGuy
*  @desc        Barb specifics
*
*/

const CharInfo = {
	respecOne: me.expansion ? 30 : 30,
	respecTwo: me.expansion ? 74 : 74,
	levelCap: (function() {
		const currentDiff = sdk.difficulty.nameOf(me.diff);
		const softcoreMode = {
			"Normal": me.expansion ? 33 : 33,
			"Nightmare": me.expansion ? 75 : 75,
			"Hell": 100,
		};
		const hardcoreMode = {
			"Normal": me.expansion ? 33 : 33,
			"Nightmare": me.expansion ? 75 : 75,
			"Hell": 100,
		};

		return me.softcore ? softcoreMode[currentDiff] : hardcoreMode[currentDiff];
	})(),

	getActiveBuild: function () {
		const nSkills = me.getStat(sdk.stats.NewSkills);
		const currLevel = me.charlvl;
		const justRepeced = (nSkills >= currLevel);

		switch (true) {
		case currLevel < this.respecOne && !me.getSkill(sdk.skills.WarCry, sdk.skills.subindex.HardPoints):
			return "Start";
		case currLevel > this.respecOne && currLevel < this.respecTwo && justRepeced:
		case currLevel > this.respecOne && currLevel < this.respecTwo && me.getSkill(sdk.skills.NaturalResistance, sdk.skills.subindex.HardPoints) && !me.getSkill(sdk.skills.Berserk, sdk.skills.subindex.HardPoints):
			return "Stepping";
		case Check.finalBuild().respec() && justRepeced:
		case Check.finalBuild().active():
			return SetUp.finalBuild;
		default:
			return "Leveling";
		}
	},
};
