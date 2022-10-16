import { motion } from "framer-motion";

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);
const randomDuration = () => Math.random() * 0.07 + 0.23;

export const variantsList: any = {
	enterRight: {
		initial: {
			opacity: 0,
			x: "100vw",
		},
		animate: {
			opacity: 1,
			x: "0",
		},
	},
	exitRight: {
		initial: {
			opacity: 1,
			x: "0",
		},
		animate: {
			opacity: 0,
			x: "100vw",
		},
	},
	enterLeft: {
		initial: {
			opacity: 0,
			x: "-100vw",
		},
		animate: {
			opacity: 1,
			x: "0",
		},
	},
	exitLeft: {
		initial: {
			opacity: 1,
			x: "0",
		},
		animate: {
			opacity: 0,
			x: "-100vw",
		},
	},
	mole: {
		initial: {
			opacity: 0,
			y: "100vh",
		},
		animate: {
			opacity: 1,
			y: "0",
		},
	},
	grow: {
		initial: {
			opacity: 0,
			scale: 1,
		},
		animate: {
			scale: 0.8,
			opacity: 0.5,
			transition: {
				duration: 0.5,
				delay: 0.25,
			},
		},
		end: {
			opacity: 1,
			scale: 1.1,
			transition: {
				duration: 0.5,
				delay: 0.75,
			},
		},
	},
	shrink: {
		initial: {
			opacity: 0,
			scale: 1,
		},
		animate: {
			scale: 1.2,
			opacity: 0.5,
			transition: {
				duration: 0.5,
				delay: 0.25,
			},
		},
		end: {
			opacity: 1,
			scale: 0.9,
			transition: {
				duration: 0.5,
				delay: 0.75,
			},
		},
	},
	appear: {
		inital: {
			opacity: 0,
		},
		animate: {
			opacity: 1,
		},
	},
	disappear: {
		inital: {
			opacity: 1,
		},
		animate: {
			opacity: 0,
		},
	},
	shake: {
		animate: {
			rotate: [-1, 1.3, 0],
			transition: {
				delay: getRandomDelay(),
				repeat: 3,
				duration: randomDuration(),
			},
		},
	},
	dropIn: {
		initial: {
			y: "-100vh",
			opacity: 0,
		},
		animate: {
			y: "0",
			opacity: 1,
			transition: {
				duration: 0.1,
				type: "spring",
				damping: 25,
				stiffness: 500,
			},
		},
	},

	// test: {
	// 	initial: {
	// 		x: 100,
	// 		transition: {
	// 			duration: 0.5,
	// 		},
	// 	},
	// 	animate: {
	// 		y: 100,
	// 		transition: {
	// 			duration: 1,
	// 			delay: 0.5,
	// 		},
	// 	},
	// 	end: {
	// 		x: 100,
	// 		transition: {
	// 			duration: 1,
	// 			delay: 1.5,
	// 		},
	// 	},
	// },
};

const location: { [key: string]: { [key: string]: any } } = {
	left: { location: "absolute left-0 bottom-0 h-4/6", transition: variantsList.enterLeft },
	right: { location: "absolute right-0 bottom-0 h-4/6", transition: variantsList.enterRight },
};

const Character = ({
	character,
	characters,
	femaleSprites,
	createdCharacter,
	type,
	charLocation,
	animate,
	transition,
}: any) => {
	let characterEl = [];
	/* If playing the game */
	if (type === "game") {
		for (let part in characters[character.sprite]) {
			if (part === "haircolor") {
				continue;
			}
			if (part === "fronthair" || part === "backhair") {
				characterEl.push(
					<motion.img
						key={part}
						className={location[character.location].location}
						src={
							femaleSprites[part][characters[character.sprite]["haircolor"]][
								characters[character.sprite][part]
							]
						}
						alt={part}
						variants={animate === null ? location[character.location].transition : variantsList[animate]}
						initial="initial"
						animate={["inital", "animate", "end"]}
						// exit="exit"
						transition={{ ease: "easeInOut", duration: 1 }}
					/>
				);
			} else if (characters[character.sprite][part] !== "") {
				characterEl.push(
					<motion.img
						key={part}
						className={location[character.location].location}
						src={femaleSprites[part][characters[character.sprite][part]]}
						alt={part}
						variants={animate === null ? location[character.location].transition : variantsList[animate]}
						initial="initial"
						animate={["inital", "animate", "end"]}
						exit="exit"
						transition={{ ease: "easeInOut", duration: 1 }}
					/>
				);
			}
		}
		/* If in the editor */
	} else {
		for (let part in createdCharacter) {
			if (part === "haircolor") {
				continue;
			}
			if (part === "fronthair" || part === "backhair") {
				characterEl.push(
					<motion.img
						key={part + createdCharacter[part]}
						className={location[charLocation].location}
						src={femaleSprites[part][createdCharacter.haircolor][createdCharacter[part]]}
						alt={part}
						variants={animate === null ? location[charLocation].transition : variantsList[animate]}
						initial="initial"
						animate={["inital", "animate", "end"]}
						exit="exit"
						transition={{ ease: "easeInOut", duration: 1 }}
					/>
				);
			} else if (createdCharacter[part] !== "") {
				characterEl.push(
					<motion.img
						key={part + createdCharacter[part]}
						className={location[charLocation].location}
						src={femaleSprites[part][createdCharacter[part]]}
						alt={part}
						variants={animate === null ? location[charLocation].transition : variantsList[animate]}
						initial="initial"
						animate={["inital", "animate", "end"]}
						exit="exit"
						transition={{ ease: "easeInOut", duration: 1 }}
					/>
				);
			}
		}
	}

	return <>{characterEl}</>;
};

export default Character;
