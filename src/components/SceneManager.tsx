import Background from "./Background";
import Character from "./Character";
import DialogueBox from "./DialogueBox";
import { ActionTypes, Action, State } from "../types/enum";

interface SceneManagerProps {
	dispatch: React.Dispatch<Action>;
	bgImages: {
		[key: string]: any;
	};
	bgMusic: {
		[key: string]: any;
	};
	characters: {
		[key: string]: { [key: string]: any };
	};
	story: any[];
	state: State;
	femaleSprites: {
		[key: string]: { [key: string]: any };
	};
}

const SceneManager = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: SceneManagerProps) => {
	const nextFrame = () => {
		dispatch({ type: ActionTypes.NEXTFRAME });
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story[state.index + 1].bgm] });
	};
	console.log(state.index);
	return (
		<>
			<Background bgImages={bgImages} bg={story[state.index].bg} />
			<Character
				character1={story[state.index].sprite1}
				character2={story[state.index].sprite2}
				characters={characters}
				femaleSprites={femaleSprites}
			/>
			<div onClick={nextFrame}>
				<DialogueBox name={story[state.index].speaker} text={story[state.index].text} />
			</div>
		</>
	);
};

export default SceneManager;
