import { useState } from 'react';

const Heading = ({ text }) => (<h1>{text}</h1>)
const Button = ({handleClick, text}) => (<button onClick={handleClick}>{text}</button>)
const DisplayVotes = ({ variable }) => (<div>has {variable} votes.</div>)


function randInt(max) {
  return Math.floor(Math.random() * max);
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]

  const emptyArray = new Array(anecdotes.length).fill(0);
  
  const [selected, setSelected] = useState(0)
  const [votes, setVote] = useState(emptyArray)

  const voteCopy = [...votes]

  const changeVoteArr = (target) => {
    voteCopy[target] += 1;
    return voteCopy;
  }
  
  const max = Math.max(...votes)
  console.log(votes.indexOf(max))

  return (
    <div>
      <Heading text="Anecdote of the day :" />
      {anecdotes[selected]}
      <DisplayVotes variable={votes[selected]} />
      <Button handleClick={() => {setSelected(randInt(7))}} text="Next Anecdote" />
      <Button handleClick={() => {setVote(changeVoteArr(selected))}} text="vote" />
      
      <Heading text="Anecdote with the most votes :"/>
      {anecdotes[votes.indexOf(max)]}
      <DisplayVotes variable={max} />
    </div>
  )
}

export default App;
