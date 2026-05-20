import coursesData from "./courses.json";

export const courses = coursesData;

export const popularCourses = [...courses]
  .sort((a, b) => b.rating - a.rating)
  .slice(0, 3);

export const trendingCourses = courses.filter((course) =>
  ["Development", "Productivity", "Data"].includes(course.category)
);
