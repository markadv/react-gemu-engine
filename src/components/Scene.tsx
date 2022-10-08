import React from "react";
import Background from "./Background";
import Character from "./Character";

const Scene = ({ bg }: any) => {
	return (
		<>
			<Background bg={bg} />
			<Character />
		</>
	);
};

export default Scene;
