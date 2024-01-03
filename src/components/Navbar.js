import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <header>
      <nav>
        <ul>
          <li><Link to="/">Home Page</Link></li>
          <li><Link to="/flashcards">Flashcards Page</Link></li>
          <li><Link to="/contact">Contact Page</Link></li>
          <li><a href="https://github.com/EhtiramMaharramli?tab=repositories" target="_blank" rel="noopener noreferrer">Github Page</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
