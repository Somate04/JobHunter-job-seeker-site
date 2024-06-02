import { TextField, Button } from "@mui/material";
import { useRef } from "react";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const HandleSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
  };

  return (
    <form onSubmit={HandleSubmit}>
      <TextField
        inputref={emailRef}
        variant="standard"
        type="text"
        id="email"
        label="Email cím"
        autoFocus
      />
      <TextField
        inputref={passwordRef}
        variant="standard"
        type="password"
        id="password"
        label="Jelszó"
        autoFocus
      />
      <Button variant="standard" type="submit">
        Elküld
      </Button>
    </form>
  );
}
export default SignUp;
