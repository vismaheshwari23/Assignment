import React from 'react';
import CourseList from '../components/CourseList/CourseList.tsx';


function HomePages() {
  return (
    <div style={{
      display: "flex",
      justifyContent: 'center'
    }}>
      <CourseList />
    </div>
  )
}

export default HomePages