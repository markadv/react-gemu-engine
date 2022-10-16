import { useRef } from "react";
import videos from "../loader/videos";

const VideoScene = ({ videoNextFrame, videoIndex }: { videoNextFrame?: any; videoIndex: string | undefined }) => {
	const vidRef = useRef<HTMLVideoElement>(null);
	//Remove controls for better story flow
	// const handlePlayVideo = (event: any) => {
	// 	vidRef.current && vidRef.current.play();
	// };4
	return (
		<video
			ref={vidRef}
			// onClick={handlePlayVideo}
			autoPlay={true}
			onEnded={videoNextFrame}
			className="h-full w-full object-cover"
		>
			{(videoIndex === "start" || videoIndex === "ending") && (
				<source src={videos[videoIndex]} type="video/mp4" />
			)}
		</video>
	);
};

export default VideoScene;
