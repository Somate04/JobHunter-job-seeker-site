import { Outlet } from "react-router-dom";
import Navigation from "../Layout/Navigation";

function Layout(props) {
  return (
    <>
      <Navigation></Navigation>
      <Outlet />
    </>
  );
}

export default Layout;
