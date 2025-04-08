import { getPayload } from "payload";
import config from "@/payload/payload.config";
import styles from "./Footer.module.scss";
import Image from "next/image";
import { Media, Page } from "@/payload/payload-types";
import Link from "next/link";
import CTA from "./CTA";

export default async function Footer() {
  const payload = await getPayload({ config });

  const { logo, navItems, address, contactUs, socialLinks, cta } =
    await payload.findGlobal({
      slug: "footer",
    });

  const { url, alt } = logo as Media;

  return (
    <footer className={styles.footer}>
      <CTA {...cta} />
      <div className={styles.top}>
        <Image src={url!} alt={alt} width={200} height={24} />
        <hr className={styles.divider} />
        <nav className={styles.nav}>
          {navItems &&
            navItems.map((item) => (
              <Link key={item.id} href={(item.page as Page).slug}>
                {(item.page as Page).name}
              </Link>
            ))}
        </nav>
      </div>

      <hr className={styles.divider} />

      <div className={styles.bottom}>
        <p className={styles.section}>
          <span className={styles.title}>{address.title}</span>
          <span>{address.addressLine1}</span>
          <span>
            {address.city}, {address.state} {address.zip}
          </span>
        </p>
        <p className={styles.section}>
          <span className={styles.title}>{contactUs.title}</span>
          <Link href={`tel:${contactUs.phone}`}>P: {contactUs.phone}</Link>
          <Link href={`mailto:${contactUs.email}`}>M: {contactUs.email}</Link>
        </p>
        <ul className={styles["social-links"]}>
          {socialLinks?.map((link) => {
            const icon = link.icon as Media;
            return (
              <li>
                <Link
                  href={link.href}
                  target={link.openInNewTab ? "_blank" : undefined}
                >
                  <Image
                    src={icon.url!}
                    alt={icon.alt}
                    height={icon.height!}
                    width={icon.width!}
                  />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
