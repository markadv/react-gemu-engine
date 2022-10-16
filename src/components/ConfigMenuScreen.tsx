import { motion } from "framer-motion";
import { useRef } from "react";
import { PlayFunction } from "use-sound/dist/types";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { ActionTypes, Action, State } from "../types/enum";

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
		y: "-100vh",
		opacity: 0,
	},
};

const ConfigMenuScreen = ({
	dispatch,
	configMenuOff,
	state,
	playStartSfx,
	playHoverSfx,
	playClickSfx,
}: {
	dispatch: React.Dispatch<Action>;
	configMenuOff: () => void;
	state: State;
	playStartSfx: any;
	playHoverSfx: any;
	playClickSfx: any;
}) => {
	const configMenuRef = useRef(null);
	useOnClickOutside(configMenuRef, configMenuOff);
	return (
		<motion.div
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`absolute left-1/2 top-1/2 w-1/5`}
		>
			<div
				ref={configMenuRef}
				className="flex -translate-x-1/2 -translate-y-1/2 flex-col gap-1 rounded-md border border-[#E879F9] bg-white px-[10%] py-[5%]"
			>
				<p className="font-md text-center text-[1vw] font-medium text-[#E879F9]">Volume</p>
				<input
					className="mb-2 block accent-[#E879F9]"
					value={state.bgmVolume}
					type="range"
					min={0}
					max={100}
					onChange={(e) => {
						console.log(e.target.value);
						dispatch({ type: ActionTypes.SETVOLUME, payload: e.target.value });
					}}
				/>
				<button
					className="w-full rounded border border-[#E879F9] bg-transparent py-[.5%] px-[.25%] text-[1vw] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white"
					onClick={(e) => {
						playStartSfx();
						dispatch({ type: ActionTypes.RESET });
					}}
					onMouseEnter={playHoverSfx}
				>
					Return to title screen
				</button>
				<button
					className="w-full rounded border border-[#E879F9] bg-transparent py-[.5%] px-[.25%] text-[1vw] font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white"
					onClick={(e) => {
						playClickSfx();
						dispatch({ type: ActionTypes.MENUTOGGLE });
					}}
					onMouseEnter={playHoverSfx}
				>
					Close settings
				</button>
			</div>
		</motion.div>
	);
};

export default ConfigMenuScreen;
