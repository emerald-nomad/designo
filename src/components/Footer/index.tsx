import { getPayload } from "payload";
import config from "@/payload/payload.config";
import styles from "./Footer.module.scss";

export default async function Footer() {
  const payload = await getPayload({ config });

  const {} = await payload.findGlobal({
    slug: "footer",
  });

  return <footer className={styles.footer}></footer>;
}
