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
	CLOSEEDITOR: "closeEditor",
} as const;

interface State {
	bgMusic: any;
	bgmVolume: number;
	bgmPlaying: boolean;
	soundEffectVolume: number;
	voiceVolume: number;
	font: string;
	isFullscreen: boolean;
	choicesStore: { [key: string]: any };
	index: string;
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

const SceneTypes = {
	RESET: "reset",
	CHANGEBACKGROUND: "changeBackground",
	CHANGEBGM: "changeBgm",
	HIDEDIALOGUE: "hideDialogue",
	CHANGENAME: "changeName",
	CHANGETEXT: "changeText",
	TOGGLECHARACTER: "toggleCharacter",
	TOGGLESPEAKER: "toggleSpeaker",
	LOADSCENE: "loadScene",
	SETSCENEINDEX: "setSceneIndex",
	SETNEXT: "setNext",
	SETANIMATE: "setAnimate",
} as const;

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

type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];
type CharTypes = typeof CharTypes[keyof typeof CharTypes];
type SceneTypes = typeof SceneTypes[keyof typeof SceneTypes];
/* Typescript interface */

interface Action {
	type: ActionTypes;
	payload?: any;
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
	story: any;
	state: State;
	femaleSprites: {
		[key: string]: { [key: string]: any };
	};
	setCharacters?: any;
	setStory?: any;
	screenOrientation?: string;
	handle?: any;
}

interface IEditScene {
	type: SceneTypes;
	payload?: any;
}

interface IEditChar {
	type: CharTypes;
	payload?: any;
}

interface IMenuButtons {
	content: string;
	onClick: any;
	icon: any;
	extraIcon?: any;
	extraClass?: any;
}

interface EditCharState {
	[key: string]: string | object | number | boolean;
	spriteName: string;
	parts: {
		[key: string]: string | null;
		backhair: string;
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
	index: string;
	type: string;
	bg: { media: string; transition: string | null };
	characters: {
		location: string;
		sprite: string;
		animate: null | string;
		transition: null | string;
		enabled: boolean;
	}[];
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
	choices: any[];
	next: string;
}

export type { Action, State, ManagerProps, IMenuButtons, IEditScene, IEditChar, EditCharState, EditSceneState };

export { CharTypes, SceneTypes, ActionTypes };
