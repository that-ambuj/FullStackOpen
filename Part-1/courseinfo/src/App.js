const course = 'Half Stack application development'
const part1 = 'Fundamentals of React'
const exercises1 = 10
const part2 = 'Using props to pass data'
const exercises2 = 7
const part3 = 'State of a component'
const exercises3 = 14




const Header = (props) => {
  return (
    <><h1>{props.course}</h1></>
  )
}

const Part = (props) => {
  return (
    <><p>{props.part} : {props.exercise} </p></>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <div>
      <p>{props.part} : {props.exercises}</p>
    </div>
  )
}

const Total = () => {
  return (
    <><p>Number of exercises = {exercises1 + exercises2 + exercises3}</p></>
  )
}

function App() {
  const course = 'Half Stack application development'
  const parts = [
    {
      part : 'Fundamentals of React',
      exercises : 10
    },
    {
      part : 'Using props to pass data',
      exercises : 7
    },
    {
      part : 'State of a component',
      exercises : 14
    }
  ]

  return (
    <>
      <Header course={course} />
      <Content part={parts[0].part} exercises={parts[0].exercises}/>
      <Content part={parts[1].part} exercises={parts[1].exercises}/>
      <Content part={parts[2].part} exercises={parts[2].exercises}/>
      <Total />
    </>
  );
}

export default App;
