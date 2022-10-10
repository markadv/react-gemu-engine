import Typewriter from "typewriter-effect";

const defaulPosition: { [key: string]: string } = {
	left: "top-[-70px] left-[-15px]",
	right: "top-[-70px] right-[-15px]",
};

const DialogueBox = ({ name, text, location }: { name: string; text: string; location: string }) => {
	return (
		<div className="borderimg absolute bottom-0 flex h-1/6 w-full items-start justify-start bg-slate-100 p-2 opacity-95">
			<div className="text-md relative font-handwritten font-semibold">
				<Typewriter
					key={text}
					onInit={(typewriter) => {
						typewriter.typeString(text).start();
					}}
					options={{ cursor: "", delay: 0.23 / text.length }}
				/>
			</div>
			<div
				className={`borderimg2 absolute w-[20%] bg-slate-100 text-center opacity-95 ${defaulPosition[location]}`}
			>
				<p className="font-handwritten text-2xl font-bold">{name}</p>
			</div>
		</div>
	);
};

export default DialogueBox;
