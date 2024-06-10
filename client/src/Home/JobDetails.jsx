import { useParams } from "react-router-dom";
import {
  useGetJobByIdQuery,
  useApplyForJobMutation,
} from "../state/api/jobApiSlice";
import {
  Container,
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  TableContainer,
} from "@mui/material";
import { useState } from "react";

function JobDetails() {
  const { jobId } = useParams();
  const { data: job, isLoading } = useGetJobByIdQuery(jobId);
  const [applyForJob] = useApplyForJobMutation();
  const [success, setSuccess] = useState(false);
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
  const handleClick = async () => {
    try {
      await applyForJob({ jobId: Number(jobId) }).unwrap();
      setSuccess(true);
    } catch (error) {
      console.error("Application error");
    }
  };
  return (
    <Container maxWidth="md">
      {!isLoading && (
        <Box sx={{ my: 4 }}>
          <Box mt={4} component={Paper} p={4} elevation={3}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" onClick={handleClick}>
                Jelentkezés
              </Button>
              {success && <p>A jelentkezés sikeresen megtörtént</p>}
            </Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Cég részletei
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Név
                    </TableCell>
                    <TableCell>{job[0].company}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Pozíció
                    </TableCell>
                    <TableCell>{job[0].position}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Leírás
                    </TableCell>
                    <TableCell>{job[0].description}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Fizetési sáv
                    </TableCell>
                    <TableCell>
                      Bruttó{" "}
                      {new Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumSignificantDigits: 6,
                      }).format(job[0].salaryFrom)}{" "}
                      -{" "}
                      {new Intl.NumberFormat("hu-HU", {
                        style: "currency",
                        currency: "HUF",
                        maximumSignificantDigits: 6,
                      }).format(job[0].salaryTo)}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Foglalkoztatás típusa
                    </TableCell>
                    <TableCell>{typeSwitch(job[0].type)}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Település
                    </TableCell>
                    <TableCell>{job[0].city}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Home Office
                    </TableCell>
                    <TableCell>{job[0].homeOffice ? "Van" : "Nincs"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </Container>
  );
}
export default JobDetails;
