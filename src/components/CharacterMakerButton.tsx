const CharacterMakerButton = ({
	title,
	partName,
	onClick,
}: {
	title: string;
	partName: string;
	onClick: () => void;
}) => {
	return (
		<div className="my-[1%] flex flex-row items-center justify-center">
			<p className="w-1/3 text-left text-[.8vw] font-semibold">{title}:</p>
			<button
				className="w-2/3 rounded border border-[#E879F9] bg-transparent font-semibold text-[#E879F9] hover:border-transparent hover:bg-[#E879F9] hover:text-white"
				onClick={onClick}
			>
				{partName}
			</button>
		</div>
	);
};

export default CharacterMakerButton;
