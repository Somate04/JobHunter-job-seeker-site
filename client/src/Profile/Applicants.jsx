import { useParams } from "react-router-dom";
import { useGetApplicantsQuery } from "../state/api/jobApiSlice";
import {
  Container,
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
} from "@mui/material";
import Modal from "react-modal";
import { useState } from "react";
Modal.setAppElement(root);
function Applicants() {
  const { jobId } = useParams();
  const { data: users, isLoading } = useGetApplicantsQuery(jobId);
  const [modalUser, setModalUser] = useState(1);
  const [modalIsOpen, setModal] = useState(false);
  const handleClick = (user) => {
    setModal(true);
    setModalUser(user);
  };
  const modalStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "40%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgb(226, 232, 240)",
      borderRadius: "15px",
      borderColor: "rgb(226, 232, 240)",
    },
  };
  const closeModal = () => {
    setModal(false);
    setModalUser(0);
  };
  return (
    <Container maxWidth="md">
      {!isLoading && (
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Jelentkezők
          </Typography>
          {users.map((user) => (
            <Card variant="outlined" sx={{ mb: 2 }}>
              <CardContent>
                <Typography
                  variant="h5"
                  sx={{ fontWeight: "bold", textAlign: "left" }}
                >
                  {user.user.fullname}
                </Typography>
                <Button onClick={() => handleClick(user.user)}>
                  Profil megtekintése
                </Button>
                <Modal
                  isOpen={modalIsOpen}
                  onRequestClose={closeModal}
                  style={modalStyles}
                >
                  <Typography variant="h5" component="h2" gutterBottom>
                    Személyes adatok
                  </Typography>
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Név
                          </TableCell>
                          <TableCell>{modalUser.fullname}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            E-mail
                          </TableCell>
                          <TableCell>{modalUser.email}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell
                            component="th"
                            scope="row"
                            sx={{ fontWeight: "bold" }}
                          >
                            Státusz
                          </TableCell>
                          <TableCell>{modalUser.role}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                  <Button
                    onClick={closeModal}
                    variant="contained"
                    color="success"
                  >
                    Vissza
                  </Button>
                </Modal>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
export default Applicants;
