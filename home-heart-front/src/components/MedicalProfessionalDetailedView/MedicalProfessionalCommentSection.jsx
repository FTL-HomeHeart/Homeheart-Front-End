import React, { useState } from "react";
import MedicalProfessionalCommentCard from "./MedicalProfessionalCommentCard";
import { Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import axios from "axios";

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
    },
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
  },
}));

const MedicalProfessionalCommentSection = ({
  comments,
  setComments,
  userData,
  medicalProfessionalId,
  handleFetchMedicalProfessionalComments,
}) => {
  const date = new Date();

  let currentDay = String(date.getDate()).padStart(2, "0");
  let currentMonth = String(date.getMonth() + 1).padStart(2, "0");
  let currentYear = date.getFullYear();
  let currentDate = `${currentYear}-${currentMonth}-${currentDay}`;
  console.log("currentDate", currentDate);

  console.log("userData in comment section", userData);
  console.log(
    "medicalProfessionalId in comment section",
    medicalProfessionalId
  );
  const classes = useStyles();
  const [commentsList, setCommentsList] = useState(comments || []);
  const [newComment, setNewComment] = useState({

    heading: "", 
    comment: "",
    rating: 0,
    date: new Date().toISOString().slice(0, 10),
    profile_image: "",
  });

  useEffect(() => {
    setCommentsList(comments);
  });

  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
    console.log("newComment", newComment);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (newComment.heading && newComment.comment && newComment.rating > 0) {
      const newCommentWithId = { ...newComment, user_id: userData, professional_id: medicalProfessionalId, date_post: currentDate};
      console.log("newCommentWithId", newCommentWithId);
      axios.post(`http://localhost:3001/api/post_comment/createUserComment` , newCommentWithId)
      .then((response) => {
        console.log("RESPONSE", response);
        handleFetchMedicalProfessionalComments(); 
      })
      .catch((error) => {
        console.log(error);
      });



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
      {commentsList?.map((comment) => (
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
            label="Subject"
            name="heading"
            value={newComment.heading}
            onChange={handleInputChange}
            required
          />
          <TextField
            className={classes.textField}
            label="Comment"
            name="comment"
            value={newComment.review_text}
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
          <div className={classes.buttonContainer}>
            <Button variant="contained" color="secondary" onClick={toggleFormVisibility} size="small">
              Cancel
            </Button>
            <Button variant="contained" color="primary" type="submit" size="small">
              Submit Comment
            </Button>
          </div>
        </form>

        </div>
      )}
    </div>
  );
};

export default MedicalProfessionalCommentSection;
