import {
  PageLinkList as IPageLinkList,
  PageLink,
} from "@/payload/payload-types";

import styles from "./PageLinkList.module.scss";
import PageLinkListItem from "./PageLinkListItem";

interface PageLinkListProps {
  content: IPageLinkList;
}

export default function PageLinkList({ content }: PageLinkListProps) {
  return (
    <section>
      <ul
        className={`${styles["page-link-list"]} ${content.links.length > 2 && styles.grid}`}
      >
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
