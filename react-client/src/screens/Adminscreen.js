import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import AdminNavbar from "../component/AdminNavbar";

export default function Adminscreen() {
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;

  useEffect(() => {
    if (!currentUser || !currentUser.isAdmin) {
      window.location.href = "/";
    }
  }, [currentUser]);

  return (
    <div>
      <AdminNavbar />
    </div>
  );
}
