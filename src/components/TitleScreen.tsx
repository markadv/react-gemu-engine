import { motion } from "framer-motion";
import { ActionTypes, Action } from "../types/enum";
import { FullScreenHandle } from "react-full-screen";
import { useRef } from "react";
import AnimatedText from "./AnimatedText";

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
	story: any;
	screenOrientation: string;
	playStartSfx: any;
	playHoverSfx: any;
}

const TitleScreen = ({
	dispatch,
	handle,
	bgMusic,
	story,
	screenOrientation,
	playStartSfx,
	playHoverSfx,
}: TitleScreenProps) => {
	const startScene = (isDemo: boolean): void => {
		(screenOrientation === "landscape-primary" || screenOrientation === "landscape-secondary") && handle.enter();
		dispatch({ type: ActionTypes.PLAYDEMO, payload: isDemo });
		dispatch({ type: ActionTypes.SHOWINTRO });
		dispatch({ type: ActionTypes.CHANGEBGM, payload: bgMusic[story["main-0"].bgm] });
		playStartSfx();
		if (story["main-0"].type === "video") {
			dispatch({ type: ActionTypes.BGMOFF });
		}
	};
	const startEditor = (): void => {
		playStartSfx();
		dispatch({ type: ActionTypes.STARTEDITOR });
		if (story["main-0"].type === "video") {
			dispatch({ type: ActionTypes.BGMOFF });
		}
	};
	const constraintsRef = useRef(null);
	const titleScreenEl = (
		<div
			ref={constraintsRef}
			className="absolute flex h-full w-full flex-col items-center justify-center gap-16 object-cover"
		>
			<div className="text-[5vw] text-slate-50">
				<AnimatedText text="Visual Novel maker" />
			</div>
			<motion.div
				whileHover={{ scale: 1.1, color: "#E879F9" }}
				className="text-left font-handwritten text-[2.5vw] text-slate-50"
			>
				A new creative experience in storytelling.
			</motion.div>
			<div className="flex w-full flex-row items-center justify-center gap-[5%]">
				<motion.button
					className="w-[20%] rounded border border-[#E879F9] bg-transparent py-[.5%] px-[1%] text-[1.5vw] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white"
					onClick={() => startScene(true)}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
					onHoverStart={playHoverSfx}
				>
					Demo Game
				</motion.button>
				<motion.button
					className="w-[20%] rounded border border-[#E879F9] bg-transparent py-[.5%] px-[1%] text-[1.5vw] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white"
					onClick={() => startScene(false)}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
					onHoverStart={playHoverSfx}
				>
					Start your game
				</motion.button>
				<motion.button
					className="w-[20%] rounded border border-[#E879F9] bg-transparent py-[.5%] px-[1%] text-[1.5vw] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white"
					onClick={startEditor}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
					onHoverStart={playHoverSfx}
				>
					Create your own game
				</motion.button>
			</div>
			<motion.img
				whileTap={{ scale: 0.8 }}
				whileHover={{ scale: 1.2 }}
				className="w-[20%] cursor-pointer"
				src={require("../assets/images/steam.png")}
				alt="Steam logo"
				onHoverStart={playHoverSfx}
			/>
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
