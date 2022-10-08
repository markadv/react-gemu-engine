import { motion } from "framer-motion";
import { ReactElement, useState } from "react";

const blackBox = {
	initial: {
		height: "100vh",
		bottom: 0,
	},
	animate: {
		height: 0,
		transition: {
			when: "afterChildren",
			duration: 1.5,
			ease: [0.87, 0, 0.13, 1],
		},
	},
};
const textContainer = {
	initial: {
		opacity: 1,
	},
	animate: {
		opacity: 0,
		transition: {
			duration: 0.25,
			when: "afterChildren",
		},
	},
};
const text = {
	initial: {
		y: 40,
	},
	animate: {
		y: 80,
		transition: {
			duration: 1.5,
			ease: [0.87, 0, 0.13, 1],
		},
	},
};

const InitialBrand = (props: any): ReactElement => {
	const [animationEnd, setAnimationEnd] = useState(false);
	return (
		<div className={`absolute inset-0 flex items-center justify-center ${animationEnd ? "hidden" : ""} home`}>
			<motion.div
				className="absolute z-50 flex w-full items-center justify-center bg-white"
				initial="initial"
				animate="animate"
				variants={blackBox}
				onAnimationStart={() => {
					setAnimationEnd(false);
				}}
				onAnimationComplete={() => setAnimationEnd(true)}
			>
				<motion.svg variants={textContainer} className="absolute z-50 flex">
					<svg>
						<pattern
							id="pattern"
							patternUnits="userSpaceOnUse"
							width={750}
							height={800}
							className="text-rose-400"
						>
							<rect className="h-full w-full fill-current" />
							<motion.rect variants={text} className="h-full w-full fill-current text-fuchsia-500" />
						</pattern>
						<text
							className="font-mustard text-5xl font-bold"
							textAnchor="middle"
							x="50%"
							y="45%"
							style={{ fill: "url(#pattern)" }}
						>
							kokoro
						</text>
					</svg>
				</motion.svg>
			</motion.div>
		</div>
	);
};

export default InitialBrand;
