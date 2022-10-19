import { motion } from "framer-motion";

interface ISceneEditorButtons {
	onClick: () => void;
	extraClass?: string | undefined;
	icon: JSX.Element;
	clickSfx: () => void;
	hoverSfx: () => void;
	extraIcon?: JSX.Element;
}

const SceneEditorButtons = ({ onClick, extraClass, icon, clickSfx, hoverSfx, extraIcon }: ISceneEditorButtons) => {
	return (
		<motion.div
			className={`flex cursor-pointer flex-row text-[2.4vw] text-[#E879F9] ${
				typeof extraClass !== "undefined" ? extraClass : ""
			}`}
			whileHover={{ scale: 1.2 }}
			whileTap={{ scale: 0.9 }}
			onClick={() => {
				onClick();
				clickSfx();
			}}
			onHoverStart={hoverSfx}
		>
			{icon}
			{typeof extraIcon !== "undefined" ? extraIcon : ""}
		</motion.div>
	);
};

export default SceneEditorButtons;
