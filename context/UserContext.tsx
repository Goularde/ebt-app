import {
  createContext,
  useState,
  PropsWithChildren,
  useContext,
  useEffect,
} from "react";
import { UserContextType } from "../types/UserContextType";
import { User } from "../types/User";
import { UserLogin } from "../types/UserLogin";
import { Text } from "react-native";

const UserContext = createContext<UserContextType>({
  user: null,
  signIn: () => {},
  signOut: () => {},
});

const useProvideAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const response = await fetch(
          process.env.BASE_URL + "?m=sessioncheck&v=2&autologin=0",
          {
            method: "POST",
            credentials: "include",
          }
        );
        const result = await response.json();
        // console.log("Success Auto login:" + result.sessionid);
        setUser(result);
      } catch (error) {
        console.log("Error :" + error);
      }
    };
    autoLogin();
    setIsLoading(false);
  }, []);

  const signIn = async (data: UserLogin) => {
    try {
      const response = await fetch(
        process.env.BASE_URL +
          `?m=login&v=2&my_email=${data.email}&my_password=${data.password}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const result = await response.json();
      // console.log("Success :" + result.sessionid);
      setUser(result);
    } catch (error) {
      console.log("Error :" + error);
    }
  };

  const signOut = async () => {
    try {
      await fetch(
        process.env.BASE_URL + `?m=logout&v=1&PHPSESSID=${user?.sessionId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      setUser(null);
    } catch (error) {
      console.log("Error :" + error);
      return null;
    }
  };
  return { user, isLoading, signIn, signOut };
};

export const useAuth = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }: PropsWithChildren) => {
  const data = useProvideAuth();
  return (
    <UserContext.Provider value={data}>
      {data.isLoading ? <Text>Loading...</Text> : children}
    </UserContext.Provider>
  );
};
