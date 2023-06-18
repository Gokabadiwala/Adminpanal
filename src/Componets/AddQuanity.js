import {
    Box,
    Button,
    FormControl,
    TextField,
    Toolbar,
    Typography,
  } from "@mui/material";
  import React, { useState } from "react";
  import ArrowBackIcon from "@mui/icons-material/ArrowBack";
  import CheckIcon from "@mui/icons-material/Check";
  import axios from "axios";
  import Header from "./Header";
import { useNavigate } from "react-router-dom";
  
  export default function AddQuantity() {
    const navigate = useNavigate();
    const [data, setdata] = useState({
      StartQuantity:"",
      MiddleQuantity:"",
      EndQuantity:""
    });
    const handleChange = (e) => {
      const { name, value } = e.target;
      setdata({ ...data, [name]: value });
    };
    const handleClickfun = async () => {
      console.log("->", data);
      await axios
        .post("https://kabadiwala.cyclic.app/manageQuantity",data)
        .then((res) => {
          const { message } = res.data;
          alert(message);
          setdata({
            StartQuantity:"",
            MiddleQuantity:"",
            EndQuantity:""        
        })
        }).catch((err)=>{
            console.log(err);
        });
    };
    return (
      <>
        <Header />
        <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#F5F5F5" }}>
          <Toolbar />
          <Typography
            variant="h4"
            sx={{
              color: "#4F5256",
              fontWeight: 700,
              fontSize: "24px",
              textAlign: "center",
            }}
          >
            Quantity Management
          </Typography>
  
          <Box
            sx={{
              marginLeft: "50px",
              marginRight: "50px",
              width: "auto",
              height: "auto",
              marginTop: "20px",
              background: "#FFFFFF",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontSize: "35px",
                fontWeight: 400,
                lineHeight: "30px",
                fontFamily: "Roboto",
                padding: "20px",
                textAlign: "center",
              }}
            >
              Add Quantity
            </Typography>
            <Typography
              sx={{ width: "100%", border: "1px solid #F0F0F0" }}
            ></Typography>
            <Typography
              variant="h4"
              sx={{
                padding: "20px",
                color: "#4F5256",
                fontSize: "30px",
                fontWeight: 700,
              }}
            >
              Details
            </Typography>
            <Typography
              sx={{ width: "100%", border: "1px solid #F0F0F0" }}
            ></Typography>
  
            <FormControl
              sx={{
                paddingLeft: "50px",
                paddingRight: "50px",
                marginTop:'10px',
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h6" sx={{ padding: "15px", color: "#4F5256" }}>
              Start Quantity
              </Typography>
              <TextField
                sx={{ width: "75%" }}
                placeholder="ex. Indore Delhi"
                name="StartQuantity"
                value={data.StartQuantity}
                onChange={(e) => handleChange(e)}
              ></TextField>
            </FormControl>
  
            <FormControl
              sx={{
                paddingLeft: "40px",
                paddingRight: "50px",
                paddingTop: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h6" sx={{ padding: "15px", color: "#4F5256" }}>
              Middle Quantity
              </Typography>
              <TextField
                sx={{ width: "75%" }}
                placeholder="MR 10, Vijay Nagar"
                name="MiddleQuantity"
                value={data.MiddleQuantity}
                onChange={(e) => handleChange(e)}
              ></TextField>
            </FormControl>            
            <FormControl
              sx={{
                paddingLeft: "40px",
                paddingRight: "50px",
                paddingTop: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <Typography variant="h6" sx={{ padding: "15px", color: "#4F5256" }}>
              End Quantity
              </Typography>
              <TextField
                sx={{ width: "75%" }}
                placeholder="MR 10, Vijay Nagar"
                name="EndQuantity"
                value={data.EndQuantity}
                onChange={(e) => handleChange(e)}
              ></TextField>
            </FormControl>
  
            <FormControl
              sx={{
                padding: "50px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Button
                onClick={()=>navigate('/QuantityList')}
                size="large"
                variant="outlined"
                sx={{ bgcolor: "#fff", marginRight: "10px", color: "#000" }}
                startIcon={<ArrowBackIcon />}
              >
                Back
              </Button>
              <Button
                size="large"
                variant="outlined"
                sx={{ bgcolor: "#4CAF50", color: "#fff" }}
                startIcon={<CheckIcon />}
                onClick={() => handleClickfun()}
              >
                Submit
              </Button>
            </FormControl>
          </Box>
        </Box>
      </>
    );
  }
  