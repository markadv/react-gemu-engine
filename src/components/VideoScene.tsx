import { useRef } from "react";

const VideoScene = () => {
	const vidRef = useRef<HTMLVideoElement>(null);
	const handlePlayVideo = (event: any) => {
		vidRef.current && vidRef.current.play();
	};
	return (
		<video
			ref={vidRef}
			onClick={handlePlayVideo}
			autoPlay={true}
			onEnded={(e) => console.log(e)}
			className="h-full w-full object-cover"
		>
			<source src={require("../assets/videos/LoveLive.mp4")} type="video/mp4" />
		</video>
	);
};

export default VideoScene;
