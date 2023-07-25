import React from 'react';
import MedicalProfessionalCommentCard from './MedicalProfessionalCommentCard';
import { Typography } from "@material-ui/core";

const MedicalProfessionalCommentSection = ({}) => {
  const sampleComments = [
    {
      id: 1,
      name: "John Doe",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam ultrices. Sed vitae eros quis nisl aliquam ultrices.",
      rating: 4.5,
      date: "2021-10-10",
      profile_image: "https://via.placeholder.com/64", // Replace with the actual image URL
    },
    {
      id: 2,
      name: "Mary Jane",
      comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae eros quis nisl aliquam ultrices. Sed vitae eros quis nisl aliquam ultrices.",
      rating: 4.5,
      date: "2021-10-10",
      profile_image: "https://via.placeholder.com/64", // Replace with the actual image URL
    }
  ];

  return (
    <div>
      {sampleComments.map((comment) => (
        <MedicalProfessionalCommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default MedicalProfessionalCommentSection;
