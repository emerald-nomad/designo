import { AttributesList, Media } from "@/payload/payload-types";

import styles from "./AttributeListItem.module.scss";
import Image from "next/image";

interface AttributesListItemProps {
  content: AttributesList["list"][0];
}

export default function AttributeListItem({
  content,
}: AttributesListItemProps) {
  const image = content.image as Media;
  return (
    <li className={styles["attributes-list-item"]}>
      <Image
        src={image.url!}
        alt={image.alt}
        height={image.height!}
        width={image.width!}
      />
      <div className={styles.content}>
        <h3 className={styles.title}>{content.title}</h3>
        <p className={styles.description}>{content.description}</p>
      </div>
    </li>
  );
}
