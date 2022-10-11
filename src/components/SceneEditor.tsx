import CharacterMaker from "./CharacterMaker";
import { ActionTypes, ManagerProps } from "../types/enum";
import Background from "./Background";
import Character from "./Character";
import { AnimatePresence, motion } from "framer-motion";
import { useReducer, useEffect } from "react";
import DialogueBox from "./DialogueBox";

export const CharTypes = {
	RESET: "reset",
	EDITCHARACTER: "editCharacterToggle",
	EDITCHARACTERCLEAR: "editCharacterClear",
	CHANGEFRONTHAIR: "changeFrontHair",
	CHANGEBACKHAIR: "changeBackHair",
	CHANGECHARACTERPART: "changeCharacterPart",
} as const;

export type CharTypes = typeof CharTypes[keyof typeof CharTypes];

export const SceneTypes = {
	RESET: "reset",
	CHANGEBACKGROUND: "changeBackground",
	CHANGEBGM: "changeBgm",
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
		sprite: string;
		transition: string | null;
	};
	text: string;
	bgIndex: number;
	bgmIndex: number;
}

const INITIAL_CHAR = {
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
		sprite: "test",
		transition: null,
	},
	text: "test",
	bgIndex: 0,
	bgmIndex: 0,
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

	const charEditReducer = (state: EditCharState, action: IEditChar): EditCharState => {
		switch (action.type) {
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
	const sceneEditReducer = (state: EditSceneState, action: IEditScene): EditSceneState => {
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
			case "reset": {
				return INITIAL_SCENE;
			}
			default:
				return INITIAL_SCENE;
		}
	};
	const [editChar1, editChar1Dispatch] = useReducer(charEditReducer, INITIAL_CHAR);
	const [editChar2, editChar2Dispatch] = useReducer(charEditReducer, INITIAL_CHAR);
	const [editScene, editSceneDispatch] = useReducer(sceneEditReducer, INITIAL_SCENE);
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
	console.log(editScene);

	useEffect(() => {
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[editScene.bgm] });
	}, [editScene.bgm]);

	return (
		<>
			<AnimatePresence mode="wait">
				<Background bgImages={bgImages} bg={editScene.bg.media} />
			</AnimatePresence>
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
				{editChar1.inCharacterEditMode && (
					<CharacterMaker
						editDispatch={editChar1Dispatch}
						handleClickOutside={handleClickOutside1}
						charLocation="left"
					/>
				)}
			</AnimatePresence>
			<AnimatePresence>
				{editChar2.inCharacterEditMode && (
					<CharacterMaker
						editDispatch={editChar2Dispatch}
						handleClickOutside={handleClickOutside2}
						charLocation="right"
					/>
				)}
			</AnimatePresence>
			<DialogueBox name="text" text="text" location="left" />
			<div className="absolute top-0 h-[10%] w-full bg-black opacity-50"></div>
			<motion.img
				className="absolute top-[2.5%] left-[7.5%] h-[5%]"
				src={require("../assets/icons/background.png")}
				alt="background icon"
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.9 }}
				onClick={changeBackground}
			/>
			<motion.img
				className="absolute top-[2.5%] left-[2.5%] h-[5%] rounded-full border-2 border-[#E879F9]"
				src={require("../assets/icons/music-note.png")}
				alt="background icon"
				onClick={changeBgm}
				whileHover={{ scale: 1.2 }}
				whileTap={{ scale: 0.9 }}
			/>
		</>
	);
};

export default SceneEditor;
