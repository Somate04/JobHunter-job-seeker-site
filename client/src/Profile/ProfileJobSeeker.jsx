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
import CreateIcon from "@mui/icons-material/Create";
import { useParams } from "react-router-dom";
import {
  useGetExperienceByUserQuery,
  useGetUserQuery,
} from "../state/api/authApiSlice";

function ProfileJobSeeker() {
  const { userId } = useParams();
  const { data: user, isLoading: isUserLoading } = useGetUserQuery(userId);
  const { data: experiences, isLoading: isExperienceLoading } =
    useGetExperienceByUserQuery(userId);
  const isLoading = isUserLoading || isExperienceLoading;
  return (
    <Container maxWidth="md">
      {!isLoading && (
        <Box sx={{ my: 4 }}>
          <Box mt={4} component={Paper} p={4} elevation={3}>
            <Box display="flex" justifyContent="flex-end">
              <Button startIcon={<CreateIcon />}>
                Tapasztalatok szerkesztése
              </Button>
            </Box>
            <Typography variant="h5" component="h2" gutterBottom>
              Személyes adatok
            </Typography>
            <TableContainer>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Név
                    </TableCell>
                    <TableCell>{user.fullname}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      E-mail
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Státusz
                    </TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      Munkatapasztalatok
                    </TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                  {!isLoading &&
                    experiences.map((experience) => (
                      <TableRow>
                        <TableCell component="th" scope="row">
                          {experience.company}
                        </TableCell>
                        <TableCell>
                          {experience.interval} {experience.title}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      )}
    </Container>
  );
}
export default ProfileJobSeeker;
