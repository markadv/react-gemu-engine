/* Dependencies; */
import { useReducer, useEffect, useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tippy from "@tippyjs/react";
import { ToastContainer, toast } from "react-toastify";
import Joyride from "react-joyride";

/* Component */
import CharacterMaker from "./CharacterMaker";
import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";

/* Styles */
import { ImImages } from "react-icons/im";
import { MdOutlineKeyboardVoice, MdRadio } from "react-icons/md";
import { BsFillPersonFill, BsFillArrowRightCircleFill, BsPlayBtn, BsMegaphone, BsCameraVideo } from "react-icons/bs";
import { FiMessageSquare, FiSave } from "react-icons/fi";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";
import "react-toastify/dist/ReactToastify.css";

/* Types */
import {
	ActionTypes,
	ManagerProps,
	CharTypes,
	SceneTypes,
	IEditScene,
	IEditChar,
	EditCharState,
	EditSceneState,
	IMenuButtons,
} from "../types/enum";

/* Data */
import DatalistInput from "./DatalistInput";
import VideoScene from "./VideoScene";
import { GiChoice } from "react-icons/gi";

const INITIAL_CHAR = {
	spriteName: "default",
	parts: {
		haircolor: "dark",
		backhair: "long",
		body: "body",
		outfits: "seifuku1",
		fronthair: "long",
		expression: "normal",
		accessories1: "",
		accessories2: "",
		accessories3: "",
	},
	inCharacterEditMode: false,
	haircolorIndex: 0,
	fronthairIndex: 0,
	backhairIndex: 0,
	outfitsIndex: 0,
	expressionIndex: 0,
	accessories1Index: 0,
	accessories2Index: 0,
	accessories3Index: 0,
};

const INITIAL_SCENE = {
	index: "main-0",
	type: "scene",
	bg: { media: "schoolDay", transition: null, animate: null },
	characters: [
		{ location: "left", sprite: "Chisato-Smile2", transition: null, animate: null, enabled: true },
		{ location: "right", sprite: "Kanon-Smile", transition: null, animate: null, enabled: true },
	],
	bgm: "menu",
	voice: "test",
	sfx: "test",
	speaker: {
		name: "test",
		location: "left",
	},
	text: "test",
	bgIndex: 0,
	bgmIndex: 0,
	enableDialogue: true,
	choices: [],
	next: "main-1",
	videoIndex: "start",
};

const SceneEditor = ({
	dispatch,
	bgImages,
	characters,
	state,
	bgMusic,
	femaleSprites,
	story,
	setCharacters,
	setStory,
	screenOrientation,
	handle,
	playHoverSfx,
	playClickSfx,
	playVoicesSfx,
	videos,
}: ManagerProps) => {
	/* List of assets */
	const haircolorList = Object.keys(femaleSprites.fronthair);
	const hairList = Object.keys(femaleSprites.fronthair[haircolorList[0]]);
	const outfitsList = Object.keys(femaleSprites.outfits);
	const expressionList = Object.keys(femaleSprites.expression);
	const accessories1List = Object.keys(femaleSprites.accessories1);
	const accessories2List = Object.keys(femaleSprites.accessories2);
	const accessories3List = Object.keys(femaleSprites.accessories3);
	const bgImagesList = Object.keys(bgImages);
	const bgMusicList = Object.keys(bgMusic);
	accessories1List.unshift("");
	accessories2List.unshift("");
	accessories3List.unshift("");

	/* Controls character edits. */
	const editCharReducer = (state: EditCharState, action: IEditChar): EditCharState => {
		switch (action.type) {
			case "editCharacterToggle": {
				return { ...state, inCharacterEditMode: !state.inCharacterEditMode };
			}
			case "editCharacterClear": {
				return { ...state, inCharacterEditMode: false };
			}
			case "changeSpriteName": {
				return { ...state, spriteName: action.payload };
			}
			case "changeCharacterPart": {
				const partIndicator = action.payload;
				const partList: { [key: string]: string[] } = {
					haircolor: haircolorList,
					fronthair: hairList,
					backhair: hairList,
					outfits: outfitsList,
					expression: expressionList,
					accessories1: accessories1List,
					accessories2: accessories2List,
					accessories3: accessories3List,
				};
				const indexList: { [key: string]: number } = {
					haircolor: state.haircolorIndex,
					fronthair: state.fronthairIndex,
					backhair: state.backhairIndex,
					outfits: state.outfitsIndex,
					expression: state.expressionIndex,
					accessories1: state.accessories1Index,
					accessories2: state.accessories2Index,
					accessories3: state.accessories3Index,
				};
				let partSelected = partList[partIndicator];
				let indexSelected: number = indexList[partIndicator];
				if (indexSelected >= partSelected.length - 1) {
					return {
						...state,
						[partIndicator + "Index"]: 0,
						parts: { ...state.parts, [partIndicator]: partSelected[0] },
					};
				} else {
					return {
						...state,
						[partIndicator + "Index"]: indexSelected + 1,
						parts: {
							...state.parts,
							[partIndicator]: partSelected[indexSelected + 1],
						},
					};
				}
			}
			case "loadCharacter": {
				return { ...state, parts: { ...state["parts"], ...characters[action.payload] } };
			}
			case "reset": {
				return INITIAL_CHAR;
			}
			default:
				return INITIAL_CHAR;
		}
	};

	/* Controls scene edits */
	const editSceneReducer = (state: EditSceneState, action: IEditScene): EditSceneState => {
		switch (action.type) {
			case "changeBackground": {
				if (state.bgIndex >= bgImagesList.length - 1) {
					return {
						...state,
						bg: { ...state.bg, media: bgImagesList[0] },
						bgIndex: 0,
					};
				} else {
					return {
						...state,
						bg: { ...state.bg, media: bgImagesList[state.bgIndex + 1] },
						bgIndex: state.bgIndex + 1,
					};
				}
			}
			case "changeBgm": {
				if (state.bgmIndex >= bgMusicList.length - 1) {
					return {
						...state,
						bgm: bgMusicList[0],
						bgmIndex: 0,
					};
				} else {
					return {
						...state,
						bgm: bgMusicList[state.bgmIndex + 1],
						bgmIndex: state.bgmIndex + 1,
					};
				}
			}
			case "hideDialogue": {
				return { ...state, enableDialogue: !state.enableDialogue };
			}
			case "changeName": {
				return { ...state, speaker: { ...state.speaker, name: action.payload } };
			}
			case "changeText": {
				return { ...state, text: action.payload };
			}
			case "toggleCharacter": {
				let charIndex = state.characters.findIndex((row) => row.location === action.payload);
				let charactersArray = [...state.characters];
				charactersArray[charIndex] = {
					...state.characters[charIndex],
					enabled: !state.characters[charIndex].enabled,
				};
				return { ...state, characters: [...charactersArray] };
			}
			case "toggleSpeaker": {
				return {
					...state,
					speaker: { ...state.speaker, location: state.speaker.location === "right" ? "left" : "right" },
				};
			}
			case "loadScene": {
				return {
					...story[action.payload],
					bgIndex: bgImagesList.findIndex((rows) => rows === story[action.payload].bg.media),
					bgmIndex: bgMusicList.findIndex((rows) => rows === story[action.payload].bgm),
				};
			}
			case "setSceneIndex": {
				return { ...state, index: action.payload };
			}
			case "setNext": {
				return { ...state, next: action.payload };
			}
			case "setAnimate": {
				let newCharacters = [...state.characters];
				newCharacters[action.payload.index] = {
					...state.characters[action.payload.index],
					animate: action.payload.animate,
				};
				return { ...state, characters: newCharacters };
			}
			case "setVideo": {
				return { ...state, type: state.type === "scene" ? "video" : "scene" };
			}
			case "reset": {
				return INITIAL_SCENE;
			}
			default:
				return INITIAL_SCENE;
		}
	};

	const LOADED_INITIAL_SCENE = {
		...story[state.index],
		bgIndex: bgImagesList.findIndex((rows) => rows === story[state.index].bg.media),
		bgmIndex: bgMusicList.findIndex((rows) => rows === story[state.index].bgm),
	};

	/* If story exist and is not null, load story scene instead of initial scene */
	const [editSceneState, editSceneDispatch] = useReducer(
		editSceneReducer,
		story ? LOADED_INITIAL_SCENE : INITIAL_SCENE
	);

	const retrieveSprite = (spriteName: string) => {
		return {
			spriteName: spriteName,
			parts: {
				haircolor: characters[spriteName].haircolor,
				backhair: characters[spriteName].backhair,
				body: characters[spriteName].body,
				outfits: characters[spriteName].outfits,
				fronthair: characters[spriteName].fronthair,
				expression: characters[spriteName].expression,
				accessories1: characters[spriteName].accessories1 ? characters[spriteName].accessories1 : "",
				accessories2: characters[spriteName].accessories2 ? characters[spriteName].accessories2 : "",
				accessories3: characters[spriteName].accessories3 ? characters[spriteName].accessories3 : "",
			},
			inCharacterEditMode: false,
			haircolorIndex: haircolorList.findIndex((row) => row === characters[spriteName].haircolor) && 0,
			fronthairIndex: hairList.findIndex((row) => row === characters[spriteName].fronthair) && 0,
			backhairIndex: hairList.findIndex((row) => row === characters[spriteName].backhair) && 0,
			outfitsIndex: outfitsList.findIndex((row) => row === characters[spriteName].outfits) && 0,
			expressionIndex: expressionList.findIndex((row) => row === characters[spriteName].expression) && 0,
			accessories1Index: accessories1List.findIndex((row) => row === characters[spriteName].accessories1) && 0,
			accessories2Index: accessories2List.findIndex((row) => row === characters[spriteName].accessories2) && 0,
			accessories3Index: accessories3List.findIndex((row) => row === characters[spriteName].accessories3) && 0,
		};
	};

	/* Tour */
	const [{ run, steps }, setState] = useState<any>({
		run: true,
		steps: [
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">Let's begin our storytelling journey!</p>
				),
				placement: "center",
				target: "body",
			},
			{
				content: <p className="font-handwritten text-[1.3vw] font-bold">This is our editor control menu</p>,
				placement: "bottom",
				target: ".editor-control-menu",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our change background button. Change the background to set the location of the scene.
					</p>
				),
				placement: "bottom",
				target: ".changebg-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our change background music button. Change the music to set the mood here.
					</p>
				),
				placement: "bottom",
				target: ".changebgm-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our left character toggle button. Add or remove the left character here.
					</p>
				),
				placement: "bottom",
				target: ".toggle-leftchar-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our right character toggle button. Add or remove the right character here.
					</p>
				),
				placement: "bottom",
				target: ".toggle-rightchar-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our speaker toggle button. You can toggle the left or right speaker here.
					</p>
				),
				placement: "bottom",
				target: ".toggle-speaker-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our dialogue toggle button. If you want to focus on the characters, you can remove the
						dialogue box here.
					</p>
				),
				placement: "bottom",
				target: ".dialogue-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our change video button. You can display a video instead of a scene here.
					</p>
				),
				placement: "bottom",
				target: ".change-video-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our add voice button. You can add voice here to accent your dialogue. Don't overuse it
						thought.
					</p>
				),
				placement: "bottom",
				target: ".add-voice-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our choices button. You can add choices here for branching story path.
					</p>
				),
				placement: "bottom",
				target: ".add-choices",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our current scene control. You can add and load scene here. Make sure to save your
						changes otherwise it would not work.
					</p>
				),
				placement: "bottom",
				target: ".current-scene-combobox",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our next scene control. You can add the next scene for this current path here. You can
						choose end to end the story in this scene.
					</p>
				),
				placement: "bottom",
				target: ".next-scene-combobox",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our character. Click her to reveal the controls to change how she looks.
					</p>
				),
				placement: "top-end",
				target: ".character-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our name input box. Change the name of the character speaking here.
					</p>
				),
				placement: "top",
				target: ".edit-name-box",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our dialogue input box. Write the conversation here.
					</p>
				),
				placement: "top",
				target: ".edit-dialogue-box",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our very important save button. Make sure to save your progress per scene here.
					</p>
				),
				placement: "bottom",
				target: ".save-button",
			},
			{
				content: (
					<p className="font-handwritten text-[1.3vw] font-bold">
						This is our play button. Click this to play your created visual novel.
					</p>
				),
				placement: "bottom",
				target: ".play-button",
			},
			// {
			// 	content: (
			// 		<p className="font-handwritten text-[1.3vw] font-bold">
			// 			This is our left character (because she is on the left). Click her to change how she looks.
			// 		</p>
			// 	),
			// 	placement: "top",
			// 	target: ".character-control",
			// },
		],
	});

	const notify = () => toast.success("Saving successful");

	const storyCharacterCheck = () => {
		if (story[state.index].characters.length > 0) {
			return [...story[state.index].characters];
		}
	};
	/* Check if there is a left character in the initial state */
	const checkCharacter = (location: string) => {
		interface storyCharacter {
			location: string;
			sprite: string;
			transition: string | null;
		}
		let charactersArr = storyCharacterCheck();
		if (charactersArr) {
			let leftCharacter = charactersArr.find((character: storyCharacter) => character.location === location);
			return retrieveSprite(leftCharacter.sprite);
		} else {
			return INITIAL_CHAR;
		}
	};

	const [editChar1State, editChar1Dispatch] = useReducer(editCharReducer, checkCharacter("left"));
	const [editChar2State, editChar2Dispatch] = useReducer(editCharReducer, checkCharacter("right"));
	console.log(editSceneState, editChar1State, editChar2State);
	/* Character scripts */
	const editCharacter1Toggle = () => {
		editChar1Dispatch({ type: CharTypes.EDITCHARACTER });
	};
	const handleClickOutside1 = () => {
		editChar1Dispatch({ type: CharTypes.EDITCHARACTERCLEAR });
	};
	const editCharacter2Toggle = () => {
		editChar2Dispatch({ type: CharTypes.EDITCHARACTER });
	};
	const handleClickOutside2 = () => {
		editChar2Dispatch({ type: CharTypes.EDITCHARACTERCLEAR });
	};

	const enableCharacter1 = (character: string) => {
		editSceneDispatch({ type: SceneTypes.TOGGLECHARACTER, payload: "left" });
	};
	const enableCharacter2 = (character: string) => {
		editSceneDispatch({ type: SceneTypes.TOGGLECHARACTER, payload: "right" });
	};

	/* Scene scripts */
	const startGame = () => {
		(screenOrientation === "landscape-primary" || screenOrientation === "landscape-secondary") && handle.enter();
		dispatch({ type: ActionTypes.PLAYDEMO, payload: false });
		dispatch({ type: ActionTypes.CLOSEEDITOR });
		dispatch({ type: ActionTypes.SHOWINTRO });
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story["main-0"].bgm] });
	};
	const changeBackground = () => {
		editSceneDispatch({ type: SceneTypes.CHANGEBACKGROUND });
	};
	const changeBgm = () => {
		editSceneDispatch({ type: SceneTypes.CHANGEBGM });
	};
	const enableDialogue = () => {
		editSceneDispatch({ type: SceneTypes.HIDEDIALOGUE });
	};
	const toggleSpeaker = () => {
		editSceneDispatch({ type: SceneTypes.TOGGLESPEAKER });
	};
	let leftIndex = editSceneState.characters.findIndex((rows) => rows.location === "left");
	let rightIndex = editSceneState.characters.findIndex((rows) => rows.location === "right");
	const saveCurrent = () => {
		/* Use to insert sprite to the characters array in scene */

		let charactersArray = [...editSceneState.characters];
		charactersArray[leftIndex].sprite = editChar1State.spriteName;
		charactersArray[rightIndex].sprite = editChar2State.spriteName;

		setCharacters((prev: any) => {
			return {
				...prev,
				[editChar1State.spriteName]: editChar1State.parts,
				[editChar2State.spriteName]: editChar2State.parts,
			};
		});
		setStory((prev: any) => {
			return { ...prev, [editSceneState.index]: { ...editSceneState, characters: [...charactersArray] } };
		});
		if (editSceneState.type === "video") {
			dispatch({ type: ActionTypes.BGMOFF });
		} else {
			dispatch({ type: ActionTypes.BGMON });
		}
		notify();
	};
	const loadScene = useCallback((value: string) => {
		editSceneDispatch({ type: SceneTypes.LOADSCENE, payload: value });
	}, []);

	const setSceneIndex = (value: string) => {
		editSceneDispatch({ type: SceneTypes.SETSCENEINDEX, payload: value });
	};
	const setNext = (value: string) => {
		editSceneDispatch({ type: SceneTypes.SETNEXT, payload: value });
	};
	const setVideo = (url: any) => {
		editSceneDispatch({ type: SceneTypes.SETVIDEO, payload: url });
		if (editSceneState.type === "video") {
			dispatch({ type: ActionTypes.BGMON });
		} else {
			dispatch({ type: ActionTypes.BGMOFF });
		}
	};
	/* Scene datalist */
	const sceneList = Object.keys(story);
	const sceneListObject = useMemo(
		() =>
			sceneList.map((scene, index) => {
				return { id: scene, value: scene };
			}),
		[sceneList]
	);
	useEffect(() => {
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[editSceneState.bgm] });
	}, [editSceneState.bgm]);

	/* Menu buttons */
	const menuButtonsList: IMenuButtons[] = [
		{
			content: "Play",
			onClick: startGame,
			icon: <BsPlayBtn />,
			extraClass: "play-button",
		},
		{
			content: "Save current characters and scene",
			onClick: saveCurrent,
			icon: <FiSave />,
			extraClass: "save-button",
		},
		{
			content: "Change background",
			onClick: changeBackground,
			icon: <ImImages />,
			extraClass: "changebg-button",
		},
		{ content: "Change music", onClick: changeBgm, icon: <MdRadio />, extraClass: "changebgm-button" },
		{
			content: "Add/Remove left character",
			onClick: enableCharacter1,
			icon: <BsFillPersonFill />,
			extraIcon: <span className="text-[1.5vw]">L</span>,
			extraClass: editSceneState.characters[0].enabled
				? "toggle-leftchar-button"
				: "opacity-40 grayscale toggle-leftchar-button",
		},
		{
			content: "Add/remove right character",
			onClick: enableCharacter2,
			icon: <BsFillPersonFill />,
			extraIcon: <span className="text-[1.5vw]">R</span>,
			extraClass: editSceneState.characters[1].enabled
				? "toggle-rightchar-button"
				: "opacity-40 grayscale toggle-rightchar-button",
		},
		{
			content: "Left/Right speaker",
			onClick: toggleSpeaker,
			icon: (
				<BsMegaphone
					className={
						editSceneState.speaker.location === "left"
							? "toggle-speaker-button pb-[.25%]"
							: "toggle-speaker-button -scale-x-100 pb-[.25%]"
					}
				/>
			),
		},
		{
			content: "Enable/disable dialogue box",
			onClick: enableDialogue,
			icon: <FiMessageSquare />,
			extraClass: editSceneState.enableDialogue ? "dialogue-button" : "opacity-40 grayscale dialogue-button",
		},
		{
			content: "Set video",
			onClick: setVideo,
			icon: <BsCameraVideo />,
			extraClass:
				editSceneState.type === "video" ? "change-video-button" : "opacity-40 grayscale change-video-button",
		},
		{
			content: "Add voice",
			onClick: () => {
				playVoicesSfx();
			},
			icon: <MdOutlineKeyboardVoice />,
			extraClass: "add-voice-button",
		},
		{
			content: "Add choices",
			onClick: () => {},
			icon: <GiChoice />,
			extraClass: "opacity-40 grayscale add-choices",
		},
	];

	const menuButtons = menuButtonsList.map((button, index) => {
		return (
			<Tippy
				appendTo="parent"
				content={button.content}
				animation="scale"
				placement="bottom"
				arrow={true}
				delay={100}
				key={index}
			>
				<motion.div
					className={`flex cursor-pointer flex-row text-[2.4vw] text-[#E879F9] ${
						typeof button["extraClass"] !== "undefined" ? button.extraClass : ""
					}`}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9 }}
					onClick={() => {
						button.onClick();
						playClickSfx();
					}}
					onHoverStart={playHoverSfx}
				>
					{button.icon}
					{typeof button["extraIcon"] !== "undefined" ? button.extraIcon : ""}
				</motion.div>
			</Tippy>
		);
	});
	/* End of menu buttons */
	return (
		<>
			<Joyride
				continuous={true}
				showSkipButton={true}
				run={run}
				steps={steps}
				styles={{
					buttonBack: {
						color: "#E879F9",
						fontSize: "1.1vw",
					},
					buttonNext: {
						backgroundColor: "#E879F9",
						fontSize: "1.1vw",
					},
					tooltip: {
						padding: "3%",
					},
					tooltipContent: {
						padding: "8% 8% 4% 4%",
					},
					tooltipFooter: {
						marginTop: 0,
					},
					buttonSkip: {
						fontSize: "1vw",
					},
				}}
			/>
			{editSceneState.type === "video" && <VideoScene videoIndex={editSceneState.videoIndex} videos={videos} />}
			{editSceneState.type === "scene" && (
				<>
					<AnimatePresence mode="wait">
						<Background bgImages={bgImages} bg={editSceneState.bg.media} type="editor" />
					</AnimatePresence>

					{editSceneState.characters[0].enabled && (
						<motion.div
							onClick={() => {
								editCharacter1Toggle();
								playClickSfx();
							}}
							onHoverStart={playHoverSfx}
						>
							<AnimatePresence>
								<Character
									femaleSprites={femaleSprites}
									createdCharacter={editChar1State.parts}
									charLocation="left"
									type="editor"
									animate={editSceneState.characters[leftIndex].animate}
								/>
							</AnimatePresence>
						</motion.div>
					)}

					{editSceneState.characters[1].enabled && (
						<motion.div
							onClick={() => {
								editCharacter2Toggle();
								playClickSfx();
							}}
							onHoverStart={playHoverSfx}
							className="right-character-button"
						>
							<AnimatePresence>
								<Character
									femaleSprites={femaleSprites}
									createdCharacter={editChar2State.parts}
									charLocation="right"
									type="editor"
									animate={editSceneState.characters[rightIndex].animate}
								/>
							</AnimatePresence>
						</motion.div>
					)}
					{editSceneState.enableDialogue && (
						<DialogueBox
							name={editSceneState.speaker.name}
							text={editSceneState.text}
							location={editSceneState.speaker.location}
							type="editor"
							editSceneDispatch={editSceneDispatch}
							playHoverSfx={playHoverSfx}
							playClickSfx={playClickSfx}
						/>
					)}

					<AnimatePresence>
						{editChar1State.inCharacterEditMode && editSceneState.characters[0].enabled && (
							<div className="left-character-control">
								<CharacterMaker
									editCharDispatch={editChar1Dispatch}
									handleClickOutside={handleClickOutside1}
									charLocation="left"
									editChar={editChar1State}
									characters={characters}
									editSceneState={editSceneState}
									editSceneDispatch={editSceneDispatch}
									playHoverSfx={playHoverSfx}
									playClickSfx={playClickSfx}
								/>
							</div>
						)}
					</AnimatePresence>

					<AnimatePresence>
						{editChar2State.inCharacterEditMode && editSceneState.characters[1].enabled && (
							<CharacterMaker
								editCharDispatch={editChar2Dispatch}
								handleClickOutside={handleClickOutside2}
								charLocation="right"
								editChar={editChar2State}
								characters={characters}
								editSceneState={editSceneState}
								editSceneDispatch={editSceneDispatch}
								playHoverSfx={playHoverSfx}
								playClickSfx={playClickSfx}
							/>
						)}
					</AnimatePresence>
				</>
			)}
			<div className="editor-control-menu absolute top-0 h-[10%] w-full bg-black bg-opacity-60 px-[2.5%]">
				<div className="justify-left flex h-full w-[90%] flex-row items-center gap-[2%]">
					{menuButtons}
					<Tippy
						appendTo="parent"
						content="Current Scene"
						animation="scale"
						placement="bottom"
						arrow={true}
						delay={100}
					>
						<div className="w-[15%] outline-none">
							<DatalistInput
								placeholder="Add scene"
								label="Current scene"
								onFocus={(item) => setSceneIndex("")}
								items={sceneListObject}
								className="current-scene-combobox border-none text-center font-handwritten text-[0.75vw] font-black text-[#e59df0] outline-none"
								inputProps={{
									style: {
										background: "transparent",
										border: "0",
										fontSize: "1.75vw",
										padding: 0,
									},
									className: "focus:ring-0 focus:ring-offset-0 outline-none text-[#E879F9]",
								}}
								listboxProps={{
									style: { border: "0", fontSize: "1vw" },
									className: "bg-rose-400",
								}}
								value={editSceneState.index}
								onSelect={(item) => loadScene(item.value)}
								setValue={setSceneIndex}
								// onMouseEnter={playHoverSfx}
								onClick={playClickSfx}
							/>
						</div>
					</Tippy>
					<BsFillArrowRightCircleFill className="flex flex-row text-[2.4vw] text-[#E879F9]" />
					<Tippy
						appendTo="parent"
						content="Next Scene"
						animation="scale"
						placement="bottom"
						arrow={true}
						delay={100}
					>
						<div className="w-[15%] outline-none">
							<DatalistInput
								placeholder="Add scene"
								label="Next scene"
								showLabel={true}
								onFocus={(item) => setNext("")}
								items={[...sceneListObject, { id: "end", value: "end" }]}
								className="next-scene-combobox border-none text-center font-handwritten text-[0.75vw] font-black text-[#E879F9] outline-none"
								inputProps={{
									style: {
										background: "transparent",
										border: "0",
										fontSize: "1.75vw",
										padding: 0,
									},
									className: "focus:ring-0 focus:ring-offset-0 outline-none text-[#E879F9] p-0",
								}}
								listboxProps={{
									style: { border: "0", fontSize: "1vw", padding: 0 },
									className: "bg-rose-400",
								}}
								value={editSceneState.next}
								onSelect={(item) => setNext(item.value)}
								setValue={setNext}
								// onMouseEnter={playHoverSfx}
								onClick={playClickSfx}
							/>
						</div>
					</Tippy>
				</div>
			</div>
			<ToastContainer
				position="top-right"
				autoClose={2500}
				hideProgressBar={false}
				newestOnTop
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
				onClick={playClickSfx}
			/>
		</>
	);
};

export default SceneEditor;
