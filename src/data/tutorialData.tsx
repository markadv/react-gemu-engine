const tutorialData = {
	run: true,
	steps: [
		{
			content: <p className="font-handwritten text-[1.3vw] font-bold">Let's begin our storytelling journey!</p>,
			placement: "center",
			target: "body",
		},
		{
			content: <p className="font-handwritten text-[1.3vw] font-bold">This is our editor control menu</p>,
			placement: "bottom",
			target: ".editor-control-menu",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our change background button. Change the background to set the location of the scene.
				</p>
			),
			placement: "bottom",
			target: ".changebg-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our change background music button. Change the music to set the mood here.
				</p>
			),
			placement: "bottom",
			target: ".changebgm-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our left character toggle button. Add or remove the left character here.
				</p>
			),
			placement: "bottom",
			target: ".toggle-leftchar-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our right character toggle button. Add or remove the right character here.
				</p>
			),
			placement: "bottom",
			target: ".toggle-rightchar-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our speaker toggle button. You can toggle the left or right speaker here.
				</p>
			),
			placement: "bottom",
			target: ".toggle-speaker-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our dialogue toggle button. If you want to focus on the characters, you can remove the
					dialogue box here.
				</p>
			),
			placement: "bottom",
			target: ".dialogue-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our change video button. You can display a video instead of a scene here.
				</p>
			),
			placement: "bottom",
			target: ".change-video-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our add voice button. You can add voice here to accent your dialogue. Don't overuse it
					thought.
				</p>
			),
			placement: "bottom",
			target: ".add-voice-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our choices button. You can add choices here for branching story path.
				</p>
			),
			placement: "bottom",
			target: ".add-choices",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our current scene delete button. You can't delete the main-0 scene though. Be careful, once
					delete, you can't recover it.
				</p>
			),
			placement: "bottom",
			target: ".delete-current-scene",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our current scene control. You can add and load scene here. Make sure to save your changes
					otherwise it would not work.
				</p>
			),
			placement: "bottom",
			target: ".current-scene-combobox",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our next scene control. You can add the next scene for this current path here. You can
					choose end to end the story in this scene.
				</p>
			),
			placement: "bottom",
			target: ".next-scene-combobox",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our character. Click her to reveal the controls to change how she looks.
				</p>
			),
			placement: "top-end",
			target: ".character-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our name input box. Change the name of the character speaking here.
				</p>
			),
			placement: "top",
			target: ".edit-name-box",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our dialogue input box. Write the conversation here.
				</p>
			),
			placement: "top",
			target: ".edit-dialogue-box",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our very important save button. Make sure to save your progress per scene here.
				</p>
			),
			placement: "bottom",
			target: ".save-button",
		},
		{
			content: (
				<p className="font-handwritten text-[1.3vw] font-bold">
					This is our play button. Click this to play your created visual novel.
				</p>
			),
			placement: "bottom",
			target: ".play-button",
		},
		// {
		// 	content: (
		// 		<p className="font-handwritten text-[1.3vw] font-bold">
		// 			This is our left character (because she is on the left). Click her to change how she looks.
		// 		</p>
		// 	),
		// 	placement: "top",
		// 	target: ".character-control",
		// },
	],
};

export default tutorialData;
