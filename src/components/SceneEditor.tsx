import CharacterMaker from "./CharacterMaker";
import { ManagerProps } from "../types/enum";
import Background from "./Background";
import Character from "./Character";

const SceneEditor = ({ dispatch, bgImages, characters, state, bgMusic, femaleSprites, story }: ManagerProps) => {
	let scene = story[state.index];
	let charactersEl = [];
	for (let i = 0; i < scene.characters; i++) {
		charactersEl.push(<Character />);
	}
	return (
		<div>
			<CharacterMaker />
			<Background bgImages={bgImages} bg={"streetSpringDay"} />
		</div>
	);
};

export default SceneEditor;
