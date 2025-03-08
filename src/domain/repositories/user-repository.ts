import { User } from "../entities/user";

export interface UserRepository {
    save(user: User): Promise<void>;
    findByUsername(username: string): Promise<User | null>;
}