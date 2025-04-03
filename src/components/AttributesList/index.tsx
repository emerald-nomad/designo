import { AttributesList as IAttributesList } from "@/payload/payload-types";

import styles from "./AttributeListItem.module.scss";
import AttributeListItem from "./AttributeListItem";

interface AttributesListProps {
  content: IAttributesList;
}

export default function AttributesList({ content }: AttributesListProps) {
  return (
    <ul className={styles["attributes-list"]}>
      {content.list.map((item) => (
        <AttributeListItem key={item.id} content={item} />
      ))}
    </ul>
  );
}
