import { motion } from "framer-motion";
import { ActionTypes, Action } from "../types/enum";
import { FullScreenHandle } from "react-full-screen";

const animationTitleScreen: any = {
	initial: { opacity: 0, y: 0 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -0 },
};

interface TitleScreenProps {
	dispatch: React.Dispatch<Action>;
	handle: FullScreenHandle;
	bgMusic: {
		[key: string]: any;
	};
	story: any[];
}

const TitleScreen = ({ dispatch, handle, bgMusic, story }: TitleScreenProps) => {
	const startScene = (): void => {
		handle.enter();
		dispatch({ type: ActionTypes.SHOWINTRO });
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story[0].bgm] });
	};
	const startEditor = (): void => {
		handle.enter();
		dispatch({ type: ActionTypes.STARTEDITOR });
	};

	const titleScreenEl = (
		<div className="absolute flex h-full w-full flex-col items-center justify-center gap-10 bg-white object-cover">
			<div className="flex flex-row">
				<motion.div
					className="mini mx-1 font-mustard text-3xl md:text-[42px] lg:text-[48px]"
					animate={{
						scale: [1, 2, 2, 1, 1],
						rotate: [0, -60, 45, -60, 0],
						borderRadius: ["20%", "20%", "50%", "50%", "20%"],
					}}
					transition={{ duration: 1 }}
				>
					<span className="mini outline-title text-fuchsia-500">React</span>
				</motion.div>
				<motion.div
					className="mx-1 font-mustard text-3xl md:text-[42px] lg:text-[48px]"
					animate={{
						scale: [1, 2, 2, 1, 1],
						rotate: [0, 45, -60, 45, 0],
						borderRadius: ["20%", "20%", "50%", "50%", "20%"],
					}}
					transition={{ duration: 1 }}
				>
					<span className="outline-title mx-1 text-[42px] font-semibold text-sky-400">VisualNovel</span>
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
					<span className="outline-title text-[32px] font-semibold text-rose-400">Engine</span>
				</motion.div>
			</div>
			<p>A react visual novel game engine for everyone.</p>
			<div className="flex flex-row gap-10">
				<button
					className="mini rounded border border-rose-300 bg-transparent py-2 px-4 font-semibold text-rose-500 hover:border-transparent hover:bg-rose-500 hover:text-white"
					onClick={startScene}
				>
					Start Game
				</button>
				<button
					className="mini rounded border border-rose-300 bg-transparent py-2 px-4 font-semibold text-rose-500 hover:border-transparent hover:bg-rose-500 hover:text-white"
					onClick={startEditor}
				>
					Edit Game
				</button>
			</div>
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
