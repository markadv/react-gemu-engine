import { useRef, useEffect, useState } from "react";

//Use to create audio by Markad
const useAudio = (url: string) => {
	const audio = useRef<HTMLAudioElement | undefined>(typeof Audio !== "undefined" ? new Audio(url) : undefined);
	const [playing, setPlaying] = useState(false);
	const toggle = (): void => setPlaying(!playing);

	useEffect(() => {
		playing ? audio.current?.play() : audio.current?.pause();
	}, [playing]);

	//Auto-stop at end
	// useEffect(() => {
	// 	audio.current?.addEventListener("ended", () => setPlaying(false));
	// 	const cleanup = () => {
	// 		audio.current?.removeEventListener("ended", () => setPlaying(false));
	// 	};
	// 	return () => {
	// 		cleanup();
	// 	};
	// }, []);

	//Infinite loop by Markad
	useEffect(() => {
		audio.current?.addEventListener(
			"ended",
			function () {
				this.currentTime = 0;
				this.play();
			},
			false
		);
		const cleanup = () => {
			audio.current?.removeEventListener("ended", () => setPlaying(false));
		};
		return () => {
			cleanup();
		};
	}, []);

	return [playing, toggle] as const;
};

export default useAudio;
