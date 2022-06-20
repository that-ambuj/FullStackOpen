import { useState } from 'react'

const Heading = ({ text }) => (<h1>{text}</h1>)
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)
const StatsDisplay = ({text, variable}) => (<tr><td>{text + " :"}</td><td>{variable}</td></tr>)

const Statistics = ({good, neutral, bad}) => {
  if(good+bad+neutral !== 0) {
    return (
    <>
      <Heading text="Statistics" />

      <StatsDisplay text="Good" variable={good} />
      <StatsDisplay text="Bad" variable={bad} />
      <StatsDisplay text="Neutral" variable={neutral} />
      <StatsDisplay text="Total" variable={good + bad + neutral} />
      <StatsDisplay text="Average" variable={(good - bad) / (good+bad+neutral)} />
      <StatsDisplay text="Positive" variable={(good - bad) / (good+bad+neutral) * 100 + "%"} />
    </>
    )
  }
  return (<><Heading text="Statistics" /><div>No feedback available.</div></>)
}

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
  <>
    <Heading text="Give FeedBack" />

    <Button handleClick={() => setGood(good + 1)} text = "Good" />
    <Button handleClick={() => setNeutral(neutral + 1)} text = "Neutral" />
    <Button handleClick={() => setBad(bad + 1)} text = "Bad" />

    <Statistics good={good} neutral={neutral} bad={bad} />
  </>
  )
}

export default App;
