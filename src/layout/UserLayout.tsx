import { Outlet } from "react-router-dom";
import UserNavbar from "../components/navbar/UserNavbar";

const UserLayOut = () => {
  return (
    <>
      <UserNavbar />
      <Outlet />
    </>
  );
};

export default UserLayOut;
