/**
*  @filename    CubingOverrides.js
*  @author      theBGuy
*  @desc        Cubing improvments
*
*/

!isIncluded("common/Cubing.js") && include("common/Cubing.js");

Recipe.Reroll.Charm = 56;
Recipe.Socket.LowMagic = 57;
Recipe.Socket.HighMagic = 58;
Recipe.Socket.Rare = 59;

Cubing.buildRecipes = function () {
	this.recipes = [];

	for (let i = 0; i < Config.Recipes.length; i += 1) {
		if (typeof Config.Recipes[i] !== "object" || (Config.Recipes[i].length > 2 && typeof Config.Recipes[i][2] !== "number") || Config.Recipes[i].length < 1) {
			throw new Error("Cubing.buildRecipes: Invalid recipe format.");
		}

		switch (Config.Recipes[i][0]) {
		case Recipe.Gem:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], Config.Recipes[i][1], Config.Recipes[i][1]], Index: Recipe.Gem, AlwaysEnabled: true});

			break;
		// Crafting Recipes----------------------------------------------------------------------------------------------------------------------------------//
		case Recipe.HitPower.Helm:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 615, 643, 571], Level: 84, Index: Recipe.HitPower.Helm});

			break;
		case Recipe.HitPower.Boots:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 617, 643, 571], Level: 71, Index: Recipe.HitPower.Boots});

			break;
		case Recipe.HitPower.Gloves:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 618, 643, 571], Level: 79, Index: Recipe.HitPower.Gloves});

			break;
		case Recipe.HitPower.Belt:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 616, 643, 571], Level: 71, Index: Recipe.HitPower.Belt});

			break;
		case Recipe.HitPower.Shield:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 614, 643, 571], Level: 82, Index: Recipe.HitPower.Shield});

			break;
		case Recipe.HitPower.Body:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 613, 643, 571], Level: 85, Index: Recipe.HitPower.Body});

			break;
		case Recipe.HitPower.Amulet:
			this.recipes.push({Ingredients: [520, 619, 643, 571], Level: 90, Index: Recipe.HitPower.Amulet});

			break;
		case Recipe.HitPower.Ring:
			this.recipes.push({Ingredients: [522, 620, 643, 571], Level: 77, Index: Recipe.HitPower.Ring});

			break;
		case Recipe.HitPower.Weapon:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 612, 643, 571], Level: 85, Index: Recipe.HitPower.Weapon});

			break;
		case Recipe.Blood.Helm:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 617, 643, 581], Level: 84, Index: Recipe.Blood.Helm});

			break;
		case Recipe.Blood.Boots:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 614, 643, 581], Level: 71, Index: Recipe.Blood.Boots});

			break;
		case Recipe.Blood.Gloves:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 613, 643, 581], Level: 79, Index: Recipe.Blood.Gloves});

			break;
		case Recipe.Blood.Belt:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 616, 643, 581], Level: 71, Index: Recipe.Blood.Belt});

			break;
		case Recipe.Blood.Shield:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 615, 643, 581], Level: 82, Index: Recipe.Blood.Shield});

			break;
		case Recipe.Blood.Body:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 619, 643, 581], Level: 85, Index: Recipe.Blood.Body});

			break;
		case Recipe.Blood.Amulet:
			this.recipes.push({Ingredients: [520, 620, 643, 581], Level: 90, Index: Recipe.Blood.Amulet});

			break;
		case Recipe.Blood.Ring:
			this.recipes.push({Ingredients: [522, 621, 643, 581], Level: 77, Index: Recipe.Blood.Ring});

			break;
		case Recipe.Blood.Weapon:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 618, 643, 581], Level: 85, Index: Recipe.Blood.Weapon});

			break;
		case Recipe.Caster.Helm:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 613, 643, 561], Level: 84, Index: Recipe.Caster.Helm});

			break;
		case Recipe.Caster.Boots:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 619, 643, 561], Level: 71, Index: Recipe.Caster.Boots});

			break;
		case Recipe.Caster.Gloves:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 618, 643, 561], Level: 79, Index: Recipe.Caster.Gloves});

			break;
		case Recipe.Caster.Belt:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 615, 643, 561], Level: 71, Index: Recipe.Caster.Belt});

			break;
		case Recipe.Caster.Shield:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 614, 643, 561], Level: 82, Index: Recipe.Caster.Shield});

			break;
		case Recipe.Caster.Body:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 616, 643, 561], Level: 85, Index: Recipe.Caster.Body});

			break;
		case Recipe.Caster.Amulet:
			this.recipes.push({Ingredients: [520, 617, 643, 561], Level: 90, Index: Recipe.Caster.Amulet});

			break;
		case Recipe.Caster.Ring:
			this.recipes.push({Ingredients: [522, 620, 643, 561], Level: 77, Index: Recipe.Caster.Ring});

			break;
		case Recipe.Caster.Weapon:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 612, 643, 561], Level: 85, Index: Recipe.Caster.Weapon});

			break;
		case Recipe.Safety.Helm:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 615, 643, 576], Level: 84, Index: Recipe.Safety.Helm});

			break;
		case Recipe.Safety.Boots:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 618, 643, 576], Level: 71, Index: Recipe.Safety.Boots});

			break;
		case Recipe.Safety.Gloves:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 617, 643, 576], Level: 79, Index: Recipe.Safety.Gloves});

			break;
		case Recipe.Safety.Belt:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 616, 643, 576], Level: 71, Index: Recipe.Safety.Belt});

			break;
		case Recipe.Safety.Shield:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 613, 643, 576], Level: 82, Index: Recipe.Safety.Shield});

			break;
		case Recipe.Safety.Body:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 614, 643, 576], Level: 85, Index: Recipe.Safety.Body});

			break;
		case Recipe.Safety.Amulet:
			this.recipes.push({Ingredients: [520, 619, 643, 576], Level: 90, Index: Recipe.Safety.Amulet});

			break;
		case Recipe.Safety.Ring:
			this.recipes.push({Ingredients: [522, 620, 643, 576], Level: 77, Index: Recipe.Safety.Ring});

			break;
		case Recipe.Safety.Weapon:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 621, 643, 576], Level: 85, Index: Recipe.Safety.Weapon});

			break;
		// Upgrading Recipes----------------------------------------------------------------------------------------------------------------------------------//
		case Recipe.Unique.Weapon.ToExceptional:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 617, 621, 576], Index: Recipe.Unique.Weapon.ToExceptional, Ethereal: Config.Recipes[i][2], Name: Config.Recipes[i][3]});

			break;
		case Recipe.Unique.Weapon.ToElite: // Ladder only
			if (me.ladder || Developer.addLadderRW) {
				this.recipes.push({Ingredients: [Config.Recipes[i][1], 626, 630, 576], Index: Recipe.Unique.Weapon.ToElite, Ethereal: Config.Recipes[i][2], Name: Config.Recipes[i][3]});
			}

			break;
		case Recipe.Unique.Armor.ToExceptional:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 616, 622, 586], Index: Recipe.Unique.Armor.ToExceptional, Ethereal: Config.Recipes[i][2], Name: Config.Recipes[i][3]});

			break;
		case Recipe.Unique.Armor.ToElite: // Ladder only
			if (me.ladder || Developer.addLadderRW) {
				this.recipes.push({Ingredients: [Config.Recipes[i][1], 629, 627, 586], Index: Recipe.Unique.Armor.ToElite, Ethereal: Config.Recipes[i][2], Name: Config.Recipes[i][3]});
			}

			break;
		case Recipe.Rare.Weapon.ToExceptional:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 618, 620, 571], Index: Recipe.Rare.Weapon.ToExceptional, Ethereal: Config.Recipes[i][2], stats: Config.Recipes[i][3]});

			break;
		case Recipe.Rare.Weapon.ToElite:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 628, 631, 571], Index: Recipe.Rare.Weapon.ToElite, Ethereal: Config.Recipes[i][2], stats: Config.Recipes[i][3]});

			break;
		case Recipe.Rare.Armor.ToExceptional:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 617, 619, 561], Index: Recipe.Rare.Armor.ToExceptional, Ethereal: Config.Recipes[i][2], stats: Config.Recipes[i][3]});

			break;
		case Recipe.Rare.Armor.ToElite:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 627, 630, 561], Index: Recipe.Rare.Armor.ToElite, Ethereal: Config.Recipes[i][2], stats: Config.Recipes[i][3]});

			break;
		// Socketing Recipes----------------------------------------------------------------------------------------------------------------------------------//
		case Recipe.Socket.Shield:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 616, 620, 581], Index: Recipe.Socket.Shield, Ethereal: Config.Recipes[i][2]});

			break;
		case Recipe.Socket.Weapon:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 617, 620, 561], Index: Recipe.Socket.Weapon, Ethereal: Config.Recipes[i][2]});

			break;
		case Recipe.Socket.Armor:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 616, 619, 566], Index: Recipe.Socket.Armor, Ethereal: Config.Recipes[i][2]});

			break;
		case Recipe.Socket.Helm:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 617, 619, 571], Index: Recipe.Socket.Helm, Ethereal: Config.Recipes[i][2]});

			break;
		case Recipe.Socket.LowMagic:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], "cgem", "cgem", "cgem"], Level: 25, Index: Recipe.Socket.LowMagic});

			break;
		case Recipe.Socket.HighMagic:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], "fgem", "fgem", "fgem"], Level: 30, Index: Recipe.Socket.HighMagic});

			break;
		case Recipe.Socket.Rare:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], sdk.items.Ring, sdk.items.gems.Perfect.Skull, sdk.items.gems.Perfect.Skull, sdk.items.gems.Perfect.Skull], Index: Recipe.Socket.Rare});

			break;
		// Re-rolling Recipes----------------------------------------------------------------------------------------------------------------------------------//
		case Recipe.Reroll.Magic: // Hacky solution ftw
			this.recipes.push({Ingredients: [Config.Recipes[i][1], "pgem", "pgem", "pgem"], Level: 91, Index: Recipe.Reroll.Magic});

			break;
		case Recipe.Reroll.Charm:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], "pgem", "pgem", "pgem"], Level: {"cm1": 95, "cm2": 91, "cm3": 91}, Index: Recipe.Reroll.Charm});

			break;
		case Recipe.Reroll.Rare:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 601, 601, 601, 601, 601, 601], Index: Recipe.Reroll.Rare});

			break;
		case Recipe.Reroll.HighRare:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 601, 522], Index: Recipe.Reroll.HighRare, Enabled: false});

			break;
		case Recipe.LowToNorm.Weapon:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 611, "cgem"], Index: Recipe.LowToNorm.Weapon});

			break;
		case Recipe.LowToNorm.Armor:
			this.recipes.push({Ingredients: [Config.Recipes[i][1], 610, "cgem"], Index: Recipe.LowToNorm.Armor});

			break;
		// Rune Recipes----------------------------------------------------------------------------------------------------------------------------------//
		case Recipe.Rune:
			switch (Config.Recipes[i][1]) {
			case 610: // el
			case 611: // eld
			case 612: // tir
			case 613: // nef
			case 614: // eth
			case 615: // ith
			case 616: // tal
			case 617: // ral
			case 618: // ort
				this.recipes.push({Ingredients: [Config.Recipes[i][1], Config.Recipes[i][1], Config.Recipes[i][1]], Index: Recipe.Rune, AlwaysEnabled: true});

				break;
			case 619: // thul->amn
				this.recipes.push({Ingredients: [619, 619, 619, 562], Index: Recipe.Rune});

				break;
			case 620: // amn->sol
				this.recipes.push({Ingredients: [620, 620, 620, 557], Index: Recipe.Rune});

				break;
			case 621: // sol->shael
				this.recipes.push({Ingredients: [621, 621, 621, 567], Index: Recipe.Rune});

				break;
			case 622: // shael->dol
				this.recipes.push({Ingredients: [622, 622, 622, 577], Index: Recipe.Rune});

				break;
			case 623: // dol->hel
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [623, 623, 623, 572], Index: Recipe.Rune});
				}

				break;
			case 624: // hel->io
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [624, 624, 624, 582], Index: Recipe.Rune});
				}

				break;
			case 625: // io->lum
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [625, 625, 625, 563], Index: Recipe.Rune});
				}

				break;
			case 626: // lum->ko
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [626, 626, 626, 558], Index: Recipe.Rune});
				}

				break;
			case 627: // ko->fal
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [627, 627, 627, 568], Index: Recipe.Rune});
				}

				break;
			case 628: // fal->lem
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [628, 628, 628, 578], Index: Recipe.Rune});
				}

				break;
			case 629: // lem->pul
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [629, 629, 629, 573], Index: Recipe.Rune});
				}

				break;
			case 630: // pul->um
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [630, 630, 583], Index: Recipe.Rune});
				}

				break;
			case 631: // um->mal
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [631, 631, 564], Index: Recipe.Rune});
				}

				break;
			case 632: // mal->ist
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [632, 632, 559], Index: Recipe.Rune});
				}

				break;
			case 633: // ist->gul
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [633, 633, 569], Index: Recipe.Rune});
				}

				break;
			case 634: // gul->vex
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [634, 634, 579], Index: Recipe.Rune});
				}

				break;
			case 635: // vex->ohm
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [635, 635, 574], Index: Recipe.Rune});
				}

				break;
			case 636: // ohm->lo
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [636, 636, 584], Index: Recipe.Rune});
				}

				break;
			case 637: // lo->sur
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [637, 637, 565], Index: Recipe.Rune});
				}

				break;
			case 638: // sur->ber
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [638, 638, 560], Index: Recipe.Rune});
				}

				break;
			case 639: // ber->jah
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [639, 639, 570], Index: Recipe.Rune});
				}

				break;
			case 640: // jah->cham
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [640, 640, 580], Index: Recipe.Rune});
				}

				break;
			case 641: // cham->zod
				if (me.ladder || Developer.addLadderRW) {
					this.recipes.push({Ingredients: [641, 641, 575], Index: Recipe.Rune});
				}

				break;
			}

			break;
		case Recipe.Token:
			this.recipes.push({Ingredients: [654, 655, 656, 657], Index: Recipe.Token, AlwaysEnabled: true});

			break;
		}
	}
};

Cubing.buildLists = function () {
	CraftingSystem.checkSubrecipes();
	SoloWants.checkSubrecipes();

	this.validIngredients = [];
	this.neededIngredients = [];
	let items = me.getItemsEx()
		.filter(item => [sdk.itemmode.inStorage, sdk.itemmode.Equipped].includes(item.mode))
		.sort((a, b) => b.ilvl - a.ilvl);

	for (let i = 0; i < this.recipes.length; i += 1) {
		// Set default Enabled property - true if recipe is always enabled, false otherwise
		this.recipes[i].Enabled = this.recipes[i].hasOwnProperty("AlwaysEnabled");

		IngredientLoop:
		for (let j = 0; j < this.recipes[i].Ingredients.length; j += 1) {
			for (let k = 0; k < items.length; k += 1) {
				if (((this.recipes[i].Ingredients[j] === "pgem" && this.gemList.includes(items[k].classid))
					|| (this.recipes[i].Ingredients[j] === "fgem" && [560, 565, 568, 575, 580, 585, 600].includes(items[k].classid))
					|| (this.recipes[i].Ingredients[j] === "cgem" && [557, 562, 567, 572, 577, 582, 597].includes(items[k].classid))
					|| items[k].classid === this.recipes[i].Ingredients[j]) && this.validItem(items[k], this.recipes[i])) {

					// push the item's info into the valid ingredients array. this will be used to find items when checking recipes
					this.validIngredients.push({classid: items[k].classid, quality: items[k].quality, ilvl: items[k].ilvl, gid: items[k].gid, recipe: this.recipes[i]});

					// Remove from item list to prevent counting the same item more than once
					items.splice(k, 1);

					k -= 1;

					// Enable recipes for gem/jewel pickup
					// Enable rune recipe after 2 bases are found
					if (this.recipes[i].Index !== Recipe.Rune || (this.recipes[i].Index === Recipe.Rune && j >= 1)) {
						this.recipes[i].Enabled = true;
					}

					continue IngredientLoop;
				}
			}

			// add the item to needed list - enable pickup
			this.neededIngredients.push({classid: this.recipes[i].Ingredients[j], recipe: this.recipes[i]});

			// skip flawless gems adding if we don't have the main item (Recipe.Gem and Recipe.Rune for el-ort are always enabled)
			if (!this.recipes[i].Enabled) {
				break;
			}

			// if the recipe is enabled (we have the main item), add flawless gem recipes (if needed)

			// Make perf amethyst
			if (this.subRecipes.indexOf(561) === -1 && (this.recipes[i].Ingredients[j] === 561 || (this.recipes[i].Ingredients[j] === "pgem" && this.gemList.indexOf(561) > -1))) {
				this.recipes.push({Ingredients: [560, 560, 560], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(561);
			}

			// Make flawless amethyst
			if (this.subRecipes.indexOf(560) === -1 && (this.recipes[i].Ingredients[j] === 560 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(560) > -1))) {
				this.recipes.push({Ingredients: [559, 559, 559], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(560);
			}

			// Make perf topaz
			if (this.subRecipes.indexOf(566) === -1 && (this.recipes[i].Ingredients[j] === 566 || (this.recipes[i].Ingredients[j] === "pgem" && this.gemList.indexOf(566) > -1))) {
				this.recipes.push({Ingredients: [565, 565, 565], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(566);
			}

			// Make flawless topaz
			if (this.subRecipes.indexOf(565) === -1 && (this.recipes[i].Ingredients[j] === 565 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(565) > -1))) {
				this.recipes.push({Ingredients: [564, 564, 564], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(565);
			}

			// Make perf sapphire
			if (this.subRecipes.indexOf(571) === -1 && (this.recipes[i].Ingredients[j] === 571 || (this.recipes[i].Ingredients[j] === "pgem" && this.gemList.indexOf(571) > -1))) {
				this.recipes.push({Ingredients: [570, 570, 570], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(571);
			}

			// Make flawless sapphire
			if (this.subRecipes.indexOf(570) === -1 && (this.recipes[i].Ingredients[j] === 570 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(570) > -1))) {
				this.recipes.push({Ingredients: [569, 569, 569], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(570);
			}

			// Make perf emerald
			if (this.subRecipes.indexOf(576) === -1 && (this.recipes[i].Ingredients[j] === 576 || (this.recipes[i].Ingredients[j] === "pgem" && this.gemList.indexOf(576) > -1))) {
				this.recipes.push({Ingredients: [575, 575, 575], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(576);
			}

			// Make flawless emerald
			if (this.subRecipes.indexOf(575) === -1 && (this.recipes[i].Ingredients[j] === 575 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(575) > -1))) {
				this.recipes.push({Ingredients: [574, 574, 574], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(575);
			}

			// Make perf ruby
			if (this.subRecipes.indexOf(581) === -1 && (this.recipes[i].Ingredients[j] === 581 || (this.recipes[i].Ingredients[j] === "pgem" && this.gemList.indexOf(581) > -1))) {
				this.recipes.push({Ingredients: [580, 580, 580], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(581);
			}

			// Make flawless ruby
			if (this.subRecipes.indexOf(580) === -1 && (this.recipes[i].Ingredients[j] === 580 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(580) > -1))) {
				this.recipes.push({Ingredients: [579, 579, 579], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(580);
			}

			// Make perf diamond
			if (this.subRecipes.indexOf(586) === -1 && (this.recipes[i].Ingredients[j] === 586 || (this.recipes[i].Ingredients[j] === "pgem" && this.gemList.indexOf(586) > -1))) {
				this.recipes.push({Ingredients: [585, 585, 585], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(586);
			}

			// Make flawless diamond
			if (this.subRecipes.indexOf(585) === -1 && (this.recipes[i].Ingredients[j] === 585 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(585) > -1))) {
				this.recipes.push({Ingredients: [584, 584, 584], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(585);
			}

			// Make perf skull
			if (this.subRecipes.indexOf(601) === -1 && (this.recipes[i].Ingredients[j] === 601 || (this.recipes[i].Ingredients[j] === "pgem" && this.gemList.indexOf(601) > -1))) {
				this.recipes.push({Ingredients: [600, 600, 600], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(601);
			}

			// Make flawless skull
			if (this.subRecipes.indexOf(600) === -1 && (this.recipes[i].Ingredients[j] === 600 || (this.recipes[i].Ingredients[j] === "fgem" && this.gemList.indexOf(600) > -1))) {
				this.recipes.push({Ingredients: [599, 599, 599], Index: Recipe.Gem, AlwaysEnabled: true, MainRecipe: this.recipes[i].Index});
				this.subRecipes.push(600);
			}
		}
	}
};

// Added try again to emptying cube if it fails it will clear inventory then organize it
Cubing.emptyCube = function () {
	let cube = me.getItem(sdk.items.quest.Cube),
		items = me.findItems(-1, -1, 6);

	if (!cube || !items) return false;

	while (items.length) {
		!getUIFlag(sdk.uiflags.Cube) && Cubing.openCube();

		if (!Storage.Stash.MoveTo(items[0]) && !Storage.Inventory.MoveTo(items[0])) {
			Town.clearInventory();
			Town.sortInventory();

			if (!Storage.Stash.MoveTo(items[0]) && !Storage.Inventory.MoveTo(items[0])) {
				return false;
			}
		}

		items.shift();
	}

	return true;
};


Cubing.checkItem = function (unit) {
	if (!Config.Cubing || !unit) return false;

	for (let i = 0; i < this.validIngredients.length; i++) {
		// not the same item but the same type of item
		if (unit.mode !== sdk.itemmode.Equipped && unit.gid !== this.validIngredients[i].gid && unit.classid === this.validIngredients[i].classid && unit.quality === this.validIngredients[i].quality) {
			// item is better than the one we currently have, so add it to validIngredient array and remove old item
			if (unit.ilvl > this.validIngredients[i].ilvl && this.validItem(unit, this.validIngredients[i].recipe)) {
				this.validIngredients.push({classid: unit.classid, quality: unit.quality, ilvl: unit.ilvl, gid: unit.gid, recipe: this.validIngredients[i].recipe});
				this.validIngredients.splice(i, 1);
				return true;
			}
		}
	}

	if (this.keepItem(unit)) {
		return true;
	}

	for (let i = 0; i < this.neededIngredients.length; i++) {
		if (unit.classid === this.neededIngredients[i].classid && this.validItem(unit, this.neededIngredients[i].recipe)) {
			return true;
		}
	}

	return false;
};

Cubing.validItem = function (unit, recipe) {
	let valid = true;
	// Excluded items
	// Don't use items in locked inventory space
	if (unit.isInInventory && Storage.Inventory.IsLocked(unit, Config.Inventory)) return false;
	// Don't use items that are wanted by other systems
	if (Runewords.validGids.includes(unit.gid) || CraftingSystem.validGids.includes(unit.gid)) return false;

	// Gems and runes
	if ((unit.itemType >= 96 && unit.itemType <= 102) || unit.itemType === 74) {
		if (!recipe.Enabled && recipe.Ingredients[0] !== unit.classid && recipe.Ingredients[1] !== unit.classid) {
			return false;
		}

		return true;
	}

	if (recipe.Index >= Recipe.HitPower.Helm && recipe.Index <= Recipe.Safety.Weapon) {
		if (Math.floor(me.charlvl / 2) + Math.floor(unit.ilvl / 2) < recipe.Level) {
			if (me.charlvl < 50) {
				// set it equal to ilvl 31 where 60% chance of 2 affixes and 20% chance each of 3 or 4 affixes 
				recipe.Level = 31;
			} else if (me.charlvl > 50 && me.charlvl < 70) {
				// set it equal to ilvl 51 where 80% chance of 3 affixes and 20% chance of 4 affixes 
				recipe.Level = 51;
			} else if (me.charlvl > 70 && me.charlvl < 93) {
				// set it equal to ilvl 71 where 100% chance of 4 affixes
				recipe.Level = 71;
			}
		}
		// Junk jewels (NOT matching a pickit entry)
		if (unit.itemType === 58) {
			if (recipe.Enabled && NTIP.CheckItem(unit) === 0) return true;
		// Main item, NOT matching a pickit entry
		} else if (unit.magic && Math.floor(me.charlvl / 2) + Math.floor(unit.ilvl / 2) >= recipe.Level && NTIP.CheckItem(unit, NTIP_CheckListNoTier) === 0) {
			return true;
		}

		return false;
	}

	if (recipe.Index >= Recipe.Unique.Weapon.ToExceptional && recipe.Index <= Recipe.Unique.Armor.ToElite) {
		// If item is equipped, ensure we can use the upgraded version
		if (unit.isEquipped) {
			if (me.charlvl < unit.upgradedLvlReq || me.trueStr < unit.upgradedStrReq || me.trueDex < unit.upgradedDexReq) {
				return false;
			}
		}
		// Unique item matching pickit entry
		if (unit.unique && NTIP.CheckItem(unit) === 1) {
			// check items name (prevents upgrading lavagout when we want to be upgrading magefist for the second time)
			if (recipe.Name !== undefined) {
				valid = !!unit.fname.toLowerCase().includes(recipe.Name.toLowerCase());
				if (valid) {
					// check to see if we are using this already and if so compare base stats to see if this one would be better
					// ignore things that get re-rolled like defense or min/max dmg just focus on base stats like enhanced defense/damage
					let equipped = me.getItemsEx(-1, sdk.storage.Equipped).find(item => item.fname.toLowerCase().includes(recipe.Name.toLowerCase()));
					if (equipped) {
						switch (recipe.Name.toLowerCase()) {
						case "magefist":
						// compare enhanced defense - keep "equal to" because base defense gets re-rolled so it might turn out better
							valid = (unit.getStat(sdk.stats.ArmorPercent) >= equipped.getStat(sdk.stats.ArmorPercent));
							break;
						}
					}
				}
			}
			switch (recipe.Ethereal) {
			case 0:
			case undefined:
				return NTIP.CheckItem(unit) === 1 && valid;
			case 1:
				return unit.getFlag(0x400000) && NTIP.CheckItem(unit) === 1 && valid;
			case 2:
				return !unit.getFlag(0x400000) && NTIP.CheckItem(unit) === 1 && valid;
			}
		}

		return false;
	}

	if (recipe.Index >= Recipe.Rare.Weapon.ToExceptional && recipe.Index <= Recipe.Rare.Armor.ToElite) {
		// If item is equipped, ensure we can use the upgraded version
		if (unit.isEquipped) {
			if (me.charlvl < unit.upgradedLvlReq || me.trueStr < unit.upgradedStrReq || me.trueDex < unit.upgradedDexReq) {
				return false;
			}
		}
		// Rare item matching pickit entry
		if (unit.rare && NTIP.CheckItem(unit) === 1) {
			switch (recipe.Ethereal) {
			case 0:
			case undefined:
				return NTIP.CheckItem(unit) === 1;
			case 1:
				return unit.getFlag(0x400000) && NTIP.CheckItem(unit) === 1;
			case 2:
				return !unit.getFlag(0x400000) && NTIP.CheckItem(unit) === 1;
			}
		}

		return false;
	}

	if (recipe.Index >= Recipe.Socket.Shield && recipe.Index <= Recipe.Socket.Helm) {
		// Normal item matching pickit entry, no sockets
		if (unit.normal && unit.sockets === 0) {
			switch (recipe.Ethereal) {
			case 0:
			case undefined:
				return NTIP.CheckItem(unit) === 1;
			case 1:
				return unit.getFlag(0x400000) && NTIP.CheckItem(unit) === 1;
			case 2:
				return !unit.getFlag(0x400000) && NTIP.CheckItem(unit) === 1;
			}
		}

		return false;
	}

	if (recipe.Index === Recipe.Reroll.Magic) {
		if (unit.magic && unit.ilvl >= recipe.Level && NTIP.CheckItem(unit) === 0) {
			return true;
		}

		return false;
	}

	if (recipe.Index === Recipe.Reroll.Charm) {
		if (unit.magic && NTIP.CheckItem(unit) === 0) {
			switch (unit.itemType) {
			case sdk.itemtype.SmallCharm:
				if (unit.ilvl >= recipe.Level.cm1.ilvl) {
					return true;
				}
				break;
			case sdk.itemtype.MediumCharm:
				if (unit.ilvl >= recipe.Level.cm2.ilvl) {
					return true;
				}
				break;
			case sdk.itemtype.LargeCharm:
				if (unit.ilvl >= recipe.Level.cm2.ilvl) {
					return true;
				}
				break;
			}
		}

		return false;
	}

	if (recipe.Index === Recipe.Reroll.Rare) {
		if (unit.rare && NTIP.CheckItem(unit) === 0) {
			return true;
		}

		return false;
	}

	if (recipe.Index === Recipe.Reroll.HighRare) {
		if (recipe.Ingredients[0] === unit.classid && unit.rare && NTIP.CheckItem(unit) === 0) {
			recipe.Enabled = true;

			return true;
		}

		if (recipe.Enabled && recipe.Ingredients[2] === unit.classid && unit.itemType === 10 && unit.getStat(77) && !Storage.Inventory.IsLocked(unit, Config.Inventory)) {
			return true;
		}

		return false;
	}

	if (recipe.Index === Recipe.LowToNorm.Armor || recipe.Index === Recipe.LowToNorm.Weapon) {
		if (unit.lowquality && NTIP.CheckItem(unit) === 0) {
			return true;
		}

		return false;
	}

	if (recipe.Index === Recipe.Token) {
		return true;
	}

	return false;
};

Cubing.doCubing = function () {
	if (!Config.Cubing || !me.getItem(sdk.items.quest.Cube)) return false;

	let wasEquipped = false;

	this.update();
	// Randomize the recipe array to prevent recipe blocking (multiple caster items etc.)
	let tempArray = this.recipes.slice().shuffle();

	for (let i = 0; i < tempArray.length; i++) {
		let string = "Transmuting: ";
		let items = this.checkRecipe(tempArray[i]);

		if (items) {
			// If cube isn't open, attempt to open stash (the function returns true if stash is already open)
			if ((!getUIFlag(sdk.uiflags.Cube) && !Town.openStash()) || !this.emptyCube()) return false;

			this.cursorCheck();

			i = -1;

			while (items.length) {
				string += (items[0].name.trim() + (items.length > 1 ? " + " : ""));
				items[0].isEquipped && (wasEquipped = true);
				Storage.Cube.MoveTo(items[0]);
				items.shift();
			}

			if (!this.openCube()) return false;

			transmute();
			delay(700 + me.ping);
			print("ÿc4Cubing: " + string);
			Config.ShowCubingInfo && D2Bot.printToConsole(string, sdk.colors.D2Bot.Green);

			this.update();

			items = me.findItems(-1, -1, sdk.storage.Cube);

			if (items) {
				for (let j = 0; j < items.length; j++) {
					let result = Pickit.checkItem(items[j]);

					switch (result.result) {
					case 0:
						// keep if item is worth selling
						if (items[j].getItemCost(1) / (items[j].sizex * items[j].sizey) >= (me.normal ? 50 : me.nightmare ? 500 : 1000)) {
							if (Storage.Inventory.CanFit(items[j])) {
								Storage.Inventory.MoveTo(items[j]);
							} else {
								Misc.itemLogger("Dropped", items[j], "doCubing");
								items[j].drop();
							}
						}

						Developer.debugging.crafting && Misc.logItem("Crafted but didn't want", items[j]);

						break;
					case 1:
						Misc.itemLogger("Cubing Kept", items[j]);
						Misc.logItem("Cubing Kept", items[j], result.line);

						break;
					case 5: // Crafting System
						CraftingSystem.update(items[j]);

						break;
					case 8: // SoloWants System
						SoloWants.update(items[j]);

						break;
					}
				}
			}

			if (!this.emptyCube()) {
				break;
			}
		}
	}

	if (getUIFlag(sdk.uiflags.Cube) || getUIFlag(sdk.uiflags.Stash)) {
		delay(1000);

		while (getUIFlag(sdk.uiflags.Cube) || getUIFlag(sdk.uiflags.Stash)) {
			me.cancel();
			delay(300);
		}
	}

	wasEquipped && Item.autoEquip();

	return true;
};
