import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Avatar} from "@material-ui/core";
import { Rating }  from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(2),
  },
  avatar: {
    marginRight: theme.spacing(2),
  },
}));

const MedicalProfessionalCommentCard = ({ comment }) => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <Avatar className={classes.avatar} src={comment.profile_image} alt={comment.name} />
      <CardContent>
        <Typography variant="h6" component="h2">
          {comment.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          {comment.date}
        </Typography>
        <Rating name="rating" value={comment.rating} precision={0.5} readOnly />
        <Typography variant="body1" gutterBottom>
          {comment.comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MedicalProfessionalCommentCard;
