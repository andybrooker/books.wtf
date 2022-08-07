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
        paddingTop: "100px",
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
  width: "100%",
  justifyContent: "space-between",
  padding: "12px 16px",
  borderBottom: "1px solid $gray6",
  variants: {
    display: {
      mobile: {
        flexDirection: "column",
        gap: "7px",
      },
      desktop: {
        flexDirection: "row",
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
});

const LinkStyle = styled("a", {
  fontFamily: "$sans",
  fontWeight: 300,
  fontSize: "$2",
  color: "inherit",
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
  fontWeight: 300,
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
  borderRadius: 1,
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
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
  borderRadius: 1,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 15px",
  position: "relative",
  userSelect: "none",
  fontWeight: 300,

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
