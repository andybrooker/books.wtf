import { useUser } from "@supabase/auth-helpers-react";
import Link from "next/link";
import { FunctionComponent } from "react";
import { styled } from "../stitches.config";
import { Frame, Header, LinkStyle, NavFrame, NavLink, Span } from "./Base";

const Logo = styled("a", {
  fontFamily: "$sans",
  fontSize: "$2",
  cursor: "pointer",
});

export const Navbar: FunctionComponent = () => {
  const user = useUser();

  return (
    <Header
      display={{
        "@initial": "desktop",
        "@mobile": "mobile",
      }}
    >
      <Frame
        css={{
          display: "flex",
          gap: "14px",
        }}
      >
        <Link href={"/"} passHref>
          <Logo
            css={{
              display: "flex",
              fontWeight: 700,
              letterSpacing: "0.5px",
              textDecoration: "none",
              color: "$gray12",
              userSelect: "none",
              maskImage:
                "linear-gradient(60deg, black 25%, rgba(0, 0, 0, 0.2) 50%, black 75%)",
              maskSize: "400%",
              "-webkit-mask-position": "0%",
              "&:hover": {
                "-webkit-mask-position": "100%",
                transition: "-webkit-mask-position 1s ease",
              },
            }}
          >
            BOOKS
          </Logo>
        </Link>
      </Frame>

      <Span
        css={{
          color: "$gray9",
          fontWeight: 500,
        }}
      >
        {" "}
        {user ? <ProfileLink /> : <SignIn />}
      </Span>
    </Header>
  );
};

const SignIn = () => {
  return (
    <Link href={"/signin"}>
      <LinkStyle
        css={{
          color: "inherit",
          cursor: "pointer",
        }}
      >
        Join the Community
      </LinkStyle>
    </Link>
  );
};

const ProfileLink = () => {
  return (
    <Link href={"/profile"}>
      <LinkStyle
        css={{
          color: "inherit",
          cursor: "pointer",
        }}
      >
        Profile
      </LinkStyle>
    </Link>
  );
};
