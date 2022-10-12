import { motion } from "framer-motion";
import { ActionTypes, Action } from "../types/enum";
import { FullScreenHandle } from "react-full-screen";
import { useRef } from "react";

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
		dispatch({ type: ActionTypes.STARTEDITOR });
	};
	const constraintsRef = useRef(null);
	const titleScreenEl = (
		<div
			ref={constraintsRef}
			className="absolute flex h-full w-full flex-col items-center justify-center gap-16 border bg-white object-cover"
		>
			<div className="flex flex-col items-center justify-center ">
				<div className="flex flex-row gap-5">
					<motion.div
						drag
						dragConstraints={constraintsRef}
						dragSnapToOrigin={true}
						className="mx-1 font-mustard text-3xl md:text-[42px] lg:text-[48px]"
						animate={{
							scale: [1, 2, 2, 1, 1],
							rotate: [0, -60, 45, -60, 0],
							borderRadius: ["20%", "20%", "50%", "50%", "20%"],
						}}
						transition={{ duration: 1 }}
					>
						<span className="outline-title text-fuchsia-500">React</span>
					</motion.div>
					<motion.div
						drag
						dragConstraints={constraintsRef}
						dragSnapToOrigin={true}
						className="font-mustard text-3xl md:text-[42px] lg:text-[48px]"
						animate={{
							scale: [1, 2, 2, 1, 1],
							rotate: [0, 45, -60, 45, 0],
							borderRadius: ["20%", "20%", "50%", "50%", "20%"],
						}}
						transition={{ duration: 1 }}
					>
						<span className="outline-title text-[42px] font-semibold text-sky-400">Visual Novel</span>
					</motion.div>
					<motion.div
						drag
						dragConstraints={constraintsRef}
						dragSnapToOrigin={true}
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
				<p className="text-xs">Try dragging the title when it seems out of place.</p>
			</div>

			<p>
				A react visual novel game maker for everyone. It is recommended to turn on sounds and fullscreen for a
				better experience.
			</p>

			<div className="flex flex-row gap-10">
				<motion.button
					className="rounded border border-rose-300 bg-transparent py-2 px-4 font-semibold text-rose-500 hover:border-transparent hover:bg-rose-500 hover:text-white"
					onClick={startScene}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
				>
					Demo Game
				</motion.button>
				<motion.button
					className="rounded border border-rose-300 bg-transparent py-2 px-4 font-semibold text-rose-500 hover:border-transparent hover:bg-rose-500 hover:text-white"
					onClick={startEditor}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
				>
					Edit Game
				</motion.button>
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
