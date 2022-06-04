/**
*  @filename    paladin.Start.js
*  @author      isid0re, theBGuy
*  @desc        Holy fire build for before respecOne, respecs at 19
*
*/
js_strict(true);

!isIncluded("SoloPlay/Functions/Globals.js") && include("SoloPlay/Functions/Globals.js");
SetUp.include();

let AutoBuildTemplate = {
	1:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.BeltColumn = ["hp", "hp", "hp", "hp"];
			SetUp.belt();
			Config.HPBuffer = 8;
			Config.AttackSkill = [0, 0, 0, 0, 0, 0, 0];
			Config.LowManaSkill = [0, 0];
		}
	},

	2:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.TownHP = me.hardcore ? 0 : 35;
			Config.AttackSkill = [-1, 0, sdk.skills.Might, 0, sdk.skills.Might, 0, 0];
			Config.LowManaSkill = [0, sdk.skills.Might];
		}
	},

	6:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.AttackSkill = [-1, 0, sdk.skills.HolyFire, 0, sdk.skills.HolyFire, 0, sdk.skills.Might];
		}
	},

	9:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			Config.BeltColumn = ["hp", "hp", "mp", "mp"];
			SetUp.belt();
			Config.HPBuffer = 2;
			Config.MPBuffer = 6;
			Config.AttackSkill = [-1, (me.getSkill(sdk.skills.Sacrifice, 0) ? sdk.skills.Sacrifice : 0), sdk.skills.HolyFire, 0, sdk.skills.HolyFire, 0, sdk.skills.Might];
		}
	},

	12:	{
		SkillPoints: [-1],
		StatPoints: [-1, -1, -1, -1, -1],
		Update: function () {
			if (me.getSkill(sdk.skills.Zeal, 0)) {
				Config.AttackSkill = [-1, sdk.skills.Zeal, sdk.skills.HolyFire, sdk.skills.Zeal, sdk.skills.HolyFire, 0, sdk.skills.Might];
			}
			Config.Charge = true;
		}
	},
};
