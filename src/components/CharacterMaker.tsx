/* Dependencies */
import { useCallback, useMemo, useState, useRef } from "react";
import { motion } from "framer-motion";

/* Hooks */
import useOnClickOutside from "../hooks/useOnClickOutside";

/* Types */
import { CharTypes, EditCharState, EditSceneState, IEditChar, IEditScene, SceneTypes } from "../types/enum";

/* Data */
import DatalistInput from "./DatalistInput";
import { variantsList } from "./Character";

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
	editCharDispatch,
	handleClickOutside,
	charLocation,
	editChar,
	characters,
	editSceneDispatch,
	editSceneState,
}: {
	editCharDispatch: React.Dispatch<IEditChar>;
	handleClickOutside: () => void;
	charLocation: string;
	editChar: EditCharState;
	characters: any;
	editSceneDispatch: React.Dispatch<IEditScene>;
	editSceneState: EditSceneState;
}) => {
	/* Close the modal if you click outside */
	const charMakerRef = useRef(null);
	useOnClickOutside(charMakerRef, handleClickOutside);
	const setSpriteName = (value: string) => {
		editCharDispatch({ type: CharTypes.CHANGESPRITENAME, payload: value });
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
		editCharDispatch({ type: CharTypes.LOADCHARACTER, payload: value });
	}, []);

	/* For animate */
	let animateList = Object.keys(variantsList);
	let animateListObject = animateList.map((items) => {
		return { id: items, value: items };
	});
	let charIndex = editSceneState.characters.findIndex((items) => items.location === charLocation);
	let charAnimate = editSceneState.characters[charIndex].animate;
	console.log("animate", charAnimate, "scene", editSceneState);
	const setAnimate = (value: string) => {
		editSceneDispatch({ type: SceneTypes.SETANIMATE, payload: { index: charIndex, animate: value } });
	};
	const [animateInputValue, setAnimateInputValue] = useState("");

	const buttonList = [
		{
			type: "select",
			title: "Haircolor",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "haircolor" });
			},
			partName: editChar.parts.haircolor.toUpperCase(),
		},
		{
			type: "select",
			title: "Fronthair",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "fronthair" });
			},
			partName: editChar.parts.fronthair.toUpperCase(),
		},
		{
			type: "select",
			title: "Backhair",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "backhair" });
			},
			partName: editChar.parts.backhair.toUpperCase(),
		},
		{
			type: "select",
			title: "Outfits",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "outfits" });
			},
			partName: editChar.parts.outfits.toUpperCase(),
		},
		{
			type: "select",
			title: "Expression",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "expression" });
			},
			partName: editChar.parts.expression.toUpperCase(),
		},
		{
			type: "select",
			title: "Glasses",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories1" });
			},
			partName: editChar.parts.accessories1 ? editChar.parts.accessories1.toUpperCase() : "null",
		},
		{
			type: "select",
			title: "NeckAcc",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories2" });
			},
			partName: editChar.parts.accessories2 ? editChar.parts.accessories2.toUpperCase() : "null",
		},
		{
			type: "select",
			title: "HeadAcc",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
			},
			partName: editChar.parts.accessories3 ? editChar.parts.accessories3.toUpperCase() : "null",
		},
		{
			type: "datalist",
			title: "Animate",
			onClick: () => {},
			partName: editChar.parts.accessories3 ? editChar.parts.accessories3.toUpperCase() : "null",
		},
		/* Future updates
		{
			type: "select",
			title: "Transition",
			onClick: () => {
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
			},
			partName: editChar.parts.accessories3 ? editChar.parts.accessories3.toUpperCase() : "null",
		}, */
	];
	const buttonListEl = buttonList.map((rows, index) => {
		if (rows.type === "select") {
			return (
				<div className="my-[1%] flex flex-row items-center justify-center" key={index}>
					<p className="w-1/3 text-left text-[.8vw] font-semibold">{rows.title}:</p>
					<button
						className="group relative inline-flex w-2/3 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1%] text-sm font-medium text-gray-900 hover:text-white focus:outline-none group-hover:from-purple-500 group-hover:to-pink-500"
						onClick={rows.onClick}
					>
						<span className="relative w-full rounded-md bg-white transition-all duration-75 ease-in group-hover:bg-opacity-0">
							{rows.partName}
						</span>
					</button>
				</div>
			);
		} else {
			return (
				<div className="flex w-full flex-row items-center justify-center" key={index}>
					<p className="text-left text-[.8vw] font-semibold placeholder:text-gray-900">Animate:</p>
					<DatalistInput
						placeholder={charAnimate === null ? "null" : charAnimate}
						value={animateInputValue}
						onFocus={(item) => setAnimateInputValue("")}
						label="Sprite Name"
						showLabel={false}
						items={animateListObject}
						className="w-full border-none text-center text-[.9vw]"
						onSelect={(item) => {
							setAnimate(item.value);
						}}
						setValue={(item) => {
							// setAnimateInputValue("");
						}}
						inputProps={{
							style: { fontWeight: 500, fontSize: "0.9vw", padding: 0, outline: 0, border: 0 },
						}}
						listboxProps={{ style: { fontWeight: 500 } }}
					/>
				</div>
			);
		}
	});

	return (
		<motion.div
			ref={charMakerRef}
			onClick={(e) => e.stopPropagation()}
			variants={dropIn}
			initial="hidden"
			animate="visible"
			exit="exit"
			className={`absolute bottom-[30%] ${
				charLocation === "left" ? "left-[30%]" : "right-[30%]"
			} flex w-[15%] flex-col`}
		>
			<div className="relative inline-flex items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-[1%] text-sm font-medium text-gray-900">
				<div className="relative w-full rounded-md bg-white p-[2%] transition-all duration-75 ease-in">
					<div className="flex w-full flex-row items-center justify-center">
						<p className="mr-[2%] text-[.9vw] font-semibold">Sprite:</p>
						<DatalistInput
							placeholder={editChar.spriteName}
							label="Sprite Name"
							showLabel={false}
							onFocus={(item) => setSpriteName("")}
							items={spriteListObject}
							className="w-full border-none text-center text-[.9vw] outline-none"
							value={editChar.spriteName}
							onSelect={(item) => loadCharacter(item.value)}
							setValue={setSpriteName}
							inputProps={{
								style: {
									fontWeight: 500,
									textAlign: "center",
									fontSize: "0.9vw",
									border: 0,
									padding: 0,
									outline: 0,
								},
							}}
							listboxProps={{ style: { fontWeight: 500 } }}
						/>
					</div>
					{buttonListEl}
				</div>
			</div>
		</motion.div>
	);
};

export default CharacterMaker;
