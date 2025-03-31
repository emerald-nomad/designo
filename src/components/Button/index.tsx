import { PropsWithChildren } from "react";
import styles from "./Button.module.scss";
import clsx from "clsx";

interface ButtonProps extends PropsWithChildren {
  color?: "white" | "peach";
  as?: "button" | "link";
}

export default function Button({
  children,
  color = "white",
  as = "button",
}: ButtonProps) {
  return (
    <button
      className={clsx([styles.button, color === "peach" && styles.peach])}
    >
      {children}
    </button>
  );
}
