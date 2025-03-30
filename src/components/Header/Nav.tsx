import { Page } from "@/payload/payload-types";
import Link from "next/link";

import styles from "./Header.module.scss";

interface NavProps {
  navItems: {
    page?: (number | null) | Page;
    id?: string | null;
  }[];
}

export default function Nav({ navItems }: NavProps) {
  return (
    <nav className={styles.nav}>
      <ul>
        {navItems.map((item) => {
          const page = item.page as Page;
          return (
            <li key={item.id}>
              <Link href={page.slug}>{page.name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
