import React from "react";
import CourseCard from "./courseCard";
import { courses } from '../data/courseCategories';

const CourseList = ({ showAll }) => {
  const displayedCourses = showAll ? courses : courses.slice(0, 4);

  return (
    <>
      {displayedCourses.map((course) => (
        <CourseCard
          key={course.id}
          courseId={course.id}
          name={course.name}
          description={course.description}
          price={course.price}
          image={course.image}
          videos={course.videos}
        />
      ))}
    </>
  );
};

export default CourseList;
