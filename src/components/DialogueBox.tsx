import Typewriter from "typewriter-effect";

const defaulPosition: { [key: string]: string } = {
	left: "bottom-[17%] left-0",
	right: "bottom-[17%] right-0",
};

const DialogueBox = ({
	name,
	text,
	location,
	type,
	editSceneDispatch,
	setIsTyping,
	playHoverSfx,
	playClickSfx,
}: {
	name: string;
	text: string;
	location: string;
	type: string;
	editSceneDispatch?: any;
	setIsTyping?: any;
	playHoverSfx?: any;
	playClickSfx?: any;
}) => {
	const editName = (e: React.FormEvent<HTMLInputElement>) => {
		editSceneDispatch({ type: "changeName", payload: e.currentTarget.value });
	};
	const editText = (e: React.FormEvent<HTMLTextAreaElement>) => {
		editSceneDispatch({ type: "changeText", payload: e.currentTarget.value });
	};
	return (
		<>
			<div className="borderimg absolute bottom-0 flex h-1/6 w-full items-start justify-start bg-slate-100 p-2 opacity-95">
				<div className="h-full w-full font-handwritten text-[1.2vw] font-semibold">
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
							className="edit-dialogue-box box-border h-full w-full resize-none bg-slate-100 outline-none"
							onInput={editText}
							value={text}
						></textarea>
					)}
				</div>
			</div>
			<div
				className={`borderimg2 absolute grid h-[7.25%] w-[20%] place-items-center bg-slate-100 text-center opacity-95 ${defaulPosition[location]}`}
			>
				{type === "game" ? (
					<p
						className="font-handwritten text-[1vw] font-bold sm:text-[1.4vw]"
						onMouseEnter={playHoverSfx}
						onClick={playClickSfx}
					>
						{name}
					</p>
				) : (
					<input
						type="text"
						value={name}
						name="name"
						className="edit-name-box bg-slate-100 text-center font-handwritten text-[1.2vw] font-bold outline-none sm:text-[1.4vw]"
						onInput={editName}
						onMouseEnter={playHoverSfx}
						onClick={playClickSfx}
					/>
				)}
			</div>
		</>
	);
};

export default DialogueBox;
