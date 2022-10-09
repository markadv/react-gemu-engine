import { createContext, useContext } from "react";
interface SafeContextType {
	/** Unique id of the item */
	i: string;
}
const SafeContext = createContext<SafeContextType | undefined>(undefined);

export const useSafeContext = () => {
	const safeContext = useContext(SafeContext);
	if (!safeContext) throw new Error("No SafeContext.Provider found when calling useSafeContext.");
	return safeContext;
};
