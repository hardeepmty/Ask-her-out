import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CuteGif from './pages/CuteGif';
import DatePlanner from './pages/DatePlanner';
import SeeU from './pages/SeeU';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<CuteGif/>} />
        <Route path="/dateplanner" element={<DatePlanner/>} />
        <Route path='/seeu' element={<SeeU/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
