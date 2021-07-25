import { useState, useEffect, useRef } from 'react'
import './App.css';

function App() {
  const [time, setTime] = useState(0)
  const [timerOn, setTimerOn] = useState(false)
  const countRef = useRef(null)

  // this will run when the components render
  useEffect(() => {
    // let interval = null; // gonna be the same hook when we turn it off and on

    if (timerOn) {
      countRef.current = setInterval(() => {
        // console.log("Running")
        setTime(prevTime => prevTime + 10) // prevTime is arbituary
      }, 10)
    } else{
      clearInterval(countRef.current)
    }

    // clean up function, when the component gets unmounted/user leaves page
    // prevents memory leaks
    return () => clearInterval(countRef.current)

  }, [timerOn]) // if timerOn changes, it will run

  console.log(time)

  return (
    <div className="App">
      <div>

        {/* Minutes */}
        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>

        {/* seconds */}
        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}:</span>


        {/* modulo since when it goes to 100, we want it to go back to 0 
          Slice removes if there is more than 2 digits. So the 0 will go away
        */}
        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
      </div>
      <div>

        {!timerOn && time === 0 && (
          <button onClick={ () => setTimerOn(true) }>Start</button>
        )}

        {timerOn && (
          <button onClick={ () => setTimerOn(false) }>Stop</button>
        )}

        {!timerOn && time !== 0 && (
          <button onClick={ () => setTimerOn(true) }>Resume</button>
        )}
        
        {!timerOn && time > 0 && (
          <button onClick={ () => setTime(0) }>Reset</button>
        )}
        
      </div>
      
    </div>
  );
}

export default App;
