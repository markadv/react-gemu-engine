/* App types */
const ActionTypes = {
	RESET: "reset",
	SETVOLUME: "setVolume",
	STARTSCENE: "startScene",
	STARTEDITOR: "startEditor",
	SHOWINTRO: "showIntro",
	SHOWTITLE: "showTitle",
	ISFULLSCREEN: "isfullscreen",
	ISLOADING: "isLoading",
	NEXTFRAME: "nextFrame",
	CHANGEBGM: "changeBgm",
	BGMTOGGLE: "bgmToggle",
	MENUTOGGLE: "menuToggle",
	MENUOFF: "menuOff",
} as const;

type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];
/* Typescript interface */

interface Action {
	type: ActionTypes;
	payload?: any;
}

interface State {
	bgMusic: any;
	bgmVolume: number;
	bgmPlaying: boolean;
	soundEffectVolume: number;
	voiceVolume: number;
	font: string;
	isFullscreen: boolean;
	choicesStore: { [key: string]: any };
	index: number;
	stateHistory: any[];
	choicesHistory: any[];
	choicesIndexHistory: any[];
	indexHistory: any[];
	choicesExist: boolean;
	configMenuShown: boolean;
	titleScreenShown: boolean;
	introShown: boolean;
	sceneIsRendering: boolean;
	sceneeditorIsRendering: boolean;
	backlogShown: boolean;
	textBoxShown: boolean;
	saveMenuShown: boolean;
	loadMenuShown: boolean;
	isSkipping: boolean;
	isLoading: boolean;
	isDebug: boolean;
}

interface ManagerProps {
	dispatch: React.Dispatch<Action>;
	bgImages: {
		[key: string]: any;
	};
	bgMusic: {
		[key: string]: any;
	};
	characters: {
		[key: string]: { [key: string]: any };
	};
	story: any[];
	state: State;
	femaleSprites: {
		[key: string]: { [key: string]: any };
	};
	setCharacters?: any;
	setStory?: any;
}

/* Editor types */
const CharTypes = {
	RESET: "reset",
	EDITCHARACTER: "editCharacterToggle",
	EDITCHARACTERCLEAR: "editCharacterClear",
	CHANGECHARACTERPART: "changeCharacterPart",
	ENABLECHARACTERTOGGLE: "enableCharacterToggle",
	CHANGESPRITENAME: "changeSpriteName",
	CHANGEHAIRCOLOR: "changeHaircolor",
	LOADCHARACTER: "loadCharacter",
} as const;

type CharTypes = typeof CharTypes[keyof typeof CharTypes];

const SceneTypes = {
	RESET: "reset",
	CHANGEBACKGROUND: "changeBackground",
	CHANGEBGM: "changeBgm",
	HIDEDIALOGUE: "hideDialogue",
	CHANGENAME: "changeName",
	CHANGETEXT: "changeText",
} as const;

type SceneTypes = typeof SceneTypes[keyof typeof SceneTypes];

interface IEditScene {
	type: SceneTypes;
	payload?: any;
}

interface IEditChar {
	type: CharTypes;
	payload?: any;
}

interface IMenuButtons {
	title: string;
	left: string;
	top: string;
	textSize: string;
	onClick: any;
	icon: any;
	extraIcon?: any;
	extraClass?: any;
}

interface EditCharState {
	[key: string]: string | object | number | boolean;
	spriteName: string;
	isEnabled: boolean;
	parts: {
		[backhair: string]: string | null;
		haircolor: string;
		body: string;
		outfits: string;
		fronthair: string;
		expression: string;
		accessories1: string | null;
		accessories2: string | null;
		accessories3: string | null;
	};
	inCharacterEditMode: boolean;
	haircolorIndex: number;
	fronthairIndex: number;
	backhairIndex: number;
	outfitsIndex: number;
	expressionIndex: number;
	accessories1Index: number;
	accessories2Index: number;
	accessories3Index: number;
}
interface EditSceneState {
	[key: string]: string | object | number | boolean;
	index: number;
	type: string;
	bg: { media: string; transition: string | null };
	characters: { location: string; sprite: string; transition: null }[];
	bgm: string;
	voice: string;
	sfx: string;
	speaker: {
		name: string;
		location: string;
	};
	text: string;
	bgIndex: number;
	bgmIndex: number;
	enableDialogue: boolean;
}

export type { Action, State, ManagerProps, IMenuButtons, IEditScene, IEditChar, EditCharState, EditSceneState };

export { CharTypes, SceneTypes, ActionTypes };
