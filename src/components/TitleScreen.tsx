import { motion } from "framer-motion";

const animationTitleScreen: any = {
	initial: { opacity: 0, y: 0 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -0 },
};

const TitleScreen = ({ dispatch, handle, playMusic }: any) => {
	const startGame = (): void => {
		handle.enter();
		playMusic();
		dispatch({ type: "showIntro" });
	};

	const titleScreenEl = (
		<div className="absolute flex h-full w-full flex-col items-center justify-center bg-white object-cover">
			<div className="flex flex-row">
				<motion.div
					className="mini font-mustard text-3xl md:text-[42px] lg:text-[48px]"
					animate={{
						scale: [1, 2, 2, 1, 1],
						rotate: [0, -60, 45, -60, 0],
						borderRadius: ["20%", "20%", "50%", "50%", "20%"],
					}}
					transition={{ duration: 1 }}
				>
					<span className="mini outline-title text-fuchsia-500">kokoro</span>
				</motion.div>
				<motion.div
					className="font-mustard text-3xl md:text-[42px] lg:text-[48px]"
					animate={{
						scale: [1, 2, 2, 1, 1],
						rotate: [0, 45, -60, 45, 0],
						borderRadius: ["20%", "20%", "50%", "50%", "20%"],
					}}
					transition={{ duration: 1 }}
				>
					<span className="outline-title text-[32px] font-semibold text-sky-400">med</span>
				</motion.div>
				<motion.div
					className="font-mustard text-3xl md:text-[42px] lg:text-[48px]"
					animate={{
						scale: [1, 2, 2, 1, 1],
						rotate: [0, -45, 60, -60, 0],
						borderRadius: ["20%", "20%", "50%", "50%", "20%"],
					}}
					transition={{ duration: 1 }}
				>
					<span className="outline-title text-[32px] font-semibold text-rose-400">school</span>
				</motion.div>
			</div>
			<p>This game is not suitable for childred. Parental guidance is adviced.</p>
			<button
				className="mini rounded border border-rose-300 bg-transparent py-2 px-4 font-semibold text-rose-500 hover:border-transparent hover:bg-rose-500 hover:text-white"
				onClick={startGame}
			>
				Start Game
			</button>
		</div>
	);
	return (
		<motion.div
			variants={animationTitleScreen}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.23 }}
		>
			{titleScreenEl}
		</motion.div>
	);
};

export default TitleScreen;
