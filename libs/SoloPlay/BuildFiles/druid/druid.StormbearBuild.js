/**
*  @filename    druid.StormbearBuild.js
*  @author      theBGuy
*  @desc        CTC based bear final build - uses Destruction and Dragon RWs for chance to cast spells
*
*/

const finalBuild = {
	caster: false,
	skillstab: sdk.skills.tabs.ShapeShifting,
	wantedskills: [sdk.skills.Werebear, sdk.skills.Lycanthropy, sdk.skills.Maul],
	usefulskills: [sdk.skills.HeartofWolverine, sdk.skills.Grizzly, sdk.skills.Shockwave, sdk.skills.PoisonCreeper],
	precastSkills: [sdk.skills.Werebear, sdk.skills.HeartofWolverine, sdk.skills.Grizzly],
	usefulStats: [],
	mercDiff: sdk.difficulty.Nightmare,
	mercAct: 2,
	mercAuraWanted: "Might",
	stats: [
		["strength", 127], ["dexterity", 136], ["vitality", "all"]
	],
	skills: [
		[sdk.skills.Werebear, 20, false],
		[sdk.skills.Lycanthropy, 20, false],
		[sdk.skills.ShockWave, 1, false],
		[sdk.skills.Maul, 20, false],
		[sdk.skills.Grizzly, 20, false],
		[sdk.skills.HeartofWolverine, 20, false],
		[sdk.skills.PoisonCreeper, 20, false],
		[sdk.skills.Shockwave, 20, false],
	],

	// AutoEquip Final Gear
	autoEquipTiers: [
		// Weapon - Destruction
		"[name] == phaseblade && [flag] == runeword # [enhanceddamage] >= 350 && [itemdeadlystrike] == 20 && [itemcrushingblow] == 20 # [tier] == 110000",
		// Shield - Sanctuary
		"[name] == hyperion # [fhr] >= 20 && [enhanceddefense] >= 130 && [fireresist] >= 70 # [tier] == 110000",
		"[name] == hyperion # [fhr] >= 20 && [enhanceddefense] >= 130 && [fireresist] >= 50 # [tier] == 100000 + tierscore(item)",
		// Helmet - Jalal's Mane
		"[name] == totemicmask && [quality] == unique # [druidskills] == 2 && [shapeshiftingskilltab] == 2 # [tier] == 110000 + tierscore(item)",
		// Belt - Verdungo's
		"[name] == mithrilcoil && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 110000 + tierscore(item)",
		// Armor - Chains of Honor
		"[type] == armor && [flag] == runeword && [flag] != ethereal # [fireresist] == 65 && [hpregen] == 7 # [tier] == 110000",
		// Gloves - Dracul's Grasp
		"[name] == vampirebonegloves && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 110000 + tierscore(item)",
		// Boots - Gore Rider
		"[name] == warboots && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 160 # [tier] == 110000 + tierscore(item)",
		// Amulet - Metalgrid
		"[type] == amulet && [quality] == unique # [tohit] >= 400 && [coldresist] >= 25 # [tier] == 110000 + tierscore(item)",
		// Ring 1 - Ravenfrost
		"[type] == ring && [quality] == unique # [tohit] >= 180 && [dexterity] >= 15 # [tier] == 100000",
		// Ring 2 - Carrion Wind
		"[name] == ring && [quality] == unique # [poisonresist] == 55 && [lifeleech] >= 6 # [tier] == 110000 + tierscore(item)",
		// Merc
		// Final Armor - Fortitude
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",
		// Temporary Armor - Treachery
		"[type] == armor && [flag] == runeword # [ias] == 45 && [coldresist] == 30 # [merctier] == 50000 + mercscore(item)",
		// Final Helm - Eth Andy's
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000 + mercscore(item)",
		// Temporary Helm - Andy's
		"[name] == demonhead && [quality] == unique && [flag] != ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 40000 + mercscore(item)",
		// Final Weapon - Infinity
		"[type] == polearm && [flag] == runeword # [convictionaura] >= 13 # [merctier] == 100000 + mercscore(item)",
		// Temporary Weapon - Reaper's Toll
		"[name] == thresher && [quality] == unique # [enhanceddamage] >= 190 && [lifeleech] >= 11 # [merctier] == 50000 + mercscore(item)",
	],

	charms: {
		ResMf: {
			max: 2,
			have: [],
			classid: sdk.items.SmallCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid && check.allRes === 5 && check.getStat(sdk.stats.MagicBonus) === 7);
			}
		},

		Poison: {
			max: 6,
			have: [],
			classid: sdk.items.SmallCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid
					&& ((check.getStat(sdk.stats.PoisonLength) * check.getStat(sdk.stats.PoisonMaxDamage)) / 256) >= 141);
			}
		},

		Skiller: {
			max: 2,
			have: [],
			classid: sdk.items.GrandCharm,
			stats: function (check) {
				return (!check.unique && check.classid === this.classid && check.getStat(sdk.stats.AddSkillTab, sdk.skills.tabs.ShapeShifting) === 1
					&& check.getStat(sdk.stats.MaxHp) >= 40);
			}
		},
	},

	AutoBuildTemplate: {
		1:	{
			Update: function () {
				Config.BeltColumn = ["hp", "hp", "mp", "rv"];
				Config.AttackSkill = [
					sdk.skills.Maul,
					sdk.skills.Maul, sdk.skills.Shockwave,
					sdk.skills.Maul, sdk.skills.Shockwave,
					-1, -1
				];
				Config.LowManaSkill = [0, 0];
				Config.Wereform = "Werebear";
				Config.SummonAnimal = "Grizzly";
				Config.SummonSpirit = "Heart of Wolverine";
			}
		},
	},

	respec: function () {
		return me.haveAll([{name: sdk.locale.items.Destruction}, {name: sdk.locale.items.Dragon, itemtype: sdk.itemtype.Armor}]);
	},

	active: function () {
		return this.respec && me.getSkill(sdk.skills.Maul, sdk.skills.subindex.HardPoints) === 20;
	},
};
