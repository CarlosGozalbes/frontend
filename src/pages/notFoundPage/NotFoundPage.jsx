
import { Box, Divider } from "@mui/material";






function NotFoundPage() {

  return (
   
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Divider />
        <Box style={{ flex: "1",display:"flex",justifyContent:"center",alignItems:"center"}}>
        <img src="/imgs/notFoundPage.png" alt="" />
        </Box>
        <Divider />
       
      </Box>
    
  );
}

export default NotFoundPage;