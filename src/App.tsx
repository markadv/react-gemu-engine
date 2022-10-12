/* Dependencies */
import { useReducer, useEffect } from "react";
import useBeforeunload from "./hooks/useBeforeunload";
import { FullScreen, FullScreenHandle, useFullScreenHandle } from "react-full-screen";
import { AnimatePresence, motion } from "framer-motion";
import ReactHowler from "react-howler";

/* Styles */
import { IoSettingsOutline } from "react-icons/io5";
import { GiMusicalNotes } from "react-icons/gi";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";

/* Components */
import InitialBrand from "./components/InitialBrand";
import TitleScreen from "./components/TitleScreen";
import SceneManager from "./components/SceneManager";

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
import ConfigMenuScreen from "./components/ConfigMenuScreen";
import Tippy from "@tippyjs/react";
import { useLocalStorage } from "./hooks/useLocalStorage";

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
			return { ...state, index: state.index + 1 };
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
	return (
		<>
			{state.isLoading && loadingScreen}

			{!state.isLoading && (
				<FullScreen
					handle={handle}
					onChange={(isFullscreen) => dispatch({ type: ActionTypes.ISFULLSCREEN, payload: isFullscreen })}
					className={`gamescreen relative h-[360px] w-[640px] overflow-hidden md:h-[423px] md:w-[768px] lg:h-[576px] lg:w-[1024px] xl:h-[720px] xl:w-[1280px] 2xl:h-[864px]  2xl:w-[1536px]
							${(state.sceneIsRendering || state.sceneeditorIsRendering) && !state.isFullscreen && "border border-rose-400"}`}
				>
					{state.introShown && <InitialBrand dispatch={dispatch} />}

					{state.titleScreenShown && (
						<TitleScreen dispatch={dispatch} handle={handle} bgMusic={bgMusic} story={story} />
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

					{(state.sceneIsRendering || state.titleScreenShown) && (
						<div className="absolute top-0 right-0 h-[5.5%] w-[9%] rounded-bl-xl bg-black opacity-25"></div>
					)}

					{!state.isLoading && (
						<Tippy
							appendTo="parent"
							content={
								<div className="rounded-lg bg-[#E379F4] p-1">
									<span className="text-sm text-slate-50">BGM On/Off</span>
								</div>
							}
							placement="bottom"
						>
							<motion.div
								className={`absolute cursor-pointer ${
									state.sceneIsRendering || state.titleScreenShown
										? "top-[0.9%] right-[3.3%] text-[1.5vw]"
										: "top-[2.5%] right-[7.5%] text-[2.4vw]"
								} ${state.bgmPlaying ? "animate-pulse text-[#E879F9]" : "opacity-50 grayscale"}`}
								onClick={bgmToggle}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
							>
								<GiMusicalNotes />
							</motion.div>
						</Tippy>
					)}

					{!state.isLoading && (
						<Tippy
							appendTo="parent"
							content={
								<div className="rounded-lg bg-[#E379F4] p-1">
									<span className="text-sm text-slate-50">Fullscreen</span>
								</div>
							}
							placement="bottom"
						>
							<motion.div
								className={`absolute cursor-pointer ${
									state.sceneIsRendering || state.titleScreenShown
										? "top-[0.9%] right-[6%] text-[1.5vw]"
										: "top-[2.5%] right-[12.5%] text-[2.3vw]"
								} text-[#E879F9]`}
								onClick={fullscreenToggle}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
							>
								{handle.active ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
							</motion.div>
						</Tippy>
					)}

					{!state.isLoading && (
						<Tippy
							appendTo="parent"
							content={
								<div className="rounded-lg bg-[#E379F4] p-1">
									<span className="text-sm text-slate-50">Settings</span>
								</div>
							}
							placement="bottom"
						>
							<motion.div
								className={`absolute cursor-pointer ${
									state.sceneIsRendering || state.titleScreenShown
										? "top-[0.5%] right-[.5%] text-[1.75vw]"
										: "top-[2.5%] right-[2.5%] text-[2.4vw]"
								} ${state.titleScreenShown ? "text-slate-500 opacity-50" : "text-[#E879F9]"}`}
								onClick={configMenuToggle}
								whileHover={{ scale: 1.2 }}
								whileTap={{ scale: 0.9 }}
							>
								<IoSettingsOutline />
							</motion.div>
						</Tippy>
					)}

					<AnimatePresence>
						{state.configMenuShown && (
							<ConfigMenuScreen dispatch={dispatch} configMenuOff={configMenuOff} />
						)}
					</AnimatePresence>

					{!state.isLoading && (
						<ReactHowler src={state.bgMusic} playing={state.bgmPlaying} volume={0.1} loop={true} />
					)}
				</FullScreen>
			)}
		</>
	);
};

export default App;
