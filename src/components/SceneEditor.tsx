/* Dependencies; */
import { useReducer, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tippy from "@tippyjs/react";

/* Component */
import CharacterMaker from "./CharacterMaker";
import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";

/* Styles */
import { ImImages } from "react-icons/im";
import { MdRadio } from "react-icons/md";
import {
	BsFillPersonFill,
	BsFillArrowLeftCircleFill,
	BsFillArrowRightCircleFill,
	BsPlayBtn,
	BsMegaphone,
} from "react-icons/bs";
import { FiMessageSquare, FiSave } from "react-icons/fi";

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
			case "enableCharacterToggle": {
				return { ...state, isEnabled: !state.isEnabled };
			}
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
				const partList: { [key: string]: any } = {
					haircolor: haircolorList,
					fronthair: hairList,
					backhair: hairList,
					outfits: outfitsList,
					expression: expressionList,
					accessories1: accessories1List,
					accessories2: accessories2List,
					accessories3: accessories3List,
				};
				const indexList: { [key: string]: any } = {
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
	console.log("scenestate", editSceneState);
	const retrieveSprite = (spriteName: string) => {
		return {
			isEnabled: true,
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
		editChar1Dispatch({ type: CharTypes.ENABLECHARACTERTOGGLE });
		editSceneDispatch({ type: SceneTypes.TOGGLECHARACTER, payload: "left" });
	};
	const enableCharacter2 = (character: string) => {
		editChar2Dispatch({ type: CharTypes.ENABLECHARACTERTOGGLE });
		editSceneDispatch({ type: SceneTypes.TOGGLECHARACTER, payload: "right" });
	};
	/* Scene scripts */
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
	const saveCurrent = () => {
		/* Use to insert sprite to the characters array in scene */
		let leftIndex = editSceneState.characters.findIndex((rows) => rows.location === "left");
		let rightIndex = editSceneState.characters.findIndex((rows) => rows.location === "right");
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
	};

	useEffect(() => {
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[editSceneState.bgm] });
	}, [editSceneState.bgm]);

	const menuButtonsList: IMenuButtons[] = [
		{
			title: "Play",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: <BsPlayBtn />,
		},
		{
			title: "Save current characters and scene",
			textSize: "2.4vw",
			onClick: saveCurrent,
			icon: <FiSave />,
		},
		{ title: "Music", textSize: "2.4vw", onClick: changeBgm, icon: <MdRadio /> },
		{
			title: "Change background",
			textSize: "2.4vw",
			onClick: changeBackground,
			icon: <ImImages />,
		},
		{
			title: "Add/Remove left character",
			textSize: "2.4vw",
			onClick: enableCharacter1,
			icon: <BsFillPersonFill />,
			extraIcon: <span className="text-[1.5vw]">L</span>,
			extraClass: editChar1State.isEnabled ? "" : "opacity-40 grayscale",
		},
		{
			title: "Add/remove right character",
			textSize: "2.4vw",
			onClick: enableCharacter2,
			icon: <BsFillPersonFill />,
			extraIcon: <span className="text-[1.5vw]">R</span>,
			extraClass: editChar2State.isEnabled ? "" : "opacity-40 grayscale",
		},
		{
			title: "Enable/disable dialogue box",
			textSize: "2.4vw",
			onClick: enableDialogue,
			icon: <FiMessageSquare />,
			extraClass: editSceneState.enableDialogue ? "" : "opacity-40 grayscale",
		},
		{
			title: "Enable/disable dialogue box",
			textSize: "2.4vw",
			onClick: toggleSpeaker,
			icon: (
				<BsMegaphone
					className={editSceneState.speaker.location === "left" ? "pb-[.25%]" : "-scale-x-100 pb-[.25%]"}
				/>
			),
		},

		{
			title: "Previous scene",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: <BsFillArrowLeftCircleFill />,
		},
		{
			title: "Current scene",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: state.index,
		},
		{
			title: "Next scene",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: <BsFillArrowRightCircleFill />,
		},
	];

	const menuButtons = menuButtonsList.map((button, index) => {
		return (
			<Tippy
				appendTo="parent"
				content={
					<div className="rounded-lg bg-[#E379F4] p-1">
						<span className="text-sm text-slate-50">{button.title}</span>
					</div>
				}
				placement="bottom"
				key={index}
			>
				<motion.div
					className={`cursor-pointer text-[${button.textSize}] flex flex-row text-[#E879F9] ${
						typeof button["extraClass"] !== "undefined" ? button.extraClass : ""
					}`}
					whileHover={{ scale: 1.2 }}
					whileTap={{ scale: 0.9 }}
					onClick={button.onClick}
				>
					{button.icon}
					{typeof button["extraIcon"] !== "undefined" ? button.extraIcon : ""}
				</motion.div>
			</Tippy>
		);
	});

	return (
		<>
			<AnimatePresence mode="wait">
				<Background bgImages={bgImages} bg={editSceneState.bg.media} />
			</AnimatePresence>
			{editSceneState.characters[0].enabled && (
				<>
					<motion.div onClick={editCharacter1Toggle}>
						<AnimatePresence>
							<Character
								femaleSprites={femaleSprites}
								createdCharacter={editChar1State.parts}
								charLocation="left"
								type="editor"
							/>
						</AnimatePresence>
					</motion.div>
					<AnimatePresence>
						{editChar1State.inCharacterEditMode && (
							<CharacterMaker
								editDispatch={editChar1Dispatch}
								handleClickOutside={handleClickOutside1}
								charLocation="left"
								editChar={editChar1State}
								characters={characters}
							/>
						)}
					</AnimatePresence>
				</>
			)}

			{editChar2State.isEnabled && (
				<>
					<motion.div onClick={editCharacter2Toggle}>
						<AnimatePresence>
							<Character
								femaleSprites={femaleSprites}
								createdCharacter={editChar2State.parts}
								charLocation="right"
								type="editor"
							/>
						</AnimatePresence>
					</motion.div>
					<AnimatePresence>
						{editChar2State.inCharacterEditMode && (
							<CharacterMaker
								editDispatch={editChar2Dispatch}
								handleClickOutside={handleClickOutside2}
								charLocation="right"
								editChar={editChar2State}
								characters={characters}
							/>
						)}
					</AnimatePresence>
				</>
			)}
			{editSceneState.enableDialogue && (
				<DialogueBox
					name={editSceneState.speaker.name}
					text={editSceneState.text}
					location={editSceneState.speaker.location}
					type="editor"
					editSceneDispatch={editSceneDispatch}
				/>
			)}
			<div className="absolute top-0 h-[10%] w-full bg-black bg-opacity-50 px-[1%]">
				<div className="justify-left flex h-full w-[90%] flex-row items-center gap-[2%]">{menuButtons}</div>
			</div>
		</>
	);
};

export default SceneEditor;
