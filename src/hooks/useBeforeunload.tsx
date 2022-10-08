import { useEffect, useRef } from "react";

type BeforeunloadHandler = (evt: BeforeUnloadEvent) => void;

export default function useBeforeunload(handler: BeforeunloadHandler) {
	const handlerRef = useRef(handler);

	useEffect(() => {
		handlerRef.current = handler;
	}, [handler]);

	useEffect(() => {
		const handleBeforeunload: BeforeunloadHandler = (evt) => {
			let returnValue;

			if (typeof handlerRef.current === "function") {
				returnValue = handlerRef.current(evt);
			}

			if (evt.defaultPrevented) {
				evt.returnValue = "";
			}

			if (typeof returnValue === "string") {
				evt.returnValue = returnValue;
				return returnValue;
			}
		};

		window.addEventListener("beforeunload", handleBeforeunload);

		return () => {
			window.removeEventListener("beforeunload", handleBeforeunload);
		};
	}, []);
}
