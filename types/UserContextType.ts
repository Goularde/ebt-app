import { User } from "./User";
import { UserLogin } from "./UserLogin";

export type UserContextType = {
  user: User | null;
  signIn: (data: UserLogin) => void;
  signOut: () => void;
  refresh: () => void;
};
