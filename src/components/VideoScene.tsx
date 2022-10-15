import { useRef } from "react";

const VideoScene = ({ videoNextFrame }: any) => {
	const vidRef = useRef<HTMLVideoElement>(null);
	//Remove controls for better story flow
	// const handlePlayVideo = (event: any) => {
	// 	vidRef.current && vidRef.current.play();
	// };
	return (
		<video
			ref={vidRef}
			// onClick={handlePlayVideo}
			autoPlay={true}
			onEnded={videoNextFrame}
			className="h-full w-full object-cover"
		>
			<source src={require("../assets/videos/LoveLive.mp4")} type="video/mp4" />
		</video>
	);
};

export default VideoScene;
