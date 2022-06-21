import React from 'react'

const Header = ({ text }) => {
    return (
        <><h1>{text}</h1></>
    )
}

const Part = ({ name, exercises }) => (
    <li> {name} : {exercises} </li>
)

const Total = ({ arrayOfObjects }) => {
    const total = arrayOfObjects.map(obj => obj.exercises).reduce((a, b) => (a + b))

    return (
        <div>has a total of {total} exercises</div>
    )
}


const Course = ({ course }) => {
    const { name, parts } = course;

    return (<>
        <Header text={name} />
        <ul>
            {parts.map(part => (<Part {...part} key={part.id} />))}
        </ul>
        <Total arrayOfObjects={parts} />
    </>
    )
}


export default Course