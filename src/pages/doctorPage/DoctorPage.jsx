
import { Box, Divider } from '@mui/material';

import Footer from '../landingPage/components/Footer';
import InfoDoctor from './components/InfoDoctor';

function DoctorPage() {
 
    return (
     
        <Box
          style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
        >

          <Divider />
          <Box style={{ flex: "1" }}>
                     <InfoDoctor />
          </Box>
          <Divider />
          <Footer />
        </Box>
     
    );
}

export default DoctorPage