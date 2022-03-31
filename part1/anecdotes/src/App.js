import { useState } from 'react'

const Button = ({ text, onClickFn }) => <button onClick={onClickFn}>{text}</button>

const DayAnecdote = ({ anecdotes, votes, selected, onClickNext, onClickVote }) => { 
  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClickFn={onClickVote} text='vote' />
      <Button onClickFn={onClickNext} text='next anecdote' />
    </div>
  );
};

const MostAnecdote = ({ anecdotes, votes }) => {
  const mostAnecdote = votes.findIndex((el) => el === Math.max( ...votes));
  const mostVotes = votes.find((el) => el === Math.max( ...votes))
  if (mostVotes === 0) {
    return <div>
      <h2>Anectode with most votes</h2>
      <p>No votes yet</p>
    </div>
  }
  return (
    <div>
      <h2>Anectode with most votes</h2>
      <p>{anecdotes[mostAnecdote]}</p>
      <p>has {votes[mostAnecdote]} votes</p>
    </div>
  );
};

//Separate components
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
   
  const votesInitialState = Array.apply(null, new Array(7)).map(Number.prototype.valueOf, 0);

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(votesInitialState);

  const handleNext = () => {
    const min = 0;
    const max = Math.floor(anecdotes.length);
    const newSelected = Math.floor(Math.random() * (max - min) + min);
    setSelected(newSelected);
  };
  
  const handleVotes = () => {
    const newVotes = [ ...votes ];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <DayAnecdote onClickNext={handleNext} onClickVote={handleVotes} anecdotes={anecdotes} votes={votes} selected={selected} />
      <MostAnecdote votes={votes} anecdotes={anecdotes} selected={selected} />
    </div>
  )
}

export default App
