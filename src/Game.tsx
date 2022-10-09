/* Dependencies */
import { useReducer, useEffect } from "react";
import useBeforeunload from "./hooks/useBeforeunload";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { motion } from "framer-motion";
import useSound from "use-sound";
/* Styles */

/* Components */
import InitialBrand from "./components/InitialBrand";
import TitleScreen from "./components/TitleScreen";
import SceneManager from "./components/SceneManager";

/* Hooks; */
import useDocumentTitle from "./hooks/useDocumentTitle";

/* States */
const INITIAL_STATE = {
	/* config state */
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

enum ActionTypes {
	RESET = "reset",
	SETVOLUME = "setVolume",
	STARTGAME = "startGame",
	SHOWINTRO = "showIntro",
	SHOWTITLE = "showTitle",
	ISFULLSCREEN = "isfullscreen",
	ISLOADING = "isLoading",
	NEXTFRAME = "nextFrame",
}

/* Typescript interface */
interface Action {
	type: ActionTypes;
	payload?: any;
}
interface State {
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

const bgMusic = require("./assets/bgm/bgm.mp4");

const bgImages: any = {
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
	const [play, { stop }] = useSound(bgMusic, { loop: true });
	useDocumentTitle("Superstar");
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
			{state.titleScreenShown && <TitleScreen dispatch={dispatch} handle={handle} playMusic={play} />}
			{state.gameIsRendering && (
				<motion.div
					variants={animationBody}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.23 }}
				>
					<SceneManager bgImages={bgImages} dispatch={dispatch} ActionTypes={ActionTypes} />
				</motion.div>
			)}
		</FullScreen>
	);
};

export default Game;
