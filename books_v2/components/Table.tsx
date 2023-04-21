"use client";
import { createColumnHelper, useReactTable } from "@tanstack/react-table";

type Columns = {
  title: string;
  author: string;
  era: string;
  year: number;
};

const tableColumnCreator = createColumnHelper<Columns>();

export default function Table() {
  //   const table = useReactTable();
}
