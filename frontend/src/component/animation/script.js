import { gsap } from 'gsap';

export const animateHeader = () => {
    // Animate with 'to()' to ensure it ends in the right position
    gsap.timeline()
        .set(".link", { y: -30, opacity: 0 }) // Set initial state immediately
        .to(".link", {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.3
        });
};

