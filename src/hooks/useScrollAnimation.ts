import { useEffect } from "react"

export const useScrollAnimation = (options = {}) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-up');
        }
      });
    },  {
      threshold: 0.1,
      ...options
    });

    const targets = document.querySelectorAll('.scroll-animation-target');
    targets.forEach((target) => observer.observe(target));

    return () => {
      targets.forEach((target) => observer.unobserve(target));
      observer.disconnect();
    };
  }, []);
};