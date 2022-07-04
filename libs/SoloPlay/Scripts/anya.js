/*
*	@filename	anya.js
*	@author		isid0re, theBGuy
*	@desc		Anya rescue from frozen river
*/

function anya () {
	Town.townTasks();
	Town.goToTown(5);
	myPrint('starting anya');

	if (!me.anya) {
		Pather.checkWP(sdk.areas.CrystalizedPassage, true) ? Pather.useWaypoint(sdk.areas.CrystalizedPassage) : Pather.getWP(sdk.areas.CrystalizedPassage);
		Precast.doPrecast(true);
		Pather.clearToExit(sdk.areas.CrystalizedPassage, sdk.areas.FrozenRiver, Pather.useTeleport());

		if (!Pather.moveToPreset(me.area, sdk.unittype.Object, sdk.units.objects.FrozenAnyasPlatform)) {
			myPrint("Failed to move to Anya");
			return false;
		}

		let frozenanya = Object(sdk.units.objects.FrozenAnya);

		if (frozenanya) {
			Pather.moveToUnit(frozenanya);
			sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
			delay(1200 + me.ping);
			me.cancel();
		}

		Town.npcInteract("malah");
		Town.doChores();
		Pather.usePortal(sdk.areas.FrozenRiver, me.name);

		frozenanya = Object(sdk.units.object.FrozenAnya);	// Check again in case she's no longer there from first intereaction

		if (frozenanya) {
			while (!frozenanya.mode) {
				sendPacket(1, 0x13, 4, 0x2, 4, frozenanya.gid);
				delay(300 + me.ping);
			}
		}

		Town.npcInteract("malah");
		Town.unfinishedQuests();
		Town.doChores();
		Town.npcInteract("anya");
	}

	if (me.anya) {
		if (!Pather.getPortal(sdk.areas.NihlathaksTemple)) {
			Town.npcInteract("anya");
		}

		if (!Pather.usePortal(sdk.areas.NihlathaksTemple)) {
			return true;
		}

		Precast.doPrecast(true);
		Pather.moveTo(10058, 13234);
		Attack.killTarget(getLocaleString(sdk.locale.monsters.Pindleskin));
		Pickit.pickItems();
	}

	return true;
}
