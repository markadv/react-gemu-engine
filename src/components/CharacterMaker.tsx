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

	const buttonList = [
		{
			title: "Haircolor",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "haircolor" });
			},
			partName: editChar.parts.haircolor.toUpperCase(),
		},
		{
			title: "Fronthair",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "fronthair" });
			},
			partName: editChar.parts.fronthair.toUpperCase(),
		},
		{
			title: "Backhair",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "backhair" });
			},
			partName: editChar.parts.backhair.toUpperCase(),
		},
		{
			title: "Outfits",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "outfits" });
			},
			partName: editChar.parts.outfits.toUpperCase(),
		},
		{
			title: "Expression",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "expression" });
			},
			partName: editChar.parts.expression.toUpperCase(),
		},
		{
			title: "Glasses",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories1" });
			},
			partName: editChar.parts.accessories1 ? editChar.parts.accessories1.toUpperCase() : "null",
		},
		{
			title: "NeckAcc",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories2" });
			},
			partName: editChar.parts.accessories2 ? editChar.parts.accessories2.toUpperCase() : "null",
		},
		{
			title: "HeadAcc",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
			},
			partName: editChar.parts.accessories3 ? editChar.parts.accessories3.toUpperCase() : "null",
		},
		{
			title: "Animate",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
			},
			partName: editChar.parts.accessories3 ? editChar.parts.accessories3.toUpperCase() : "null",
		},
		{
			title: "Transition",
			onClick: () => {
				editDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
			},
			partName: editChar.parts.accessories3 ? editChar.parts.accessories3.toUpperCase() : "null",
		},
	];
	const buttonListEl = buttonList.map((rows) => {
		return (
			<div className="flex flex-row items-center justify-center">
				<p className="w-1/3 text-left text-[.8vw]">{rows.title}:</p>
				<button className="w-2/3 text-[0.9vw]" onClick={rows.onClick}>
					{rows.partName}
				</button>
			</div>
		);
	});

	return (
		<motion.div
			ref={charMakerRef}
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`absolute bottom-[30%] p-1 ${
				charLocation === "left" ? "left-[30%]" : "right-[30%]"
			} flex w-[15%] flex-col  rounded-md border border-rose-400 bg-white font-handwritten font-bold`}
		>
			<div className="flex flex-row items-center justify-center">
				<p className="text-[.9vw]">Spritename:</p>
				<DatalistInput
					placeholder={editChar.spriteName}
					label="Sprite Name"
					showLabel={false}
					onFocus={(item) => setValueSpriteName("")}
					items={spriteListObject}
					className="text-center text-[.9vw] outline-none"
					value={editChar.spriteName}
					onInput={(e) => console.log("input", e)}
					onSelect={(item) => loadCharacter(item.value)}
					setValue={setValueSpriteName}
				/>
			</div>
			{buttonListEl}
		</motion.div>
	);
};

export default CharacterMaker;
