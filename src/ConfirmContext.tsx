import React, { useState } from "react";

interface ContextProviderType {
  resolve?: boolean;
  setResolve?: (value: boolean) => void;
}

export const ConfirmContext = React.createContext<ContextProviderType | null>(
  null
);

const ConfirmContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [resolve, setResolve] = useState(false);

  return (
    <ConfirmContext.Provider
      value={{
        resolve,
        setResolve,
      }}
    >
      {children}
    </ConfirmContext.Provider>
  );
};

export default ConfirmContextProvider;
