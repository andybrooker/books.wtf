import Link from "next/link";
import { FunctionComponent } from "react";
import { styled } from "../stitches.config";
import { Frame, Header, NavFrame, NavLink, Span } from "./Base";

const Logo = styled("a", {
  fontFamily: "$sans",
  fontSize: "$2",
  cursor: "pointer",
});

export const Navbar: FunctionComponent = () => {
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
              fontWeight: 500,
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

        {/* <NavFrame
          css={{
            display: "flex",
            gap: 20,
          }}
        >
          <NavLink href={"/"} name="Classic" />
          <NavLink href={"/"} name="Contemporary" />
        </NavFrame> */}
      </Frame>

      <Span
        css={{
          color: "$gray9",
        }}
      >
        Track Progress
      </Span>
    </Header>
  );
};
