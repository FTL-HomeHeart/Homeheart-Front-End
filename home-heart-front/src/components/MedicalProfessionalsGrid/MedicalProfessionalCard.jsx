import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Bookmark from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';
import Button from '@mui/material/Button';
import { Link as RouterLink } from "react-router-dom"; 


const useStyles = makeStyles((theme) => ({
    learnMore: {
        backgroundColor: "#7693B0",
        fontFamily: 'Inter, sans-serif',
    }, 
    onHover: {
        backgroundColor: "#506d8a",
    }
})); 

export default function MedicalProfessionalCard({ professional }) {


    const classes = useStyles();

    const { name, image, country, language, modality, bio } = professional;

    // TODO: Implement this
    const handleMedicalProfessionalBookmarked = () => {
        console.log("Medical professional bookmarked");
    }


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#768599" }} aria-label="recipe">
            E
          </Avatar>
        }
        title={name}
        subheader={`${country} | ${language} | ${modality}`}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
        alt={`A picture of ${name}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
            {bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
            <Bookmark 
            />
        </IconButton>
        <IconButton aria-label="share"  onClick={handleMedicalProfessionalBookmarked}>
          <ShareIcon />
        </IconButton>
        {/* TODO: Add the correct Route here */}
        <RouterLink to="">
            <Button variant='contained' size="small" className={classes.learnMore}>
                Learn More
            </Button>
        </RouterLink>
      </CardActions>
    </Card>
  );
}