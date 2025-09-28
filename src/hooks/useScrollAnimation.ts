import { useEffect } from "react";

export const useScrollAnimation = (options = {}) => {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					setTimeout(() => {
						entry.target.classList.add("animate-fade-up");
					}, 100);
				}
			},
			{
				threshold: 0.15,
				rootMargin: "-40px 0px",
				...options,
			},
		);

		const targets = document.querySelectorAll(".scroll-animation-target");
		for(const target of targets) {
			observer.observe(target);
		}

		return () => {
			for(const target of targets) {
				observer.unobserve(target);
				observer.disconnect();
			}
		};
	}, [options]);
};
