import * as React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import Bookmark from "@mui/icons-material/Bookmark";
import { useState } from "react";
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  learnMore: {
      backgroundColor: "#7693B0",
      fontFamily: 'Inter, sans-serif',
  }, 
  onHover: {
      backgroundColor: "#506d8a",
  }
})); 

export default function MedicalProfessionalCard({ professional, userSavedMedicalProfessionals, setUserSavedMedicalProfessionals, userID, handleGetAllSavedMedicalProfessionals }) {
  const [expanded, setExpanded] = useState(false);
  const {
    first_name,
    last_name,
    country,
    language_proficiency,
    rating,
    specialization,
    years_of_experience,
  } = professional;


    const classes = useStyles();


    // TODO: Implement this
    const handleMedicalProfessionalBookmarked = () => {
      // make an axios post request to localhost:3001/api/addSavedProfessional" and send the professional data as a json file
      // console.log("userID", user.userId)

      console.log("professional", professional)
      axios.post("http://localhost:3001/api/saved_professionals/addSavedProfessional", {
        professional: professional, 
        user_id: userID
      }).then((response) => {
        console.log("RESPONSE IN MED PROF CARD", response.data.result);
        // copy over the previous medical professionals and add the new one
        setUserSavedMedicalProfessionals((prev) => [...prev, response.data.result]);
        handleGetAllSavedMedicalProfessionals(); 
      }).catch((error) => {
        console.log(error);
        console.log("error");
      }
      )
    }; 

    

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };


  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#768599" }} aria-label="recipe">
            {first_name?.charAt(0)}
          </Avatar>
        }
        title={first_name + " " + last_name}
        subheader={`${country} `}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://t3.ftcdn.net/jpg/02/60/04/08/360_F_260040863_fYxB1SnrzgJ9AOkcT0hoe7IEFtsPiHAD.jpg"
        alt={`A picture of ${first_name} ${last_name}`}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {specialization} <br />
          Years of experience {years_of_experience} <br />
          Language: {language_proficiency}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" onClick={handleMedicalProfessionalBookmarked}>
          <FavoriteIcon />
        </IconButton>
        <IconButton
        //   onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            Rating {rating}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
    }
