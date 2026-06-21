import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import { users, type User } from "../data/user-mock.data";

// interface UserContextProps {
//   children: React.ReactNode;
// }

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

interface UserContextProps {
  //state
  authStatus: AuthStatus;
  isAuthenticated: boolean;
  user: User | null;

  //methods
  login: (userID: number) => boolean;
  logout: () => void;
}

// With this way we need to initialize immediately
// export const UserContext = createContext<UserContextProps>()

// This is a 'configuration of context object', not a component
export const UserContext = createContext({} as UserContextProps);



// HOC - Higher Order Component. A component that recieves children
// You can do 'FC<PropsWhithChildren> () => {}' too
export const UserContextProvider = ({ children }: PropsWithChildren) => {

  const [authStatus, setAuthStatus] = useState<AuthStatus>('checking');
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (userID: number) => {
    const user = users.find(user => user.id === userID);
    if (!user) {
      console.error(`User ${userID} not found`);
      setUser(null);
      setAuthStatus('not-authenticated');
      return false;
    }

    setUser(user);
    setAuthStatus('authenticated');
    localStorage.setItem('userId', userID.toString());
    return true;
  };

  const handleLogout = () => {
    setAuthStatus('not-authenticated');
    setUser(null);
    localStorage.removeItem('userId');
  };

  useEffect(() => {
    const storedUserID = localStorage.getItem('userId');
    if (storedUserID) {
      handleLogin(+storedUserID);
      return;
    } else {
      handleLogout();
    }
  });

  // It is not recommended to return html from a Provider
  return (
    // With React 19+ it is not necessary to put '.Provider'
    <UserContext.Provider value={{
      authStatus: authStatus,
      isAuthenticated: authStatus === 'authenticated',
      user: user,
      login: handleLogin,
      logout: handleLogout
    }}>
      {children}
    </UserContext.Provider>
  );
};
