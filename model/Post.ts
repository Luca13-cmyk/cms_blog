import Author from "./Author";
import Category from "./Category";

export default interface Post {
  author: Author;
  categories: Category[];
  content?: {
    raw: {
      children: any[];
    };
  };
  createdAt: string;
  excerpt: string;
  featuredImage: {
    url: string;
  };
  slug: string;
  title: string;
}
