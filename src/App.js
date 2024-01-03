import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Introduction from './components/Introduction';
import Contact from './components/Contact';
import Flashcards from './components/Flashcards';
import Projects from './components/Projects'; 
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/flashcards" element={<Flashcards />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}

function HomePage() {
  return (
    <>
      <Introduction />
      <Projects />
    </>
  );
}

export default App;
