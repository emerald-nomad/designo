import { Page } from "@/payload/payload-types";
import HeroLarge from "./HeroLarge";

interface PageBuilderProps {
  content: Page["content"];
}

export default function PageBuilder(props: PageBuilderProps) {
  const content = props.content!;

  function renderBlock(item: (typeof content)[0]) {
    switch (item.blockType) {
      case "heroLarge":
        return <HeroLarge key={item.id} content={item} />;
      default:
        return (
          <h1 key={item.id}>
            Block type &quot;{item.blockType}&quot; not supported
          </h1>
        );
    }
  }
  return content.map((c) => renderBlock(c));
}
