import CharacterMaker from "./CharacterMaker";
import { ManagerProps } from "../types/enum";
import Background from "./Background";
import Character from "./Character";
import { AnimatePresence } from "framer-motion";
import { useReducer } from "react";
import { motion } from "framer-motion";

const EditTypes = {
	RESET: "reset",
	EDITCHARACTER: "editCharacterToggle",
	STARTSCENE: "startScene",
	STARTEDITOR: "startEditor",
	SHOWINTRO: "showIntro",
	SHOWTITLE: "showTitle",
	ISFULLSCREEN: "isfullscreen",
	ISLOADING: "isLoading",
	NEXTFRAME: "nextFrame",
	CHANGEBGM: "changeBgm",
} as const;

export type EditTypes = typeof EditTypes[keyof typeof EditTypes];

interface Edit {
	type: EditTypes;
	payload?: any;
}

interface EditState {
	parts: {
		backhair: string;
		body: string;
		outfits: string;
		fronthair: string;
		expression: string;
		accessories1?: string;
		accessories2?: string;
		accessories3?: string;
	};
	inCharacterEditMode: boolean;
}

const INITIAL_EDIT = {
	parts: {
		backhair: "shortBlondie",
		body: "body",
		outfits: "seifuku2",
		fronthair: "shortBlondie",
		expression: "smile",
	},
	inCharacterEditMode: false,
};

const editReducer = (state: EditState, action: Edit): EditState => {
	switch (action.type) {
		case "editCharacterToggle": {
			return { ...state, inCharacterEditMode: !state.inCharacterEditMode };
		}
		case "reset": {
			return INITIAL_EDIT;
		}
		default:
			return INITIAL_EDIT;
	}
};

const SceneEditor = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: ManagerProps) => {
	const [editState, editDispatch] = useReducer(editReducer, INITIAL_EDIT);
	const editCharacterToggle = () => {
		editDispatch({ type: EditTypes.EDITCHARACTER });
	};
	return (
		<>
			<AnimatePresence mode="wait">
				<Background bgImages={bgImages} bg={"streetSpringDay"} />
			</AnimatePresence>
			<motion.div onClick={editCharacterToggle}>
				<Character femaleSprites={femaleSprites} createdCharacter={editState.parts} type="editor" />
			</motion.div>
			<AnimatePresence>{editState.inCharacterEditMode && <CharacterMaker />}</AnimatePresence>
		</>
	);
};

export default SceneEditor;
