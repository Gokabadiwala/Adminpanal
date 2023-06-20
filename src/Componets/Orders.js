import React, { useEffect, useState } from "react";
import {
  Box,
  Toolbar,
  Typography,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

//icons
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import AddTaskIcon from "@mui/icons-material/AddTask";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
export default function Orders() {
  const navigate = useNavigate();
  const checklogin = localStorage.getItem("login");
  if (!checklogin) {
    navigate("/");
  }
  const [Data, setData] = useState([]);
  const [DataLength, setDataLength] = useState(0);
  const [open, setOpen] = useState(false);
  const [deleteuser, setdeleteuser] = useState("");
  const [searchQuery, setsearchQuery] = useState("");
  const [UserData, setUserData] = useState("");
  const [UserOpen, setUserOpen] = useState(false);

  const handleAccept = async (id) => {
    let Value = "Accepted";
    await axios
      .post("https://kabadiwala.cyclic.app/updateAcceptOrder", { id, Value })
      .then((res) => {
        getData();
        alert("Order Accepted");
      })
      .catch((err) => {
        getData();
        alert("Something Wrong, Try Again");
      });
  };
  const handleReject = async (id) => {
    let Value = "Rejected";
    await axios
      .post("https://kabadiwala.cyclic.app/updateAcceptOrder", { id, Value })
      .then((res) => {
        getData();
        alert("Order Rejected");
      })
      .catch((err) => {
        getData();
        alert("Something Wrong, Try Again");
      });
  };
  const handleComplete = async (id) => {
    let Value = "Completed";
    await axios
      .post("https://kabadiwala.cyclic.app/updateAcceptOrder", { id, Value })
      .then((res) => {
        getData();
        alert("Order Completed");
      })
      .catch((err) => {
        getData();
        alert("Something Wrong, Try Again");
      });
  };
  const filterData = (data) => {
    if (searchQuery.length === 0) {
      getData();
      return data;
    }
    return data.filter((user) => {
      return user.OrderId.toString().indexOf(searchQuery.toString()) !== -1;
    });
  };
  useEffect(() => {
    setData(filterData(Data));
  }, [searchQuery]);

  const Userhandleclose = () => {
    setUserOpen(false);
  };

  let i = 0;
  // ---delete Code----
  const handleclose = () => {
    setOpen(false);
  };

  const handleDelete = (id) => {
    setOpen(true);
    setdeleteuser(id);
  };

  const getData = async () => {
    await axios
      .get("https://kabadiwala.cyclic.app/getAllPickup")
      .then(async (res) => {
        setData(res.data);
        setDataLength(res.data.length);
      });
  };

  const confirmDelete = async (id) => {
    await axios
      .delete(`https://kabadiwala.cyclic.app/deleteOrder/${id}`)
      .then((res) => {
        setOpen(false);
        getData();
        alert(res.data.message);
      });
  };

  const handleUser = async (id) => {
    setUserOpen(true);
    await axios
      .get(`https://kabadiwala.cyclic.app/getData/${id}`)
      .then((res) => {
        setUserData(res.data);
      });
  };
  useEffect(() => {
    getData();
  }, []);

  const acceptedOrders = Data.filter(
    (order) => order.OrderStatus === "Accepted"
  );
  const acceptedOrdersLength = acceptedOrders.length;

  const RejectedOrders = Data.filter(
    (order) => order.OrderStatus === "Rejected"
  );
  const RejectedOrdersLength = RejectedOrders.length;

  const CancelledOrders = Data.filter(
    (order) => order.OrderStatus === "Cancelled"
  );
  const CancelledOrdersLength = CancelledOrders.length;

  const PendingOrders = Data.filter((order) => order.OrderStatus === "Pending");
  const PendingOrdersLength = PendingOrders.length;

  const CompletedOrders = Data.filter(
    (order) => order.OrderStatus === "Completed"
  );
  const CompletedOrdersLength = CompletedOrders.length;

  return (
    <>
      <Header />
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5", height: "auto" }}
      >
        <Toolbar />
        <Typography
          variant="h4"
          sx={{ fontSize: "20px", color: "#6945FF", textAlign: "center" }}
        >
          Kabadiwala Order Program
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 650 }} aria-label="caption table">
            {/* // first Row */}
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={18}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "24px",
                    fontWeight: 600,
                    lineHeight: "30px",
                    letterSpacing: "0em",
                    textAlign: "center",
                  }}
                >
                  Kabadiwala Order Management
                </TableCell>
              </TableRow>
            </TableHead>
            {/* //second row */}
            <TableHead>
              <TableRow>
                <TableCell
                  colSpan={7}
                  sx={{
                    fontFamily: "Roboto",
                    fontSize: "20px",
                    fontWeight: 600,
                    lineHeight: "0px",
                    letterSpacing: "0em",
                  }}
                >
                  <TextField
                    variant="outlined"
                    size="small"
                    onChange={(e) => setsearchQuery(e.target.value)}
                    sx={{ m: 1, width: "25ch" }}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <SearchIcon />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Seach Here..."
                  />
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      border: "1px #007bff solid",
                      borderRadius: 2,
                      width: "100px",
                      height: "80px",
                    }}
                  >
                    <p align="center" al="true" style={{ fontWeight: "bold" }}>
                      Total Order
                    </p>
                    <p align="center" al="true">
                      {DataLength}
                    </p>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      border: "1px #6c757d solid",
                      borderRadius: 2,
                      width: "120px",
                      height: "80px",
                    }}
                  >
                    <p
                      align="center"
                      al="true"
                      style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                    >
                      Pending Order
                    </p>
                    <p align="center" al="true">
                      {PendingOrdersLength}
                    </p>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      border: "1px darkgreen solid",
                      borderRadius: 2,
                      width: "120px",
                      height: "80px",
                    }}
                  >
                    <p
                      align="center"
                      al="true"
                      style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                    >
                      Accepted Order
                    </p>
                    <p align="center" al="true">
                      {acceptedOrdersLength}
                    </p>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      border: "1px darkgreen solid",
                      borderRadius: 2,
                      width: "120px",
                      height: "80px",
                    }}
                  >
                    <p
                      align="center"
                      al="true"
                      style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                    >
                      Completed Order
                    </p>
                    <p align="center" al="true">
                      {CompletedOrdersLength}
                    </p>
                  </Box>
                </TableCell>
                <TableCell>
                  <Box
                    sx={{
                      border: "1px #dc3545 solid",
                      borderRadius: 2,
                      width: "120px",
                      height: "80px",
                    }}
                  >
                    <p
                      align="center"
                      al="true"
                      style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                    >
                      Rejected Order
                    </p>
                    <p align="center" al="true">
                      {RejectedOrdersLength}
                    </p>
                  </Box>
                </TableCell>
                <TableCell colSpan={6}>
                  <Box
                    sx={{
                      border: "1px #ffc107 solid",
                      borderRadius: 2,
                      width: "120px",
                      height: "80px",
                    }}
                  >
                    <p
                      align="center"
                      al="true"
                      style={{ fontWeight: "bold", fontSize: "0.8rem" }}
                    >
                      Cancelled Order
                    </p>
                    <p align="center" al="true">
                      {CancelledOrdersLength}
                    </p>
                  </Box>
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
                  Order Id
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
                  Order Accept Date
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
                  Order Date
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
                  Order Time
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
                  Order Quantity
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
                  Order Type
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
                  User City
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
                  User Area
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
                  User Address
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
                  User Instruction
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
                  Pickup From
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
                  Status
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
                  View User Detalis
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
                  Accept
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
                  Completed
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
                  Reject
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
            {Data.slice(0).reverse().map((user) => {
              i = i + 1;
              return (
                <TableBody key={user._id}>
                  <TableRow>
                    <TableCell align="center" sx={{ width: "150px" }}>
                      {i}
                    </TableCell>
                    <TableCell align="center">{user.OrderId}</TableCell>
                    <TableCell align="center">{user.OrderAcceptDate}</TableCell>
                    <TableCell align="center">{user.OrderDate}</TableCell>
                    <TableCell align="center">{user.OrderTime}</TableCell>
                    <TableCell align="center">{user.OrderQuantity}</TableCell>
                    <TableCell align="center">{user.OrderType + " "}</TableCell>
                    <TableCell align="center">{user.UserCity}</TableCell>
                    <TableCell align="center">{user.UserArea}</TableCell>
                    <TableCell align="center">{user.UserAddress}</TableCell>
                    <TableCell align="center">{user.UserInstruction}</TableCell>
                    <TableCell align="center">{user.PickupFrom}</TableCell>
                    <TableCell align="center"><Typography style={user.OrderStatus  === "Pending" ? {color: "orange"} : user.OrderStatus  === "Accepted" ? {color: "green"} : user.OrderStatus  === "Completed" ? {color: "green"} : {color: "red"}}>{user.OrderStatus}</Typography></TableCell>
                    <TableCell align="center">
                      <Button
                        variant="outlined"
                        onClick={() => handleUser(user.UserId)}
                      >
                        User Detalis
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <CheckIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleAccept(user._id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <AddTaskIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleComplete(user._id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <ClearIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleReject(user._id)}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <DeleteIcon
                        sx={{ cursor: "pointer" }}
                        onClick={() => handleDelete(user._id)}
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
              <Button onClick={() => confirmDelete(deleteuser)}>
                Yes, delete it!
              </Button>
            </DialogActions>
          </DialogContent>
        </Dialog>

        <Dialog
          open={UserOpen}
          onClose={Userhandleclose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">User Detalis</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <p style={{ fontWeight: "bold" }}>
                Username:
                <br />
              </p>
              <p>{UserData.username}</p>
              <p style={{ fontWeight: "bold" }}>
                Number:
                <br />
              </p>
              <p>
                <a
                  href={"tel:+91" + UserData.number}
                  target="_blank"
                  rel="noreferrer"
                >
                  {UserData.number}
                </a>
              </p>
            </DialogContentText>
            <DialogActions>
              <Button onClick={() => setUserOpen(false)}>close</Button>
            </DialogActions>
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
}
