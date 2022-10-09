import { motion } from "framer-motion";

const animationBody: any = {
	initial: { opacity: 0, x: "-100vw" },
	animate: { opacity: 1, x: "0" },
	exit: { opacity: 0, x: "-100vw" },
};

const Character = () => {
	const body = require("../assets/images/characters/Female/base-body.png");
	const clothes = require("../assets/images/characters/Female/outfits/seifuku-1.png");
	const fronthair = require("../assets/images/characters/Female/fronthairs/long_dark.png");
	const backhair = require("../assets/images/characters/Female/backhairs/long_dark.png");
	const expression = require("../assets/images/characters/Female/expressions/normal.png");
	const accessories = require("../assets/images/characters/Female/accessories/black-glasses.png");
	return (
		<>
			<motion.img
				className="absolute left-0 bottom-0 h-3/5"
				src={backhair}
				alt="hair"
				variants={animationBody}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 1 }}
			/>
			<motion.img
				className="absolute left-0 bottom-0 h-3/5"
				src={body}
				alt="body"
				variants={animationBody}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 1 }}
			/>
			<motion.img
				className="absolute left-0 bottom-0 h-3/5"
				src={clothes}
				alt="clothes"
				variants={animationBody}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 1 }}
			/>
			<motion.img
				className="absolute left-0 bottom-0 h-3/5"
				src={fronthair}
				alt="hair"
				variants={animationBody}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 1 }}
			/>
			<motion.img
				className="absolute left-0 bottom-0 h-3/5"
				src={accessories}
				alt="acc"
				variants={animationBody}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 1 }}
			/>
			<motion.img
				className="absolute left-0 bottom-0 h-3/5"
				src={expression}
				alt="exp"
				variants={animationBody}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ duration: 1 }}
			/>
		</>
	);
};

export default Character;
