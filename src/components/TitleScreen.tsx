import { motion } from "framer-motion";
import { ActionTypes, Action } from "../types/enum";
import { FullScreenHandle } from "react-full-screen";
import { useRef } from "react";
import AnimatedText from "./AnimatedText";

const animationTitleScreen: any = {
	initial: { opacity: 0 },
	animate: { opacity: 1 },
	exit: { opacity: 0 },
};

interface TitleScreenProps {
	dispatch: React.Dispatch<Action>;
	handle: FullScreenHandle;
	bgMusic: {
		[key: string]: any;
	};
	story: any;
	storyState: any;
	screenOrientation: string;
	playStartSfx: () => void;
	playHoverSfx: () => void;
}

const TitleScreen = ({
	dispatch,
	handle,
	bgMusic,
	story,
	storyState,
	screenOrientation,
	playStartSfx,
	playHoverSfx,
}: TitleScreenProps) => {
	const startScene = (isDemo: boolean): void => {
		(screenOrientation === "landscape-primary" || screenOrientation === "landscape-secondary") && handle.enter();
		dispatch({ type: ActionTypes.PLAYDEMO, payload: isDemo });
		dispatch({ type: ActionTypes.SHOWINTRO });
		dispatch({
			type: ActionTypes.CHANGEBGM,
			payload: isDemo ? bgMusic[story["main-0"].bgm] : bgMusic[storyState["main-0"].bgm],
		});
		playStartSfx();
		if (!isDemo && storyState["main-0"].type === "video") {
			dispatch({ type: ActionTypes.BGMOFF });
		} else if (isDemo && story["main-0"].type === "video") {
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
			<div className="text-[5vh] text-slate-50 sm:text-[5vw]">
				<AnimatedText text="Visual Novel Maker" />
			</div>
			<motion.div
				whileHover={{ scale: 1.1, color: "#E879F9" }}
				className="text-left font-handwritten text-[2.5vh] text-slate-50 sm:text-[2.5vw]"
			>
				A new experience in storytelling.
			</motion.div>
			<div className="flex w-full flex-row items-center justify-center gap-[5%]">
				<motion.button
					className="w-[20%] rounded-xl border border-[#E879F9] bg-transparent py-[.5%] px-[1%] text-[1.5vh] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white sm:text-[1.5vw]"
					onClick={() => startScene(true)}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
					onHoverStart={playHoverSfx}
				>
					Demo novel
				</motion.button>
				<motion.button
					className="w-[20%] rounded-xl border border-[#E879F9] bg-transparent py-[.5%] px-[1%] text-[1.5vh] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white sm:text-[1.5vw]"
					onClick={() => startScene(false)}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
					onHoverStart={playHoverSfx}
				>
					Watch your novel
				</motion.button>
				<motion.button
					className="w-[20%] rounded-xl border border-[#E879F9] bg-transparent py-[.5%] px-[1%] text-[1.5vh] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white sm:text-[1.5vw]"
					onClick={startEditor}
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
					onHoverStart={playHoverSfx}
				>
					Create your novel
				</motion.button>
			</div>
			<a href="https://github.com/markadv" className="w-[15%]">
				<motion.img
					whileTap={{ scale: 0.8 }}
					whileHover={{ scale: 1.2 }}
					src={require("../assets/images/Available-Github.webp")}
					alt="Steam logo"
					onHoverStart={playHoverSfx}
				/>
			</a>
		</div>
	);
	return (
		<motion.div
			variants={animationTitleScreen}
			initial="initial"
			animate="animate"
			exit="exit"
			transition={{ duration: 0.4 }}
		>
			{titleScreenEl}
		</motion.div>
	);
};

export default TitleScreen;
