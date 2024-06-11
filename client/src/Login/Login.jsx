import { TextField, Button } from "@mui/material";
import { useRef } from "react";
import { useLoginMutation } from "../state/api/authApiSlice";
import { login } from "../state/authSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

function Login() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const [authLogin] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    try {
      const result = await authLogin({
        email: email,
        password: password,
        strategy: "local",
      }).unwrap();
      dispatch(login(result));
      navigate("/", { replace: true });
    } catch (e) {
      console.error("Login error");
    }
  };

  return (
    <form onSubmit={HandleSubmit} style={{ marginTop: "5%" }}>
      <TextField
        inputRef={emailRef}
        variant="outlined"
        type="text"
        id="email"
        label="Email cím"
      />
      <TextField
        inputRef={passwordRef}
        variant="outlined"
        type="password"
        id="password"
        label="Jelszó"
        sx={{ marginLeft: "10px" }}
      />
      <Button
        variant="contained"
        type="submit"
        sx={{ background: "#1e293b", padding: "15px", marginLeft: "10px" }}
      >
        Bejelentkezés
      </Button>
    </form>
  );
}
export default Login;
