import { NavLink } from "react-router-dom";
function Navigation() {
  return (
    <nav className="ui secondary menu">
      <NavLink exact="true" to="/" className="item">
        <i className="jobbhunter icon"></i> JobHunter
      </NavLink>
      <NavLink exact="true" to="/login" className="item">
        <i className="login icon"></i> Bejelentkezés
      </NavLink>
      <NavLink exact="true" to="/signup" className="item">
        <i className="register icon"></i> Regisztráció
      </NavLink>
      <NavLink exact="true" to="/profile" className="item">
        <i className="register icon"></i> Profilom
      </NavLink>
      <NavLink exact="true" to="/new" className="item">
        <i className="register icon"></i> Álláshirdetés hozzáadása
      </NavLink>
      <NavLink exact="true" to="/logout" className="item">
        <i className="register icon"></i> Kijelentkezés
      </NavLink>
    </nav>
  );
}
export default Navigation;
