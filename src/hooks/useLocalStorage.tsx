import { useState, useEffect } from "react";

//Custom local storage hook by Markad
function getStorageValue(key: string, defaultValue: any | null) {
	// getting stored value
	const saved: string | null = localStorage.getItem(key);
	//If value is saved, otherwise return saved
	if (saved) return JSON.parse(saved);
	//Check if defaultValue is a function and return a function
	if (defaultValue instanceof Function) return defaultValue();
	//All else fail, return default value
	return defaultValue;
}

export const useLocalStorage = (key: string, defaultValue: any) => {
	const [value, setValue] = useState(() => {
		return getStorageValue(key, defaultValue);
	});

	useEffect(() => {
		// storing input name
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
};
