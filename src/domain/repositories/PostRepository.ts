import { CommentEntity, PostEntity } from "../entities/Post";

export interface PostRepository {
  create(post: Pick<PostEntity, "title" | "content">): Promise<PostEntity>;
  findAll(): Promise<PostEntity[]>;
  findById(id: string): Promise<PostEntity | null>;
  update(id: string, post: Pick<PostEntity, "title" | "content">): Promise<PostEntity | null>;
  delete(id: string): Promise<PostEntity | null>;
  like(id: string): Promise<PostEntity | null>;
  addComment(id: string, comment: CommentEntity): Promise<PostEntity | null>;
}
