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
import Router, { useRouter } from "next/router";
import toast from "react-hot-toast";

type Props = {};

const startingPosition = { opacity: 0, y: -5 };

export default function SignIn({}: Props) {
  const user = useUser();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

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
        <Hero>Embrace the classics with a community of book lovers.</Hero>
      </motion.div>
      <motion.div
        initial={startingPosition}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, delay: 0.2 },
        }}
      >
        <SubHeading>
          Create book clubs, participate in conversations with readers of the
          same book and track your reading progress over time.
        </SubHeading>
      </motion.div>
      <motion.div
        initial={startingPosition}
        animate={{
          opacity: 1,
          y: 0,
          transition: { duration: 0.75, delay: 0.4 },
        }}
      >
        <SignUpBar />
      </motion.div>
    </HeroDiv>
  );
}

interface Values {
  email: string;
}

const SignUpBar = () => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const router = useRouter();

  return (
    <div>
      <Formik
        initialValues={{ email: "" }}
        validate={(values) => {
          let errors: FormikErrors<Values> = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Please enter a valid e-mail address.";
          }
          return errors;
        }}
        onSubmit={(values, actions) =>
          toast
            .promise(
              supabaseClient.auth.signInWithOtp({ email: values.email }),
              {
                loading: "Sending!",
                success: (res) => "Success!",
                error: (error) => "Error.",
              }
            )
            .then(() =>
              router.push(
                {
                  pathname: "/email-sent",
                  query: { email: values.email },
                },
                "/email-sent"
              )
            )
            .catch((err) => alert(err.message))
        }
      >
        {({ isSubmitting }) => (
          <Form>
            <FlexDiv>
              <StyledField type="email" name="email" />
              <StyledButton type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending!" : "Send magic link"}
              </StyledButton>
            </FlexDiv>
            <ErrorMessageDiv>
              <ErrorMessage name="email" component="div" />
            </ErrorMessageDiv>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const ErrorMessageDiv = styled("div", {
  height: "24px",
  fontSize: "12px",
  fontFamily: "$sans",
});

const FlexDiv = styled("div", {
  display: "flex",
  gap: "8px",
  height: "40px",
  margin: "8px 0",
});

const StyledField = styled(Field, {
  height: "100%",
  borderRadius: 4,
  border: "1.5px solid",
  borderColor: "$gray7",
  fontFamily: "$sans",
  padding: "0 8px",
  width: "300px",
  "&:hover": {
    borderColor: "$gray9",
  },
  "&:focus": {
    borderColor: "$gray12",
    boxShadow: "0px 0px 0px 3px var(--colors-gray8)",
    outline: "none",
  },
});

const StyledButton = styled("button", {
  border: "none",
  borderRadius: 4,
  backgroundColor: "$gray7",
  color: "$gray12",
  cursor: "pointer",
  fontFamily: "$sans",
  fontWeight: "700",
  padding: "0 10px",
  "&:hover": {
    backgroundColor: "$gray8",
  },
});

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
