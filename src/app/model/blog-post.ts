export interface BlogPost {
  id?: number;
  title: string;
  content: string;
  imageUrl?: string;
  category?: string;
  authorName?: string;
  shortDescription?: string;
  tags?: string[];

  likes?: number;
  views?: number;
  featured?: boolean;
  createdAt?: string;
  updatedAt?: string;

  comments?: string[];
  newComment?: string;
  showComments?: boolean;
}
