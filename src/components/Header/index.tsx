// import { getPayload } from "payload";
// import config from "@/payload/payload.config";
import styles from "./Header.module.scss";
// import { Media } from "@/payload/payload-types";
// import Image from "next/image";
// import Link from "next/link";

export default async function Header() {
  // const payload = await getPayload({ config });

  // const { logo } = await payload.findGlobal({
  //   slug: "header",
  // });

  // const { url, alt, width, height } = logo as Media;

  return (
    <header className={styles.header}>
      {/* <Link href="/">
        <Image src={url!} alt={alt} width={200} height={24} />
      </Link> */}
    </header>
  );
}
