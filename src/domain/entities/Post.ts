export interface CommentEntity {
  id?: string;
  text: string;
}

export interface PostEntity {
  id?: string;
  title: string;
  content: string;
  likes: number;
  comments: CommentEntity[];
}
