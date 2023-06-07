import {React, useEffect } from "react";
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import {AiFillEdit} from 'react-icons/ai'
import Link from "next/link";


const Products = ({ products }) => {

  return (
    <BaseCard title="All Products">
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
                Title
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Price
              </Typography>
            </TableCell>
            <TableCell>
              <Typography color="textSecondary" variant="h6">
                Edit
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product._id}>
              <TableCell>
                <Typography
                  sx={{
                    fontSize: "15px",
                    fontWeight: "500",
                  }}
                >{product.title} 
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  €{product.price}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  <Link href={`/admin/addproducts?id=${product._id}&editProduct=1`}><AiFillEdit className="text-xl cursor-pointer text-[#44B0B7]"/></Link>
                </Typography>
              </TableCell>
             
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </BaseCard>
  );
};

export default Products;
