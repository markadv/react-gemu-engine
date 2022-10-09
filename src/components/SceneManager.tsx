import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";
import { ActionTypes } from "../Game";
import story from "../assets/story/story.json";

const SceneManager = ({ dispatch, bgImages, characters, state, bgMusic }: any) => {
	const nextFrame = () => {
		dispatch({ type: ActionTypes.NEXTFRAME });
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story[state.index].bgm] });
	};
	console.log(state.index);
	return (
		<>
			<Background bgImages={bgImages} bg={story[state.index].bg} />
			<Character characters={characters} />
			<div onClick={nextFrame}>
				<DialogueBox name={story[state.index].speaker} text={story[state.index].text} />
			</div>
		</>
	);
};

export default SceneManager;
