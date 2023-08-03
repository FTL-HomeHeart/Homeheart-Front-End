import React from "react"; 
import { useState, useEffect } from "react"; 
import { makeStyles } from "@material-ui/core/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  learnMore: {
    background: "#7693B0",
    fontFamily: "Inter, sans-serif",
    color: "#FFFFFF",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#4777b8",
    },
  },
}));

export default function MedicalProfessionalCard({
  professional,
  user, 
  userSavedMedicalProfessionals, 
  setUserSavedMedicalProfessionals,
  handleGetAllSavedMedicalProfessionals,
}) {
  const [expanded, setExpanded] = useState(false);
  const {
    first_name,
    last_name,
    country,
    language_proficiency,
    rating,
    specialization,
    years_of_experience,
    image,
    professional_id,
  } = professional;
  const [isFavorited, setIsFavorited] = useState(false);  

  const findIfProfessionalIsFavorited = () => {
    // check if the professional is in the userSavedMedicalProfessionals array
    // if it is, then set the isFavorited state to true
    const foundProfessional = userSavedMedicalProfessionals?.find((professional) => professional.professional_id === professional_id)
    if (foundProfessional) {
      setIsFavorited(true)
    }
  }

  useEffect(() => {
    findIfProfessionalIsFavorited()
  })

    const classes = useStyles();
    const id = localStorage.getItem("userId");
  // TODO: Implement this
  const handleMedicalProfessionalBookmarked = () => {
    // make an axios post request to localhost:3001/api/addSavedProfessional" and send the professional data as a json file

    axios
      .post(
        "http://localhost:3001/api/saved_professionals/addSavedProfessional",
        {
          professional_id: professional_id,
          user_id: id,
          saved_status: "saved",
        }
      )
      .then((response) => {
        // copy over the previous medical professionals and add the new one
        setUserSavedMedicalProfessionals((prev) => [
          ...prev,
          response.data.result,
        ]);
        handleGetAllSavedMedicalProfessionals();
      })
      .catch((error) => {
        console.log("error:", error);
      });
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
        image={image}
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
        <IconButton
          aria-label="add to favorites"
          onClick={handleMedicalProfessionalBookmarked}
          style={{ color: isFavorited ? "#768599" : "#585858" }}
        >
          <FavoriteIcon />
        </IconButton>
        <Button
          component={Link}
          to={`/professional_details/${professional.professional_id}`}
          variant="contained"
          size="small"
          className={classes.learnMore}
        >
          <Typography variant="body2">Learn more</Typography>
        </Button>
      </CardActions>
    </Card>
  );
}
