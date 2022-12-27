import { styled } from "@stitches/react";
import React, { useEffect, useRef } from "react";
import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  FormikErrors,
  validateYupSchema,
} from "formik";
import { motion } from "framer-motion";
import { useUser, useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {};

const startingPosition = { opacity: 0, y: -5 };

export default function EmailSent() {
  const user = useUser();
  const router = useRouter();

  const [email, setEmail] = React.useState("");

  if (user) {
    router.push("/");
  }

  useEffect(() => {
    if (router && Object.keys(router.query).length === 0) {
      router.push("/signin");
    } else {
      if (typeof router?.query?.email === "string") {
        setEmail(router?.query?.email);
      }
    }
  }, []);

  return (
    <HeroDiv>
      <motion.div
        initial={startingPosition}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.75 },
        }}
      >
        <Hero>
          {email !== "" ? `Magic Link sent to ${email}!` : "Page Unavailable"}
        </Hero>
      </motion.div>
      <motion.div
        initial={startingPosition}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, delay: 0.2 },
        }}
      >
        <SubHeading>You'll be signed up in no time.</SubHeading>
      </motion.div>
      <motion.div
        initial={startingPosition}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, delay: 0.4 },
        }}
      ></motion.div>
    </HeroDiv>
  );
}

const Hero = styled("h1", {
  fontFamily: "$sans",
  fontSize: "24px",
  margin: "0 auto",
});

const SubHeading = styled("p", {
  fontFamily: "$sans",
});

const HeroDiv = styled("main", {
  display: "flex",
  flexDirection: "column",
  width: "100vw",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
});

export async function getServerSideProps() {
  return {
    props: {}, // will be passed to the page component as props
  };
}
