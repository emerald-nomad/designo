import { HeroLarge as IHeroLarge } from "@/payload/payload-types";
import Image from "next/image";
import Button from "../Button";
import imageHeroPhone from "@/assets/home/desktop/image-hero-phone.png";

import styles from "./HeroLarge.module.scss";

interface HeroLargeProps {
  content: IHeroLarge;
}

export default function HeroLarge({ content }: HeroLargeProps) {
  return (
    <section className={styles["hero-large"]}>
      <p className={styles.title}>{content.title}</p>
      <p className={styles.subTitle}>{content.subTitle}</p>
      <Button>{content.link.text}</Button>
      <Image src={imageHeroPhone} alt="Hero Phone" />
    </section>
  );
}
