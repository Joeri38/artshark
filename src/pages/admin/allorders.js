import {React, useEffect, useState} from 'react'
import Orders from '../../panel/components/dashboard/Orders';

// Admin pannel
import FullLayout from "../../panel/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../panel/theme/theme";
import { Grid } from "@mui/material";

function AllOrders() {

  const [orders, setOrders] = useState([])
  
  useEffect(() => {

    // fetch the data from form to makes a file in local system
    const fetchOrder = async ()=>{
      let res = await fetch(`/api/allorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: JSON.parse(localStorage.getItem('myUser')).token }),
        })
        let response = await res.json()
        setOrders(response.orders)
      }

    if(!localStorage.getItem('myUser')){
      router.push('/')  
    }
    else{
      fetchOrder();
    }
      
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <FullLayout>

        {/* Hide footer */}
        <style jsx global>{`
            footer {
              display: none;
            }
          `}
        </style>

        <Grid container spacing={0}>
          <Grid item xs={12} lg={12}>
            <Orders orders={orders} />
          </Grid>
        </Grid>

      </FullLayout>
    </ThemeProvider>
  )
}


export default AllOrders