import * as React from "react";
import { useLayer, useHover, Arrow } from "react-laag";
import { motion, AnimatePresence } from "framer-motion";

export function Tooltip({ children, text }: { children: any; text: any }) {
	// We use `useHover()` to determine whether we should show the tooltip.
	// Notice how we're configuring a small delay on enter / leave.
	const [isOver, hoverProps] = useHover({ delayEnter: 100, delayLeave: 300 });

	// Tell `useLayer()` how we would like to position our tooltip
	const { triggerProps, layerProps, arrowProps, renderLayer } = useLayer({
		isOpen: isOver,
		auto: true,
		possiblePlacements: ["bottom-center", "left-center", "right-center", "bottom-start"],
		triggerOffset: 8, // small gap between wrapped content and the tooltip
	});

	// when children equals text (string | number), we need to wrap it in an
	// extra span-element in order to attach props
	let trigger;
	if (isReactText(children)) {
		trigger = (
			<span className="tooltip-text-wrapper" {...triggerProps} {...hoverProps}>
				{children}
			</span>
		);
	} else {
		// In case of an react-element, we need to clone it in order to attach our own props
		trigger = React.cloneElement(children, {
			...triggerProps,
			...hoverProps,
		});
	}

	// We're using framer-motion for our enter / exit animations.
	// This is why we need to wrap our actual tooltip inside `<AnimatePresence />`.
	// The only thing left is to describe which styles we would like to animate.
	return (
		<>
			{trigger}
			{renderLayer(
				<AnimatePresence>
					{isOver && (
						<motion.div
							className="z-auto rounded-lg bg-[#E879F9] p-[0.5%] font-handwritten text-[0.9vw] font-bold text-white"
							initial={{ opacity: 0, scale: 0.9 }}
							animate={{ opacity: 1, scale: 1 }}
							exit={{ opacity: 0, scale: 0.9 }}
							transition={{ duration: 0.1 }}
							{...layerProps}
						>
							{text}
							<Arrow
								{...arrowProps}
								backgroundColor="#E879F9"
								borderColor="#E879F9"
								borderWidth={1}
								size={6}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			)}
		</>
	);
}

function isReactText(children: any) {
	return ["string", "number"].includes(typeof children);
}
