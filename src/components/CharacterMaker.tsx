import { motion } from "framer-motion";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { CharTypes, IEditChar } from "./SceneEditor";
import { useRef } from "react";

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

const CharacterMaker = ({
	editDispatch,
	handleClickOutside,
	charLocation,
}: {
	editDispatch: React.Dispatch<IEditChar>;
	handleClickOutside: () => void;
	charLocation: string;
}) => {
	const charMaker1Ref = useRef(null);
	useOnClickOutside(charMaker1Ref, handleClickOutside);
	return (
		<motion.div
			ref={charMaker1Ref}
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`absolute top-[20%] ${
				charLocation === "left" ? "left-[11.5%]" : "right-[11.5%]"
			} flex w-[10%] flex-col items-center justify-center rounded-md border border-rose-400 bg-white`}
		>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "fronthair" });
				}}
			>
				Fronthair
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "backhair" });
				}}
			>
				Backhair
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "outfits" });
				}}
			>
				Outfits
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "expression" });
				}}
			>
				Expression
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories1" });
				}}
			>
				Glasses
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories2" });
				}}
			>
				Neck accessories
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
				}}
			>
				Hair accessories
			</button>
			{/* <button onClick={handleClose}>Close</button> */}
		</motion.div>
	);
};

export default CharacterMaker;
