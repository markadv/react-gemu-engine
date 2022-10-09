import { AnimatePresence, motion } from "framer-motion";

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

const Character = ({ character1, character2, characters, femaleSprites }: any): any => {
	console.log("characters", characters);
	let character1El = [],
		character2El = [];
	for (let part in characters[character1]) {
		character1El.push(
			<motion.img
				key={part}
				className="absolute left-0 bottom-0 h-3/5"
				src={femaleSprites[part][characters[character1][part]]}
				alt="hair"
				variants={enterLeftExitLeft}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ ease: "easeOut", duration: 1 }}
			/>
		);
	}
	for (let part in characters[character2]) {
		character2El.push(
			<motion.img
				key={part}
				className="absolute right-0 bottom-0 h-3/5"
				src={femaleSprites[part][characters[character2][part]]}
				alt="hair"
				variants={enterRightExitRight}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ ease: "easeOut", duration: 1 }}
			/>
		);
	}
	return (
		<>
			<AnimatePresence>{character1El}</AnimatePresence>
			<AnimatePresence>{character2El}</AnimatePresence>
		</>
	);
};

export default Character;
