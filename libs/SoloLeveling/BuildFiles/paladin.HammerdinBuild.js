/**
 *    @filename		paladin.HammerdinBuild.js
 *	  @author	  	isid0re
 *    @desc			paladin build for hammerdin.
 * 					skills based on https://www.diabloii.net/forums/threads/max-damage-hammerdin-guide-by-captain_bogus-repost.127596/
 */

var finalBuild = {
	caster: true,
	skillstab: 24, //combat
	wantedskills: [112, 113], // hammers, concentration
	usefulskills: [117, 108], // holy shield, blessed aim
	precastSkills: [117], // Holy shield
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["vitality", 60], ["dexterity", 30], ["strength", 27],
		["vitality", 91], ["dexterity", 44], ["strength", 30],
		["vitality", 96], ["dexterity", 59], ["strength", 60],
		["vitality", 109], ["dexterity", 77], ["strength", 89],
		["vitality", 137], ["dexterity", 89], ["strength", 103],
		["vitality", 173], ["dexterity", 103],
		["vitality", 208], ["dexterity", 118],
		["vitality", 243], ["dexterity", 133],
		["vitality", 279], ["dexterity", 147],
		["vitality", "all"]
	],
	skills: [
		[98, 1], // might
		[97, 1], // smite
		[99, 1], // prayer
		[101, 1], // holy bolt
		[104, 1], // defiance
		[107, 1], // charge
		[108, 1], // blessed aim
		[109, 1], // cleansing
		[108, 6], // blessed aim
		[112, 1], // blessed hammers
		[113, 1], // concentration
		[115, 1], // vigor
		[108, 7], // blessed aim
		[112, 2], // blessed hammers
		[113, 2], // concentration
		[115, 2], // vigor
		[112, 7], // blessed hammers
		[117, 1], // holy shield
		[120, 1], // mediation
		[112, 12], // blessed hammers
		[124, 1], // redemption
		[112, 20], // max hammers
		[113, 3], // level concentration
		[115, 3], // level vigor
		[113, 4], // level concentration
		[115, 4], // level vigor
		[113, 5], // level concentration
		[115, 5], // level vigor
		[113, 6], // level concentration
		[115, 6], // level vigor
		[113, 7], // level concentration
		[115, 7], // level vigor
		[113, 8], // level concentration
		[115, 8], // level vigor
		[113, 9], // level concentration
		[115, 9], // level vigor
		[113, 10], // level concentration
		[115, 10], // level vigor
		[113, 11], // level concentration
		[115, 11], // level vigor
		[113, 12], // level concentration
		[115, 12], // level vigor
		[113, 13], // level concentration
		[115, 13], // level vigor
		[113, 14], // level concentration
		[115, 14], // level vigor
		[113, 15], // level concentration
		[115, 15], // level vigor
		[113, 16], // level concentration
		[115, 16], // level vigor
		[113, 17], // level concentration
		[115, 17], // level vigor
		[113, 18], // level concentration
		[115, 18], // level vigor
		[113, 19], // level concentration
		[115, 19], // level vigor
		[113, 20], // max concentration
		[115, 20], // max vigor
		[108, 20], // max blessed aim
		[117, 20] // max holy shield
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[Type] == mace && [flag] == runeword # [fcr] == 40 # [tier] == 100000", // HotO
		//helmet
		"[name] == shako && [quality] == unique && [flag] != ethereal # [DamageResist] == 10 # [tier] == 100000 + tierscore(item)", // harlequin's crest
		//belt
		"[name] == spiderwebsash && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 90 # [tier] == 100000 + tierscore(item)", //arach's
		//boots
		"[name] == battleboots && [quality] == unique && [flag] != ethereal # [itemmagicbonus] >= 50 # [tier] == 5000 + tierscore(item)", //war traveler
		"[name] == scarabshellboots && [quality] == unique # [strength]+[vitality] >= 20 # [tier] == 100000 + tierscore(item)", //sandstorm treks
		//armor
		"[type] == armor && [flag] != ethereal && [flag] == runeword # [frw] >= 45 # [tier] == 100000", //Enigma
		//shield
		"[Name] == GildedShield && [Quality] == unique && [flag] != ethereal # [EnhancedDefense] >= 150 # [tier] == 50000 + tierscore(item)", //hoz
		"[name] == auricshields && [flag] == runeword # [fcr] >= 25 && [maxmana] >= 89 # [tier] == 100000 + tierscore(item)", // spirit
		//gloves
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [fcr] >= 20 # [tier] == 100000 + tierscore(item)",	//Magefist
		//ammy
		"[type] == amulet && [quality] == unique # [strength] == 5 && [coldresist] >= 30 # [tier] == 100000 + tierscore(item)", //maras
		//rings
		"[name] == ring && [quality] == unique # [maxhp] >= 40 && [magicdamagereduction] >= 12 # [tier] == 99000", // dwarfstar
		"[type] == ring && [quality] == unique # [dexterity] >= 20 # [tier] == 100000", //ravenfrost
		"[type] == ring && [quality] == unique # [itemmaxmanapercent] == 25 # [tier] == 100000", //soj
		//Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [palicombatskilltab] == 1 # [invoquantity] == 2 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		//Switch
		"[name] == crystalsword && [flag] == runeword # [plusskillbattleorders] >= 1 # [secondarytier] == 100000",
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	//Fortitude
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000",	//Eth Andy's
	]
};
