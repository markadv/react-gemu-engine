import { useRef, useEffect, useState } from "react";

const VideoScene = ({
	videoNextFrame,
	videoIndex,
	videos,
}: {
	videoNextFrame?: any;
	videoIndex: string | undefined;
	videos: any;
}) => {
	const vidRef = useRef<HTMLVideoElement>(null);
	const [volume, setVolume] = useState<number>(0.1);
	useEffect(() => {
		if (!!vidRef.current) {
			vidRef.current.volume = volume;
		}
	}, [vidRef, volume]);
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
