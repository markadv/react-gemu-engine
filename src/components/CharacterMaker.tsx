import { motion } from "framer-motion";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { CharTypes, EditCharState, IEditChar } from "../types/enum";
import { useCallback, useMemo, useRef } from "react";
import DatalistInput from "./DatalistInput";

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
	const charMakerRef = useRef(null);
	useOnClickOutside(charMakerRef, handleClickOutside);
	const setValueSpriteName = (value: string) => {
		editDispatch({ type: CharTypes.CHANGESPRITENAME, payload: value });
	};
	/* For datalist */
	const spriteList = Object.keys(characters);
	const spriteListObject = useMemo(
		() =>
			spriteList.map((sprite, index) => {
				return { id: index + sprite, value: sprite };
			}),
		[]
	);
	const loadCharacter = useCallback((value: string) => {
		editDispatch({ type: CharTypes.LOADCHARACTER, payload: value });
	}, []);

	return (
		<motion.div
			ref={charMakerRef}
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`absolute bottom-[60%] ${
				charLocation === "left" ? "left-[11.5%]" : "right-[11.5%]"
			} flex w-[10%] flex-col items-center justify-center rounded-md border border-rose-400 bg-white font-handwritten font-bold`}
		>
			<DatalistInput
				placeholder={editChar.spriteName}
				label="Sprite Name"
				showLabel={false}
				onFocus={(item) => setValueSpriteName("")}
				items={spriteListObject}
				className="text-center text-[1vw] outline-none"
				value={editChar.spriteName}
				onInput={(e) => console.log("input", e)}
				onSelect={(item) => loadCharacter(item.value)}
				setValue={setValueSpriteName}
			/>
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
			<button
				className="text-[0.9vw]"
				onClick={() => {
					editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
				}}
			>
				Transition
			</button>
			{/* <button onClick={handleClose}>Close</button> */}
		</motion.div>
	);
};

export default CharacterMaker;
