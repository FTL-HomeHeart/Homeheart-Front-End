import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardContent, Typography, Avatar, Grid} from "@material-ui/core";
import Rating from "@mui/material/Rating";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom: theme.spacing(6),
    width: 950,
    padding: theme.spacing(2),
  },
  avatar: {
    margin: theme.spacing(2),
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  header: {
    marginBottom: theme.spacing(1),
    fontFamily: "Inter, sans-serif",
  },
  dateContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
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
      return `${monthsDifference} ${monthsDifference === 1 ? "month" : "months"} ago`;
    } else if (weeksDifference >= 1) {
      return `${weeksDifference} ${weeksDifference === 1 ? "week" : "weeks"} ago`;
    } else {
        if (daysDifference === 0) {
                return `Today`;
        }
        else {
            return `${daysDifference} ${daysDifference === 1 ? "day" : "days"} ago`;
        }
    }
  };
  

const MedicalProfessionalCommentCard = ({ comment }) => {
  const classes = useStyles();

  const { date_posted, review_text, rating, first_name, last_name, review_heading } = comment;



  return (
    <Card className={classes.root}>
      <Avatar className={classes.avatar} src={comment.profile_image} alt={comment.name} />
      <div className={classes.content}>
        <Grid container justifyContent="space-between" alignItems="center" className={classes.header}>
          <Grid item xs={6}>
            <Typography variant="h6">{review_heading}</Typography>
            <Typography>Posted By: {first_name} {last_name}</Typography>
          </Grid>
          <Grid item xs={6} className={classes.dateContainer}>
            <Typography color="textSecondary">
              Date Posted: 
            </Typography>
            <Typography>
              {formatDateDifference(date_posted)}
            </Typography>
          </Grid>
        </Grid>
        <Rating className={classes.rating} name="rating" value={comment.rating} precision={0.5} readOnly size="small" />
        <Typography variant="body1" gutterBottom className={classes.commentContainer}>
          {review_text}
        </Typography>
      </div>
    </Card>
  );
};

export default MedicalProfessionalCommentCard;
