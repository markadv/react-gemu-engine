import { motion } from "framer-motion";

const enterLeftExitLeft: any = {
	initial: { opacity: 0, x: "-100vw" },
	animate: { opacity: 1, x: "0" },
	exit: { opacity: 0, x: "-100vw" },
};
const enterRightExitRight: any = {
	initial: { opacity: 0, x: "100vw" },
	animate: { opacity: 1, x: "0" },
	exit: { opacity: 0, x: "100vw" },
};

const location: { [key: string]: { [key: string]: any } } = {
	left: { location: "absolute left-0 bottom-0 h-3/5", transition: enterLeftExitLeft },
	right: { location: "absolute right-0 bottom-0 h-3/5", transition: enterRightExitRight },
};

const Character = ({ character, characters, femaleSprites, createdCharacter, sceneIndex }: any) => {
	let characterEl = [];
	if (character !== null && characters !== null) {
		for (let part in characters[character.sprite]) {
			characterEl.push(
				<motion.img
					key={part}
					className={location[character.location].location}
					src={femaleSprites[part][characters[character.sprite][part]]}
					alt={part}
					variants={location[character.location].transition}
					initial="initial"
					animate="animate"
					exit="exit"
					transition={{ ease: "easeOut", duration: 1 }}
				/>
			);
		}
	}

	return <>{characterEl}</>;
};

export default Character;
