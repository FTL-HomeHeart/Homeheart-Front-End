import React, { useState } from "react";
import MedicalProfessionalCommentCard from "./MedicalProfessionalCommentCard";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  commentSectionContainer: {
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  formContainer: {
    width: "100%",
    maxWidth: "400px",
    marginTop: theme.spacing(2),
    // display: "none", // Hide the form by default
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "5rem",
  },
  textField: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  suggestComment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "1rem",
    fontFamily: "Inter, sans-serif",
    marginTop: "2rem",
    marginBottom: "5rem",
  },
  showFormButton: {
    marginTop: theme.spacing(2),
    backgroundColor: "#7693B0",
    color: "#FFFFFF",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "#4777b8",
    }
  },
}));

const MedicalProfessionalCommentSection = ({ comments: initialComments }) => {
  const classes = useStyles();
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState({
    name: "",
    comment: "",
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    profile_image: "",
  });
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (newComment.name && newComment.comment && newComment.rating > 0) {
      const newCommentWithId = { ...newComment, id: Date.now() };
      setComments((prevComments) => [...prevComments, newCommentWithId]);
      setNewComment({
        name: "",
        comment: "",
        rating: 0,
        date: new Date().toISOString().slice(0, 10),
        profile_image: "",
      });
      setShowForm(false); // Hide the form after submission
    }
  };

  const toggleFormVisibility = () => {
    setShowForm(!showForm);
    console.log("showForm", showForm);
  };

  return (
    <div className={classes.commentSectionContainer}>
      {comments.map((comment) => (
        <MedicalProfessionalCommentCard key={comment.id} comment={comment} />
      ))}
      {!showForm && (
        <div className={classes.suggestComment}>
          <Typography variant="h6">
            <strong>Review this medical professional</strong>
          </Typography>
          <Typography variant="body1">
            Help others by sharing your experience!
          </Typography>
          <Button
            className={classes.showFormButton}
            variant="contained"
            onClick={toggleFormVisibility}
          >
            Write a review
        </Button>
        </div>
      )}
      {showForm && (
        <div className={classes.formContainer}>
          <form onSubmit={handleFormSubmit}>
          <TextField
            className={classes.textField}
            label="Name"
            name="name"
            value={newComment.name}
            onChange={handleInputChange}
            required
          />
          <TextField
            className={classes.textField}
            label="Comment"
            name="comment"
            value={newComment.comment}
            onChange={handleInputChange}
            required
            multiline
            // rows={4}
          />
          <TextField
            className={classes.textField}
            label="Rating"
            name="rating"
            type="number"
            value={newComment.rating}
            onChange={handleInputChange}
            inputProps={{
              min: 0,
              max: 5,
              step: 0.5,
            }}
            required
          />
          <Button variant="contained" color="secondary" onClick={toggleFormVisibility}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" type="submit">
            Submit Comment
          </Button>
        </form>
        </div>
      )}
    </div>
  );
};

export default MedicalProfessionalCommentSection;