import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader";
import { UserContext } from "../userContext";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useContext(UserContext);
  return (
    <div className="min-h-screen flex flex-col">
      {user && <Navbar />}
      <Loader />
      <main className="flex-1 p-4">{children}</main>
      {/* Optional Footer */}
    </div>
  );
};

export default MainLayout;
