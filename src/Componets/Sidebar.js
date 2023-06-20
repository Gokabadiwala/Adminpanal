import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { useNavigate } from "react-router-dom";

//icons
import ApartmentIcon from "@mui/icons-material/Apartment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import FaceIcon from "@mui/icons-material/Face";

export default function Sidebar() {
  const navigate = useNavigate();
const Logout=()=>{
  localStorage.removeItem('login');
  navigate('/')
}
  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: 300,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 300, boxSizing: "border-box" },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            <ListItem sx={{ height: 130, flexDirection: "column" }}>
              <ListItemIcon>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  height="64px"
                  width="60px"
                  alt="profileImg"
                />
                <br></br>
              </ListItemIcon>
              <Typography sx={{ fontSize: "14px", color: "#6C7177" }}>
                Welcome
              </Typography>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/Users')}>
                <ListItemIcon>
                  <FaceIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText sx={{ fontSize: "14px" }} primary="Users" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/Orders')}>
                <ListItemIcon>
                  <AttachMoneyIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Order Transaction"
                />
              </ListItemButton>
            </ListItem>
            
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/OrderCancle')}>
                <ListItemIcon>
                  <AttachMoneyIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Order Cancle"
                />
              </ListItemButton>
            </ListItem>


            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/RateList')}>
                <ListItemIcon>
                  <ApartmentIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Rate List"
                />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/AddressList')}>
                <ListItemIcon>
                  <ApartmentIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Address"
                />
              </ListItemButton>
            </ListItem>            
            <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/QuantityList')}>
                <ListItemIcon>
                  <ApartmentIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="QuantityList"
                />
              </ListItemButton>
            </ListItem>
          <ListItem disablePadding>
              <ListItemButton onClick={()=>navigate('/TimeSlot')}>
                <ListItemIcon>
                  <ApartmentIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Time Slot"
                />
              </ListItemButton>
            </ListItem>          
            <ListItem disablePadding>
              <ListItemButton onClick={Logout}>
                <ListItemIcon>
                  <ApartmentIcon sx={{ color: "#6945FF" }} />
                </ListItemIcon>
                <ListItemText
                  sx={{ fontSize: "14px" }}
                  primary="Logout"
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
