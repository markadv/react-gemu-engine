/* Dependencies */
import { useReducer, useEffect, useState } from "react";
import useBeforeunload from "./hooks/useBeforeunload";
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import { motion } from "framer-motion";
import ReactHowler from "react-howler";
import { useSound } from "use-sound";

/* Styles */

/* Components */
import InitialBrand from "./components/InitialBrand";
import TitleScreen from "./components/TitleScreen";
import SceneManager from "./components/SceneManager";
import OptionsButtons from "./components/OptionsButtons";
import Disclaimer from "./components/Disclaimer";
import SceneEditor from "./components/SceneEditor";

/* Hooks; */
import useDocumentTitle from "./hooks/useDocumentTitle";
import { useLocalStorage } from "./hooks/useLocalStorage";
import useWindowSize from "./hooks/useWindowSize";
import useScreenOrientation from "./hooks/useScreenOrientation";

/* Initial data */
import characters from "./assets/story/characters.json";
import story from "./assets/story/story.json";

/* Types */
import { ActionTypes, Action, State, ISimpleAnimation } from "./types/enum";

/* Pre-load Assets */
import bgMusic from "./loader/bgMusic";
import femaleSprites from "./loader/femaleSprites";
import bgImages from "./loader/bgImages";
import sfx from "./loader/sfx";
import voices from "./loader/voices";
import videos from "./loader/videos";

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
	bgmVolume: 50,
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
	onTitleScreen: false,
	onIntro: false,
	onSceneManager: false,
	onSceneEditor: false,
	/* Options */
	configMenuShown: false,
	backlogShown: false,
	textBoxShown: true,
	saveMenuShown: false,
	loadMenuShown: false,
	isSkipping: false,
	isLoading: true,
	isDebug: false,
	isDemo: true,
	onDisclaimer: true,
	assetLoadingTime: 3500,
};

/* Reducer function to control all state */
const reducer = (state: State, action: Action): State => {
	switch (action.type) {
		case "setVolume": {
			return { ...state, bgmVolume: action.payload };
		}
		case "bgmToggle": {
			return { ...state, bgmPlaying: !state.bgmPlaying };
		}
		case "bgmOff": {
			return { ...state, bgmPlaying: false };
		}
		case "bgmOn": {
			return { ...state, bgmPlaying: true };
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
		case "showSplashPage": {
			return { ...state, isLoading: false, onDisclaimer: false };
		}
		case "showTitle": {
			return { ...state, onTitleScreen: true, isLoading: false };
		}
		case "showIntro": {
			return { ...state, onTitleScreen: false, onIntro: true };
		}
		case "startScene": {
			return { ...state, onSceneEditor: false, onSceneManager: true };
		}
		case "startEditor": {
			return { ...state, onTitleScreen: false, onSceneEditor: true };
		}
		case "closeEditor": {
			return { ...state, onSceneEditor: false };
		}
		case "nextFrame": {
			return { ...state, index: action.payload };
		}
		case "changeBgm": {
			return { ...state, bgMusic: action.payload };
		}
		case "playDemo": {
			return { ...state, isDemo: action.payload };
		}
		case "reset": {
			setTimeout(() => {}, 3500);
			return {
				...INITIAL_STATE,
				onTitleScreen: true,
				isLoading: false,
				bgmPlaying: state.bgmPlaying,
				onDisclaimer: false,
			};
		}
		default:
			return INITIAL_STATE;
	}
};

/* Framer motion animation */
const animationBody: ISimpleAnimation = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

/* Actual application */
const App = () => {
	/* Initialize reducer with initial state */
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	/* Set document title by Markad */
	useDocumentTitle("Visual Novel Maker");
	/* SFX */
	const [playCheckSfx] = useSound(sfx.check, { volume: 0.05 });
	const [playStartSfx] = useSound(sfx.start, { volume: 0.05 });
	const [playHoverSfx] = useSound(sfx.hover, { volume: 0.02 });
	const [playClickSfx] = useSound(sfx.click, { volume: 0.05 });
	const [playVoicesSfx] = useSound(voices.goodmorning, { volume: 0.2 });

	let loadDelay = state.isDebug ? 0 : state.assetLoadingTime;
	state.isDebug && console.log(state);

	/* Used to handle full screen */
	const handle: FullScreenHandle = useFullScreenHandle();
	const fullscreenToggle = () => {
		handle.active ? handle.exit() : handle.enter();
	};
	/* 	Adds a prompt when user leave/refresh/back/forward page (Only works when user already interacted with the page) by Markad */
	useBeforeunload((e: Event) => {
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

	const bgmToggle = () => dispatch({ type: ActionTypes.BGMTOGGLE });
	const configMenuOff = () => dispatch({ type: ActionTypes.MENUOFF });

	const configMenuToggle = () => {
		if (!state.onTitleScreen) {
			dispatch({ type: ActionTypes.MENUTOGGLE });
		}
	};

	/* New state for user created games */
	const [storyState, setStoryState] = useLocalStorage("story", story);
	const [charactersState, setCharactersState] = useLocalStorage("characters", characters);

	/* Aspect ratio by Markad */
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

	/* Due to performance need for the game, conditional is in render to make sure that it will not rerender every instance by Markad */
	return (
		<>
			{state.isLoading && loadingScreen}
			{!state.isLoading && state.onDisclaimer && <Disclaimer dispatch={dispatch} playCheckSfx={playCheckSfx} />}
			{!state.isLoading && !state.onDisclaimer && (
				<FullScreen
					handle={handle}
					onChange={(isFullscreen) => dispatch({ type: ActionTypes.ISFULLSCREEN, payload: isFullscreen })}
				>
					<div className="relative overflow-hidden" style={screenSize}>
						{state.onIntro && <InitialBrand dispatch={dispatch} />}
						{state.onTitleScreen && (
							<TitleScreen
								dispatch={dispatch}
								handle={handle}
								bgMusic={bgMusic}
								story={story}
								storyState={storyState}
								screenOrientation={screenOrientation}
								playStartSfx={playStartSfx}
								playHoverSfx={playHoverSfx}
							/>
						)}
						{state.onSceneManager && (
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
									story={state.isDemo ? story : storyState}
									screenOrientation={screenOrientation}
									videos={videos}
								/>
							</motion.div>
						)}

						{state.onSceneEditor && (
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
									handle={handle}
									playHoverSfx={playHoverSfx}
									playClickSfx={playClickSfx}
									playVoicesSfx={playVoicesSfx}
									videos={videos}
								/>
							</motion.div>
						)}

						{!state.onTitleScreen && (
							<OptionsButtons
								state={state}
								bgmToggle={bgmToggle}
								fullscreenToggle={fullscreenToggle}
								handle={handle}
								configMenuToggle={configMenuToggle}
								dispatch={dispatch}
								configMenuOff={configMenuOff}
								playStartSfx={playStartSfx}
								playHoverSfx={playHoverSfx}
								playClickSfx={playClickSfx}
							/>
						)}

						{!state.isLoading && (
							<ReactHowler
								src={state.bgMusic}
								playing={state.bgmPlaying}
								volume={state.bgmVolume / 150}
								loop={true}
							/>
						)}
					</div>
				</FullScreen>
			)}
		</>
	);
};

export default App;
