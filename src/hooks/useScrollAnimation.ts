import { useEffect, useRef } from "react";

interface ScrollAnimationOptions {
	threshold?: number | number[];
	rootMargin?: string;
	baseDelay?: number;
	staggerDelay?: number;
	once?: boolean;
	animationClass?: string;
}

export const useScrollAnimation = ({
	threshold = 0.3,
	rootMargin = "-40px 0px",
	baseDelay = 0,
	staggerDelay = 100,
	once = true,
	animationClass = 'animate-fade-up',
}: ScrollAnimationOptions = {}) => {
	const observerRef = useRef<IntersectionObserver | null>(null);
	const animatedElementsRef = useRef<Set<Element>>(new Set());


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
							animatedElementsRef.current.add(entry.target);
							observer.unobserve(entry.target);
					}, totalDelay);
					}
				}
			},
			{ threshold,rootMargin },
		);

		observerRef.current = observer;

		const targets = document.querySelectorAll(".scroll-animation-target");
		for (const target of targets) {
			observer.observe(target);
		}

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
				observerRef.current = null;
			}

			animatedElementsRef.current.clear();
		};
	}, [threshold, rootMargin, baseDelay, staggerDelay, once, animationClass]);
};
