import { Media, Page, PageLink } from "@/payload/payload-types";
import Link from "next/link";
import rightArrowIcon from "@/assets/shared/desktop/icon-right-arrow.svg";

import styles from "./PageLinkList.module.scss";
import Image from "next/image";
import ArtDirection from "../ArtDirection";

interface PageLinkListItemProps {
  index: number;
  pageLink: PageLink;
}

export default function PageLinkListItem({
  pageLink,
  index,
}: PageLinkListItemProps) {
  const page = pageLink.page as Page;
  const { mobileImage, tabletImage, desktopImage } = pageLink.images;

  return (
    <li
      className={`${styles["page-link-list-item"]}  ${styles[`page-link-list-item-${index}`]}`}
    >
      <ArtDirection
        alt=""
        mobileSrc={(mobileImage as Media).url!}
        tabletSrc={(tabletImage as Media).url!}
        desktopSrc={(desktopImage as Media).url!}
      />
      <Link href={page.slug}>
        <span className={styles.title}>{page.name}</span>
        <span className={styles.cta}>
          View Projects <Image src={rightArrowIcon} alt="Right Arrow Icon" />
        </span>
      </Link>
    </li>
  );
}
