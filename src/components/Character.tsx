import { motion } from "framer-motion";

const animationBody: any = {
	initial: { opacity: 0, x: "-100vw" },
	animate: { opacity: 1, x: "0" },
	exit: { opacity: 0, x: "-100vw" },
};

const Character = ({ characters }: any): any => {
	let character = [];
	for (let part in characters.Kanon) {
		character.push(
			<motion.img
				key={part}
				className="absolute left-0 bottom-0 h-3/5"
				src={characters.Kanon[part]}
				alt="hair"
				variants={animationBody}
				initial="initial"
				animate="animate"
				exit="exit"
				transition={{ ease: "easeOut", duration: 1 }}
			/>
		);
	}
	return <>{character}</>;
};

export default Character;
