import { FC } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

type Props = {
  children: any;
};

const variants = {
  in: {
    opacity: 1,
  },
  out: {
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const Transition: FC<Props> = ({ children }) => {
  const { asPath } = useRouter();

  return (
    <AnimatePresence initial={false} exitBeforeEnter>
      <motion.div
        key={asPath}
        variants={variants}
        animate="animate"
        initial="initial"
        exit="out"
        style={{ height: "100%" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
