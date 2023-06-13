import {React, useEffect, useState } from "react";
import { Typography, Box, Table, TableBody, TableCell, TableHead, TableRow,} from "@mui/material";
import BaseCard from "../baseCard/BaseCard";
import {AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai'
import Link from "next/link";


const Products = ({ products }) => {


  const deleteProduct = async(id)=>{

    const data = { id , path: 'deleteProducts' };
    let res = await fetch(`/api/deleteProducts`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    let response = await res.json()

    if (response.success === true) {
      window.location.reload();
    }
    else {
      toast.error(response.message , { position: "bottom-center", autoClose: 1000, hideProgressBar: false, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "light", });
    }
    
  }

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
                Sr.
              </Typography>
            </TableCell>
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
                Edit / Delete
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

        {products.length == 0 && <h1 className='text-[#44B0B7] mt-4 font-semibold text-sm'>No Product Found!</h1>}
          {products.map((product, index) => (
            
            <TableRow key={index}>
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
                  >{product.title} 
                </Typography>
              </TableCell>

              <TableCell>
                <Typography color="textSecondary" variant="h6">
                  €{product.price}
                </Typography>
              </TableCell>
              


              <TableCell>
                <Typography className="flex" color="textSecondary" variant="h6">
                    <Link href={`/admin/addproducts?id=${product._id}&editProduct=1`}><AiOutlineEdit className="text-xl cursor-pointer text-[#44B0B7]"/></Link>
                  <button onClick={()=>deleteProduct(product._id)}><AiOutlineDelete className="text-xl ml-5 cursor-pointer text-[#44B0B7]"/></button>
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
