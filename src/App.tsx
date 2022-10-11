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

	/* To be used for sound button */
	// const wave = () => {
	// 	let wave = [];
	// 	for (let i = 0; i < 10; i++) {
	// 		wave.push(<div key={i} style={{ animationDelay: `${i * 0.1}s` }} className="wave"></div>);
	// 	}
	// 	return wave;
	// };
	// const loadingScreen = <div className="flex h-full items-center justify-center">{wave()}</div>;

	/* Initialize reducer with initial state */
	const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
	let loadDelay = state.isDebug ? 0 : 3500;
	state.isDebug && console.log(state);

	/* Used to handle full screen */
	const handle: FullScreenHandle = useFullScreenHandle();

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

	return (
		<>
			{state.isLoading && loadingScreen}
			<div className="flex h-full flex-col items-center justify-center bg-slate-50">
				<FullScreen
					handle={handle}
					onChange={(isFullscreen) => dispatch({ type: ActionTypes.ISFULLSCREEN, payload: isFullscreen })}
					className={`relative h-[360px] w-[640px] overflow-hidden md:h-[423px] md:w-[768px] lg:h-[576px] lg:w-[1024px] xl:h-[720px] xl:w-[1280px] 2xl:h-[864px]  2xl:w-[1536px]
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
			</div>
		</>
	);
};

export default App;
