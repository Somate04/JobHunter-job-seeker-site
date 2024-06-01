import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <nav className="ui secondary menu">
      <NavLink exact="true" to="/" className="item">
        <i className="jobbhunter icon"></i> JobHunter
      </NavLink>
      <NavLink exact="true" to="/" className="item">
        <i className="login icon"></i> Bejelentkezés
      </NavLink>
      <NavLink exact="true" to="/" className="item">
        <i className="register icon"></i> Regisztrálás
      </NavLink>
    </nav>
  );
}
export default Navigation;
