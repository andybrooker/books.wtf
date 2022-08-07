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
      <Frame
        css={{
          display: "flex",
          gap: "14px",
        }}
      >
        <Span
          css={{
            fontWeight: 500,
            userSelect: "none",
          }}
        >
          BOOKS
        </Span>
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
