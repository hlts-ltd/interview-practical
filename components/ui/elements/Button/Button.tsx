"use client";

import * as React from "react";
import Link from "next/link";
import { twMerge } from "tailwind-merge";
import { motion } from "framer-motion";
import {
  PiArrowCircleLeft,
  PiArrowCircleRight,
  PiArrowRight,
} from "react-icons/pi";
import { ArrowUpDown, PlusCircleIcon } from "lucide-react";

type ButtonMode =
  | "primary"
  | "secondary"
  | "tertiary"
  | "underline"
  | "sans-icon"
  | "table"
  | "add"
  | "previous";

export type ButtonProps = {
  label: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
  href?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  mode?: ButtonMode;
  disabled?: boolean;
  className?: string;
  innerClassName?: string;
};

const modeClassMapper: Record<ButtonMode, string> = {
  primary:
    /*tw:*/ "bg-black text-white font-medium pr-[18px] flex-row-reverse hover:bg-grey-500",
  secondary:
    /*tw:*/ "bg-white border border-grey-300 text-black py-3 px-5 hover:border-grey-400 hover:text-grey-400",
  tertiary:
    /*tw:*/ "border-0 text-body-100-sm md:text-body-100 rounded p-0 focus:ring-offset-0 pl-px hover:text-grey-500",
  underline:
    /*tw:*/ "flex-col py-0 text-body-100-sm md:text-body-100 rounded focus:ring-offset-1 px-px hover:text-grey-500",
  "sans-icon": /*tw:*/ "bg-black text-white font-medium px-5 py-3.5",
  table: /*tw:*/ "bg-black text-white font-medium pr-[18px] hover:bg-grey-500",
  add: /*tw:*/ "bg-black text-white font-medium pr-[18px] hover:bg-grey-500",
  previous:
    /*tw:*/ "bg-black text-white font-medium pr-[18px] flex-row-reverse hover:bg-grey-500",
};

const Icon = (icon: ButtonMode) => {
  switch (icon) {
    case "primary":
      return <PiArrowCircleRight size={32} />;
    case "secondary":
    case "tertiary":
      return <PiArrowRight size={16} className="translate-y-px" />;
    case "table":
      return <ArrowUpDown size={32} />;
    case "add":
      return <PlusCircleIcon size={32} />;
    case "previous":
      return <PiArrowCircleLeft size={32} />;
    default:
      return null;
  }
};

const ButtonInner: React.FC<
  Pick<ButtonProps, "mode" | "label" | "className">
> = ({ label, mode = "primary", className }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="whileHover"
      className={twMerge(
        "group inline-flex items-center justify-center gap-x-1.5 rounded-full p-2 text-body-100 outline-none duration-200 focus:ring-2 focus:ring-blue focus:ring-offset-2 active:outline-2 active:outline-blue",
        modeClassMapper[mode],
        className
      )}
    >
      {label}
      {Icon(mode)}

      {mode === "underline" && (
        <motion.span
          variants={{ initial: { scaleY: 0.5 }, whileHover: { scaleY: 1 } }}
          transition={{ duration: 0.2 }}
          className="h-0.5 w-full origin-top bg-black group-hover:bg-grey-500"
        />
      )}
    </motion.span>
  );
};

export const Button: React.FC<ButtonProps> = ({
  label,
  type = "button",
  mode,
  href,
  onClick,
  disabled,
  className,
  innerClassName,
}) => {
  if (href) {
    const target = href.startsWith("http") ? "_blank" : undefined;
    return (
      <Link
        href={href}
        target={target}
        className={twMerge("inline-block", className)}
      >
        <ButtonInner label={label} mode={mode} />
      </Link>
    );
  }

  if (onClick) {
    return (
      <button
        type={type}
        onClick={onClick}
        disabled={disabled}
        className={className}
      >
        <ButtonInner label={label} mode={mode} className={innerClassName} />
      </button>
    );
  }

  if (type === "submit") {
    return (
      <button
        type="submit"
        disabled={disabled}
        className={`${className} border rounded-full`}
      >
        <ButtonInner label={label} mode={mode} />
      </button>
    );
  }

  return <ButtonInner label={label} mode={mode} className={className} />;
};
