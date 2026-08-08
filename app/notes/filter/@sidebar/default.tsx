import { TAGS } from "@/types/note";
import css from "./SidebarNotes.module.css";
export default function Sidebar() {
  return (
    <ul className={css.menuList}>
      <li className={css.menuItem}>
        <a href={`/notes/filter/all`} className={css.menuLink}>
          All notes
        </a>
      </li>
      {TAGS.map((tag) => {
        return (
          <li className={css.menuItem} key={tag}>
            <a href={`/notes/filter/${tag}`} className={css.menuLink}>
              {tag}
            </a>
          </li>
        );
      })}
    </ul>
  );
}