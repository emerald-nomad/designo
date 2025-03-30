import { getPayload } from "payload";
import config from "@/payload/payload.config";
import styles from "./Header.module.scss";

export default async function Header() {
  const payload = await getPayload({ config });

  const { title, navItems } = await payload.findGlobal({
    slug: "header",
  });

  return <header className={styles.header}></header>;
}
