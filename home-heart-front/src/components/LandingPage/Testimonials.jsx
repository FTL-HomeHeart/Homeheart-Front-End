import React from "react"; 
import {
    Typography,
    Divider, 
    Grid, 
    Avatar
} from "@mui/material";



const Testimonials = () => {

    const userTestimonials = [
        {
            id: 1,
            name: "John Doe",
            image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg", 
            text: ""
        }, 
        {
            id: 2, 
            name: 'Mary Jane', 
            image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg", 
            text: ""
        }, 
        {
            id: 3, 
            name: "Jane Doe",
            image: "https://t3.ftcdn.net/jpg/02/99/04/20/360_F_299042079_vGBD7wIlSeNl7vOevWHiL93G4koMM967.jpg", 
            text: ""
        }
    ];

    return (
        <div style={{ textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Testimonials
        </Typography>
        <Divider style={{ backgroundColor: 'grey', width: 'fit-content', margin: '0 auto' }} />
        <Typography variant="h6" gutterBottom>
          Hear from our users about their experiences with HomeHeart
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          {userTestimonials.map(testimonial => (
            <Grid item key={testimonial.id}>
              <img src={testimonial.image} alt={testimonial.name} style={{ width: '100%', height: 'auto' }} />
              <Typography variant="subtitle1" gutterBottom>
                {testimonial.name}
              </Typography>
              <Typography variant="body1">{testimonial.text}</Typography>
            </Grid>
          ))}
        </Grid>
      </div>
    );

};

export default Testimonials; 

