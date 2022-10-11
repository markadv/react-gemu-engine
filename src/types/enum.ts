export const ActionTypes = {
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
} as const;

export type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];
/* Typescript interface */

export interface Action {
	type: ActionTypes;
	payload?: any;
}

export interface State {
	bgMusic: any;
	bgmVolume: number;
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

export interface ManagerProps {
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
}
