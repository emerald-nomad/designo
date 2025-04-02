import { Page } from "@/payload/payload-types";
import HeroLarge from "../HeroLarge";
import PageLinkList from "../PageLinkList";

import styles from "./Pagebuilder.module.scss";

interface PageBuilderProps {
  content: Page["content"];
}

export default function PageBuilder(props: PageBuilderProps) {
  const content = props.content!;

  function renderBlock(item: (typeof content)[0]) {
    switch (item.blockType) {
      case "heroLarge":
        return <HeroLarge key={item.id} content={item} />;
      case "pageLinkList":
        return <PageLinkList key={item.id} content={item} />;
      default:
        return (
          <h1 key={item.id}>
            Block type &quot;{item.blockType}&quot; not supported
          </h1>
        );
    }
  }
  return (
    <div className={styles.wrapper}>{content.map((c) => renderBlock(c))}</div>
  );
}
