import { FunctionComponent } from "react";
import { Frame, Header, NavFrame, NavLink, Span } from "./Base";

export const Navbar: FunctionComponent = () => {
  return (
    <Header
      display={{
        "@initial": "desktop",
        "@mobile": "mobile",
      }}
    >
      <Frame>
        <Span
          css={{
            fontWeight: 500,
          }}
        >
          BOOKS
        </Span>
      </Frame>
      <NavFrame
        css={{
          display: "flex",
          gap: 20,
        }}
      >
        <NavLink href={"/"} name="Classic" />
        <NavLink href={"/"} name="Contemporary" />
      </NavFrame>
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
