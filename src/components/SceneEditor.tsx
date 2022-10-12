/* Dependencies; */
import { useReducer, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Tippy from "@tippyjs/react";

/* Component */
import CharacterMaker from "./CharacterMaker";
import Background from "./Background";
import Character from "./Character";
import { ActionTypes, ManagerProps } from "../types/enum";
import DialogueBox from "./DialogueBox";

/* Styles */
import { ImImages } from "react-icons/im";
import { MdRadio } from "react-icons/md";
import { BsFillPersonFill, BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsPlayBtn } from "react-icons/bs";
import { FiMessageSquare, FiSave } from "react-icons/fi";

export const CharTypes = {
	RESET: "reset",
	EDITCHARACTER: "editCharacterToggle",
	EDITCHARACTERCLEAR: "editCharacterClear",
	CHANGEFRONTHAIR: "changeFrontHair",
	CHANGEBACKHAIR: "changeBackHair",
	CHANGECHARACTERPART: "changeCharacterPart",
	ENABLECHARACTERTOGGLE: "enableCharacterToggle",
} as const;

export type CharTypes = typeof CharTypes[keyof typeof CharTypes];

export const SceneTypes = {
	RESET: "reset",
	CHANGEBACKGROUND: "changeBackground",
	CHANGEBGM: "changeBgm",
	HIDEDIALOGUE: "hideDialogue",
	CHANGENAME: "changeName",
	CHANGETEXT: "changeText",
} as const;

export type SceneTypes = typeof SceneTypes[keyof typeof SceneTypes];

export interface IEditScene {
	type: SceneTypes;
	payload?: any;
}

export interface IEditChar {
	type: CharTypes;
	payload?: any;
}

interface EditCharState {
	[key: string]: object | number | boolean;
	isEnabled: boolean;
	parts: {
		[backhair: string]: string | null | boolean;
		body: string;
		outfits: string;
		fronthair: string;
		expression: string;
		accessories1: string | null;
		accessories2: string | null;
		accessories3: string | null;
	};
	inCharacterEditMode: boolean;
	fronthairIndex: number;
	backhairIndex: number;
	outfitsIndex: number;
	expressionIndex: number;
	accessories1Index: number;
	accessories2Index: number;
	accessories3Index: number;
}

interface EditSceneState {
	[key: string]: string | object | number | boolean;
	index: number;
	type: string;
	bg: { media: string; transition: string | null };
	characters: { location: string; sprite: string; transition: null }[];
	bgm: string;
	voice: string;
	sfx: string;
	speaker: {
		name: string;
		location: string;
	};
	text: string;
	bgIndex: number;
	bgmIndex: number;
	enableDialogue: boolean;
}

const INITIAL_CHAR = {
	isEnabled: true,
	parts: {
		backhair: "longDark",
		body: "body",
		outfits: "seifuku1",
		fronthair: "longDark",
		expression: "normal",
		accessories1: "",
		accessories2: "",
		accessories3: "",
	},
	inCharacterEditMode: false,
	fronthairIndex: 0,
	backhairIndex: 0,
	outfitsIndex: 0,
	expressionIndex: 0,
	accessories1Index: 0,
	accessories2Index: 0,
	accessories3Index: 0,
};

const INITIAL_SCENE = {
	index: 0,
	type: "scene",
	bg: { media: "schoolDay", transition: null },
	characters: [
		{ location: "left", sprite: "Chisato-Smile2", transition: null },
		{ location: "right", sprite: "Kanon-Smile", transition: null },
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
};

const SceneEditor = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: ManagerProps) => {
	/* List of assets */
	const fronthairList = Object.keys(femaleSprites.fronthair);
	const backhairList = Object.keys(femaleSprites.backhair);
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
			case "changeCharacterPart": {
				const partIndicator = action.payload;
				const partList: { [key: string]: any } = {
					backhair: backhairList,
					fronthair: fronthairList,
					outfits: outfitsList,
					expression: expressionList,
					accessories1: accessories1List,
					accessories2: accessories2List,
					accessories3: accessories3List,
				};
				const indexList: { [key: string]: any } = {
					backhair: state.backhairIndex,
					fronthair: state.fronthairIndex,
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
			case "reset": {
				return INITIAL_SCENE;
			}
			default:
				return INITIAL_SCENE;
		}
	};
	const [editChar1, editChar1Dispatch] = useReducer(editCharReducer, INITIAL_CHAR);
	const [editChar2, editChar2Dispatch] = useReducer(editCharReducer, INITIAL_CHAR);
	const [editScene, editSceneDispatch] = useReducer(editSceneReducer, INITIAL_SCENE);
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
	const changeBackground = () => {
		editSceneDispatch({ type: SceneTypes.CHANGEBACKGROUND });
	};
	const changeBgm = () => {
		editSceneDispatch({ type: SceneTypes.CHANGEBGM });
	};
	const enableCharacter1 = (character: string) => {
		editChar1Dispatch({ type: CharTypes.ENABLECHARACTERTOGGLE });
	};
	const enableCharacter2 = (character: string) => {
		editChar2Dispatch({ type: CharTypes.ENABLECHARACTERTOGGLE });
	};
	const enableDialogue = () => {
		editSceneDispatch({ type: SceneTypes.HIDEDIALOGUE });
	};
	console.log(editScene);

	useEffect(() => {
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[editScene.bgm] });
	}, [editScene.bgm]);

	const menuButtonsList: {
		title: string;
		left: string;
		top: string;
		textSize: string;
		onClick: any;
		icon: any;
		extraIcon?: any;
		extraClass?: any;
	}[] = [
		{ title: "Music", left: "2.5%", top: "2.5%", textSize: "2.4vw", onClick: changeBgm, icon: <MdRadio /> },
		{
			title: "Background",
			left: "7.5%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: changeBackground,
			icon: <ImImages />,
		},
		{
			title: "Left character",
			left: "12.5%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: enableCharacter1,
			icon: <BsFillPersonFill />,
			extraIcon: <span className="text-[1.5vw]">L</span>,
			extraClass: editChar1.isEnabled ? "" : "opacity-40 grayscale",
		},
		{
			title: "Right character",
			left: "17.5%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: enableCharacter2,
			icon: <BsFillPersonFill />,
			extraIcon: <span className="text-[1.5vw]">R</span>,
			extraClass: editChar2.isEnabled ? "" : "opacity-40 grayscale",
		},
		{
			title: "Dialogue box",
			left: "23%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: enableDialogue,
			icon: <FiMessageSquare />,
		},
		{
			title: "Save",
			left: "41%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: <FiSave />,
		},
		{
			title: "Previous scene",
			left: "45.5%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: <BsFillArrowLeftCircleFill />,
		},
		{
			title: "Current scene",
			left: "50%",
			top: "1%",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: state.index + 1,
		},
		{
			title: "Previous scene",
			left: "53%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: <BsFillArrowRightCircleFill />,
		},

		{
			title: "Play",
			left: "57.5%",
			top: "2.5%",
			textSize: "2.4vw",
			onClick: changeBgm,
			icon: <BsPlayBtn />,
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
					style={{ left: button.left, top: button.top }}
					className={`absolute cursor-pointer text-[${button.textSize}] flex flex-row text-[#E879F9] ${
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
				<Background bgImages={bgImages} bg={editScene.bg.media} />
			</AnimatePresence>
			{editChar1.isEnabled && (
				<>
					<motion.div onClick={editCharacter1Toggle}>
						<AnimatePresence>
							<Character
								femaleSprites={femaleSprites}
								createdCharacter={editChar1.parts}
								charLocation="left"
								type="editor"
							/>
						</AnimatePresence>
					</motion.div>
					<AnimatePresence>
						{editChar1.inCharacterEditMode && (
							<CharacterMaker
								editDispatch={editChar1Dispatch}
								handleClickOutside={handleClickOutside1}
								charLocation="left"
							/>
						)}
					</AnimatePresence>
				</>
			)}

			{editChar2.isEnabled && (
				<>
					<motion.div onClick={editCharacter2Toggle}>
						<AnimatePresence>
							<Character
								femaleSprites={femaleSprites}
								createdCharacter={editChar2.parts}
								charLocation="right"
								type="editor"
							/>
						</AnimatePresence>
					</motion.div>
					<AnimatePresence>
						{editChar2.inCharacterEditMode && (
							<CharacterMaker
								editDispatch={editChar2Dispatch}
								handleClickOutside={handleClickOutside2}
								charLocation="right"
							/>
						)}
					</AnimatePresence>
				</>
			)}
			{editScene.enableDialogue && (
				<DialogueBox
					name={editScene.speaker.name}
					text={editScene.text}
					location={editScene.speaker.location}
					type="editor"
					editSceneDispatch={editSceneDispatch}
				/>
			)}
			<div className="absolute top-0 h-[10%] w-full bg-black opacity-50"></div>
			{menuButtons}
		</>
	);
};

export default SceneEditor;
