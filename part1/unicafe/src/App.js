import { useState } from 'react';

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>{text}</button>
);

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}


const GiveFeedback = ({ handleGood, handleNeutral, handleBad }) => {
  return (
    <div>
      <Button text="good" onClick={handleGood} />
      <Button text="neutral" onClick={handleNeutral} />
      <Button text="bad" onClick={handleBad} />
    </div>
  );
}

const Statistics = (props) => {
  const good = props.good;
  const neutral = props.neutral;
  const bad = props.bad;
  const feedbackAll = props.feedbackAll;

  const all = good + neutral + bad;
  const avg = Math.round((feedbackAll.reduce((a, b) => a + b, 0) / feedbackAll.length) * 10) / 10;
  const positive = Math.round(((good /all) * 100) * 10) / 10 + ' %';

  if (all < 1) {
    return <p>No feedback given</p>;
  }
  return (
    <table>
      <tbody>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={all} />
        <StatisticLine text='average' value={avg} />
        <StatisticLine text='positive' value={positive} />
      </tbody>
    </table>
  );
};

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbackAll, setFeedbackAll] = useState([]);

  const goodClick = () => {
    setGood(good + 1);
    setFeedbackAll(feedbackAll.concat(1));
  };
  const neutralClick = () => {
    setNeutral(neutral + 1);
    setFeedbackAll(feedbackAll.concat(0));
  };
  const badClick = () => {
    setBad(bad + 1);
    setFeedbackAll(feedbackAll.concat(-1));
  };

  return (
    <div>
      <h2>give feedback</h2>
      <GiveFeedback handleGood={goodClick} handleBad={badClick} handleNeutral={neutralClick} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} feedbackAll={feedbackAll} />
    </div>
  )
}

export default App