"use client";

import Image from "next/image";
import hamburgerIcon from "@/assets/shared/mobile/icon-hamburger.svg";
import closeIcon from "@/assets/shared/mobile/icon-close.svg";
import styles from "./Header.module.scss";
import { Page } from "@/payload/payload-types";
import Link from "next/link";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  navItems: {
    page?: (number | null) | Page;
    id?: string | null;
  }[];
}

export default function MobileNav({ navItems }: MobileNavProps) {
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(false);
  const [previousPathname, setPreviousPathname] = useState(pathname);

  useEffect(() => {
    if (pathname !== previousPathname) {
      setPreviousPathname(pathname);
      setShowNav(false);
    }
  }, [pathname]);

  function toggleNav() {
    setShowNav(!showNav);
  }

  return (
    <>
      <button
        type="button"
        className={styles["nav-button"]}
        onClick={toggleNav}
      >
        {showNav ? (
          <Image src={closeIcon} alt="Close Icon" />
        ) : (
          <Image src={hamburgerIcon} alt="Hamburger Icon" />
        )}
      </button>
      {navItems && (
        <nav className={clsx([styles["mobile-nav"], showNav && styles.show])}>
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
      )}
    </>
  );
}
