import styled from '@emotion/styled';
import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; 
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
                        <Image src='https://media.istockphoto.com/id/472685832/photo/quaint-old-homes.jpg?s=612x612&w=0&k=20&c=IybBikwB9emkVhkGnpgDPKfbsrvYUYDa7s8_tJ-E4M4=' />
                    </Grid>
                    <Grid item sx={{margin: '5px'}}>
                        <Image src='https://r1imghtlak.mmtcdn.com/f9b0d920db1f11ebb5d20242ac110008.jpg' />
                    </Grid>
                    <Grid item sx={{margin: '5px'}}>
                        <Image src='https://www.thespruce.com/thmb/8LfwAwzhlhzgUETbLbiImOPFz4w=/2048x0/filters:no_upscale():max_bytes(150000):strip_icc()/guest-house-ideas-4687692-hero-6e644bf8c71e437896ce29be516d5dc9.jpg' />
                    </Grid>
                    <Grid item sx={{margin: '5px'}}>
                        <Image src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFsTUndNuJJH67EV4t7uaSHQtjjk8PIitV7A&s' />
                    </Grid>
                </Carousel>
            </Grid>
        </Grid>
    </Box>
  ) 
}

export default Gallery;