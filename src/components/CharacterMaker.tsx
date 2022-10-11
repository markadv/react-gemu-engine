import { motion } from "framer-motion";

const dropIn = {
	hidden: {
		y: "-100vh",
		opacity: 0,
	},
	visible: {
		y: "0",
		opacity: 1,
		transition: {
			duration: 0.1,
			type: "spring",
			damping: 25,
			stiffness: 500,
		},
	},
	exit: {
		y: "100vh",
		opacity: 0,
	},
};

const CharacterMaker = () => {
	return (
		<motion.div
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="absolute bottom-[55%] left-[10%] flex w-[10%] items-center justify-center rounded-md border border-rose-400 bg-white"
		>
			<p className="z-10 bg-white text-3xl">Test</p>
			{/* <button onClick={handleClose}>Close</button> */}
		</motion.div>
	);
};

export default CharacterMaker;
