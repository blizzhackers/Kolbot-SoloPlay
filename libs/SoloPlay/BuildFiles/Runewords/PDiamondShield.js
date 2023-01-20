(function() {
	const PDiamondShield = [
		"[name] == perfectdiamond # # [maxquantity] == 3",
		"[name] == towershield && [quality] >= normal && [quality] <= superior # [sockets] == 3 # [maxquantity] == 1",
	];
	NTIP.arrayLooping(PDiamondShield);

	// cube to Pdiamonds 
	if (Item.getQuantityOwned(me.getItem(sdk.items.gems.Perfect.Diamond)) < 3) {
		Config.Recipes.push([Recipe.Gem, "flawlessdiamond"]);
	}

	Config.Runewords.push([Runeword.PDiamondShield, "towershield"]);

	Config.KeepRunewords.push("[type] == shield # [allres] == 57");
})();
