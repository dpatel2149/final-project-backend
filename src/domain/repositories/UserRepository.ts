import { UserEntity } from "../entities/User";

export interface UserRepository {
  create(user: Pick<UserEntity, "name" | "email" | "password" | "role">): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  countAll(): Promise<number>;
  countByRole(role: string): Promise<number>;
}
