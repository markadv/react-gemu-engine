/* Dependencies */
import { useReducer } from "react";
import useBeforeunload from "./hooks/useBeforeunload";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { motion } from "framer-motion";
/* Styles */
import "./Game.css";

/* Components */
import InitialBrand from "./components/InitialBrand";
import TitleScreen from "./components/TitleScreen";
import SceneManager from "./components/SceneManager";

/* Hooks; */
import useIntro from "./hooks/useIntro";

/* States */
const INITIAL_STATE = {
	bgmVolume: 80,
	soundEffectVolume: 90,
	voiceVolume: 100,
	font: "Trebuchet MS",
	isFullscreen: false,
	choicesStore: {},
	index: 0,
	stateHistory: [],
	choicesHistory: [],
	choicesIndexHistory: [],
	indexHistory: [],
	choicesExist: false,
	configMenuShown: false,
	titleScreenShown: false,
	gameIsRendering: true,
	backlogShown: false,
	textBoxShown: true,
	saveMenuShown: false,
	loadMenuShown: false,
	isSkipping: false,
};

enum ActionTypes {
	RESET = "reset",
	SETVOLUME = "setVolume",
	STARTGAME = "startGame",
}

/* Typescript interface */
interface Action {
	type: ActionTypes;
	payload: any;
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
	gameIsRendering: boolean;
	backlogShown: boolean;
	textBoxShown: boolean;
	saveMenuShown: boolean;
	loadMenuShown: boolean;
	isSkipping: boolean;
}

/* Reducer function */
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "setVolume": {
			return state;
		}
		case "startGame": {
			return { ...state, gameIsRendering: true, titleScreenShown: false };
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

const allImages = { bg1: require("./assets/images/bg/City_Night.jpg") };
const bgImages = {
	schoolDay: require("./assets/images/bg/School_Hallway_Day.jpg"),
	classroomDay: require("./assets/images/bg/Classroom_Day.jpg"),
};

/* Actual application */
const Game = () => {
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	const handle = useFullScreenHandle();
	const showAnimation = useIntro();
	/* 	Adds a prompt when user leave/refresh/back/forward page (Only works when user already interacted with the page) by Markad */
	useBeforeunload((e: any) => {
		e.preventDefault();
	});

	return (
		<>
			{showAnimation && <InitialBrand />}
			<FullScreen
				handle={handle}
				className="relative aspect-video w-[1280px] overflow-hidden border border-rose-400"
			>
				{/* <TitleScreen dispatch={dispatch} handle={handle} /> */}
				{state.gameIsRendering && (
					<motion.div
						variants={animationBody}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ duration: 0.23 }}
					>
						<SceneManager bg={allImages.bg1} />
					</motion.div>
				)}
			</FullScreen>
		</>
	);
};

export default Game;
