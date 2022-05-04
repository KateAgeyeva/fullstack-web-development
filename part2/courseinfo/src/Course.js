const Header = ({ course }) => <h3>{course}</h3>

const Total = ({ sum }) => <h5>Total of {sum} exercises</h5>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Content = ({ parts }) => {
  return (
    <>
    {parts.map((part) => <Part key={part.id} part={part} />)}
    </>
  );
}

  const Course = ({ course }) => {
    const partsExercises = course.parts.map((part) => part.exercises);
    const sumExercises = partsExercises.reduce((s, p) => s + p);
    return (
      <>
        <Header course={course.name} />
        <Content parts={course.parts} />
        <Total
          sum={sumExercises}
        />
      </>
    );
  }

  export default Course;