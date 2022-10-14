/* Dependencies */
import { useReducer, useEffect, useState } from "react";
import useBeforeunload from "./hooks/useBeforeunload";
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import { motion } from "framer-motion";
import ReactHowler from "react-howler";

/* Styles */

/* Components */
import InitialBrand from "./components/InitialBrand";
import TitleScreen from "./components/TitleScreen";
import SceneManager from "./components/SceneManager";
import OptionsButton from "./components/OptionsButton";

/* Hooks; */
import useDocumentTitle from "./hooks/useDocumentTitle";

/* Initial data */
import characters from "./assets/story/characters.json";
import story from "./assets/story/story.json";

/* Types */
import { ActionTypes, Action, State } from "./types/enum";

/* Pre-load Assets */
import bgMusic from "./loader/bgMusic";
import femaleSprites from "./loader/femaleSprites";
import bgImages from "./loader/bgImages";
import SceneEditor from "./components/SceneEditor";
import { useLocalStorage } from "./hooks/useLocalStorage";
import useWindowSize from "./hooks/useWindowSize";
import useScreenOrientation from "./hooks/useScreenOrientation";

/* Loading screen */
const loadingScreen = (
	<ul className="loader">
		<li className="center"></li>
		<li className="item item-1"></li>
		<li className="item item-2"></li>
		<li className="item item-3"></li>
		<li className="item item-4"></li>
		<li className="item item-5"></li>
		<li className="item item-6"></li>
		<li className="item item-7"></li>
		<li className="item item-8"></li>
	</ul>
);

/* States */
const INITIAL_STATE: State = {
	/* config state */
	bgMusic: bgMusic.menu,
	bgmVolume: 80,
	bgmPlaying: true,
	soundEffectVolume: 90,
	voiceVolume: 100,
	font: "Handwritten",
	isFullscreen: false,
	/* Story state */
	choicesStore: {},
	index: "main-0",
	stateHistory: [],
	choicesHistory: [],
	choicesIndexHistory: [],
	indexHistory: [],
	choicesExist: false,
	/* App state  */
	configMenuShown: false,
	titleScreenShown: false,
	introShown: false,
	sceneIsRendering: false,
	sceneeditorIsRendering: false,
	backlogShown: false,
	textBoxShown: true,
	saveMenuShown: false,
	loadMenuShown: false,
	isSkipping: false,
	isLoading: true,
	isDebug: true,
};

/* Reducer function to control all state */
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "setVolume": {
			return state;
		}
		case "bgmToggle": {
			return { ...state, bgmPlaying: !state.bgmPlaying };
		}
		case "menuToggle": {
			return { ...state, configMenuShown: !state.configMenuShown };
		}
		case "menuOff": {
			return { ...state, configMenuShown: false };
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
			return { ...state, sceneIsRendering: true };
		}
		case "startEditor": {
			return { ...state, titleScreenShown: false, sceneeditorIsRendering: true };
		}
		case "nextFrame": {
			return { ...state, index: action.payload };
		}
		case "changeBgm": {
			return { ...state, bgMusic: action.payload };
		}
		case "reset": {
			setTimeout(() => {}, 3500);
			return { ...INITIAL_STATE, titleScreenShown: true, isLoading: false };
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

	/* Initialize reducer with initial state */
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	let loadDelay = state.isDebug ? 0 : 3500;
	state.isDebug && console.log(state);

	/* Used to handle full screen */
	const handle: FullScreenHandle = useFullScreenHandle();
	const fullscreenToggle = () => {
		handle.active ? handle.exit() : handle.enter();
	};
	/* 	Adds a prompt when user leave/refresh/back/forward page (Only works when user already interacted with the page) by Markad */
	useBeforeunload((e: any) => {
		e.preventDefault();
	});

	/* Listens when assets finished loading to start title screen */
	const loadingFinished = () => {
		setTimeout(() => {
			dispatch({ type: ActionTypes.SHOWTITLE });
		}, loadDelay);
	};

	/* Loading finished listener */
	useEffect(() => {
		window.addEventListener("load", loadingFinished);
		return () => window.removeEventListener("load", loadingFinished);
	}, []);

	const bgmToggle = () => {
		dispatch({ type: ActionTypes.BGMTOGGLE });
	};

	const configMenuToggle = () => {
		dispatch({ type: ActionTypes.MENUTOGGLE });
	};

	const configMenuOff = () => {
		dispatch({ type: ActionTypes.MENUOFF });
	};
	const [storyState, setStoryState] = useLocalStorage("story", story);
	const [charactersState, setCharactersState] = useLocalStorage("characters", characters);
	const { height, width } = useWindowSize();
	const screenOrientation = useScreenOrientation();
	const [screenSize, setScreenSize] = useState(
		width > height
			? {
					width: width / height > 16 / 9 ? "auto" : width,
					height: width / height > 16 / 9 ? height : "auto",
					aspectRatio: "16/9",
			  }
			: {
					height: width / height > 16 / 9 ? width : "auto",
					width: width / height > 16 / 9 ? "auto" : height,
					aspectRatio: "16/9",
			  }
	);
	useEffect(() => {
		setScreenSize(
			width > height
				? {
						width: width / height > 16 / 9 ? "auto" : width,
						height: width / height > 16 / 9 ? height : "auto",
						aspectRatio: "16/9",
				  }
				: {
						height: width / height > 16 / 9 ? width : "auto",
						width: width / height > 16 / 9 ? "auto" : height,
						aspectRatio: "16/9",
				  }
		);
	}, [height, width]);
	return (
		<>
			{state.isLoading && loadingScreen}

			{!state.isLoading && (
				<FullScreen
					handle={handle}
					onChange={(isFullscreen) => dispatch({ type: ActionTypes.ISFULLSCREEN, payload: isFullscreen })}
				>
					<div className="relative overflow-hidden" style={screenSize}>
						{state.introShown && <InitialBrand dispatch={dispatch} />}

						{state.titleScreenShown && (
							<TitleScreen
								dispatch={dispatch}
								handle={handle}
								bgMusic={bgMusic}
								story={story}
								screenOrientation={screenOrientation}
							/>
						)}

						{state.sceneIsRendering && (
							<motion.div
								variants={animationBody}
								initial="initial"
								animate="animate"
								exit="exit"
								transition={{ duration: 0.23 }}
							>
								<SceneManager
									bgImages={bgImages}
									characters={charactersState}
									dispatch={dispatch}
									state={state}
									bgMusic={bgMusic}
									femaleSprites={femaleSprites}
									story={storyState}
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
									characters={charactersState}
									dispatch={dispatch}
									state={state}
									bgMusic={bgMusic}
									femaleSprites={femaleSprites}
									story={storyState}
									setCharacters={setCharactersState}
									setStory={setStoryState}
								/>
							</motion.div>
						)}

						{!state.isLoading && (
							<OptionsButton
								state={state}
								bgmToggle={bgmToggle}
								fullscreenToggle={fullscreenToggle}
								handle={handle}
								configMenuToggle={configMenuToggle}
								dispatch={dispatch}
								configMenuOff={configMenuOff}
							/>
						)}

						{!state.isLoading && (
							<ReactHowler src={state.bgMusic} playing={state.bgmPlaying} volume={0.5} loop={true} />
						)}
					</div>
				</FullScreen>
			)}
		</>
	);
};

export default App;
