/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState } from "react";

export const UserContext = createContext();

function UserContextIsOnline(props) {
  // eslint-disable-next-line react/prop-types
  const { children } = props;
  const onLine = JSON.parse(localStorage.getItem("user"));
  const [isOnline, setIsOnline] = useState(onLine);

  return (
    <div>
      <UserContext.Provider value={{ isOnline, setIsOnline }}>
        {children}{" "}
      </UserContext.Provider>
    </div>
  );
}

export default UserContextIsOnline;
