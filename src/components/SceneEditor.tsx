import CharacterMaker from "./CharacterMaker";
import { ManagerProps } from "../types/enum";
import Background from "./Background";
import Character from "./Character";
import { AnimatePresence } from "framer-motion";
import { useReducer } from "react";
import { motion } from "framer-motion";

export const EditTypes = {
	RESET: "reset",
	EDITCHARACTER: "editCharacterToggle",
	CHANGEFRONTHAIR: "changeFrontHair",
	CHANGEBACKHAIR: "changeBackHair",
	CHANGECHARACTERPART: "changeCharacterPart",
} as const;

export type EditTypes = typeof EditTypes[keyof typeof EditTypes];

export interface Edit {
	type: EditTypes;
	payload?: any;
}

interface EditState {
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

const INITIAL_EDIT = {
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

const SceneEditor = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: ManagerProps) => {
	const fronthairList = Object.keys(femaleSprites.fronthair);
	const backhairList = Object.keys(femaleSprites.backhair);
	const outfitsList = Object.keys(femaleSprites.outfits);
	const expressionList = Object.keys(femaleSprites.expression);
	const accessories1List = Object.keys(femaleSprites.accessories1);
	const accessories2List = Object.keys(femaleSprites.accessories2);
	const accessories3List = Object.keys(femaleSprites.accessories3);
	accessories1List.unshift("");
	accessories2List.unshift("");
	accessories3List.unshift("");
	const editReducer = (state: EditState, action: Edit): EditState => {
		switch (action.type) {
			case "editCharacterToggle": {
				return { ...state, inCharacterEditMode: !state.inCharacterEditMode };
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
				console.log("part", partIndicator, "index", indexSelected);
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
				return INITIAL_EDIT;
			}
			default:
				return INITIAL_EDIT;
		}
	};
	const [editState, editDispatch] = useReducer(editReducer, INITIAL_EDIT);
	const editCharacterToggle = () => {
		editDispatch({ type: EditTypes.EDITCHARACTER });
	};
	console.log(editState);
	console.log(outfitsList);

	return (
		<>
			<AnimatePresence mode="wait">
				<Background bgImages={bgImages} bg={"streetSpringDay"} />
			</AnimatePresence>
			<motion.div onClick={editCharacterToggle}>
				<AnimatePresence>
					<Character femaleSprites={femaleSprites} createdCharacter={editState.parts} type="editor" />
				</AnimatePresence>
			</motion.div>
			<AnimatePresence>
				{editState.inCharacterEditMode && <CharacterMaker editDispatch={editDispatch} />}
			</AnimatePresence>
		</>
	);
};

export default SceneEditor;
