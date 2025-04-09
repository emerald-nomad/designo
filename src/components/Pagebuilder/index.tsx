import { Page } from "@/payload/payload-types";
import HeroLarge from "../HeroLarge";
import PageLinkList from "../PageLinkList";

import styles from "./Pagebuilder.module.scss";
import AttributesList from "../AttributesList";
import HeroSmall from "../HeroSmall";

interface PageBuilderProps {
  content: Page["content"];
}

export default function PageBuilder(props: PageBuilderProps) {
  const content = props.content!;

  function renderBlock(item: (typeof content)[0]) {
    switch (item.blockType) {
      case "attributesList":
        return <AttributesList key={item.id} content={item} />;
      case "heroLarge":
        return <HeroLarge key={item.id} content={item} />;
      case "heroSmall":
        return <HeroSmall key={item.id} content={item} />;
      case "pageLinkList":
        return <PageLinkList key={item.id} content={item} />;
    }
  }
  return (
    <div className={styles.wrapper}>{content.map((c) => renderBlock(c))}</div>
  );
}
