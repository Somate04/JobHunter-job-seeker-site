import {
  Button,
  TextField,
  OutlinedInput,
  MenuItem,
  Checkbox,
} from "@mui/material";

function Filter({
  setIsOpen,
  setIsFiltering,
  handleSubmit,
  setFrom,
  from,
  setTo,
  to,
  setCity,
  city,
  type,
  setType,
  homeOffice,
  setHomeOffice,
}) {
  const handleReset = () => {
    setFrom("");
    setTo("");
    setCity("");
    setType("");
    setHomeOffice(false);
    setIsFiltering(false);
  };
  const handleClick = () => {
    setIsOpen(false);
  };
  return (
    <form onSubmit={handleSubmit}>
      <table
        style={{
          marginLeft: "60%",
          zIndex: "1",
          position: "fixed",
          background: "white",
          border: "1px solid white",
          borderRadius: "30px",
          marginTop: "0px",
          padding: "5px",
        }}
      >
        <p
          style={{
            fontWeight: "bold",
            fontSize: "25px",
            textAlign: "left",
            marginLeft: "10px",
          }}
        >
          Szűrők
        </p>
        <tbody>
          <tr>
            <th>
              <p>Fizetési sáv alja</p>
            </th>
            <th>
              <p>Fizetési sáv teteje</p>
            </th>
          </tr>
          <tr>
            <td>
              <TextField
                value={from}
                variant="standard"
                type="number"
                id="from"
                label="-tól"
                onChange={(e) => setFrom(e.target.value)}
              />
            </td>
            <td>
              <TextField
                value={to}
                variant="standard"
                type="number"
                id="to"
                label="-ig"
                onChange={(e) => setTo(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <th>
              <p>Foglalkoztatás formája</p>
            </th>
            <th>
              <p>Település</p>
            </th>
          </tr>
          <tr>
            <td>
              <TextField
                id="select"
                variant="standard"
                value={type}
                label="Foglalkoztatás formája"
                select
                sx={{ minWidth: 200 }}
                onChange={(e) => setType(e.target.value)}
                input={<OutlinedInput label="Foglalkoztatás formája" />}
              >
                <MenuItem value={"full-time"}>Teljes állás</MenuItem>
                <MenuItem value={"part-time"}>Részmunkaidős</MenuItem>
                <MenuItem value={"internship"}>Gyakornoki</MenuItem>
              </TextField>
            </td>
            <td>
              <TextField
                value={city}
                variant="standard"
                type="text"
                id="city"
                label="Település"
                onChange={(e) => setCity(e.target.value)}
              />
            </td>
          </tr>
          <tr>
            <td>
              <Checkbox
                onChange={(e) => setHomeOffice(e.target.checked)}
                checked={homeOffice}
                id="homeOffice"
              />
              Home Office lehetőség
            </td>
            <td>
              <Button type="submit">Szűrés</Button>
              <Button onClick={handleReset}>Visszaállít</Button>
              <Button onClick={handleClick}>Bezár</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </form>
  );
}

export default Filter;
