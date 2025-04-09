import {
  ProjectCardList as IProjectCardList,
  Media,
} from "@/payload/payload-types";
import Image from "next/image";
import styles from "./ProjectCardList.module.scss";

interface ProjectCardListProps {
  content: IProjectCardList;
}

export default function ProjectCardList({ content }: ProjectCardListProps) {
  return (
    <ul className={styles["project-card-list"]}>
      {content.projects.map((project) => {
        const image = project.image as Media;

        return (
          <li key={project.id} className={styles["project-card-list-item"]}>
            <Image
              src={image.url!}
              alt={image.alt}
              width={image.width!}
              height={image.height!}
            />
            <div className={styles.content}>
              <p className={styles.title}>{project.title}</p>
              <p className={styles.description}>{project.description}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
