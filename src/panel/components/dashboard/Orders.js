import {React } from "react";
import Link from "next/link";

import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";


const Orders = ({ orders }) => {


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
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Sr.
              </Typography>
            </TableCell>
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
          {orders.map((order, index) => (
            <TableRow key={order._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >{index + 1} 
                </Typography>
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
                <Typography color="textSecondary" variant="h6">
                <Link href={`/alluserorders?id=${order._id}`} className='text-[#44B0B7] hover:underline cursor-pointer'>Details</Link>
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
