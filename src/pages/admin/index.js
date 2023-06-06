// Admin pannel
import { Grid } from "@mui/material";
import FullLayout from "../../panel/layouts/FullLayout";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../panel/theme/theme";
import Allproducts from "./allproducts";
import { useEffect } from "react";
import { useRouter } from "next/router";


export default function Index() {

  const router = useRouter();
  useEffect(() => {
    router.push('admin/allproducts')
  }, [])
  

  return (
    <ThemeProvider theme={theme}>
      <style jsx global>{`
        footer {
          display: none;
        }
      `}</style>
  <FullLayout>

    </FullLayout>
  </ThemeProvider>

  );
}
