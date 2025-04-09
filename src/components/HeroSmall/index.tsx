import { HeroSmall as IHeroSmall, Media } from "@/payload/payload-types";

import styles from "./HeroSmall.module.scss";

interface HeroSmallProps {
  content: IHeroSmall;
}

export default function HeroSmall({ content }: HeroSmallProps) {
  const image = content.backgroundImage as Media;
  return (
    <div
      className={styles["hero-small"]}
      style={{ backgroundImage: `url(${image.url})` }}
    >
      <p className={styles.title}>{content.title}</p>
      <p className={styles.subTitle}>{content.subTitle}</p>
    </div>
  );
}
