export const ActionTypes = {
	RESET: "reset",
	SETVOLUME: "setVolume",
	STARTGAME: "startGame",
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
	gameIsRendering: boolean;
	backlogShown: boolean;
	textBoxShown: boolean;
	saveMenuShown: boolean;
	loadMenuShown: boolean;
	isSkipping: boolean;
	isLoading: boolean;
}
