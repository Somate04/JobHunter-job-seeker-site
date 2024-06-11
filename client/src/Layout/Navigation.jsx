import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentUserRole } from "../state/authSlice";
import { Button } from "@mui/material";
import { logout } from "../state/authSlice";
import "./Navigation.css";
import WorkIcon from "@mui/icons-material/Work";

function Navigation() {
  const user = useSelector(selectCurrentUser);
  const role = useSelector(selectCurrentUserRole);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
    dispatch(logout());
  };

  return (
    <nav>
      <NavLink exact="true" to="/" className="item">
        <i className="jobbhuntericon">
          <WorkIcon />
        </i>{" "}
        JobHunter
      </NavLink>
      {!user ? (
        <>
          <NavLink exact="true" to="/login" className="item">
            <i className="login icon"></i> Bejelentkezés
          </NavLink>
          <NavLink exact="true" to="/signup" className="item">
            <i className="register icon"></i> Regisztráció
          </NavLink>
        </>
      ) : (
        <>
          <NavLink
            exact="true"
            to={`/profile${role}/${user.id}`}
            className="item"
          >
            <i className="register icon"></i> Profilom
          </NavLink>
          {role === "company" && (
            <NavLink exact="true" to="/new" className="item">
              <i className="register icon"></i> Álláshirdetés hozzáadása
            </NavLink>
          )}
          <Button variant="standard" onClick={handleClick} className="button">
            Kijelentkezés
          </Button>
        </>
      )}
    </nav>
  );
}
export default Navigation;
