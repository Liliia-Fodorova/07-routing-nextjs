import css from "./page.module.css";
export default function Loading() {
  return (
    <div className={css.app}>
      <p>Loading, please wait...</p>
    </div>
  );
}