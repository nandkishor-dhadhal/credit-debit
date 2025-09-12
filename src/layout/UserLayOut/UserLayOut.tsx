import { Outlet } from "react-router-dom";
import Navbar from "../../components/Navbar";

const UserLayOut = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default UserLayOut;
