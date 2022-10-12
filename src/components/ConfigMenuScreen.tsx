import { motion } from "framer-motion";
import { useRef } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { ActionTypes, Action } from "../types/enum";

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
}: {
	dispatch: React.Dispatch<Action>;
	configMenuOff: () => void;
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
				className="-translate-x-1/2 -translate-y-1/2 rounded-md border border-rose-400 bg-white p-2"
			>
				<button
					className="text-xl"
					onClick={(e) => {
						dispatch({ type: ActionTypes.RESET });
					}}
				>
					Go back to title screen
				</button>
				{/* <button onClick={handleClose}>Close</button> */}
			</div>
		</motion.div>
	);
};

export default ConfigMenuScreen;
