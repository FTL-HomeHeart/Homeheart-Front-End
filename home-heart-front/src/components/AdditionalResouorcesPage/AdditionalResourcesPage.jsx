import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Container, Box, Typography} from '@material-ui/core';
import AdditionalResourceCard from './AdditionalResourceCard';

const useStyles = makeStyles((theme) => ({
    banner: {
        backgroundColor: "#768599",
        padding: "40px",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
        marginBottom: "50px",
    }, 
    bannerHeader: {
        width: "60%", 
        color: "#fff", 
        margin: "0 auto",
        fontSize: "40px",
        marginBottom: "20px",
    }, 
    bannerSubHeading: {
        fontSize: "18px", 
        color: "#fff", 
        width: "50%",
        margin: "0 auto",
    }
}));


const BannerComponent = () => {

    const classes = useStyles();

    return (
        <Box
            className={classes.banner}
        >
            <Box>
                <Typography gutterBottom className={classes.bannerHeader}>
                    We all need help sometime. You are not alone.
                </Typography>
                <Typography variant="body1" gutterBottom className={classes.bannerSubHeading}>
                    It's okay to not feel okay. We all feel sad, anxious, upset, or angry sometimes, If you, your family or friends are feeling overwhelmed or need someone to talk to, contact one of the resources below.
                </Typography>
            </Box>
        </Box>
    )
}


const AdditionalResourcesPage = () => {

    const resourceArray = [
        {
            id: 1, 
            title: "Suicide & Crisis Lifeline",
            description: "If you or someone you know is experiencing a mental health or substance use-related crisis, the Lifeline network is available 24/7.",
            link: "https://988lifeline.org/talk-to-someone-now/", 
            phone_number: "988",
        }, 
        {
            id: 2, 
            title: "Youth Crisis Line", 
            description: "A  24/7 statewide emergency response system for youth (ages 12-24) and families in crisis.", 
            link: "https://calyouth.org/cycl/?msclkid=0eda4849c49611ec81da466015948c61", 
            phone_number: "800-843-5200",
        }, 
        {
            id: 3, 
            title: "CalHOPE", 
            description: "CalHope offers safe, secure, and culturally sensitive emotional support for all Californians who have experienced emotional challenges.", 
            link: "https://www.calhope.org/",
            phone_number: "1-833-317-4673",
        }, 
        {
            id: 4, 
            title: "The Trevor Project", 
            description: "The Trevor Project provides free and confidential information and support to LGBTQ young people 24/7, all year round. You can connect to a crisis counselor via chat, phone or text message. ",
            link: "https://www.thetrevorproject.org/", 
            phone_number: "",  
        }, 
        {
            id: 5, 
            title: "Teen Line", 
            description: "Feeling unwell? Lonely? Scared? When you call or text Teen Line, another teen will be there to listen and help. No issue is too big or too small. ", 
            link: "https://www.teenline.org/youth", 
            phone_number: "", 
        }, 
        {
            id: 6, 
            title: "Local Help & Support",
            description: "If you want help connecting to a mental health professional, you can find resources based in the county where you live.", 
            link: "https://www.catalyst-center.org/resources",
        }, 
        {
            id: 7, 
            title: "24/7 Warm Line",
            description: "Talk to someone about anything that is bothering you – whether it be relationships, finances, anxiety, sadness or other challenges.",
            Link: "https://www.mentalhealthsf.org/peer-run-warmline/", 
            phone_number: "855-845-7415",
        }, 
        {
            id: 8, 
            title: "Know the Signs", 
            description: "Help prevent suicide by learning about the warning signs, how to offer help, and find local resources.",
            link: "https://www.suicideispreventable.org/", 
            phone_number: "",
        }, 
        {
            id: 9, 
            title: "Wellness Education Lab", 
            description: "WEL guides students (13+) through evidence-based content offering practical skills to improve mental health and resilience.", 
            link: "https://wellnessedlab.org/", 
            phone_number: "", 
        },
    ];
    
    return (
        <div>
            <BannerComponent /> 
            <Container>
                <Grid container spacing={2}>
                    {resourceArray.map((resource) => (
                        <Grid item xs={12} sm={6} md={4} key={resource.id}>
                            <AdditionalResourceCard
                                title={resource.title}
                                description={resource.description}
                                link={resource.link}
                                phone_number={resource.phone_number}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

export default AdditionalResourcesPage; 