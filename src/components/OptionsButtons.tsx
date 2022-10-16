import React from "react";
import { Action, State } from "../types/enum";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import { GiMusicalNotes } from "react-icons/gi";
import { FullScreenHandle } from "react-full-screen";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import ConfigMenuScreen from "./ConfigMenuScreen";
import "tippy.js/dist/tippy.css";
import "tippy.js/animations/scale.css";

const OptionsButtons = ({
	state,
	bgmToggle,
	fullscreenToggle,
	handle,
	configMenuToggle,
	dispatch,
	configMenuOff,
	playStartSfx,
	playHoverSfx,
	playClickSfx,
}: {
	state: State;
	bgmToggle: () => void;
	fullscreenToggle: () => void;
	handle: FullScreenHandle;
	configMenuToggle: () => void;
	dispatch: React.Dispatch<Action>;
	configMenuOff: () => void;
	playStartSfx: any;
	playHoverSfx: any;
	playClickSfx: any;
}) => {
	return (
		<>
			<div className="absolute top-0 right-0 flex h-[5.5%] w-[9%] flex-row items-center justify-center gap-[10%] rounded-bl-xl bg-black bg-opacity-25 pl-[.5%]">
				<Tippy
					appendTo="parent"
					content={handle.active ? "Window mode" : "Full screen mode"}
					animation="scale"
					placement="bottom"
					arrow={true}
					delay={100}
				>
					<motion.div
						className={`cursor-pointer text-[1.4vw] text-[#E879F9]`}
						onClick={fullscreenToggle}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
						onHoverStart={playHoverSfx}
					>
						{handle.active ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
					</motion.div>
				</Tippy>
				<Tippy
					appendTo="parent"
					content={state.bgmPlaying ? "BGM off" : "BGM on"}
					animation="scale"
					placement="bottom"
					arrow={true}
					delay={100}
				>
					<motion.div
						className={`cursor-pointer text-[1.5vw] ${
							state.bgmPlaying ? "animate-pulse text-[#E879F9]" : "text-slate-500 opacity-50"
						}`}
						onClick={bgmToggle}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
						onHoverStart={playHoverSfx}
					>
						<GiMusicalNotes />
					</motion.div>
				</Tippy>
				<Tippy
					appendTo="parent"
					content="Settings"
					animation="scale"
					placement="bottom"
					arrow={true}
					delay={100}
				>
					<motion.div
						className={`cursor-pointer text-[1.75vw] ${
							state.titleScreenShown ? "text-slate-500 opacity-50" : "text-[#E879F9]"
						}`}
						onClick={configMenuToggle}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
						onHoverStart={playHoverSfx}
					>
						<IoSettingsOutline />
					</motion.div>
				</Tippy>
			</div>
			<AnimatePresence>
				{state.configMenuShown && (
					<ConfigMenuScreen
						dispatch={dispatch}
						configMenuOff={configMenuOff}
						state={state}
						playStartSfx={playStartSfx}
						playHoverSfx={playHoverSfx}
						playClickSfx={playClickSfx}
					/>
				)}
			</AnimatePresence>
		</>
	);
};

export default OptionsButtons;
