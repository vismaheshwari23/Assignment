import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams();
  console.log(id, 'hello i am testing')

  return (
    <div>
      <h1>Course Details Page</h1>
      <p>Course ID: {id}</p>
    </div>
  );
};

export default CourseDetailPage;
