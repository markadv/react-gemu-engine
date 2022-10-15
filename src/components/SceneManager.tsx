import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";
import { ActionTypes, ManagerProps } from "../types/enum";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const SceneManager = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: ManagerProps) => {
	let scene = story[state.index];
	const [isTyping, setIsTyping] = useState(true);
	if (!story[state.index].enableDialogue) {
		setTimeout(() => {
			setIsTyping(false);
		}, 500);
	}
	const nextFrame = () => {
		/* Guard clause to make sure player doesn't go to the next frame until typing animation finishes */
		if (isTyping) return;
		/* Checks if next line in story existsSync, continue or go back to title. */
		if (story[state.index].next !== "end") {
			dispatch({ type: ActionTypes.NEXTFRAME, payload: story[state.index].next });
			dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story[state.index].bgm] });
			setIsTyping(true);
		} else {
			dispatch({ type: ActionTypes.RESET });
		}
	};
	let characterEl = [];
	for (let i = 0; i < scene.characters.length; i++) {
		if (scene.characters[i].enabled) {
			characterEl.push(
				<Character
					key={scene.characters[i].sprite + i}
					character={scene.characters[i]}
					characters={characters}
					femaleSprites={femaleSprites}
					animate={scene.characters[i].animate}
					transition={scene.characters[i].transition}
					type="game"
				/>
			);
		}
	}
	return (
		<>
			<AnimatePresence mode="wait">
				<Background bgImages={bgImages} bg={scene.bg.media} type="game" onClick={nextFrame} />
			</AnimatePresence>
			<AnimatePresence>{characterEl}</AnimatePresence>
			{story[state.index].enableDialogue && (
				<div onClick={nextFrame}>
					<DialogueBox
						name={scene.speaker.name}
						text={scene.text}
						location={scene.speaker.location}
						type="game"
						setIsTyping={setIsTyping}
					/>
				</div>
			)}
		</>
	);
};

export default SceneManager;
