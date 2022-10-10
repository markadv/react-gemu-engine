import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";
import { ActionTypes, ManagerProps } from "../types/enum";
import { AnimatePresence } from "framer-motion";

const SceneManager = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: ManagerProps) => {
	let scene = story[state.index];
	const nextFrame = () => {
		dispatch({ type: ActionTypes.NEXTFRAME });
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story[state.index + 1].bgm] });
	};
	let characterEl = [];
	for (let i = 0; i < scene.characters.length; i++) {
		// let key;
		// if (scene.characters[i - 1] && scene.characters[i].sprite === scene.characters[i - 1].sprite) {
		// 	key = scene.characters[i].sprite + (state.index - 1) + "";
		// } else {
		// 	key = scene.characters[i].sprite + state.index + "";
		// }
		characterEl.push(
			<Character
				character={scene.characters[i]}
				characters={characters}
				femaleSprites={femaleSprites}
				key={scene.characters[i].sprite}
				sceneIndex={state.index}
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
				<DialogueBox name={scene.speaker.name} text={scene.text} location={scene.speaker.location} />
			</div>
		</>
	);
};

export default SceneManager;
