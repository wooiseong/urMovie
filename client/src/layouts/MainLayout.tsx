import { Outlet } from "react-router-dom";
import NavBarWrapper from "src/globalComponents/navBar/NavBarWrapper";

const MainLayout = () => {
  return (
    <div>
      <NavBarWrapper />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
