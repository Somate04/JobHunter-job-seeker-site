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
      <table
        style={{
          marginTop: "5%",
          marginLeft: "auto",
          marginRight: "auto",
          borderSpacing: "10px",
        }}
      >
        <tr>
          <td>
            <p>Munkavállaló</p>
          </td>
          <td>
            <Switch checked={checked} onChange={HandleSwitchChange} color="" />
          </td>
          <td>
            <p>Munkáltató</p>
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              inputRef={nameRef}
              variant="outlined"
              type="text"
              id="name"
              label="Teljes név"
              autoFocus
              required
            />
          </td>
          <td>
            <TextField
              inputRef={emailRef}
              variant="outlined"
              type="text"
              id="email"
              label="Email cím"
              required
            />
          </td>
          <td>
            <TextField
              inputRef={passwordRef}
              variant="outlined"
              type="password"
              id="password"
              label="Jelszó"
              required
            />
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <TextField
              inputRef={experienceRef}
              variant="outlined"
              type="type"
              id="experience"
              label="Munka tapasztalat"
              style={{ display: checked ? "none" : "block" }}
              multiline={true}
              rows={10}
              fullWidth={true}
            />
          </td>
        </tr>
      </table>
      <Button
        variant="contained"
        type="submit"
        sx={{ background: "#1e293b", margin: "10px" }}
      >
        Regisztrálás
      </Button>
    </form>
  );
}
export default SignUp;
