import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { Button } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//icons
import DeleteIcon from "@mui/icons-material/Delete";

import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
export default function Dashboad() {
  const navigate = useNavigate();
  const checklogin = localStorage.getItem('login');
  if(!checklogin){
    navigate('/');
  }
  const [Data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [deleteitem, setdeleteitem] = React.useState("");
  let i = 0;
  // ---delete Code----
  const handleclose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    setOpen(true);
    setdeleteitem(id);
  };

  const confirmDelete = async (id) => {
    await axios
      .delete(
        `https://kabadiwala.cyclic.app/deleteUser/${id}`
      )
      .then((res) => {
        setOpen(false);
        getData();
        alert(res.data.message);
      });
  };

  const getData = async () => {
    await axios
      .get(
        "https://kabadiwala.cyclic.app/getAllUser"
      )
      .then((res) => {
        setData(res.data);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5", height: "97vh" }}
      >
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontSize: "20px", color: "#6945FF", textAlign: "center" }}
        >
          Kabadiwala User Program
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* // first Row */}
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={16}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "30px",
                    letterSpacing: "0em",
                    textAlign: "center",
                  }}
                >
                  Kabadiwala User Management
                </TableCell>
              </TableRow>
            </TableHead>

            {/* // Thrid row */}
            <TableHead>
              <TableRow>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Id
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  User Name
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Number
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Date Of Birth
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Gender
                </TableCell>
                <TableCell
                  align="center"
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "14px",
                    fontWeight: 700,
                    lineHeight: "16px",
                    letterSpacing: "0em",
                  }}
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>

            {Data.map((user) => {
              i = i +1;
              return (
                <TableBody key={user._id}>
                  <TableRow>
                    <TableCell align="center" sx={{ width: "150px" }}>
                      {i}
                    </TableCell>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.number}</TableCell>
                    <TableCell align="center">
                      {user.DateOfBirth}
                    </TableCell>
                    <TableCell align="center">{user.gender}</TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        className="DeleteIcon"
                        onClick={() =>
                          handleDelete(user._id)
                        }
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              );
            })}
          </Table>
        </TableContainer>


        <Dialog
          open={open}
          onClose={handleclose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Are you sure ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Your will not be able to recover this imaginary file!
            </DialogContentText>

            <DialogActions>
              <Button onClick={() => setOpen(false)}>cancle</Button>
              <Button onClick={() => confirmDelete(deleteitem)}>
                Yes, delete it!
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
