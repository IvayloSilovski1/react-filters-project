import React from 'react';
import { Avatar, Card, CardHeader, Typography } from '@material-ui/core';

const CoursesCard = ({ course }) => {
  return (
    <Card>
      <CardHeader
        avatar={<Avatar />}
        title={<Typography variant='h6'>{course.name}</Typography>}
      />
    </Card>
  );
};

export default CoursesCard;
