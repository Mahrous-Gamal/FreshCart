export interface ICategories {
  results: number;
  metadata: Metadata;
  data: ICategory[];
}

interface ICategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
}
