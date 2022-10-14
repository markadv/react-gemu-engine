import React from "react";
import { Action, State } from "../types/enum";
import Tippy from "@tippyjs/react";
import { AnimatePresence, motion } from "framer-motion";
import { GiMusicalNotes } from "react-icons/gi";
import { FullScreenHandle } from "react-full-screen";
import { BsArrowsFullscreen, BsFullscreenExit } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import ConfigMenuScreen from "./ConfigMenuScreen";

const OptionsButton = ({
	state,
	bgmToggle,
	fullscreenToggle,
	handle,
	configMenuToggle,
	dispatch,
	configMenuOff,
}: {
	state: State;
	bgmToggle: () => void;
	fullscreenToggle: () => void;
	handle: FullScreenHandle;
	configMenuToggle: () => void;
	dispatch: React.Dispatch<Action>;
	configMenuOff: () => void;
}) => {
	console.log(state.sceneIsRendering, state.titleScreenShown);
	return (
		<>
			<div className="absolute top-0 right-0 flex h-[5.5%] w-[9%] flex-row items-center justify-center gap-[10%] rounded-bl-xl bg-black bg-opacity-25 pl-[.5%]">
				<Tippy
					appendTo="parent"
					content={
						<div className="rounded-lg bg-[#E379F4] p-1">
							<span className="text-[1vw] text-slate-50">Fullscreen</span>
						</div>
					}
					placement="bottom"
				>
					<motion.div
						className={`cursor-pointer text-[1.4vw] text-[#E879F9]`}
						onClick={fullscreenToggle}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					>
						{handle.active ? <BsFullscreenExit /> : <BsArrowsFullscreen />}
					</motion.div>
				</Tippy>
				<Tippy
					appendTo="parent"
					content={
						<div className="rounded-lg bg-[#E379F4] p-1">
							<span className="text-[1vw] text-slate-50">BGM On/Off</span>
						</div>
					}
					placement="bottom"
				>
					<motion.div
						className={`cursor-pointer text-[1.5vw] ${
							state.bgmPlaying ? "animate-pulse text-[#E879F9]" : "opacity-50 grayscale"
						}`}
						onClick={bgmToggle}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					>
						<GiMusicalNotes />
					</motion.div>
				</Tippy>
				<Tippy
					appendTo="parent"
					content={
						<div className="rounded-lg bg-[#E379F4] p-1">
							<span className="text-[1vw] text-slate-50">Settings</span>
						</div>
					}
					placement="bottom"
				>
					<motion.div
						className={`cursor-pointer text-[1.75vw] ${
							state.titleScreenShown ? "text-slate-500 opacity-50" : "text-[#E879F9]"
						}`}
						onClick={configMenuToggle}
						whileHover={{ scale: 1.2 }}
						whileTap={{ scale: 0.9 }}
					>
						<IoSettingsOutline />
					</motion.div>
				</Tippy>
			</div>
			<AnimatePresence>
				{state.configMenuShown && <ConfigMenuScreen dispatch={dispatch} configMenuOff={configMenuOff} />}
			</AnimatePresence>
		</>
	);
};

export default OptionsButton;
