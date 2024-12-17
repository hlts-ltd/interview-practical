"use client";

import * as React from "react";
import { twMerge } from "tailwind-merge";

export type TextProps = {
  as?: "p" | "span" | "ul" | "ol" | "li" | "h2" | "h3" | "h4" | "h5";
  size?: keyof typeof sizeMap;
  className?: string;
  children: React.ReactNode;
};

const sizeMap = {
  display: /*tw:*/ "text-display",
  h1: /*tw:*/ "text-h1-sm md:text-h1-lg",
  "h1-lg": /*tw:*/ "text-h1-lg",
  "h1-sm": /*tw:*/ "text-h1-sm",
  h2: /*tw:*/ "text-h2-sm md:text-h2-lg",
  "h2-lg": /*tw:*/ "text-h2-lg",
  "h2-sm": /*tw:*/ "text-h2-sm",
  h3: /*tw:*/ "text-h3",
  h4: /*tw:*/ "text-h4",
  h5: /*tw:*/ "text-h5",
  "subtitle-150": /*tw:*/ "text-subtitle-150",
  "subtitle-100": /*tw:*/ "text-subtitle-100",
  "body-200": /*tw:*/ "text-body-200",
  "body-200-sm": /*tw:*/ "text-body-200-sm",
  "body-150": /*tw:*/ "text-body-150",
  "body-100": /*tw:*/ "text-body-100",
  "body-100-sm": /*tw:*/ "text-body-100-sm",
  "body-150-sm": /*tw:*/ "text-body-150-sm",
};

export const Text: React.FC<TextProps> = ({
  as = "p",
  size = "body-100",
  children,
  className,
}) => {
  return React.createElement(
    as,
    {
      className: twMerge(sizeMap[size], "text-inherit", className),
    },
    children
  );
};
