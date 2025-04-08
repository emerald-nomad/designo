"use client";

import { Footer, Page } from "@/payload/payload-types";

import styles from "./Footer.module.scss";
import { usePathname } from "next/navigation";
import Button from "../Button";

export default function CTA({ title, info, link, pages }: Footer["cta"]) {
  const pathname = usePathname();
  const slugs = (pages as Page[]).map((p) => p.slug);

  if (!slugs.includes(pathname)) return null;

  return (
    <div className={styles.cta}>
      <div className={styles.content}>
        <p className={styles.title}>{title}</p>
        <p className={styles.info}>{info}</p>
      </div>

      <Button as="link" href={(link.page as Page).slug}>
        {link.text}
      </Button>
    </div>
  );
}
