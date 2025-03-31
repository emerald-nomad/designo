import { PropsWithChildren } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";
import Link from "next/link";

interface ButtonProps extends PropsWithChildren {
  color?: "white" | "peach";
  as?: "button" | "link";
  href?: string;
}

export default function Button({
  children,
  color = "white",
  as = "button",
  href,
}: ButtonProps) {
  return as == "button" ? (
    <button
      className={clsx([styles.button, color === "peach" && styles.peach])}
      children={children}
    />
  ) : (
    <Link
      className={clsx([styles.button, color === "peach" && styles.peach])}
      href={href!}
      children={children}
    />
  );
}
