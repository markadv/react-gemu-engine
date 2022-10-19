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
import CharacterMakerButton from "./CharacterMakerButton";

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
	playClickSfx,
}: {
	editCharDispatch: React.Dispatch<IEditChar>;
	handleClickOutside: () => void;
	charLocation: string;
	editChar: EditCharState;
	characters: any;
	editSceneDispatch: React.Dispatch<IEditScene>;
	editSceneState: EditSceneState;
	playClickSfx: any;
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
		[spriteList]
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
			title: "Haircolor",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "haircolor" });
			},
			partName: editChar.parts.haircolor.toUpperCase(),
		},
		{
			title: "Fronthair",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "fronthair" });
			},
			partName: editChar.parts.fronthair.toUpperCase(),
		},
		{
			title: "Backhair",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "backhair" });
			},
			partName: editChar.parts.backhair.toUpperCase(),
		},
		{
			title: "Outfits",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "outfits" });
			},
			partName: editChar.parts.outfits.toUpperCase(),
		},
		{
			title: "Expression",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "expression" });
			},
			partName: editChar.parts.expression.toUpperCase(),
		},
		{
			title: "Glasses",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories1" });
			},
			partName: editChar.parts.accessories1 ? editChar.parts.accessories1.toUpperCase() : "null",
		},
		{
			title: "NeckAcc",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories2" });
			},
			partName: editChar.parts.accessories2 ? editChar.parts.accessories2.toUpperCase() : "null",
		},
		{
			title: "HeadAcc",
			onClick: () => {
				playClickSfx();
				editCharDispatch({ type: CharTypes.CHANGECHARACTERPART, payload: "accessories3" });
			},
			partName: editChar.parts.accessories3 ? editChar.parts.accessories3.toUpperCase() : "null",
		},
		{
			title: "Animate",
			onClick: () => {
				playClickSfx();
			},
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
		return (
			<div key={index}>
				<CharacterMakerButton title={rows.title} partName={rows.partName} onClick={rows.onClick} />
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
			className={`absolute bottom-[30%] ${
				charLocation === "left" ? "left-[30%]" : "right-[30%]"
			} character-control flex w-[15%] flex-col`}
		>
			<div className="w-full rounded border border-[#E879F9] bg-slate-50 px-[2.5%] py-[5%] text-[1vw] font-semibold">
				<div className="flex w-full flex-row items-center justify-center">
					<p className="mr-[2%] w-1/3 text-[.9vw] font-semibold">Sprite:</p>
					<div className="w-full rounded border border-[#E879F9] bg-slate-50 text-[1vw] font-semibold">
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
									color: "#E879F9",
								},
							}}
							listboxProps={{ style: { fontWeight: 500 } }}
							// onMouseEnter={playHoverSfx}
							onClick={playClickSfx}
						/>
					</div>
				</div>
				{buttonListEl}
				<div className="flex w-full flex-row items-center justify-center">
					<p className="w-1/3 text-left text-[.8vw] font-semibold placeholder:text-gray-900">Animate:</p>
					<div className="w-full rounded border border-[#E879F9] bg-slate-50 text-[1vw] font-semibold">
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
							setValue={(item) => {}}
							inputProps={{
								style: {
									fontWeight: 500,
									fontSize: "0.9vw",
									padding: 0,
									outline: 0,
									border: 0,
								},
							}}
							listboxProps={{ style: { fontWeight: 500 } }}
							onClick={playClickSfx}
						/>
					</div>
				</div>
			</div>
		</motion.div>
	);
};

export default CharacterMaker;
