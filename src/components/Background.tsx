import { motion } from "framer-motion";
const animationBody: any = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};
const Background = ({ bg }: any) => {
	return (
		<motion.img
			className="h-auto w-full object-contain"
			src={bg}
			alt="lib"
			variants={animationBody}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.23 }}
		/>
	);
};

export default Background;
