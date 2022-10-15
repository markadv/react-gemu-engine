import { ActionTypes } from "../types/enum";
import AnimatedText from "./AnimatedText";

const Disclaimer = ({ dispatch, playCheckSfx }: any) => {
	return (
		<div className="lined-paper grid h-full w-full place-items-center bg-slate-50 text-3xl font-medium text-slate-900">
			<div className="flex flex-col items-center justify-center">
				<AnimatedText text="Better with sounds and even better in full screen." />
				<button
					className="mt-10 font-handwritten font-black text-slate-900 hover:text-[#E879F9]"
					onClick={() => {
						playCheckSfx();
						dispatch({ type: ActionTypes.SHOWSPLASHPAGE });
					}}
				>
					I understand.
				</button>
			</div>
		</div>
	);
};

export default Disclaimer;
