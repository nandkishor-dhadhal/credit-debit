import { Outlet } from "react-router";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

const AdminLayOut = () => {
  return (
    <div>
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayOut;
