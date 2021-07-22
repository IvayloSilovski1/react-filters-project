import React from 'react';
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Box,
  makeStyles,
} from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';

const useStyles = makeStyles({
  boxStyle: {
    width: '100%',
    height: '35vh',
    marginTop: '.8em',
  },
  cardHeaderStyle: {
    width: '100%',
    height: '10vh',
    maxHeight: '10vh',
    marginBottom: '0.8em',
    textOverflow: 'ellipsis',
    backgroundColor: '#3f51b5',
    color: '#e8eaf6',
    paddingBottom: '0.4em',
  },
  cardStyle: {
    display: 'block',
    width: 'auto',
    transitionDuration: '0.3s',
    height: '100%',
  },
  descriptionStyle: {
    minHeight: '15vh',
    maxHeight: '15vh',
  },
  ratingStyleStars: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingStyleBadge: {
    marginRight: '0.3em',
    backgroundColor: '#3f51b5',
    color: '#e8eaf6',
  },
});

const CoursesCard = ({ course }) => {
  const classes = useStyles();

  return (
    <Box className={classes.boxStyle}>
      <Card className={classes.cardStyle}>
        <Box className={classes.cardHeaderStyle}>
          <CardHeader
            display='inline'
            avatar={<Avatar />}
            title={<Typography variant='h6'>{course.name}</Typography>}
          />
        </Box>

        <CardContent>
          <Box className={classes.descriptionStyle}>
            <Typography variant='caption'>{course.description}</Typography>
          </Box>
          <Box pt={3} mb={-2}>
            <Grid container>
              <Grid item xs={12} md={8} lg={8}>
                <Grid container className={classes.ratingS}>
                  <Avatar className={classes.ratingStyleBadge}>
                    <Typography variant='h6'>{course.rating}</Typography>
                  </Avatar>
                  <Rating
                    className={classes.ratingStyleStars}
                    value={course.rating}
                    readOnly
                    name={course.rating}
                    size='medium'
                    precision={0.5}
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} md={4} lg={4}>
                <Typography variant='h5' gutterBottom align='right'>
                  ${course.price}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CoursesCard;
