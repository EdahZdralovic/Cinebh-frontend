import type {Variants} from "framer-motion";

export const HomeHeroVariants: Variants = {
    enter: {
        opacity: 0.7,
        filter: 'blur(12px)',
    },
    center: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.6,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0.7,
        filter: 'blur(12px)',
        transition: {
            duration: 0.5,
            ease: 'easeIn',
        },
    },
};
/*

export const HomeHeroVariants: Variants = {
    enter: {
        opacity: 0.5,
        filter: 'blur(10px)',
    },
    center: {
        opacity: 1,
        filter: 'blur(0px)',
        transition: {
            duration: 0.5,
            ease: 'easeOut',
        },
    },
    exit: {
        opacity: 0.5,
        filter: 'blur(10px)',
        transition: {
            duration: 0.5,
            ease: 'easeIn',
        },
    },
};
 */