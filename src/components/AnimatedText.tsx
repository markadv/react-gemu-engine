import { FC } from "react";
import { motion, Variants, HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
	text: string;
	delay?: number;
	duration?: number;
}

const AnimatedText: FC<Props> = ({ text, delay = 0, duration = 0.05, ...props }: Props) => {
	const letters = Array.from(text);
	const container: Variants = {
		hidden: {
			opacity: 0,
		},
		visible: (i: number = 1) => ({
			opacity: 1,
			transition: { staggerChildren: 0.5 / letters.length, delayChildren: i * delay },
		}),
		exit: {
			opacity: 0,
		},
	};

	const child: Variants = {
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
		hidden: {
			opacity: 0,
			y: 20,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
		exit: {
			opacity: 1,
			y: 0,
			transition: {
				type: "spring",
				damping: 12,
				stiffness: 200,
			},
		},
	};
	return (
		<motion.p
			className="flex overflow-hidden font-handwritten font-semibold"
			variants={container}
			initial="hidden"
			animate="visible"
			exit="hidden"
			key={text}
			{...props}
		>
			{letters.map((letter, index) => (
				<motion.span key={`${text + letter + index}`} variants={child}>
					{letter === " " ? "\u00A0" : letter}
				</motion.span>
			))}
		</motion.p>
	);
};

export default AnimatedText;
