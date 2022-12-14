import { motion } from "framer-motion";
import { ISimpleAnimation } from "../types/enum";

const animationBody: ISimpleAnimation = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

interface IBackground {
	bgImages: { [key: string]: any };
	bg: any;
	type: string;
	onClick?: () => void;
}
const Background = ({ bgImages, bg, type, onClick }: IBackground) => {
	return (
		<motion.img
			className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
			key={bgImages[bg]}
			src={bgImages[bg]}
			alt="lib"
			variants={animationBody}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: type === "game" ? 1.5 : 0.23 }}
			onClick={onClick}
		/>
	);
};

export default Background;
