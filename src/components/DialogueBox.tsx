import Typewriter from "typewriter-effect";

const defaulPosition: { [key: string]: string } = {
	left: "bottom-[114%] left-[-1%]",
	right: "bottom-[114%] right-[-1%]",
};

const DialogueBox = ({
	name,
	text,
	location,
	type,
	editSceneDispatch,
	setIsTyping,
}: {
	name: string;
	text: string;
	location: string;
	type: string;
	editSceneDispatch?: any;
	setIsTyping?: any;
}) => {
	const editName = (e: React.FormEvent<HTMLInputElement>) => {
		editSceneDispatch({ type: "changeName", payload: e.currentTarget.value });
	};
	const editText = (e: React.FormEvent<HTMLTextAreaElement>) => {
		editSceneDispatch({ type: "changeText", payload: e.currentTarget.value });
	};
	return (
		<div className="borderimg absolute bottom-0 flex h-1/6 w-full items-start justify-start bg-slate-100 p-2 opacity-95">
			<div className="relative h-full w-full font-handwritten text-[0.9vw] font-semibold">
				{type === "game" && (
					<Typewriter
						key={text}
						onInit={(typewriter) => {
							typewriter
								.typeString(text)
								.callFunction(() => setIsTyping(false))
								.start();
						}}
						options={{ cursor: "", delay: 0.23 / text.length }}
					/>
				)}
				{type === "editor" && (
					<textarea
						name="text"
						className="box-border h-full w-full resize-none bg-slate-100 outline-none"
						onInput={editText}
						value={text}
					></textarea>
				)}
			</div>
			<div
				className={`borderimg2 absolute w-[20%] bg-slate-100 text-center opacity-95 ${defaulPosition[location]}`}
			>
				{type === "game" ? (
					<p className="font-handwritten text-[1.15vw] font-bold">{name}</p>
				) : (
					<input
						type="text"
						value={name}
						name="name"
						className="bg-slate-100 text-center font-handwritten text-[1.15vw] font-bold outline-none"
						onInput={editName}
					/>
				)}
			</div>
		</div>
	);
};

export default DialogueBox;
