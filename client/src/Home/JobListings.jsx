import { List, ListItem, ListItemText, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

function JobListings({ jobs }) {
  const typeSwitch = (type) => {
    switch (type) {
      case "full-time":
        return "Teljes állás";
      case "part-time":
        return "Részmunkaidős";
      case "internship":
        return "Gyakornoki ";
      default:
        return "";
    }
  };
  return (
    <List sx={{ width: "75%", marginLeft: "12%" }}>
      <ListItem key="name" divider sx={{ color: "grey" }}>
        ÁLLÁS NEVE
      </ListItem>
      {jobs.map((job) => (
        <Link to={`/jobdescription/${job.id}`} style={{ color: "black" }}>
          <ListItem key={job.id} divider>
            <ListItemText
              primary={job.position}
              secondary={
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{ verticalAlign: "top" }}
                  >
                    {job.city}
                  </Typography>
                  <Box textAlign="right">
                    <Typography variant="body2" color="textPrimary">
                      {new Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumSignificantDigits: 6,
                      }).format(job.salaryFrom)}{" "}
                      -{" "}
                      {new Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumSignificantDigits: 6,
                      }).format(job.salaryTo)}
                      Ft
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {typeSwitch(job.type)}
                    </Typography>
                  </Box>
                </Box>
              }
            />
          </ListItem>
        </Link>
      ))}
    </List>
  );
}

export default JobListings;
