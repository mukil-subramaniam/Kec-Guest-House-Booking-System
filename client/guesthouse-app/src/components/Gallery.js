import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import './Gallery.css';

const Image = styled('img') ({
    width: '300px',
    height: '300px',
    margin: ' 0'
})



function Gallery() {

    const [width, setWidth] = useState(window.innerWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange());
        return () => {
            window.addEventListener('resize', handleWindowSizeChange());
        }
    })




  return (
    <Box id='Gallery' sx={{width: '100%', zIndex: '0', paddingTop: '70px'}}>
        <Grid container sx={{width: '90%', margin: 'auto', padding: 0}} >
            <Typography sx={{fontSize: '40px'}} className='gallery' >Gallery</Typography>
            <Grid container sx={{position: 'relative', zIndex: '0'}} >
                <Carousel autoPlay='true' centerMode='true' infiniteLoop='true' sx={{height: '200px', zIndex: '0'}}
                    centerSlidePercentage={50}
                    showArrows='true'
                    stopOnHover='true'
                    interval={3000}  
                >
                    <Grid item sx={{margin: '5px'}}>
                        <Image src='https://mukil-subramaniam.github.io/Images/gallery2.jpg' />
                    </Grid>
                    <Grid item sx={{margin: '5px'}}>
                        <Image src='https://mukil-subramaniam.github.io/Images/gallery1.jpg' />
                    </Grid>
                    <Grid item sx={{margin: '5px'}}>
                        <Image src='https://images.jdmagicbox.com/comp/perundurai/y6/9999p4294.4294.180226153341.z5y6/catalogue/college-guest-house-perundurai-guest-house-zt97jwz6vr-250.jpg?w=3840&q=75' />
                    </Grid>
                    <Grid item sx={{margin: '5px'}}>
                        <Image src='https://content.jdmagicbox.com/comp/perundurai/y6/9999p4294.4294.180226153341.z5y6/catalogue/college-guest-house-perundurai-guest-house-u2idrt3obb.jpg' />
                    </Grid>
                </Carousel>
            </Grid>
        </Grid>
    </Box>
  ) 
}

export default Gallery;