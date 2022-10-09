/* Dependencies */
import { useReducer, useEffect } from "react";
import useBeforeunload from "./hooks/useBeforeunload";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { motion } from "framer-motion";
import ReactHowler from "react-howler";
/* Styles */

/* Components */
import InitialBrand from "./components/InitialBrand";
import TitleScreen from "./components/TitleScreen";
import SceneManager from "./components/SceneManager";

/* Hooks; */
import useDocumentTitle from "./hooks/useDocumentTitle";

/* Data */
import characters from "./assets/story/characters.json";
import story from "./assets/story/story.json";

/* Pre-load Music */
const bgMusic = {
	menu: require("./assets/bgm/Menu.mp3"),
	night: require("./assets/bgm/Night.mp3"),
	sunny: require("./assets/bgm/Sunny.mp3"),
	goodNews: require("./assets/bgm/GoodNews.mp3"),
	defeat: require("./assets/bgm/Defeat.mp3"),
	complete: require("./assets/bgm/Complete.mp3"),
	byeDramatic: require("./assets/bgm/ByeDramatic.mp3"),
};
/* States */
const INITIAL_STATE = {
	/* config state */
	bgMusic: bgMusic.menu,
	bgmVolume: 80,
	soundEffectVolume: 90,
	voiceVolume: 100,
	font: "Trebuchet MS",
	isFullscreen: false,
	/* Story state */
	choicesStore: {},
	index: 0,
	stateHistory: [],
	choicesHistory: [],
	choicesIndexHistory: [],
	indexHistory: [],
	choicesExist: false,
	/* Game state  */
	configMenuShown: false,
	titleScreenShown: false,
	introShown: false,
	gameIsRendering: false,
	backlogShown: false,
	textBoxShown: true,
	saveMenuShown: false,
	loadMenuShown: false,
	isSkipping: false,
	isLoading: true,
};

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
interface Action {
	type: ActionTypes;
	payload?: any;
}
interface State {
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

/* Reducer function */
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "setVolume": {
			return state;
		}
		case "isfullscreen": {
			return { ...state, isFullscreen: action.payload };
		}
		case "isLoading": {
			return { ...state, isLoading: !state.isLoading };
		}
		case "showTitle": {
			return { ...state, titleScreenShown: true, isLoading: false };
		}
		case "showIntro": {
			return { ...state, titleScreenShown: false, introShown: true };
		}
		case "startGame": {
			return { ...state, gameIsRendering: true };
		}
		case "nextFrame": {
			return { ...state, index: state.index + 1 };
		}
		case "changeBgm": {
			return { ...state, bgMusic: action.payload };
		}
		case "reset": {
			return INITIAL_STATE;
		}
		default:
			return INITIAL_STATE;
	}
};

/* Framer motion */
const animationBody: any = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

/* Assets to be transferred in a separate file after */
const femaleSprites = {
	backhair: {
		longDark: require("./assets/images/characters/Female/backhairs/long_dark.png"),
		longPink: require("./assets/images/characters/Female/backhairs/long_pink.png"),
		longSilver: require("./assets/images/characters/Female/backhairs/long_silver.png"),
		longBrown: require("./assets/images/characters/Female/backhairs/long_brown.png"),
		longBlondie: require("./assets/images/characters/Female/backhairs/long_blondie.png"),
		curlyDark: require("./assets/images/characters/Female/backhairs/curly_dark.png"),
		curlyPink: require("./assets/images/characters/Female/backhairs/curly_pink.png"),
		curlySilver: require("./assets/images/characters/Female/backhairs/curly_silver.png"),
		curlyBrown: require("./assets/images/characters/Female/backhairs/curly_brown.png"),
		curlyBlondie: require("./assets/images/characters/Female/backhairs/curly_blondie.png"),
		shortDark: require("./assets/images/characters/Female/backhairs/short_dark.png"),
		shortPink: require("./assets/images/characters/Female/backhairs/short_pink.png"),
		shortSilver: require("./assets/images/characters/Female/backhairs/short_silver.png"),
		shortBrown: require("./assets/images/characters/Female/backhairs/short_brown.png"),
		shortBlondie: require("./assets/images/characters/Female/backhairs/short_blondie.png"),
		ponyDark: require("./assets/images/characters/Female/backhairs/pony_dark.png"),
		ponyPink: require("./assets/images/characters/Female/backhairs/pony_pink.png"),
		ponySilver: require("./assets/images/characters/Female/backhairs/pony_silver.png"),
		ponyBrown: require("./assets/images/characters/Female/backhairs/pony_brown.png"),
		ponyBlondie: require("./assets/images/characters/Female/backhairs/pony_blondie.png"),
		ponyMask: require("./assets/images/characters/Female/backhairs/pony_mask.png"),
		ponyOutline: require("./assets/images/characters/Female/backhairs/pony_outline.png"),
		ponyShadow: require("./assets/images/characters/Female/backhairs/pony_shadow.png"),
	},
	body: { body: require("./assets/images/characters/Female/base-body.png") },
	outfits: {
		seifuku1: require("./assets/images/characters/Female/outfits/seifuku-1.png"),
		seifuku2: require("./assets/images/characters/Female/outfits/seifuku-2.png"),
		hoodie: require("./assets/images/characters/Female/outfits/hoodie.png"),
		pajama: require("./assets/images/characters/Female/outfits/pajama.png"),
		peUniform: require("./assets/images/characters/Female/outfits/pe-uniform.png"),
		summerDress: require("./assets/images/characters/Female/outfits/summer-dress.png"),
		winterOutfit: require("./assets/images/characters/Female/outfits/winter-outfit.png"),
		towel: require("./assets/images/characters/Female/outfits/towel.png"),
	},
	fronthair: {
		longDark: require("./assets/images/characters/Female/fronthairs/long_dark.png"),
		longPink: require("./assets/images/characters/Female/fronthairs/long_pink.png"),
		longSilver: require("./assets/images/characters/Female/fronthairs/long_silver.png"),
		longBrown: require("./assets/images/characters/Female/fronthairs/long_brown.png"),
		longBlondie: require("./assets/images/characters/Female/fronthairs/long_blondie.png"),
		curlyDark: require("./assets/images/characters/Female/fronthairs/curly_dark.png"),
		curlyPink: require("./assets/images/characters/Female/fronthairs/curly_pink.png"),
		curlySilver: require("./assets/images/characters/Female/fronthairs/curly_silver.png"),
		curlyBrown: require("./assets/images/characters/Female/fronthairs/curly_brown.png"),
		curlyBlondie: require("./assets/images/characters/Female/fronthairs/curly_blondie.png"),
		shortDark: require("./assets/images/characters/Female/fronthairs/short_dark.png"),
		shortPink: require("./assets/images/characters/Female/fronthairs/short_pink.png"),
		shortSilver: require("./assets/images/characters/Female/fronthairs/short_silver.png"),
		shortBrown: require("./assets/images/characters/Female/fronthairs/short_brown.png"),
		shortBlondie: require("./assets/images/characters/Female/fronthairs/short_blondie.png"),
		thickDark: require("./assets/images/characters/Female/fronthairs/thick_dark.png"),
		thickPink: require("./assets/images/characters/Female/fronthairs/thick_pink.png"),
		thickSilver: require("./assets/images/characters/Female/fronthairs/thick_silver.png"),
		thickBrown: require("./assets/images/characters/Female/fronthairs/thick_brown.png"),
		thickBlondie: require("./assets/images/characters/Female/fronthairs/thick_blondie.png"),
	},
	expression: {
		normal: require("./assets/images/characters/Female/expressions/normal.png"),
		angry: require("./assets/images/characters/Female/expressions/angry.png"),
		annoyed: require("./assets/images/characters/Female/expressions/annoyed.png"),
		delighted: require("./assets/images/characters/Female/expressions/delighted.png"),
		laugh: require("./assets/images/characters/Female/expressions/laugh.png"),
		sad: require("./assets/images/characters/Female/expressions/sad.png"),
		shocked: require("./assets/images/characters/Female/expressions/shocked.png"),
		sleepy: require("./assets/images/characters/Female/expressions/sleepy.png"),
		smile: require("./assets/images/characters/Female/expressions/smile.png"),
		smile2: require("./assets/images/characters/Female/expressions/smile2.png"),
		smug: require("./assets/images/characters/Female/expressions/smug.png"),
	},
	accessories1: {
		blackGlasses: require("./assets/images/characters/Female/accessories/black-glasses.png"),
		circleGlasses: require("./assets/images/characters/Female/accessories/circle-glasses.png"),
		redGlasses: require("./assets/images/characters/Female/accessories/red-glasses.png"),
	},
	accesories2: { choker: require("./assets/images/characters/Female/accessories/choker.png") },
	accesories3: { flower: require("./assets/images/characters/Female/accessories/flower.png") },
};

const bgImages = {
	schoolDay: require("./assets/images/bg/School_Hallway_Day.jpg"),
	classroomDay: require("./assets/images/bg/Classroom_Day.jpg"),
	bedroomDay: require("./assets/images/bg/Bedroom_Day.jpg"),
	bedroomEvening: require("./assets/images/bg/Bedroom_Evening.jpg"),
	bedroomNight: require("./assets/images/bg/Bedroom_Night.jpg"),
	bedroomNightDark: require("./assets/images/bg/Bedroom_Night_Dark.jpg"),
	cafeteriaDay: require("./assets/images/bg/Cafeteria_Day.jpg"),
	cityAfternoon: require("./assets/images/bg/City_Afternoon.jpg"),
	cityMorning: require("./assets/images/bg/City_Morning.jpg"),
	cityNight: require("./assets/images/bg/City_Night.jpg"),
	cityRaining: require("./assets/images/bg/City_Raining.jpg"),
	kitchenDay: require("./assets/images/bg/Kitchen_Day.jpg"),
	kitchenNight: require("./assets/images/bg/Kitchen_Night.jpg"),
	livingroomDark: require("./assets/images/bg/Livingroom_Dark.jpg"),
	livingroomDay: require("./assets/images/bg/Livingroom_Day.jpg"),
	livingroomNight: require("./assets/images/bg/Livingroom_Night.jpg"),
	streetAutumnDay: require("./assets/images/bg/Street_Autumn_Day.jpg"),
	streetAutumnEvening: require("./assets/images/bg/Street_Autumn_Evening.jpg"),
	streetAutumnNight: require("./assets/images/bg/Street_Autumn_Night.jpg"),
	streetSpringDay: require("./assets/images/bg/Street_Spring_Day.jpg"),
	streetSpringEvening: require("./assets/images/bg/Street_Spring_Evening.jpg"),
	streetSpringNight: require("./assets/images/bg/Street_Spring_Night.jpg"),
	streetSpringRain: require("./assets/images/bg/Street_Spring_Rain.jpg"),
	streetSummerDay: require("./assets/images/bg/Street_Summer_Day.jpg"),
	streetSummerEvening: require("./assets/images/bg/Street_Summer_Evening.jpg"),
	streetSummerNight: require("./assets/images/bg/Street_Summer_Night.jpg"),
	streetSummerRain: require("./assets/images/bg/Street_Summer_Rain.jpg"),
	streetSummerStars: require("./assets/images/bg/Street_Summer_Stars.jpg"),
};

/* Actual application */
const Game = () => {
	useDocumentTitle("Superstar");

	/* Start loading screen */
	const loadingScreen = (
		<div className="center">
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
			<div className="wave"></div>
		</div>
	);

	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const handle = useFullScreenHandle();
	/* 	Adds a prompt when user leave/refresh/back/forward page (Only works when user already interacted with the page) by Markad */
	useBeforeunload((e: any) => {
		e.preventDefault();
	});
	const loadingFinished = () => {
		dispatch({ type: ActionTypes.SHOWTITLE });
	};
	/* Loading finished listener */
	useEffect(() => {
		window.addEventListener("load", loadingFinished);
		return () => window.removeEventListener("load", loadingFinished);
	}, []);
	console.log(state);

	return (
		<FullScreen
			handle={handle}
			onChange={(isFullscreen) => dispatch({ type: ActionTypes.ISFULLSCREEN, payload: isFullscreen })}
			className="relative aspect-video w-[1280px] overflow-hidden border border-rose-400"
		>
			{state.isLoading && loadingScreen}
			{state.introShown && <InitialBrand dispatch={dispatch} />}
			{state.titleScreenShown && (
				<TitleScreen dispatch={dispatch} handle={handle} bgMusic={bgMusic} story={story} />
			)}
			{state.gameIsRendering && (
				<motion.div
					variants={animationBody}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.23 }}
				>
					<SceneManager
						bgImages={bgImages}
						characters={characters}
						dispatch={dispatch}
						state={state}
						bgMusic={bgMusic}
						femaleSprites={femaleSprites}
						story={story}
					/>
				</motion.div>
			)}
			<ReactHowler src={state.bgMusic} playing={true} />
		</FullScreen>
	);
};
export default Game;
