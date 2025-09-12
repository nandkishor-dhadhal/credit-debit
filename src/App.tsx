import { RouterProvider } from "react-router-dom";
import AppTheme from "./layout/AppTheme";
import { router } from "./router";
import { AuthProvider } from "./context/authContext";

const App = () => {
  return (
    <>
      <AuthProvider>
        <AppTheme />
        <RouterProvider router={router} />
      </AuthProvider>
    </>
  );
};

export default App;
