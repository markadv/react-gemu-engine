import { motion } from "framer-motion";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { CharTypes, EditCharState, IEditChar } from "../types/enum";
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
	editChar,
	characters,
}: {
	editDispatch: React.Dispatch<IEditChar>;
	handleClickOutside: () => void;
	charLocation: string;
	editChar: EditCharState;
	characters: any;
}) => {
	/* Close the modal if you click outside */
	const charMaker1Ref = useRef(null);
	useOnClickOutside(charMaker1Ref, handleClickOutside);
	const onInputSpriteName = (e: React.FormEvent<HTMLInputElement>) => {
		editDispatch({ type: CharTypes.CHANGESPRITENAME, payload: e.currentTarget.value });
	};

	const spriteList = Object.keys(characters);
	const spriteListEl = spriteList.map((sprite, index) => {
		return <option key={index} value={sprite} />;
	});
	return (
		<motion.div
			ref={charMaker1Ref}
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`absolute bottom-[60%] ${
				charLocation === "left" ? "left-[11.5%]" : "right-[11.5%]"
			} flex w-[10%] flex-col items-center justify-center rounded-md border border-rose-400 bg-white font-handwritten font-bold`}
		>
			<input
				type="text"
				value={editChar.spriteName}
				name="sprite-name"
				list="sprite"
				className="inline w-[90%] bg-none p-0 text-center text-[0.9vw] outline-none"
				onInput={onInputSpriteName}
			/>
			<datalist id="sprite">{spriteListEl}</datalist>
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "haircolor" });
				}}
			>
				Haircolor
			</button>
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "fronthair" });
				}}
			>
				Fronthair
			</button>
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "backhair" });
				}}
			>
				Backhair
			</button>
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "outfits" });
				}}
			>
				Outfits
			</button>
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "expression" });
				}}
			>
				Expression
			</button>
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories1" });
				}}
			>
				Glasses
			</button>
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories2" });
				}}
			>
				Neck accessories
			</button>
			<button
				className="text-[0.9vw]"
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
