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
const shrinkUnshrink: any = {
	initial: { scale: 0.95 },
	animate: { scale: 1, opacity: 1 },
	exit: { scale: 0.8, opacity: 0 },
};

const location: { [key: string]: { [key: string]: any } } = {
	left: { location: "absolute left-0 bottom-0 h-4/6", transition: enterLeftExitLeft },
	right: { location: "absolute right-0 bottom-0 h-4/6", transition: enterRightExitRight },
};

const Character = ({ character, characters, femaleSprites, createdCharacter, type, charLocation }: any) => {
	let characterEl = [];
	if (type === "game") {
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
	} else {
		for (let part in createdCharacter) {
			if (createdCharacter[part] !== "") {
				characterEl.push(
					<motion.img
						key={part + createdCharacter[part]}
						className={location[charLocation].location}
						src={femaleSprites[part][createdCharacter[part]]}
						alt={part}
						variants={shrinkUnshrink}
						initial="initial"
						animate="animate"
						exit="exit"
						transition={{ ease: "easeInOut", duration: 0.15 }}
					/>
				);
			}
		}
	}

	return <>{characterEl}</>;
};

export default Character;
