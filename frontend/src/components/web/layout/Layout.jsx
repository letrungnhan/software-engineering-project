import React from 'react';
import Sidebar from './Sidebar'
import Footer from './Footer'
import { Box } from '@mui/material';

const Layout = (props) => {
    return (
        <Box>
            <Box className='container__sidebar' sx={{ display: { xs: 'none', sm: 'none', md: 'block' } }}>
                <Sidebar />
            </Box>
            <Box className='container__content'
                sx={{
                    position: 'relative',
                    marginLeft: { xs: '0', sm: '0', md: '270px' },
                    padding: { xs: '0', sm: '0', md: '12px' },
                }}
            >
                {props.children}
                <Box sx={{ py: 10 }}>

                </Box>
            </Box>
            <Box className='container__footer'>
                <Footer />
            </Box>
        </Box>
    );
};

export default React.memo(Layout);