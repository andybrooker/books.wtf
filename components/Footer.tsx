import React from "react";
import { Text, Footer as Foot } from "./Base";

type Props = {};

export const Footer = (props: Props) => {
  return (
    <Foot>
      <Text
        css={{
          fontSize: "$1",
          color: "$gray10",
          textAlign: "center",
        }}
      >
        “A classic is a book that has never finished saying what it has to say.”
      </Text>
    </Foot>
  );
};
