import { motion } from "framer-motion";
import { EditTypes, Edit } from "./SceneEditor";

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
		y: "100vh",
		opacity: 0,
	},
};

const CharacterMaker = ({ editDispatch }: { editDispatch: React.Dispatch<Edit> }) => {
	return (
		<motion.div
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className="absolute bottom-[55%] left-[10%] flex w-[10%] flex-col items-center justify-center rounded-md border border-rose-400 bg-white"
		>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: EditTypes.CHANGECHARACTERPART, payload: "fronthair" });
				}}
			>
				Fronthair
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: EditTypes.CHANGECHARACTERPART, payload: "backhair" });
				}}
			>
				Backhair
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: EditTypes.CHANGECHARACTERPART, payload: "outfits" });
				}}
			>
				Outfits
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: EditTypes.CHANGECHARACTERPART, payload: "expression" });
				}}
			>
				Expression
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: EditTypes.CHANGECHARACTERPART, payload: "accessories1" });
				}}
			>
				Glasses
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: EditTypes.CHANGECHARACTERPART, payload: "accessories2" });
				}}
			>
				Neck accessories
			</button>
			<button
				className="text-xl"
				onClick={() => {
					editDispatch({ type: EditTypes.CHANGECHARACTERPART, payload: "accessories3" });
				}}
			>
				Hair accessories
			</button>
			{/* <button onClick={handleClose}>Close</button> */}
		</motion.div>
	);
};

export default CharacterMaker;
