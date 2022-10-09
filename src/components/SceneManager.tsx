import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";

const SceneManager = ({ bgImages, dispatch, ActionTypes }: any) => {
	return (
		<>
			<Background bgImages={bgImages} />
			<Character />
			<div>
				<DialogueBox />
			</div>
		</>
	);
};

export default SceneManager;
