import Typewriter from "typewriter-effect";

const DialogueBox = ({ name, text }: { name: string; text: string }) => {
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
			<div className="borderimg2 absolute top-[-70px] left-[-15px] w-[20%] bg-slate-100 text-center opacity-95">
				<p className="font-handwritten text-2xl font-bold">{name}</p>
			</div>
		</div>
	);
};

export default DialogueBox;
