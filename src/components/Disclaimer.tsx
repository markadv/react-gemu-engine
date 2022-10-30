import { ActionTypes } from "../types/enum";
import AnimatedText from "./AnimatedText";

const Disclaimer = ({ dispatch, playCheckSfx }: any) => {
	return (
		<div className="grid h-full w-full place-items-center bg-slate-50 text-[1.75vh] font-medium text-slate-900 sm:text-[1.75vw]">
			<div className="flex flex-col items-center justify-center">
				<AnimatedText text="Better with sounds and even better in full screen. Mobile version coming soon." />
				<button
					className="mt-10 rounded-3xl border-2 py-[1%] px-[2%] font-handwritten font-black text-slate-900 hover:text-[#E879F9]"
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
