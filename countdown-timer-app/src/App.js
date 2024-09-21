import React from 'react';
import CountdownTimer from './CountdownTimer';

const App = () => {
  // Set the target time (in milliseconds since epoch)
  const targetTime = Date.now() + 1000 * 60 * 60 * 24; // Countdown for 1 day from now

  return (
    <div className="App">
      <CountdownTimer targetTime={targetTime} />
    </div>
  );
};

export default App;
