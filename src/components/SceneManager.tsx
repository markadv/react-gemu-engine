import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";
import { ActionTypes, ManagerProps } from "../types/enum";
import { AnimatePresence } from "framer-motion";

const SceneManager = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: ManagerProps) => {
	let scene = story[state.index];
	const nextFrame = () => {
		/* Checks if next line in story existsSync, continue or go back to title. */
		if (story[state.index + 1]) {
			dispatch({ type: ActionTypes.NEXTFRAME });
			dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story[state.index + 1].bgm] });
		} else {
			dispatch({ type: ActionTypes.RESET });
		}
	};
	let characterEl = [];
	for (let i = 0; i < scene.characters.length; i++) {
		characterEl.push(
			<Character
				key={scene.characters[i].sprite + i}
				character={scene.characters[i]}
				characters={characters}
				femaleSprites={femaleSprites}
				type="game"
			/>
		);
	}

	return (
		<>
			<AnimatePresence mode="wait">
				<Background bgImages={bgImages} bg={scene.bg.media} />
			</AnimatePresence>
			<AnimatePresence>{characterEl}</AnimatePresence>
			<div onClick={nextFrame}>
				<DialogueBox
					name={scene.speaker.name}
					text={scene.text}
					location={scene.speaker.location}
					type="game"
				/>
			</div>
		</>
	);
};

export default SceneManager;
