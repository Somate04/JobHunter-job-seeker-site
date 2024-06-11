import {
  Checkbox,
  TextField,
  MenuItem,
  OutlinedInput,
  Button,
  Slider,
} from "@mui/material";
import { useRef, useState } from "react";
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
      <table
        cellSpacing={10}
        style={{ marginTop: "5%", marginLeft: "auto", marginRight: "auto" }}
      >
        <tr>
          <td>
            <TextField
              inputRef={companyRef}
              variant="outlined"
              type="text"
              id="company"
              label="Cég"
              autoFocus
            />
          </td>
          <td>
            <TextField
              inputRef={positionRef}
              variant="outlined"
              type="text"
              id="position"
              label="Pozíció"
            />
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <TextField
              inputRef={descriptionRef}
              variant="outlined"
              type="type"
              id="description"
              label="Leírás"
              multiline={true}
              rows={10}
              fullWidth={true}
            />
          </td>
        </tr>

        <tr>
          <td colSpan={3}>
            <p>Fizetési sáv</p>
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <Slider
              sx={{ color: "#1e293b" }}
              value={range}
              onChange={handleRange}
              min={0}
              max={2000000}
              step={10000}
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
          </td>
        </tr>
        <tr>
          <td>
            <TextField
              id="select"
              variant="outlined"
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
          </td>
          <td>
            <TextField
              inputRef={cityRef}
              variant="outlined"
              type="text"
              id="city"
              label="Település"
            />
          </td>
          <td>
            <Checkbox
              onChange={handleCheck}
              value={homeOffice}
              id="homeOffice"
            />{" "}
            Home Office
          </td>
        </tr>
        <tr>
          <td colSpan={3}>
            <Button
              variant="contained"
              type="submit"
              sx={{ background: "#1e293b" }}
            >
              Regisztrálás
            </Button>
          </td>
        </tr>
      </table>
    </form>
  );
}
export default AddJob;
