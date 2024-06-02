import { Outlet } from "react-router-dom";
import Navigation from "../Layout/Navigation";

function Layout(props) {
  return (
    <div className="ui container">
      <Navigation></Navigation>
      <Outlet />
    </div>
  );
}

export default Layout;
