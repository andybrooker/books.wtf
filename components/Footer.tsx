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
        Curated by @andy_brooker. Inspired by Tommy Collison.
      </Text>
    </Foot>
  );
};
