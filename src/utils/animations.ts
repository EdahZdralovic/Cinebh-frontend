import type {Variants} from "framer-motion";

export const HomeHeroVariants: Variants = {
    enter: {
        opacity: 0,
        x: -100,
    },
    center: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeInOut',
        },
    },
    exit: {
        opacity: 0,
        x: 100,
        transition: {
            duration: 0.6,
            ease: 'easeInOut',
        },
    },
};