/**
*  @filename    Assassin.js
*  @author      theBGuy
*  @credit      isid0re
*  @desc        Config Settings for SoloPlay Assassin
*
*  @FinalBuild
*    To select your finalbuild:
*      1. Go into the D2BS console manager.
*      2. Select the Bots profile
*      3. In the info tag box enter one of the following choices:
*        Trapsin
*        Whirlsin
*      4. Save the profile and start
*/

function LoadConfig () {
	includeIfNotIncluded("SoloPlay/Functions/MiscOverrides.js");
	includeIfNotIncluded("SoloPlay/Functions/Globals.js");

	SetUp.include();

	/* Script */
	Scripts.SoloPlay = true;
	SetUp.config();

	/* Chicken configuration. */
	Config.LifeChicken = me.hardcore ? 45 : 10;
	Config.ManaChicken = 0;
	Config.MercChicken = 0;
	Config.TownHP = me.hardcore ? 0 : 35;
	Config.TownMP = 0;

	/* Potions configuration. */
	Config.UseHP = me.hardcore ? 90 : 75;
	Config.UseRejuvHP = me.hardcore ? 65 : 40;
	Config.UseMP = me.hardcore ? 75 : 55;
	Config.UseMercHP = 75;

	/* Belt configuration. */
	Config.BeltColumn = ["hp", "mp", "mp", "rv"];
	SetUp.belt();

	/* Pickit configuration. */
	Config.PickRange = 40;
	//	Config.PickitFiles.push("kolton.nip");
	//	Config.PickitFiles.push("LLD.nip");
	NTIP.addLine("[name] >= VexRune && [name] <= ZodRune");

	/* Gambling configuration. */
	Config.Gamble = true;
	Config.GambleGoldStart = 2000000;
	Config.GambleGoldStop = 750000;
	Config.GambleItems.push("Amulet");
	Config.GambleItems.push("Ring");
	//Config.GambleItems.push("Circlet");
	//Config.GambleItems.push("Coronet");

	/* AutoMule configuration. */
	Config.AutoMule.Trigger = [];
	Config.AutoMule.Force = [];
	Config.AutoMule.Exclude = [
		"[name] >= Elrune && [name] <= Lemrune",
	];

	/* AutoEquip configuration. */
	Config.AutoEquip = true;

	// AutoEquip setup
	const levelingTiers = [
		// Weapon
		"([type] == knife || [type] == sword && [flag] == runeword || ([type] == handtohand || [type] == assassinclaw) && [quality] >= magic) && [flag] != ethereal && [2handed] == 0 # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Helmet
		"([type] == helm || [type] == circlet) && ([quality] >= magic || [flag] == runeword) && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Belt
		"[type] == belt && [quality] >= magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		"me.normal && [type] == belt && [quality] >= lowquality && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Boots
		"[type] == boots && [quality] >= magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Srmor
		"[type] == armor && ([quality] >= magic || [flag] == runeword) && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Shield
		"[type] == shield && ([quality] >= magic || [flag] == runeword) && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Gloves
		"[type] == gloves && [quality] >= magic && [flag] != ethereal # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Amulet
		"[type] == amulet && [quality] >= magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Rings
		"[type] == ring && [quality] >= magic # [itemchargedskill] >= 0 # [tier] == tierscore(item)",
		// Switch
		"[type] == wand && [quality] >= normal # [itemchargedskill] == 91 # [secondarytier] == 50000 + chargeditemscore(item, 91)",	// Lower Resist charged wand
		// Charms
		"[name] == smallcharm && [quality] == magic # [maxhp] >= 1 # [invoquantity] == 2 && [charmtier] == charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [itemmagicbonus] >= 1 # [invoquantity] == 2 && [charmtier] == charmscore(item)",
		"[name] == smallcharm && [quality] == magic # # [invoquantity] == 2 && [charmtier] == charmscore(item)",
		"[name] == grandcharm && [quality] == magic # # [invoquantity] == 2 && [charmtier] == charmscore(item)",
		// Special Charms
		"[name] == smallcharm && [quality] == unique # [itemallskills] == 1 # [charmtier] == 100000",
		"[name] == largecharm && [quality] == unique # [itemaddclassskills] == 3 # [charmtier] == 100000",
		"[name] == grandcharm && [quality] == unique # [itemmagicbonus] >= 30 || [itemgoldbonus] >= 150 # [charmtier] == 100000",
		// Merc
		"([type] == circlet || [type] == helm) && ([quality] >= magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
		"[type] == armor && ([quality] >= magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
		// Rogue
		"me.mercid === 271 && [type] == bow && ([quality] >= magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
		// A2 Guard
		"me.mercid === 338 && ([type] == polearm || [type] == spear) && ([quality] >= magic || [flag] == runeword) # [itemchargedskill] >= 0 # [Merctier] == mercscore(item)",
	];

	NTIP.arrayLooping(levelingTiers);

	/* Attack configuration. */
	Config.AttackSkill = [0, 0, 0, 0, 0, 0, 0];
	Config.LowManaSkill = [0, 0];
	Config.MaxAttackCount = 1000;
	Config.BossPriority = me.normal;
	Config.ClearType = 0;
	Config.ClearPath = {Range: (Pather.canTeleport() ? 30 : 20), Spectype: 0};
	
	/* Class specific configuration. */
	Config.UseTraps = true;
	Config.Traps = [sdk.skills.LightningSentry, sdk.skills.LightningSentry, sdk.skills.LightningSentry, sdk.skills.DeathSentry, sdk.skills.DeathSentry];
	Config.BossTraps = [sdk.skills.LightningSentry, sdk.skills.LightningSentry, sdk.skills.LightningSentry, sdk.skills.LightningSentry, sdk.skills.LightningSentry];

	Config.SummonShadow = me.getSkill(sdk.skills.ShadowMaster, sdk.skills.subindex.HardPoints) ? "Master" : 0;
	Config.UseFade = !!me.getSkill(sdk.skills.Fade, sdk.skills.subindex.HardPoints);
	Config.UseBoS = !!me.getSkill(sdk.skills.BurstofSpeed, sdk.skills.subindex.HardPoints);
	Config.UseVenom = false;
	Config.UseCloakofShadows = !!me.getSkill(sdk.skills.CloakofShadows, sdk.skills.subindex.HardPoints);
	Config.AggressiveCloak = false;

	/* Dodge configuration. */
	Config.Dodge = !!me.getSkill(sdk.skills.LightningSentry, sdk.skills.subindex.HardPoints);
	Config.DodgeRange = 10;
	Config.DodgeHP = 75;

	/* Gear */
	let finalGear = Check.finalBuild().finalGear;
	!!finalGear && NTIP.arrayLooping(finalGear);

	Config.imbueables = [
		{name: sdk.items.Claws, condition: () => (me.normal)},
		{name: sdk.items.HandScythe, condition: () => (!me.normal && Item.getEquippedItem(sdk.body.RightArm).tier < 777 && (me.trueStr < 79 || me.trueDex < 79))},
		{name: sdk.items.GreaterTalons, condition: () => (Item.getEquippedItem(sdk.body.RightArm).tier < 777 && me.trueStr >= 79 && me.trueDex >= 79)},
		{name: sdk.items.Belt, condition: () => (me.normal && (Item.getEquippedItem(sdk.body.RightArm).tier > 777))},
		{name: sdk.items.MeshBelt, condition: () => (!me.normal && me.charlvl < 46 && me.trueStr > 58 && (Item.getEquippedItem(sdk.body.RightArm).tier > 777))},
		{name: sdk.items.SpiderwebSash, condition: () => (!me.normal && me.trueStr > 50 && (Item.getEquippedItem(sdk.body.RightArm).tier > 777))},
	].filter((item) => item.condition());

	let imbueArr = SetUp.imbueItems();

	!me.smith && NTIP.arrayLooping(imbueArr);

	Config.socketables = [];
	// basicSocketables located in Globals
	Config.socketables = Config.socketables.concat(basicSocketables.caster, basicSocketables.all);
	Config.socketables
		.push(
			{
				classid: sdk.items.Monarch,
				socketWith: [],
				useSocketQuest: true,
				condition: (item) => !me.hell && !Check.haveBase("monarch", 4) && item.ilvl >= 41 && item.isBaseType && !item.ethereal
			},
			{
				classid: sdk.items.Shako,
				socketWith: [sdk.items.runes.Um],
				temp: [sdk.items.gems.Perfect.Ruby],
				useSocketQuest: false,
				condition: (item) => item.unique && !item.ethereal
			}
		);

	switch (SetUp.finalBuild) {
	case "Whirlsin":
		Config.socketables
			.push(
				{
					classid: sdk.items.WingedHelm,
					socketWith: [sdk.items.runes.Um],
					temp: [sdk.items.gems.Perfect.Ruby],
					useSocketQuest: true,
					condition: (item) => item.set && !item.ethereal
				}
			);
		
		// Pride
		if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(sdk.body.RightArm).prefixnum !== sdk.locale.items.Pride) {
			includeIfNotIncluded("SoloPlay/BuildFiles/Runewords/MercPride.js");
		}

		// Chaos
		if (!me.checkItem({name: sdk.locale.items.Chaos}).have) {
			includeIfNotIncluded("SoloPlay/BuildFiles/Runewords/Chaos.js");
		}

		// Fury
		if (!me.checkItem({name: sdk.locale.items.Fury}).have) {
			includeIfNotIncluded("SoloPlay/BuildFiles/Runewords/Fury.js");
		}

		// Fortitude
		if ((me.ladder || Developer.addLadderRW) && !me.checkItem({name: sdk.locale.items.Fortitude, itemtype: sdk.items.type.Armor}).have) {
			includeIfNotIncluded("SoloPlay/BuildFiles/Runewords/Fortitude.js");
		}

		break;
	default:
		Config.socketables
			.push(
				{
					classid: sdk.items.Demonhead,
					socketWith: [sdk.items.runes.Um], // Ral vs Um ?
					temp: [sdk.items.gems.Perfect.Ruby],
					useSocketQuest: true,
					condition: (item) => item.unique && !item.ethereal
				}
			);
		
		// Infinity
		if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(sdk.body.RightArm).prefixnum !== sdk.locale.items.Infinity) {
			includeIfNotIncluded("SoloPlay/BuildFiles/Runewords/MercInfinity.js");
		}

		// Heart of the Oak
		if (!me.checkItem({name: sdk.locale.items.HeartoftheOak}).have) {
			includeIfNotIncluded("SoloPlay/BuildFiles/Runewords/HeartOfTheOak.js");
		}

		// Enigma
		if (!me.checkItem({name: sdk.locale.items.Enigma}).have) {
			includeIfNotIncluded("SoloPlay/BuildFiles/Runewords/Enigma.js");
		}

		break;
	}

	Check.itemSockables(sdk.items.RoundShield, "unique", "Moser's Blessed Circle");
	Check.itemSockables(sdk.items.Shako, "unique", "Harlequin Crest");

	/* Crafting */
	if (Item.getEquippedItem(sdk.body.Neck).tier < 100000) {
		Config.Recipes.push([Recipe.Caster.Amulet]);
	}

	if (Item.getEquippedItem(sdk.body.RingLeft).tier < 100000) {
		Config.Recipes.push([Recipe.Caster.Ring]);
	}

	// Call to Arms
	if (!me.checkItem({name: sdk.locale.items.CalltoArms}).have) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/CallToArms.js")) {
			include("SoloPlay/BuildFiles/Runewords/CallToArms.js");
		}
	}

	// Spirit Sword
	if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItem(sdk.body.RightArm).tier < 777) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/SpiritSword.js")) {
			include("SoloPlay/BuildFiles/Runewords/SpiritSword.js");
		}
	}

	// Spirit shield
	if ((me.ladder || Developer.addLadderRW) && (Item.getEquippedItem(sdk.body.LeftArm).tier < 1000 || Item.getEquippedItem(sdk.body.LeftArmSecondary).prefixnum !== sdk.locale.items.Spirit)) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/SpiritShield.js")) {
			include("SoloPlay/BuildFiles/Runewords/SpiritShield.js");
		}
	}

	// Merc Insight
	if ((me.ladder || Developer.addLadderRW) && Item.getEquippedItemMerc(sdk.body.RightArm).tier < 3600) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/MercInsight.js")) {
			include("SoloPlay/BuildFiles/Runewords/MercInsight.js");
		}
	}

	// Lore
	if (Item.getEquippedItem(sdk.body.Head).tier < 315) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/Lore.js")) {
			include("SoloPlay/BuildFiles/Runewords/Lore.js");
		}
	}

	// Ancients' Pledge
	if (Item.getEquippedItem(sdk.body.LeftArm).tier < 500) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/AncientsPledge.js")) {
			include("SoloPlay/BuildFiles/Runewords/AncientsPledge.js");
		}
	}

	// Merc Fortitude
	if (Item.getEquippedItemMerc(sdk.body.Armor).prefixnum !== sdk.locale.items.Fortitude) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/MercFortitude.js")) {
			include("SoloPlay/BuildFiles/Runewords/MercFortitude.js");
		}
	}

	// Merc Treachery
	if (Item.getEquippedItemMerc(sdk.body.Armor).tier < 15000) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/MercTreachery.js")) {
			include("SoloPlay/BuildFiles/Runewords/MercTreachery.js");
		}
	}

	// Smoke
	if (Item.getEquippedItem(sdk.body.Armor).tier < 450) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/Smoke.js")) {
			include("SoloPlay/BuildFiles/Runewords/Smoke.js");
		}
	}

	// Stealth
	if (Item.getEquippedItem(sdk.body.Armor).tier < 233) {
		if (!isIncluded("SoloPlay/BuildFiles/Runewords/Stealth.js")) {
			include("SoloPlay/BuildFiles/Runewords/Stealth.js");
		}
	}

	SoloWants.buildList();
}
