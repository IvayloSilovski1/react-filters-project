import React from 'react';
import { Container } from '@material-ui/core';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const CoursesPage = () => {
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
    <Container>
      {/* 1. Filter and sort data */}

      {/* 2. List the data */}
    </Container>
  );
};

export default CoursesPage;
