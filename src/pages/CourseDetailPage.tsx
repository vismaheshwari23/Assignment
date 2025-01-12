import React from 'react';
import { useParams } from 'react-router-dom';

interface CourseDetailPageParams {
  id: string;
}

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<CourseDetailPageParams>();

  return (
    <div>
      <h1>Course Details Page</h1>
      <p>Course ID: {id}</p>
    </div>
  );
};

export default CourseDetailPage;
