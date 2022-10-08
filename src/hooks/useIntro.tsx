import { useEffect } from "react";

export const useIntro = () => {
	const storage = window.localStorage;
	const currTimestamp = Date.now();
	const timestamp = JSON.parse(storage.getItem("introCheck") || "1000");

	const timeLimit = 3 * 60 * 60 * 1000; // 3 hours

	const hasTimePassed = currTimestamp - timestamp > timeLimit;

	useEffect(() => {
		hasTimePassed
			? storage.setItem("introCheck", currTimestamp.toString())
			: storage.setItem("introCheck", timestamp.toString());
	}, []);

	return hasTimePassed;
};

export default useIntro;
