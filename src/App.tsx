import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [val, setVal] = useState(0)

  useEffect(() => {
    setInterval(() => {
      setVal(prevVal => prevVal)
    }, 1000)
  }, [])
  
  console.log(val)
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
