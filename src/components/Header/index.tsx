import { getPayload } from "payload";
import config from "@/payload/payload.config";
import { Media, Page } from "@/payload/payload-types";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.scss";
import MobileNav from "./MobileNav";

export default async function Header() {
  const payload = await getPayload({ config });

  const { logo, navItems } = await payload.findGlobal({
    slug: "header",
  });

  const { url, alt } = logo as Media;

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image src={url!} alt={alt} width={200} height={24} />
      </Link>
      {navItems && <MobileNav navItems={navItems} />}
    </header>
  );
}
