/* Dependencies */
import { useReducer, useEffect } from "react";
import useBeforeunload from "./hooks/useBeforeunload";
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
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

/* Types */
import { ActionTypes, Action, State } from "./types/enum";

/* Pre-load Assets */
import bgMusic from "./loader/bgMusic";
import femaleSprites from "./loader/femaleSprites";
import bgImages from "./loader/bgImages";
import SceneEditor from "./components/SceneEditor";

/* States */
const INITIAL_STATE: State = {
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
	/* App state  */
	configMenuShown: false,
	titleScreenShown: false,
	introShown: false,
	scenceIsRendering: false,
	sceneeditorIsRendering: false,
	backlogShown: false,
	textBoxShown: true,
	saveMenuShown: false,
	loadMenuShown: false,
	isSkipping: false,
	isLoading: true,
};

/* Reducer function to control all state */
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
		case "startScene": {
			return { ...state, scenceIsRendering: true };
		}
		case "startEditor": {
			return { ...state, titleScreenShown: false, sceneeditorIsRendering: true };
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

/* Framer motion animation */
const animationBody: any = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

/* Actual application */
const App = () => {
	/* Set document title by Markad */
	useDocumentTitle("Superstar");

	/* Start loading screen with Effect by Markad */
	const wave = () => {
		let wave = [];
		for (let i = 0; i < 10; i++) {
			wave.push(<div key={i} style={{ animationDelay: `${i * 0.1}s` }} className="wave"></div>);
		}
		return wave;
	};
	const loadingScreen = <div className="flex h-full items-center justify-center">{wave()}</div>;

	/* Initialize reducer with initial state */
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

	/* Used to handle full screen */
	const handle: FullScreenHandle = useFullScreenHandle();

	/* 	Adds a prompt when user leave/refresh/back/forward page (Only works when user already interacted with the page) by Markad */
	useBeforeunload((e: any) => {
		e.preventDefault();
	});

	/* Listens when assets finished loading to start title screen */
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
			className={`relative aspect-video w-[1280px] overflow-hidden ${
				state.scenceIsRendering && !state.isFullscreen && "border border-rose-400"
			}`}
		>
			{state.isLoading && loadingScreen}
			{state.introShown && <InitialBrand dispatch={dispatch} />}
			{state.titleScreenShown && (
				<TitleScreen dispatch={dispatch} handle={handle} bgMusic={bgMusic} story={story} />
			)}
			{state.scenceIsRendering && (
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
			{state.sceneeditorIsRendering && (
				<motion.div
					variants={animationBody}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ duration: 0.23 }}
				>
					<SceneEditor
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
			<ReactHowler src={state.bgMusic} playing={true} volume={0.1} loop={true} />
		</FullScreen>
	);
};
export default App;
