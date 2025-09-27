import { useEffect } from "react";

export const useScrollAnimation = (options = {}) => {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setTimeout(() => {
							entry.target.classList.add("animate-fade-up");
						}, 100);
					}
				});
			},
			{
				threshold: 0.15,
				rootMargin: "-40px 0px",
				...options,
			},
		);

		const targets = document.querySelectorAll(".scroll-animation-target");
		targets.forEach((target) => observer.observe(target));

		return () => {
			targets.forEach((target) => observer.unobserve(target));
			observer.disconnect();
		};
	}, []);
};
