import { Box, Divider } from "@mui/material";
import Footer from "../landingPage/components/Footer";
import UserTable from "./components/UserTable";


function AdminDashboardPage() {
 
    return (
                <Box
                style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
            >
             
                <Divider />
                <Box style={{ flex: "1" }}>
                  
                    <UserTable/>
                 </Box>
                <Divider />
                <Footer />
            
            </Box>
        
    );
}

export default AdminDashboardPage;