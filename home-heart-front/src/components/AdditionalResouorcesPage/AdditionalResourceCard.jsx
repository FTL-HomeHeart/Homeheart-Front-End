import React from "react"; 
import { Card, CardContent, Typography, Button } from "@material-ui/core";


const AdditionalResourceCard = ({ title, description, link, phone_number }) => {
    return (
        <Card style={{ height: "100%" }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography color="textSecondary">
                    {description}
                </Typography>
                {link && (
                    <Button color="primary" href={link} target="_blank">
                        Visit Website
                    </Button>
                )}
                {phone_number && (
                    <Button color="primary" href={`tel:${phone_number}`}>
                        Call: {phone_number}
                    </Button>
                )}
            </CardContent>
        </Card>
    );
};

export default AdditionalResourceCard;