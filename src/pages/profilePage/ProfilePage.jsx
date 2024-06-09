
import { Box, Divider } from "@mui/material";
import Footer from "../landingPage/components/Footer";

import ProfileInfo from "./components/ProfileInfo";



function ProfilePage() {

  return (
   
      <Box
        style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
      >
        <Divider />
        <Box style={{ flex: "1"}}>
         <ProfileInfo />
        </Box>
        <Divider />
        <Footer />
      </Box>
   
  );
}

export default ProfilePage;
