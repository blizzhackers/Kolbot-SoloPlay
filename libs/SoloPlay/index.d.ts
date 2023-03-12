
declare global {
	interface Math {
		percentDifference(value1: number, value2: number): number;
	}
	
	interface ItemUnit {
		readonly isCharm: boolean;
		readonly isGem: boolean;
		readonly isInsertable: boolean;
		readonly isRuneword: boolean;
		readonly isBroken: boolean;
		readonly isBaseType: boolean;
		readonly upgradedStrReq: boolean;
		readonly upgradedDexReq: boolean;
		readonly upgradedLvlReq: boolean;
		readonly allRes: boolean;
		readonly quantityPercent: number;

		getItemType(): string;
	}

	interface Monster {
		readonly isStunned: boolean;
		readonly isUnderCoS: boolean;
		readonly isUnderLowerRes: boolean;
	}

	interface Unit {
		getResPenalty(difficulty: number): number;
		castChargedSkillEx(...args: any[]): boolean;
		castSwitchChargedSkill(...args: any[]): boolean;
		haveRunes(itemInfo: number[]): boolean;
	}

	type MercObj = {
		classid: number,
		skill: number,
		skillName: string,
		act: number,
		difficulty: number,
	};

	interface Build {
		caster: boolean;
		skillstab: number;
		wantedskills: number[];
		usefulskills: number[];
		precastSkills: number[];
		wantedMerc: MercObj;
		stats: Array<[string, number | "block" | "all"]>;
		skills: Array<[number, number, boolean?]>;
		charms: Record<string, {
			max: number;
			have: number[];
			classid: number;
			stats: (check: ItemUnit) => boolean;
		}>;
		AutoBuildTemplate: Record<number, { Update: () => void }>;
		respec: () => boolean;
		active: () => boolean;
	}

	interface MeType {
		readonly maxNearMonsters: number;
		readonly dualWielding: boolean;
		readonly realFR: number;
		readonly realCR: number;
		readonly realPR: number;
		readonly realLR: number;
		readonly FR: number;
		readonly CR: number;
		readonly LR: number;
		readonly PR: number;
		readonly onFinalBuild: boolean;

		finalBuild: Build;
		currentBuild: Build;

		canTpToTown(): boolean;
		getMercEx(): MercUnit | null;
		getEquippedItem(bodyLoc: number): ItemUnit | null;
		getSkillTabs(classid: number): number[];
		inDanger(checkLoc?: {x: number, y: number} | MeType, range?: number): boolean;
		checkSkill(skillId: number, subId: number): boolean;
		cleanUpInvoPotions(beltSize: number): boolean;
		needPotions(): boolean;
		getIdTool(): ItemUnit | null;
		getTpTool(): ItemUnit | null;
		getUnids(): ItemUnit[];
		fieldID(): boolean;
		getWeaponQuantity(weaponLoc: number): number;
		getItemsForRepair(repairPercent: number, chargedItems?: boolean): ItemUnit[];
		needRepair(): string[];
		needMerc(): boolean;
		clearBelt(): boolean;
		sortInventory(): boolean;
		cleanUpScrolls(tome: ItemUnit, scrollId: number): number;
	}

	interface Container {
		/**
		 * A function that checks if the cube is located at { x: 0, y: 0 } in the stash and moves it there if not
		 * @param name 
		 */
		CubeSpot(name: string): boolean;

		/**
		 * A function that sorts items with optional priority
		 * @param itemIdsLeft 
		 * @param itemIdsRight 
		 */
		SortItems(itemIdsLeft: number[], itemIdsRight: number[]): boolean;
		
		/**
		 * A function that moves an item to a location in a container
		 * @param item 
		 * @param reverseX 
		 * @param reverseY 
		 * @param priorityClassIds 
		 */
		MoveTo(item: ItemUnit, reverseX: boolean, reverseY: boolean, priorityClassIds: number[]): boolean

		/**
		 * @param item 
		 * @param location 
		 * @param force 
		 */
		MakeSpot(item: ItemUnit, location: { x: number, y: number }, force: boolean): boolean;

		/**
		 * @param item 
		 * @param mX 
		 * @param mY 
		 */
		MoveToSpot(item: ItemUnit, mX: number, mY: number): boolean;
	}

	class Merc {
		constructor(classid: number, skill: number, act: number, difficulty?: number);
		classid: number;
		skill: number;
		skillName: string;
		act: number;
		difficulty: number;
	}

	class MercData {
		[sdk.skills.FireArrow]: Merc;
		[sdk.skills.ColdArrow]: Merc;
		[sdk.skills.Prayer]: Merc;
		[sdk.skills.BlessedAim]: Merc;
		[sdk.skills.Defiance]: Merc;
		[sdk.skills.HolyFreeze]: Merc;
		[sdk.skills.Might]: Merc;
		[sdk.skills.Thorns]: Merc;
		[sdk.skills.IceBlast]: Merc;
		[sdk.skills.FireBall]: Merc;
		[sdk.skills.Lightning]: Merc;
		[sdk.skills.Bash]: Merc;
		actMap: Map<number | symbol, number | Merc[]>;
	}

	namespace Mercenary {
		let minCost: number;

		function getMercSkill(merc?: MercUnit): string | false;
		function getMercDifficulty(merc?: MercUnit): number;
		function getMercAct(merc?: MercUnit): number;
		function getMercInfo(merc?: MercUnit): { classid: number, act: number, difficulty: number, type: string | false };
		function checkMercSkill(wanted: string, merc?: MercUnit): boolean;
		function hireMerc(): boolean;
	}

	namespace Misc {
		let townEnabled: boolean;
		let openChestsEnabled: boolean;
		const presetShrineIds: number[];
		const presetChestIds: number[];

		function openChestsInArea(area: number, chestIds: number[], sort?: Function): boolean;
		function getExpShrine(shrineLocs: number[]): boolean;
		function unsocketItem(item: ItemUnit): boolean;
		function checkItemsForSocketing(): ItemUnit | boolean;
		function checkItemsForImbueing(): ItemUnit | boolean;
		function addSocketablesToItem(item: ItemUnit, runes: ItemUnit[]): boolean;
		function getSocketables(
			item: ItemUnit,
			itemInfo?: {
				classid: number,
				socketWith: number[],
				temp: number[],
				useSocketQuest: boolean,
				condition: Function
			}
		): boolean;
		function checkSocketables(): void;
	}

	namespace Skill {
		function switchCast(skillId: number, givenSettings: { hand?: number, x?: number, y?: number, switchBack?: boolean, oSkill?: boolean }): boolean;
	}

	interface charData {
    initialized: boolean;
    normal: {
        respecUsed: boolean;
        imbueUsed: boolean;
        socketUsed: boolean;
    };
    nightmare: {
        respecUsed: boolean;
        imbueUsed: boolean;
        socketUsed: boolean;
    };
    hell: {
        respecUsed: boolean;
        imbueUsed: boolean;
        socketUsed: boolean;
    };
    me: {
        task: string;
        startTime: number;
        charName: string;
        classid: number;
        level: number;
        strength: number;
        dexterity: number;
        currentBuild: string;
        finalBuild: string;
        highestDifficulty: string;
        setDifficulty: string;
        charms: object;
        charmGids: number[];
    };
    merc: {
        act: number;
        classid: number;
        difficulty: number;
        strength: number;
        dexterity: number;
        type: string;
        gear: number[];
    };
	}

	namespace CharData {
		const filePath: string;
		const threads: string[];

		// ignoring the sub objs for now
		function updateConfig(): void;
		function create(): charData;
		function getObj(): charData;
		function getStats(): charData;
		function updateData(arg: string, property: object | string, value: any): boolean;
		/** @alias CharData.delete */
		function _delete(deleteMain: boolean): boolean;
	}

	namespace SetUp {
		let mercEnabled: boolean;
		const currentBuild: string;
		const finalBuild: string;
		const stopAtLevel: number | false;

		function init(): void;
		function include(): void;
		function finalRespec(): number;
		function getTemplate(): { buildType: string, template: string };
		function specPush(specType: string): number[];
		function makeNext(): void;
		function belt(): void;
		function buffers(): void;
		function bowQuiver(): void;
		function imbueItems(): string[];
		function config(): void;
	}

	namespace Check {
		let lowGold: boolean;

		function gold(): boolean;
		function brokeAf(): boolean;
		function broken(): 0 | 1 | 2;
		function brokeCheck(): boolean;
		function resistance(): { Status: boolean, FR: number, CR: number, LR: number, PR: number };
		function nextDifficulty(announce: boolean): string | false;
		function runes(): boolean;
		function haveItem(type: string | number, flag?: string | number, iName?: string): boolean;
		function currentBuild(): Build;
		function finalBuild(): Build;
	}

	namespace SoloWants {
	}

	namespace NPCAction {
		function shopAt(npcName: string): boolean;
		function buyPotions(): boolean;
		function fillTome(classid: number, force?: boolean): boolean;
		function cainID(force?: boolean): boolean;
		function shopItems(force?: boolean): boolean;
		function gamble(): boolean;
		function repair(force?: boolean): boolean;
		function reviveMerc(): boolean;
	}

	namespace AutoEquip {
	}

	type extraTasks = {
		thawing?: boolean,
		antidote?: boolean,
		stamina?: boolean,
		fullChores?: boolean,
	};

	namespace Town {
		function doChores(repair?: boolean, givenTasks?: extraTasks): boolean;
	}
}
export{};
