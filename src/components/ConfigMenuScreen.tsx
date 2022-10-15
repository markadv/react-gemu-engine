import { motion } from "framer-motion";
import { useRef, useState } from "react";
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
}: {
	dispatch: React.Dispatch<Action>;
	configMenuOff: () => void;
	state: State;
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
			className={`absolute left-1/2 top-1/2 `}
		>
			<div
				ref={configMenuRef}
				className="flex -translate-x-1/2 -translate-y-1/2 flex-col gap-1 rounded-md border border-[#E879F9] bg-white p-2"
			>
				<p className="font-md text-center text-[1vw] font-medium text-gray-900">Volume</p>
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
					className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1%] font-medium text-gray-900 hover:text-white focus:outline-none group-hover:from-purple-500 group-hover:to-pink-500"
					onClick={(e) => {
						dispatch({ type: ActionTypes.RESET });
					}}
				>
					<span className="relative w-full rounded-md bg-white text-[1vw] transition-all duration-75 ease-in group-hover:bg-opacity-0">
						Go back to title screen
					</span>
				</button>
				<button
					className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1%] text-xl text-sm font-medium text-gray-900 hover:text-white focus:outline-none group-hover:from-purple-500 group-hover:to-pink-500"
					onClick={(e) => {
						dispatch({ type: ActionTypes.MENUTOGGLE });
					}}
				>
					<span className="relative w-full rounded-md bg-white text-[1vw]  transition-all duration-75 ease-in group-hover:bg-opacity-0">
						Close settings
					</span>
				</button>
			</div>
		</motion.div>
	);
};

export default ConfigMenuScreen;
