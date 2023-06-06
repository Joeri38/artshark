import {React } from "react";
import Link from "next/link";

import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";


const Orders = ({ orders }) => {


  return (
    <BaseCard title="orders">
      <Table
        aria-label="simple table"
        sx={{
          mt: 3,
          whiteSpace: "nowrap",
        }}
      >
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Order Id
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Amount
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Details
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order._id}>
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
                      $ {order.amount}
                    </Typography>
                  </Box>
                </Box>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                <Link href={`/alluserorders?id=${order._id}`} className='text-blue-600 underline cursor-pointer' >Details</Link>
                </Typography>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default Orders;
