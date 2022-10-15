import { motion } from "framer-motion";

const animationBody: any = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};
const Background = ({ bgImages, bg, type, onClick }: any) => {
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
