import {
  Checkbox,
  TextField,
  Select,
  MenuItem,
  OutlinedInput,
  InputLabel,
  Button,
  Slider,
} from "@mui/material";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useRegisterJobMutation } from "../state/api/jobApiSlice";

function AddJob() {
  const companyRef = useRef(null);
  const positionRef = useRef(null);
  const descriptionRef = useRef(null);
  const cityRef = useRef(null);
  const [type, setType] = useState("");
  const [homeOffice, setHomeOffice] = useState(false);
  const navigate = useNavigate();
  const [registerJob] = useRegisterJobMutation();
  const [range, setRange] = useState([100000, 500000]);

  const handleChange = (e) => {
    setType(e.target.value);
  };
  const handleCheck = (e) => {
    setHomeOffice(e.target.value);
  };
  const handleRange = (e, newValue) => {
    setRange(newValue);
  };
  const HandleSubmit = async (e) => {
    e.preventDefault();
    const company = companyRef.current.value;
    const position = positionRef.current.value;
    const desc = descriptionRef.current.value;
    const from = Number(range[0]);
    const to = Number(range[1]);
    const city = cityRef.current.value;
    try {
      await registerJob({
        company: company,
        position: position,
        description: desc,
        salaryFrom: from,
        salaryTo: to,
        type: type,
        city: city,
        homeOffice: Boolean(homeOffice),
      }).unwrap();
      navigate("/");
    } catch (e) {
      console.error("Job listing error");
    }
  };
  return (
    <form onSubmit={HandleSubmit}>
      <TextField
        inputRef={companyRef}
        variant="standard"
        type="text"
        id="company"
        label="Cég"
        autoFocus
      />
      <TextField
        inputRef={positionRef}
        variant="standard"
        type="text"
        id="position"
        label="Pozíció"
      />
      <TextField
        inputRef={descriptionRef}
        variant="standard"
        type="type"
        id="description"
        label="Leírás"
        multiline={true}
        rows={10}
        fullWidth={true}
      />
      <p>Fizetési sáv</p>
      <Slider
        value={range}
        onChange={handleRange}
        min={0}
        max={2000000}
        step={10000}
        marks
        valueLabelDisplay="on"
        valueLabelFormat={(value) => (
          <div>
            {new Intl.NumberFormat("hu-HU", {
              style: "currency",
              currency: "HUF",
              maximumSignificantDigits: 6,
            }).format(value)}
          </div>
        )}
      />
      <TextField
        id="select"
        variant="standard"
        value={type}
        label="Foglalkoztatás formája"
        select
        sx={{ minWidth: 200 }}
        onChange={handleChange}
        input={<OutlinedInput label="Foglalkoztatás formája" />}
      >
        <MenuItem value={"full-time"}>Teljes állás</MenuItem>
        <MenuItem value={"part-time"}>Részmunkaidős</MenuItem>
        <MenuItem value={"internship"}>Gyakornoki</MenuItem>
      </TextField>
      <TextField
        inputRef={cityRef}
        variant="standard"
        type="text"
        id="city"
        label="Település"
      />
      <Checkbox onChange={handleCheck} value={homeOffice} id="homeOffice" />{" "}
      Home Office
      <Button variant="standard" type="submit">
        Regisztrálás
      </Button>
    </form>
  );
}
export default AddJob;
