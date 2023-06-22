import { createContext, useState } from "react";
import { parseCookies } from "nookies";

type AuthContextType = {
  signIn: boolean;
  checkSignIn: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  signIn: false,
  checkSignIn: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [signIn, setSignIn] = useState(false);

  const checkSignIn = () => {
    const cookies = parseCookies();
    const token = cookies.token;

    if (token) {
      setSignIn(true);
    } else {
      setSignIn(false);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn, checkSignIn }}>
      {children}
    </AuthContext.Provider>
  );
};
