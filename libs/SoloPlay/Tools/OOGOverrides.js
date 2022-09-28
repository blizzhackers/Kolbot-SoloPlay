/**
*  @filename    OOGOverrides.js
*  @author      theBGuy
*  @desc        OOG.js fixes to improve functionality
*
*/
includeIfNotIncluded("OOG.js");

(function (global, original) {
	global.login = function (...args) {
		console.trace();
		return original.apply(this, args);
	};
})([].filter.constructor("return this")(), login);

ControlAction.scrollDown = function () {
	me.blockMouse = true;
	for (let i = 0; i < 4; i++) {
		sendKey(sdk.keys.code.DownArrow);
	}
	me.blockMouse = false;
};

ControlAction.makeCharacter = function (info) {
	me.blockMouse = true;
	!info.charClass && (info.charClass = "barbarian");

	let clickCoords = [];
	let soloStats = CharData.getStats();

	soloStats.me.startTime !== 0 && Tracker.reset();
	if (soloStats.me.currentBuild !== "Start" || soloStats.me.level > 1) {
		let finalBuild = soloStats.me.finalBuild;
		Object.assign(soloStats, CharData.default);
		soloStats.me.finalBuild = finalBuild;
		CharData.updateData("me", soloStats);
	}

	D2Bot.updateStatus("Making Character: " + info.charName);

	// cycle until in lobby
	while (getLocation() !== sdk.game.locations.Lobby) {
		switch (getLocation()) {
		case sdk.game.locations.CharSelect:
		case sdk.game.locations.CharSelectConnecting:
		case sdk.game.locations.CharSelectNoChars:
			let control = Controls.CharSelectCreate.control;

			// Create Character greyed out
			if (control && control.disabled === sdk.game.controls.Disabled) {
				me.blockMouse = false;

				return false;
			}

			Controls.CharSelectCreate.click();

			break;
		case sdk.game.locations.LobbyPleaseWait:
			D2Bot.restart(); // single player error on finding character

			break;
		case sdk.game.locations.CharacterCreate:
			clickCoords = (() => {
				switch (info.charClass) {
				case "barbarian":
					return [400, 280];
				case "amazon":
					return [100, 280];
				case "necromancer":
					return [300, 290];
				case "sorceress":
					return [620, 270];
				case "assassin":
					return [200, 280];
				case "druid":
					return [700, 280];
				case "paladin":
				default:
					return [521, 260];
				}
			})();

			getControl().click(clickCoords[0], clickCoords[1]);
			delay(500);

			break;
		case sdk.game.locations.NewCharSelected:
			// hardcore char warning
			if (Controls.CharCreateHCWarningOk.control) {
				Controls.CharCreateHCWarningOk.click();
			} else {
				Controls.CharCreateCharName.setText(info.charName);

				if (!info.expansion) {
					// @credit isid0re
					if (["druid", "assassin"].includes(info.charClass)) {
						D2Bot.printToConsole("Error in profile name. Expansion characters cannot be made in classic", sdk.colors.D2Bot.Red);
						D2Bot.stop();

						return false;
					}

					Controls.CharCreateExpansion.click();
				}

				!info.ladder && Controls.CharCreateLadder.click();
				info.hardcore && Controls.CharCreateHardcore.click();
				Controls.CreateNewAccountOk.click();
			}

			break;
		case sdk.game.locations.OkCenteredErrorPopUp:
			// char name exists (text box 4, 268, 320, 264, 120)
			ControlAction.timeoutDelay("Character Name exists: " + info.charName + ". Making new Name.", 5e3);
			info.charName = NameGen();
			delay(500);
			Controls.OkCentered.click();
			D2Bot.updateStatus("Making Character: " + info.charName);

			break;
		default:
			break;
		}

		// Singleplayer loop break fix.
		if (me.ingame) {
			break;
		}

		delay(500);
	}

	me.blockMouse = false;
	D2Bot.setProfile(null, null, info.charName, "Normal");
	let gamename = Starter.profileInfo.charName.substring(0, 7) + "-" + Starter.randomString(3, false) + "-";
	DataFile.updateStats("gameName", gamename);

	return true;
};

ControlAction.findCharacter = function (info) {
	let count = 0;
	let singlePlayer = ![sdk.game.gametype.OpenBattlenet, sdk.game.gametype.BattleNet].includes(Profile().type);
	// offline doesn't have a character limit cap
	let cap = singlePlayer ? 999 : 24;
	let tick = getTickCount();
	let firstCheck;

	while (getLocation() !== sdk.game.locations.CharSelect) {
		if (getTickCount() - tick >= 5000) {
			break;
		}

		delay(25);
	}

	if (getLocation() === sdk.game.locations.CharSelectConnecting) {
		if (!Starter.charSelectConnecting()) {
			D2Bot.printToConsole("Stuck at connecting screen");
			D2Bot.restart();
		}
	}

	// start from beginning of the char list
	sendKey(sdk.keys.code.Home);

	while (getLocation() === sdk.game.locations.CharSelect && count < cap) {
		let control = Controls.CharSelectCharInfo0.control;

		if (control) {
			firstCheck = control.getText();
			do {
				let text = control.getText();

				if (text instanceof Array && typeof text[1] === "string") {
					count++;

					if (text[1].toLowerCase() === info.charName.toLowerCase()) {
						return true;
					}
				}
			} while (count < cap && control.getNext());
		}

		// check for additional characters up to 24 (online) or 999 offline (no character limit cap)
		if (count > 0 && count % 8 === 0) {
			if (Controls.CharSelectChar6.click()) {
				this.scrollDown();
				let check = Controls.CharSelectCharInfo0.control;

				if (!!firstCheck && !!check) {
					let nameCheck = check.getText();

					if (firstCheck[1].toLowerCase() === nameCheck[1].toLowerCase()) {
						return false;
					}
				}
			}
		} else {
			// no further check necessary
			break;
		}
	}

	return false;
};

ControlAction.loginCharacter = function (info, startFromTop = true) {
	me.blockMouse = true;

	let count = 0;

	// start from beginning of the char list
	startFromTop && sendKey(sdk.keys.code.Home);

	MainLoop:
	// cycle until in lobby or in game
	while (getLocation() !== sdk.game.locations.Lobby) {
		switch (getLocation()) {
		case sdk.game.locations.SplashScreen:
		case sdk.game.locations.MainMenu:
		case sdk.game.locations.Login:
			if (getLocation() === sdk.game.locations.MainMenu
				&& Profile().type === sdk.game.profiletype.SinglePlayer
				&& Controls.SinglePlayer.click()) {
				Starter.checkDifficulty();
				break;
			} else if (Starter.BNET) {
				Starter.LocationEvents.login();
			}

			break;
		case sdk.game.locations.CharSelect:
			let control = Controls.CharSelectCharInfo0.control;

			if (control) {
				do {
					let text = control.getText();

					if (text instanceof Array && typeof text[1] === "string") {
						count++;

						if (text[1].toLowerCase() === info.charName.toLowerCase()) {
							control.click();
							Controls.CreateNewAccountOk.click();
							me.blockMouse = false;

							if (getLocation() === sdk.game.locations.SelectDifficultySP) {
								try {
									Starter.LocationEvents.selectDifficultySP();
									Starter.locationTimeout(Time.seconds(3), sdk.game.locations.SelectDifficultySP);
								} catch (err) {
									break MainLoop;
								}

								if (me.ingame) {
									return true;
								}
							}

							return true;
						}
					}
				} while (control.getNext());
			}

			// check for additional characters up to 24
			if (count === 8 || count === 16) {
				Controls.CharSelectChar6.click() && this.scrollDown();
			} else {
				// no further check necessary
				break MainLoop;
			}

			break;
		case sdk.game.locations.CharSelectNoChars:
			Controls.CharSelectExit.click();

			break;
		case sdk.game.locations.Disconnected:
		case sdk.game.locations.OkCenteredErrorPopUp:
			break MainLoop;
		default:
			break;
		}

		delay(100);
	}

	me.blockMouse = false;

	return false;
};

// need open bnet check
ControlAction.makeAccount = function (info) {
	me.blockMouse = true;

	let tick;
	let realms = { "uswest": 0, "useast": 1, "asia": 2, "europe": 3 };
	D2Bot.updateStatus("Making Account: " + info.account);

	// cycle until in empty char screen
	while (getLocation() !== sdk.game.locations.CharSelectNoChars) {
		switch (getLocation()) {
		case sdk.game.locations.MainMenu:
			ControlAction.clickRealm(realms[info.realm]);
			Controls.BattleNet.click();

			break;
		case sdk.game.locations.Login:
			Controls.CreateNewAccount.click();

			break;
		case sdk.game.locations.LoginError:
		case sdk.game.locations.LoginUnableToConnect:
			return false;
		case sdk.game.locations.SplashScreen:
			Controls.SplashScreen.click();

			break;
		case sdk.game.locations.MainMenuConnecting:
			tick = getTickCount();

			while (getLocation() === sdk.game.locations.MainMenuConnecting) {
				if (getTickCount() - tick > 10000) {
					Controls.LoginCancelWait.click();
				}

				delay(500);
			}

			break;
		case sdk.game.locations.CharacterCreate:
			Controls.CharSelectExit.click();

			break;
		case sdk.game.locations.OkCenteredErrorPopUp:
			info.account = "";
			info.password = "";
			D2Bot.setProfile(info.account, info.password);
			D2Bot.restart(true);

			break;
		case sdk.game.locations.TermsOfUse:
			Controls.TermsOfUseAgree.click();

			break;
		case sdk.game.locations.CreateNewAccount:
			Controls.CreateNewAccountName.setText(info.account);
			Controls.CreateNewAccountPassword.setText(info.password);
			Controls.CreateNewAccountConfirmPassword.setText(info.password);
			Controls.CreateNewAccountOk.click();

			break;
		case sdk.game.locations.PleaseRead:
			Controls.PleaseReadOk.click();

			break;
		case sdk.game.locations.RegisterEmail:
			if (Developer.setEmail.enabled
				&& (!Developer.setEmail.profiles.length || Developer.setEmail.profiles.includes(me.profile))
				&& (!Developer.setEmail.realms.length || Developer.setEmail.realms.includes(Profile().gateway.toLowerCase()))) {
				ControlAction.setEmail();
			} else {
				Controls.EmailDontRegisterContinue.control ? Controls.EmailDontRegisterContinue.click() : Controls.EmailDontRegister.click();
			}

			break;
		default:
			break;
		}

		delay(100);
	}

	me.blockMouse = false;

	return true;
};

ControlAction.deleteAndRemakeChar = function (info) {
	me.blockMouse = true;

	ControlAction.findCharacter(info);

	MainLoop:
	// Cycle until in lobby
	while (getLocation() !== sdk.game.locations.Lobby) {
		switch (getLocation()) {
		case sdk.game.locations.CharSelect:
			let control = Controls.CharSelectCharInfo0.control;

			if (control) {
				do {
					let text = control.getText();

					if (text instanceof Array && typeof text[1] === "string" && text[1].toLowerCase() === info.charName.toLowerCase()) {
						control.click();
						Controls.CharSelectDelete.click();
						delay(500);
						Controls.CharDeleteYes.click();

						break MainLoop;
					}
				} while (control.getNext());
			}

			break;
		case sdk.game.locations.CharSelectNoChars:
			break MainLoop;

		case sdk.game.locations.Disconnected:
		case sdk.game.locations.OkCenteredErrorPopUp:
			me.blockMouse = false;

			return false;
		default:
			break;
		}

		delay(100);
	}

	me.blockMouse = false;

	// Delete old files - leaving csv file's for now as I don't think they interfere with the overlay
	CharData.delete(true);
	DataFile.create();
	CharData.updateData("me", "finalBuild", Starter.profileInfo.tag);
	Developer.logPerformance && Tracker.initialize();
	D2Bot.printToConsole("Deleted: " + info.charName + ". Now remaking...", sdk.colors.D2Bot.Gold);
	ControlAction.makeCharacter(Starter.profileInfo);

	return true;
};

ControlAction.saveInfo = function (info) {
	// Data-file already exists
	if (FileTools.exists("logs/Kolbot-SoloPlay/" + info.realm + "/" + info.charClass + "-" + info.charClass + "-" + info.charName + ".json")) {
		return;
	}

	let folder;

	if (!FileTools.exists("logs/Kolbot-SoloPlay")) {
		folder = dopen("logs");
		folder.create("Kolbot-SoloPlay");
	}

	if (!FileTools.exists("logs/Kolbot-SoloPlay/" + info.realm)) {
		folder = dopen("logs/Kolbot-SoloPlay");
		folder.create(info.realm);
	}

	if (!FileTools.exists("logs/Kolbot-SoloPlay/" + info.realm + "/" + info.charClass + "-" + info.charName + ".json")) {
		FileTools.writeText("logs/Kolbot-SoloPlay/" + info.realm + "/" + info.charClass + "-" + info.charName + ".json", JSON.stringify(info));
	}
};

ControlAction.loginAccount = function (info) {
	me.blockMouse = true;

	let locTick;
	let tick = getTickCount();
	let realms = { "uswest": 0, "useast": 1, "asia": 2, "europe": 3 };

	MainLoop:
	while (true) {
		switch (getLocation()) {
		case sdk.game.locations.PreSplash:
			break;
		case sdk.game.locations.MainMenu:
			info.realm && ControlAction.clickRealm(realms[info.realm]);
			Controls.BattleNet.click();

			break;
		case sdk.game.locations.Login:
			Controls.LoginUsername.setText(info.account);
			Controls.LoginPassword.setText(info.password);
			Controls.Login.click();

			break;
		case sdk.game.locations.LoginUnableToConnect:
		case sdk.game.locations.RealmDown:
			// Unable to connect, let the caller handle it.
			me.blockMouse = false;

			return false;
		case sdk.game.locations.CharSelect:
			break MainLoop;
		case sdk.game.locations.SplashScreen:
			Controls.SplashScreen.click();

			break;
		case sdk.game.locations.CharSelectPleaseWait:
		case sdk.game.locations.MainMenuConnecting:
		case sdk.game.locations.CharSelectConnecting:
			break;
		case sdk.game.locations.CharSelectNoChars:
			// make sure we're not on connecting screen
			locTick = getTickCount();

			while (getTickCount() - locTick < 3000 && getLocation() === sdk.game.locations.CharSelectNoChars) {
				delay(25);
			}

			if (getLocation() === sdk.game.locations.CharSelectConnecting) {
				break;
			}

			break MainLoop; // break if we're sure we're on empty char screen
		case sdk.game.locations.Lobby:
		case sdk.game.locations.LobbyChat:
			// somehow we are in the lobby?
			Control.LobbyQuit.click();
			
			break;
		default:
			console.log(getLocation());

			me.blockMouse = false;

			return false;
		}

		if (getTickCount() - tick >= 20000) {
			return false;
		}

		delay(100);
	}

	delay(1000);

	me.blockMouse = false;

	return getLocation() === sdk.game.locations.CharSelect || getLocation() === sdk.game.locations.CharSelectNoChars;
};

Starter.randomNumberString = function (len) {
	len === undefined && (len = rand(2, 5));

	let rval = "";
	let vals = "0123456789";

	for (let i = 0; i < len; i += 1) {
		rval += vals[rand(0, vals.length - 1)];
	}

	return rval;
};

Starter.charSelectConnecting = function () {
	if (getLocation() === sdk.game.locations.CharSelectConnecting) {
		// bugged? lets see if we can unbug it
		// Click create char button on infinite "connecting" screen
		Controls.CharSelectCreate.click() && delay(1000);
		Controls.CharSelectExit.click() && delay(1000);

		return (getLocation() !== sdk.game.locations.CharSelectConnecting);
	} else {
		return true;
	}
};

Starter.BNET = false;
Starter.LocationEvents.oogCheck = function () {
	return (AutoMule.outOfGameCheck() || TorchSystem.outOfGameCheck() || Gambling.outOfGameCheck() || CraftingSystem.outOfGameCheck() || SoloEvents.outOfGameCheck());
};

Starter.checkDifficulty = function () {
	let setDiff = CharData.getStats().me.setDifficulty;
	if (setDiff) {
		Starter.gameInfo.difficulty = setDiff;
	}
};

Starter.LocationEvents.login = function () {
	Starter.inGame && (Starter.inGame = false);
	if (getLocation() === sdk.game.locations.MainMenu && Starter.firstRun
		&& Profile().type === sdk.game.profiletype.SinglePlayer
		&& Controls.SinglePlayer.click()) {
		return;
	}

	// Wrong char select screen fix
	if (getLocation() === sdk.game.locations.CharSelect) {
		hideConsole(); // seems to fix odd crash with single-player characters if the console is open to type in
		if ((Profile().type === sdk.game.profiletype.Battlenet && !Controls.CharSelectCurrentRealm.control)
			|| ((Profile().type !== sdk.game.profiletype.Battlenet && Controls.CharSelectCurrentRealm.control))) {
			Controls.CharSelectExit.click();
			
			return;
		}
	}

	// Multiple realm botting fix in case of R/D or disconnect
	Starter.firstLogin && getLocation() === sdk.game.locations.Login && Controls.CharSelectExit.click();
				
	D2Bot.updateStatus("Logging In");

	try {
		// make battlenet accounts/characters
		if (Starter.BNET) {
			ControlAction.timeoutDelay("Login Delay", Starter.Config.DelayBeforeLogin * 1e3);
			D2Bot.updateStatus("Logging in");
			// existing account
			if (Starter.profileInfo.account !== "") {
				try {
					// ControlAction.loginAccount(Starter.profileInfo);
					login(me.profile);
				} catch (error) {
					if (DataFile.getStats().AcctPswd) {
						Starter.profileInfo.account = DataFile.getStats().AcctName;
						Starter.profileInfo.password = DataFile.getStats().AcctPswd;

						for (let i = 0; i < 5; i++) {
							if (ControlAction.loginAccount(Starter.profileInfo)) {
								break;
							}

							if (getLocation() === sdk.game.locations.CharSelectConnecting) {
								if (Starter.charSelectConnecting()) {
									break;
								}
							}

							ControlAction.timeoutDelay("Unable to Connect", Starter.Config.UnableToConnectDelay * 6e4);
							Starter.profileInfo.account = DataFile.getStats().AcctName;
							Starter.profileInfo.password = DataFile.getStats().AcctPswd;
						}
					}
				}
			} else {
				// new account
				if (Starter.profileInfo.account === "") {
					if (Starter.Config.GlobalAccount || Starter.Config.GlobalAccountPassword) {
						Starter.profileInfo.account = Starter.Config.GlobalAccount.length > 0 ? Starter.Config.GlobalAccount + Starter.randomNumberString(Starter.Config.AccountSuffixLength) : Starter.randomString(12, true);
						Starter.profileInfo.password = Starter.Config.GlobalAccountPassword.length > 0 ? Starter.Config.GlobalAccountPassword : Starter.randomString(12, true);

						try {
							if (Starter.profileInfo.account.length > 15) throw new Error("Account name exceeds MAXIMUM length (15). Please enter a shorter name or reduce the AccountSuffixLength under StarterConfig");
							if (Starter.profileInfo.password.length > 15) throw new Error("Password name exceeds MAXIMUM length (15). Please enter a shorter name under StarterConfig");
						} catch (e) {
							D2Bot.printToConsole("Kolbot-SoloPlay: " + e.message, sdk.colors.D2Bot.Gold);
							D2Bot.setProfile("", "", null, "Normal");
							D2Bot.stop();
						}

						console.log("Kolbot-SoloPlay :: Generated account information. " + (Starter.Config.GlobalAccount.length > 0 ? "Pre-defined " : "Random ") + "account used");
						console.log("Kolbot-SoloPlay :: Generated password information. " + (Starter.Config.GlobalAccountPassword.length > 0 ? "Pre-defined " : "Random ") + "password used");
						ControlAction.timeoutDelay("Generating Account Information", Starter.Config.DelayBeforeLogin * 1e3);
					} else {
						Starter.profileInfo.account = Starter.randomString(12, true);
						Starter.profileInfo.password = Starter.randomString(12, true);
						console.log("Generating Random Account Information");
						ControlAction.timeoutDelay("Generating Random Account Information", Starter.Config.DelayBeforeLogin * 1e3);
					}

					if (ControlAction.makeAccount(Starter.profileInfo)) {
						D2Bot.setProfile(Starter.profileInfo.account, Starter.profileInfo.password, null, "Normal");
						DataFile.updateStats("AcctName", Starter.profileInfo.account);
						DataFile.updateStats("AcctPswd", Starter.profileInfo.password);

						return;
					} else {
						Starter.profileInfo.account = "";
						Starter.profileInfo.password = "";
						D2Bot.setProfile(Starter.profileInfo.account, Starter.profileInfo.password, null, "Normal");
						D2Bot.restart(true);
					}
				}
			}
		} else {
			// SP/TCP  characters
			try {
				if (getLocation() === sdk.game.locations.MainMenu && Profile().type === sdk.game.profiletype.SinglePlayer) {
					Controls.SinglePlayer.click();
				}
				Starter.checkDifficulty();
				Starter.LocationEvents.charSelect(getLocation());
			} catch (err) {
				console.error(err);
				// Try to find the character and if that fails, make character
				if (!ControlAction.findCharacter(Starter.profileInfo)) {
					// Pop-up that happens when choosing a dead HC char
					if (getLocation() === sdk.game.locations.OkCenteredErrorPopUp) {
						Controls.OkCentered.click();	// Exit from that pop-up
						D2Bot.printToConsole("Character died", sdk.colors.D2Bot.Red);
						ControlAction.deleteAndRemakeChar(Starter.profileInfo);
					} else {
						// If make character fails, check how many characters are on that account
						if (!ControlAction.makeCharacter(Starter.profileInfo)) {
							// Account is full
							if (ControlAction.getCharacters().length >= 18) {
								D2Bot.printToConsole("Kolbot-SoloPlay: Account is full", sdk.colors.D2Bot.Orange);
								D2Bot.stop();
							}
						}
					}
				}
			}
		}
	} catch (e) {
		console.log(e + " " + getLocation());
	}
};

Starter.LocationEvents.loginError = function () {
	let string = "";
	let text = Controls.LoginErrorText.getText();

	if (text) {
		for (let i = 0; i < text.length; i++) {
			string += text[i];

			if (i !== text.length - 1) {
				string += " ";
			}
		}

		switch (string) {
		case getLocaleString(sdk.locale.text.UsenameIncludedIllegalChars):
		case getLocaleString(sdk.locale.text.UsenameIncludedDisallowedwords):
		case getLocaleString(sdk.locale.text.UsernameMustBeAtLeast):
		case getLocaleString(sdk.locale.text.PasswordMustBeAtLeast):
		case getLocaleString(sdk.locale.text.AccountMustBeAtLeast):
		case getLocaleString(sdk.locale.text.PasswordCantBeMoreThan):
		case getLocaleString(sdk.locale.text.AccountCantBeMoreThan):
			D2Bot.printToConsole(string);
			D2Bot.stop();

			break;
		case getLocaleString(sdk.locale.text.InvalidPassword):
			D2Bot.updateStatus("Invalid Password");
			D2Bot.printToConsole("Invalid Password");
			ControlAction.timeoutDelay("Invalid password delay", Starter.Config.InvalidPasswordDelay * 6e4);
			D2Bot.printToConsole("Invalid Password - Restart");
			D2Bot.restart();

			break;
		case getLocaleString(5208): // Invalid account
		case getLocaleString(5239): // An account name already exists
		case getLocaleString(5249): // Unable to create account
			D2Bot.updateStatus("Invalid Account Name");
			D2Bot.printToConsole("Invalid Account Name");
			Starter.profileInfo.account = "";
			Starter.profileInfo.password = "";
			D2Bot.setProfile(Starter.profileInfo.account, Starter.profileInfo.password);
			D2Bot.restart(true);

			break;
		case getLocaleString(5202): // cd key intended for another product
		case getLocaleString(10915): // lod key intended for another product
			D2Bot.updateStatus("Invalid CDKey");
			D2Bot.printToConsole("Invalid CDKey: " + Starter.gameInfo.mpq, sdk.colors.D2Bot.Gold);
			D2Bot.CDKeyDisabled();

			if (Starter.gameInfo.switchKeys) {
				ControlAction.timeoutDelay("Key switch delay", Starter.Config.SwitchKeyDelay * 1000);
				D2Bot.restart(true);
			} else {
				D2Bot.stop();
			}

			break;
		case getLocaleString(5199):
			D2Bot.updateStatus("Disabled CDKey");
			D2Bot.printToConsole("Disabled CDKey: " + Starter.gameInfo.mpq, sdk.colors.D2Bot.Gold);
			D2Bot.CDKeyDisabled();

			if (Starter.gameInfo.switchKeys) {
				ControlAction.timeoutDelay("Key switch delay", Starter.Config.SwitchKeyDelay * 1000);
				D2Bot.restart(true);
			} else {
				D2Bot.stop();
			}

			break;
		case getLocaleString(10913):
			D2Bot.updateStatus("Disabled LoD CDKey");
			D2Bot.printToConsole("Disabled LoD CDKey: " + Starter.gameInfo.mpq, sdk.colors.D2Bot.Gold);
			D2Bot.CDKeyDisabled();

			if (Starter.gameInfo.switchKeys) {
				ControlAction.timeoutDelay("Key switch delay", Starter.Config.SwitchKeyDelay * 1000);
				D2Bot.restart(true);
			} else {
				D2Bot.stop();
			}

			break;
		case getLocaleString(5347):
			D2Bot.updateStatus("Disconnected from battle.net.");
			D2Bot.printToConsole("Disconnected from battle.net.");
			Controls.OkCentered.click();
			Controls.LoginErrorOk.click();

			return;
		default:
			D2Bot.updateStatus("Login Error");
			D2Bot.printToConsole("Login Error - " + string);

			if (Starter.gameInfo.switchKeys) {
				ControlAction.timeoutDelay("Key switch delay", Starter.Config.SwitchKeyDelay * 1000);
				D2Bot.restart(true);
			} else {
				D2Bot.stop();
			}

			break;
		}
	}

	Controls.LoginErrorOk.click();
	delay(1000);
	Controls.CharSelectExit.click();
};

Starter.LocationEvents.charSelect = function (loc) {
	let string = "";
	let text = Controls.CharSelectError.getText();

	if (text) {
		for (let i = 0; i < text.length; i++) {
			string += text[i];

			if (i !== text.length - 1) {
				string += " ";
			}
		}

		// CDKey disabled from realm play
		if (string === getLocaleString(sdk.locale.text.CdKeyDisabledFromRealm)) {
			D2Bot.updateStatus("Realm Disabled CDKey");
			D2Bot.printToConsole("Realm Disabled CDKey: " + Starter.gameInfo.mpq, sdk.colors.D2Bot.Gold);
			D2Bot.CDKeyDisabled();

			if (Starter.gameInfo.switchKeys) {
				ControlAction.timeoutDelay("Key switch delay", Starter.Config.SwitchKeyDelay * 1000);
				D2Bot.restart(true);
			} else {
				D2Bot.stop();
			}
		}
	}

	if (Starter.deadCheck && ControlAction.deleteAndRemakeChar(Starter.profileInfo)) {
		Starter.deadCheck = false;
	}

	if (Object.keys(Starter.profileInfo).length) {
		if (!ControlAction.findCharacter(Starter.profileInfo)) {
			if (Starter.profileInfo.charName === DataFile.getObj().name
				&& getLocation() !== sdk.game.locations.CharSelectNoChars && ControlAction.getCharacters().length === 0) {
				ControlAction.timeoutDelay("[R/D] Character not found ", 18e4);
				D2Bot.printToConsole("Avoid Creating New Character - Restart");
				D2Bot.restart();
			} else {
				if (!ControlAction.makeCharacter(Starter.profileInfo)) {
					if (ControlAction.getCharacters().length >= 18) {
						D2Bot.printToConsole("Kolbot-SoloPlay: Account is full", sdk.colors.D2Bot.Red);
						D2Bot.stop();
					}
				}
			}
		} else {
			ControlAction.loginCharacter(Starter.profileInfo, false);
		}
	}

	if (!Starter.locationTimeout(Starter.Config.ConnectingTimeout * 1e3, loc)) {
		Controls.CharSelectExit.click();
		Starter.gameInfo.rdBlocker && D2Bot.restart();
	}
};

Starter.LocationEvents.lobbyChat = function () {
	D2Bot.updateStatus("Lobby Chat");
	Starter.lastGameStatus === "pending" && (Starter.gameCount += 1);

	if (Starter.inGame || Starter.gameInfo.error) {
		!Starter.gameStart && (Starter.gameStart = DataFile.getStats().ingameTick);

		if (getTickCount() - Starter.gameStart < Starter.Config.MinGameTime * 1e3) {
			ControlAction.timeoutDelay("Min game time wait", Starter.Config.MinGameTime * 1e3 + Starter.gameStart - getTickCount());
		}
	}

	if (Starter.inGame) {
		if (oogCheck()) return;

		console.log("updating runs");
		D2Bot.updateRuns();

		Starter.gameCount += 1;
		Starter.lastGameStatus = "ready";
		Starter.inGame = false;

		if (Starter.Config.ResetCount && Starter.gameCount > Starter.Config.ResetCount) {
			Starter.gameCount = 1;
			DataFile.updateStats("runs", Starter.gameCount);
		}

		Starter.chanInfo.afterMsg = Starter.Config.AfterGameMessage;

		if (Starter.chanInfo.afterMsg) {
			!Array.isArray(Starter.chanInfo.afterMsg) && (Starter.chanInfo.afterMsg = [Starter.chanInfo.afterMsg]);

			for (let i = 0; i < Starter.chanInfo.afterMsg.length; i++) {
				Starter.sayMsg(Starter.chanInfo.afterMsg[i]);
				delay(500);
			}
		}
	}

	if (!Starter.chatActionsDone) {
		Starter.chatActionsDone = true;

		Starter.chanInfo.joinChannel = Starter.Config.JoinChannel;
		Starter.chanInfo.firstMsg = Starter.Config.FirstJoinMessage;

		if (Starter.chanInfo.joinChannel) {
			!Array.isArray(Starter.chanInfo.joinChannel) && (Starter.chanInfo.joinChannel = [Starter.chanInfo.joinChannel]);
			!Array.isArray(Starter.chanInfo.firstMsg) && (Starter.chanInfo.firstMsg = [Starter.chanInfo.firstMsg]);

			for (let i = 0; i < Starter.chanInfo.joinChannel.length; i++) {
				ControlAction.timeoutDelay("Chat delay", Starter.Config.ChatActionsDelay * 1e3);

				if (ControlAction.joinChannel(Starter.chanInfo.joinChannel[i])) {
					Starter.useChat = true;
				} else {
					console.log("ÿc1Unable to join channel, disabling chat messages.");

					Starter.useChat = false;
				}

				if (Starter.chanInfo.firstMsg[i] !== "") {
					Starter.sayMsg(Starter.chanInfo.firstMsg[i]);
					delay(500);
				}
			}
		}
	}

	// Announce game
	Starter.chanInfo.announce = Starter.Config.AnnounceGames;

	if (Starter.chanInfo.announce) {
		Starter.sayMsg("Next game is " + Starter.gameInfo.gameName + Starter.gameCount + (Starter.gameInfo.gamePass === "" ? "" : "//" + Starter.gameInfo.gamePass));
	}

	Starter.LocationEvents.openCreateGameWindow();
};
