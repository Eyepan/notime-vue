import type Page from "./page.model";

export default interface Notebook {
  id: string;
  title: string;
  pages: Page[];
}
