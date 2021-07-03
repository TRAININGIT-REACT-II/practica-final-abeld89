import React, { useEffect, useState } from "react";


export const UserContext = React.createContext({ data: {}, saveData: () => undefined, deleteData: () => undefined });


const UserContextProvider = ({ children }) => {
  const [data, setData] = useLocalStorageState('data', {});

  return (
    <UserContext.Provider value={
      {
        data: data, saveData: (data) => setData(data), deleteData: () => setData({})
      }
    }>
      {children}
    </UserContext.Provider>
  );
}

function useLocalStorageState(localStorageKey, defaultValue) {
  const initialValue = JSON.parse(localStorage.getItem(localStorageKey)) || defaultValue;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export default UserContextProvider;