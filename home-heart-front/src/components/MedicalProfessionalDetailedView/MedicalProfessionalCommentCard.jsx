import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Avatar} from "@material-ui/core";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(6),
    width: "75%", // Change the width to 80% of the container
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(6), // Increase the avatar size to 48px (theme.spacing(6))
    height: theme.spacing(6),
  },
  content: {
    display: "flex",
    flexDirection: "column",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between", // Align the date to the right
    alignItems: "center",
    marginBottom: theme.spacing(1),
    fontFamily: "Inter, sans-serif",
  },
  commentContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    fontFamily: "Inter, sans-serif",
    width: "90%",
  },
}));


const formatDateDifference = (commentDate) => {
    const currentDate = new Date();
    const postedDate = new Date(commentDate);
    const timeDifference = currentDate.getTime() - postedDate.getTime();
  
    // Calculate time difference in days, weeks, and months
    const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));
    const weeksDifference = Math.floor(daysDifference / 7);
    const monthsDifference = Math.floor(daysDifference / 30);
  
    // Return formatted date difference string
    if (monthsDifference >= 1) {
      return `Date Posted: ${monthsDifference} ${monthsDifference === 1 ? "month" : "months"} ago`;
    } else if (weeksDifference >= 1) {
      return `Date Posted: ${weeksDifference} ${weeksDifference === 1 ? "week" : "weeks"} ago`;
    } else {
        if (daysDifference === 0) {
                return `Date Posted: Today`;
        }
        else {
            return `Date Posted: ${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
        }
    }
  };
  

const MedicalProfessionalCommentCard = ({ comment }) => {
  const classes = useStyles();

  const { date_posted, review_text, rating, first_name, last_name } = comment;

  return (
    <Card className={classes.root}>
      <Avatar className={classes.avatar} src={comment.profile_image} alt={comment.name} />
      <div className={classes.content}>
        <div className={classes.header}>
          <Typography variant="h6">{first_name} {last_name}</Typography>
          <Typography color="textSecondary">
          {formatDateDifference(date_posted)} {/* Use the formatted date here */}
          </Typography>
        </div>
        <Rating className={classes.rating} name="rating" value={comment.rating} precision={0.5} readOnly size="small"/>
        <Typography variant="body1" gutterBottom className={classes.commentContainer}>
          {review_text}
        </Typography>
      </div>
    </Card>
  );
};

export default MedicalProfessionalCommentCard;
