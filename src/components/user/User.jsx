import React, { createContext, useContext, useState } from "react";

// Crie o contexto
export const UserContext = createContext();

// Crie o provedor do contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Aqui você pode inicializar o usuário como null ou com um valor padrão

  return (
    <UserContext.Provider value={{ user, setUser, useContext }}>
      {children}
    </UserContext.Provider>
  );
};
