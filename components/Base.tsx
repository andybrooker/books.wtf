import { styled } from "../stitches.config";
import Link from "next/link";
import { FC, FunctionComponent, ReactNode } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { violet, mauve, blackA } from "@radix-ui/colors";

export const Text = styled("p", {
  fontFamily: "$sans",
  fontWeight: 300,

  variants: {
    size: {
      1: {
        fontSize: "$1",
      },
      2: {
        fontSize: "$2",
      },
      3: {
        fontSize: "$3",
      },
    },
    color: {
      primary: {
        color: "$gray12",
      },
      secondary: {
        color: "$gray11",
      },
    },
  },
});

export const Frame = styled("div", {});

export const Margins = styled(Frame, {
  margin: "0 auto",
  variants: {
    display: {
      mobile: {
        maxWidth: "calc(100vw - 28px)",
        paddingTop: "14px",
      },
      desktop: {
        maxWidth: "calc(100vw - 200px)",
      },
    },
  },
});

export const NavFrame = styled("nav", {});

export const Span = styled("span", {
  fontFamily: "$sans",
  fontSize: "$2",
  fontWeight: 300,
});

export const Body = styled(Frame, {
  display: "flex",
  flexDirection: "column",
  height: "100vh",
});

export const Header = styled("header", {
  display: "flex",
  justifyContent: "space-between",
  variants: {
    display: {
      mobile: {
        gap: "7px",
        width: "100%",
        padding: "12px 16px",
      },
      desktop: {
        flexDirection: "row",
        margin: "0 auto",
        width: "calc(100vw - 168px)",
        padding: "28px 16px",
      },
    },
  },
});

export const Footer = styled("footer", {
  flexShrink: 0,
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  paddingTop: "28px",
  paddingLeft: "16px",
  paddingRight: "16px",
});

export const LinkStyle = styled("a", {
  fontFamily: "$sans",
  fontWeight: 500,
  fontSize: "$2",
  color: "$gray12",
  textDecoration: "none",
  "&:hover": {
    textDecoration: "underline",
  },
});

type NavLinkProps = {
  href: string;
  name: string;
};

export const NavLink: FunctionComponent<NavLinkProps> = ({ href, name }) => {
  return (
    <Link href={href} passHref>
      <LinkStyle>{name}</LinkStyle>
    </Link>
  );
};

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  fontFamily: "$sans",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: "$1",
  fontWeight: 400,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "$gray2",
  "&:hover": { backgroundColor: "$gray3" },
  "&:focus": { backgroundColor: "$gray4" },
});

export const StyledButton = styled("button", {
  fontFamily: "$sans",
  display: "inline-flex",
  border: "none",
  cursor: "pointer",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: "$1",
  fontWeight: 400,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "$gray2",
  "&:hover": { backgroundColor: "$gray3" },
  "&:focus": { backgroundColor: "$gray4" },
});

const StyledIcon = styled(SelectPrimitive.SelectIcon, {
  color: violet.violet11,
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "hidden",
  backgroundColor: "white",
  boxShadow: "$medium",
  borderRadius: 6,
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
  gap: 5,
  display: "flex",
  flexDirection: "column",
});

interface ContentProps {
  children?: ReactNode;
}

const Content: FC<ContentProps> = ({ children, ...props }) => {
  return (
    <SelectPrimitive.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </SelectPrimitive.Portal>
  );
};

const StyledItem = styled(SelectPrimitive.Item, {
  all: "unset",
  fontSize: "$1",
  fontFamily: "$sans",
  lineHeight: 1,
  borderRadius: 4,
  display: "flex",
  alignItems: "center",
  height: 35,
  padding: "0 15px",
  position: "relative",
  userSelect: "none",
  fontWeight: 400,
  backgroundColor: "$gray2",

  "&[data-highlighted]": {
    backgroundColor: "$gray4",
  },
});

const StyledLabel = styled(SelectPrimitive.Label, {
  padding: "0 25px",
  fontSize: 12,
  lineHeight: "25px",
  color: mauve.mauve11,
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "white",
  cursor: "default",
};

const StyledScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles
);

const StyledScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles
);

// Exports
export const Select = SelectPrimitive.Root;
export const SelectTrigger = StyledTrigger;
export const SelectValue = SelectPrimitive.Value;
export const SelectIcon = StyledIcon;
export const SelectContent = Content;
export const SelectViewport = StyledViewport;
export const SelectGroup = SelectPrimitive.Group;
export const SelectItem = StyledItem;
export const SelectItemText = SelectPrimitive.ItemText;
export const SelectItemIndicator = StyledItemIndicator;
export const SelectLabel = StyledLabel;
export const SelectScrollUpButton = StyledScrollUpButton;
export const SelectScrollDownButton = StyledScrollDownButton;
