import { createContext, useContext, useState, type ReactNode } from "react";

export interface AdminViewContextType {
  view: string;
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const AdminViewContext = createContext<AdminViewContextType | undefined>(
  undefined
);

export default function AdminViewContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [view, setView] = useState("requests");
  return (
    <AdminViewContext.Provider value={{ view, setView }}>
      {children}
    </AdminViewContext.Provider>
  );
}

export const useAdminView = () => useContext(AdminViewContext);
