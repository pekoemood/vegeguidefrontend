import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
	threshold?: number | number[];
	rootMargin?: string;
	baseDelay?: number;
	staggerDelay?: number;
	animationClass?: string;
}

export const useScrollAnimation = ({
	threshold = 0.3,
	rootMargin = "-40px 0px",
	baseDelay = 0,
	staggerDelay = 100,
	animationClass = "animate-fade-up",
}: ScrollAnimationOptions = {}) => {
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						const indexArr = entry.target.getAttribute("data-animation-index");
						const index = indexArr ? Number.parseInt(indexArr) : 0;
						const totalDelay = baseDelay + index * staggerDelay;

						setTimeout(() => {
							entry.target.classList.add(animationClass);
							observer.unobserve(entry.target);
						}, totalDelay);
					}
				}
			},
			{ threshold, rootMargin },
		);

		const targets = document.querySelectorAll(".scroll-animation-target");
		for (const target of targets) {
			observer.observe(target);
		}

		return () => {
			observer.disconnect();
		};
	}, [threshold, rootMargin, baseDelay, staggerDelay, animationClass]);
};
