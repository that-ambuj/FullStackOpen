import { useState } from 'react'

const Heading = ({ text }) => (<h1>{text}</h1>)
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)
const Display = ({text, variable}) => (<div>{text} : {variable}</div>)

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  console.log(good)

  return (
  <>
    <Heading text="Give FeedBack" />

    <Button handleClick={() => setGood(good + 1)} text = "Good" />
    <Button handleClick={() => setNeutral(neutral + 1)} text = "Neutral" />
    <Button handleClick={() => setBad(bad + 1)} text = "Bad" />

    <Heading text="Statistics" />

    <Display text="Good" variable={good} />
    <Display text="Neutral" variable={neutral} />
    <Display text="Bad" variable={bad} />
    <Display text="Total" variable={good + bad + neutral} />
    <Display text="Average" variable={(good - bad) / (good+bad+neutral)} />
    <Display text="Positive" variable={(good - bad) / (good+bad+neutral) * 100 + "%"} />
  </>
  )
}

export default App;
