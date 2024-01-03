import React from 'react';
import './Projects.css';

function Projects() {
  return (
    <div className="projects-section">
      <h2>Projects:</h2>
      <p>These are projects that I have done so far for Web & Mobile I course:</p>
      <ul>
        <li>
          <strong>Assignment 1:</strong> Portfolio Project
          <p>
            This project is a personal portfolio showcasing my skills and projects. You can view it
            <button>
              <a
                href="https://ehtirammaharramli.github.io/Web_Mobile1_Assignment1/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Portfolio Project
              </a>
            </button>
            .
          </p>
        </li>

        <li>
          <strong>Assignment 2:</strong> Products Project
          <p>
            The second assignment involves creating a Products Project. Explore the project:
            <button>
              <a
                href="https://ehtirammaharramli.github.io/Web_Mobile1_Assignment2/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Products Project
              </a>
            </button>
            .
          </p>
        </li>

        <li>
          <strong>Assignment 3:</strong> Flashcards Project
          <p>
            In Assignment 3, I developed a Flashcards Project for effective learning. Check it out:
            <button>
              <a
                href="https://ehtirammaharramli.github.io/Web_Mobile1_Assignment3/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Flashcards project
              </a>
            </button>
            .
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Projects;
