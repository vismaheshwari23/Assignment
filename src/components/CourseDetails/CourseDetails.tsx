import React from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails: React.FC = () => {
  const { id } = useParams();

  console.log(id);

  return (
    <div>
      <div className="course-name">Course Responsive Design</div>
    </div>
  );
};

export default CourseDetails;
