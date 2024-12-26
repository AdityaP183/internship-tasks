import { useState, useEffect } from "react";

const MOBILE_BREAKPOINT = 640;

const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(undefined);

	useEffect(() => {
		const mql = window.matchMedia(
			`(max-width: ${MOBILE_BREAKPOINT - 1}px)`
		);
		const onChange = () => {
			setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		};
		mql.addEventListener("change", onChange);
		setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
		return () => mql.removeEventListener("change", onChange);
	}, []);

	return !!isMobile;
};

export default useIsMobile;