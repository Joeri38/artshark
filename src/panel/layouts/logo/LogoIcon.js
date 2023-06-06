import React from "react";
import { Link } from "@mui/material";

const LogoIcon = () => {
  return (
    <Link href="/" className="no-underline flex items-center">
      <img className="h-8 w-auto mr-3" src="/logo.png" alt=""/>
    </Link>
  );
};

export default LogoIcon;
