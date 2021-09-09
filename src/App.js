import React from 'react';
import './App.css';
import WeekContainer from './components/WeekContainer';
function App() {
  return (
    <div className="App">
     <WeekContainer/>
     <footer className="text-center p-3">
        Copyright ©{new Date().getFullYear()} <a target="_blank" rel="noopener noreferrer" href="https://uyen.dev/">Natalie Nguyen</a>. All Rights Reserved.
      </footer>
    </div>
  );
}

export default App;
