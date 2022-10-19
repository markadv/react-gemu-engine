import React from "react";
import DatalistInput from "./DatalistInput";

/* Future updates */
const BackgroundChooser = () => {
	return (
		<div className="absolute top-[10%] left-[11.75%]">
			<div className="text w-full rounded border border-[#E879F9] bg-slate-50 px-[2.5%] py-[5%] text-center text-[1vw] font-semibold">
				<DatalistInput label="test" items={[{ id: "test", value: "test" }]} />
			</div>
		</div>
	);
};

export default BackgroundChooser;
