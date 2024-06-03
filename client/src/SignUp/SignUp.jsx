import { TextField, Button, Switch } from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useAddExperienceMutation,
  useLoginMutation,
  useRegisterMutation,
} from "../state/api/authApiSlice";
import { login } from "../state/authSlice";

function SignUp() {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const nameRef = useRef(null);
  const experienceRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [authRegister] = useRegisterMutation();
  const [authLogin] = useLoginMutation();
  const [authExperience] = useAddExperienceMutation();

  const [checked, setChecked] = useState(false);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const name = nameRef.current.value;
    const experiencesString = experienceRef.current.value;
    try {
      await authRegister({
        email: email,
        password: password,
        fullname: name,
        role: checked ? "company" : "jobseeker",
      }).unwrap();
      const result = await authLogin({
        strategy: "local",
        email: email,
        password: password,
      }).unwrap();
      dispatch(login(result));
      if (!checked && experiencesString) {
        const experiences = experiencesString
          .split("\n")
          .filter((line) => line.trim() !== "")
          .map((line) => {
            const [company, title, interval] = line.split(";");
            return { company, title, interval };
          });

        for (const experience of experiences) {
          await authExperience({
            ...experience,
          }).unwrap();
        }
      }
      navigate("/");
    } catch (e) {
      console.error("Sign up error");
    }
  };

  const HandleSwitchChange = (e) => {
    setChecked(e.target.checked);
  };

  return (
    <form onSubmit={HandleSubmit}>
      <p>Munkavállaló</p>
      <Switch checked={checked} onChange={HandleSwitchChange} />
      <p>Munkáltató</p>
      <TextField
        inputRef={nameRef}
        variant="standard"
        type="text"
        id="name"
        label="Teljes név"
        autoFocus
      />
      <TextField
        inputRef={emailRef}
        variant="standard"
        type="text"
        id="email"
        label="Email cím"
      />
      <TextField
        inputRef={passwordRef}
        variant="standard"
        type="password"
        id="password"
        label="Jelszó"
      />
      <TextField
        inputRef={experienceRef}
        variant="standard"
        type="type"
        id="experience"
        label="Munka tapasztalat"
        style={{ display: checked ? "none" : "block" }}
        multiline={true}
        rows={10}
        fullWidth={true}
      />
      <Button variant="standard" type="submit">
        Elküld
      </Button>
    </form>
  );
}
export default SignUp;
