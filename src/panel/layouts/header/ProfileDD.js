import {React, useEffect,useState} from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import { Box, Menu, Typography, Link, ListItemButton, List, ListItemText, Button, Divider,} from "@mui/material";



const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };


  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [user, setUser] = useState({value: null})


  useEffect(() => {
    const myUser = JSON.parse(localStorage.getItem('myUser'))
    myUser &&  fetchUser( myUser.token);
  }, [])



  const fetchUser = async(token) =>{
    // fetch the data from form to makes a file in local system
    const data = { token: token  };
      let res = await fetch(`/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      let response = await res.json()
      setEmail(response.email)
      if(response.firstname){
        setName(response.firstname)
      }
      else{
        setName('Unknown')
      }
  }



  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {name}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
    </>
  );
};

export default ProfileDD;
