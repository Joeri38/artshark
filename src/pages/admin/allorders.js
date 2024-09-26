import {React, useEffect, useState} from 'react'
import Link from "next/link";
import moment from 'moment/moment';

// Admin pannel
import FullLayout from "../../panel/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../panel/theme/theme";
import { Grid } from "@mui/material";

import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow, Card, CardContent } from "@mui/material";

const BaseCard = (props) => {
  return (
    <Card>
      <Box p={2} display="flex" alignItems="center">
        <Typography variant="h4">{props.title}</Typography>
      </Box>
      <CardContent>{props.children}</CardContent>
    </Card>
  );
};

const OrdersComponent = ({ orders }) => {

  function Cell({ value }) {
    return <TableCell>
      <Typography color="textSecondary" variant="h6">
        {value}
      </Typography>
    </TableCell>
  }

  return (
    <BaseCard title="All Orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            
             <Cell value="Status" />
             <Cell value="Placed on" />
             <Cell value="Name" />
             <Cell value="Amount" />
             <Cell value="Order id" /> 
             <Cell value="Details" />

          </TableRow>
        </TableHead>

        <TableBody>
          {orders.map((order, index) => (
            <TableRow key={order._id}>

              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >{order.deliveryStatus} 
                </Typography>
              </TableCell> 

              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >{moment(order.createdAt).utc().format("DD-MM-YYYY")} 
                </Typography>
              </TableCell> 

              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >{order.name} 
                </Typography>
              </TableCell> 

              <TableCell>
                <Box
                  sx={{
                    
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography
                      color="textSecondary"
                      sx={{
                        fontSize: "13px",
                      }}
                    >
                      €{order.amount}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >#{order.orderId}
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                <Link href={`/adminorder?id=${order._id}`} className='text-[#44B0B7] hover:underline cursor-pointer'>Details</Link>
                </Typography>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </BaseCard>
  );
};

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
            <OrdersComponent orders={orders} />
          </Grid>
        </Grid>

      </FullLayout>
    </ThemeProvider>
  )
}


export default AllOrders