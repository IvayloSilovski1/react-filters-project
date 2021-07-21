import React from 'react';
import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CoursesCard from './../components/CoursesCard';

const useStyles = makeStyles({
  root: {
    marginTop: 20,
  },
  loader: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paper: {
    marginBottom: '1rem',
    padding: '13px',
  },
  filters: {
    padding: '0 1.5rem',
  },
  priceRangeInputs: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const CoursesPage = () => {
  const classes = useStyles();

  // component state
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // side effects
  // load all data, when the component is rendered
  useEffect(() => {
    let cancel;

    const fetchData = async () => {
      try {
        setLoading(true);
        const { data } = await axios({
          method: 'GET',
          url: `/api/courses/`,
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        });
        setCourses(data.data);
        setLoading(false);
        console.log('Data is fetched');
      } catch (error) {
        console.log(error);
        console.log('Data is NOT fetched');
      }
    };

    fetchData();
  }, []);

  return (
    <Container className={classes.root}>
      {/* 1. Filter and sort data */}

      {/* 2. List the data */}
      <Grid container spacing={2}>
        {loading ? (
          <div className={classes.loader}>
            <CircularProgress size='4rem' thickness={5} />
          </div>
        ) : (
          courses.map((course) => (
            <Grid item key={course._id} xs={12} sm={6} md={4} lg={3}>
              <CoursesCard course={course} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
};

export default CoursesPage;
