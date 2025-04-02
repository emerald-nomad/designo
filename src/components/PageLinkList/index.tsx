import {
  PageLinkList as IPageLinkList,
  Page,
  PageLink,
} from "@/payload/payload-types";

import styles from "./PageLinkList.module.scss";
import Link from "next/link";
import PageLinkListItem from "./PageLinkListItem";

interface PageLinkListProps {
  content: IPageLinkList;
}

export default function PageLinkList({ content }: PageLinkListProps) {
  return (
    <section>
      <ul className={styles["page-link-list"]}>
        {content.links.map(({ link, id }, index) => (
          <PageLinkListItem
            key={id}
            index={index + 1}
            pageLink={link as PageLink}
          />
        ))}
      </ul>
    </section>
  );
}
