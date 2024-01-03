import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Flashcards.css';

const Flashcards = () => {
  const [footballData, setFootballData] = useState([]);
  const [flippedCardId, setFlippedCardId] = useState(null);
  const [srch, setSrch] = useState('');
  const [slctdStatus, setSlctdStatus] = useState('All');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const [editingCardId, setEditingCardId] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [editedStatus, setEditedStatus] = useState('');

  const [sortAttribute, setSortAttribute] = useState('lastModification');
  const [sortOrder, setSortOrder] = useState('desc');
  const [isAddCardFormOpen, setIsAddCardFormOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cards');
        const sortedData = response.data.sort((a, b) => {
          return sortOrder === 'desc'
            ? new Date(b[sortAttribute]) - new Date(a[sortAttribute])
            : new Date(a[sortAttribute]) - new Date(b[sortAttribute]);
        });
        setFootballData(sortedData.map((card) => ({ ...card, flipped: false })));
        console.log('Fetched and sorted data:', sortedData);
      } catch (error) {
        console.error('Error fetching football data:', error);
      }
    };

    fetchData();
  }, [sortAttribute, sortOrder]);

  const handleInputChange = (event, setStateFunc) => {
    setStateFunc(event.target.value);
  };

  const handleAddFlashcard = async () => {
    try {
      const response = await axios.post('http://localhost:3000/cards', {
        question: newQuestion,
        answer: newAnswer,
        status: newStatus,
        lastModification: new Date().toISOString(),
      });
      setFootballData([{ ...response.data, flipped: false }, ...footballData]);
      setNewQuestion('');
      setNewAnswer('');
      setNewStatus('');
      setIsAddCardFormOpen(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleDeleteFlashcard = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/cards/${id}`);
      setFootballData(footballData.filter((card) => card.id !== id));
    } catch (error) {
      console.error('Error deleting flashcard:', error);
    }
  };

  const handleEditFlashcard = (id) => {
    const cardToEdit = footballData.find((card) => card.id === id);
    setEditingCardId(id);
    setEditedQuestion(cardToEdit.question);
    setEditedAnswer(cardToEdit.answer);
    setEditedStatus(cardToEdit.status);
  };

  const handleUpdateFlashcard = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/cards/${editingCardId}`, {
        question: editedQuestion,
        answer: editedAnswer,
        status: editedStatus,
        lastModification: new Date().toISOString(),
      });

      const updatedFootballData = footballData.map((card) =>
        card.id === editingCardId ? { ...response.data, flipped: card.flipped } : card
      );

      const sortedData = updatedFootballData.sort((a, b) => {
        return sortOrder === 'desc'
          ? new Date(b[sortAttribute]) - new Date(a[sortAttribute])
          : new Date(a[sortAttribute]) - new Date(b[sortAttribute]);
      });

      setFootballData(sortedData);
      setEditingCardId(null);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCardId(null);
  };

  const handleFlip = (id) => {
    setFlippedCardId(id === flippedCardId ? null : id);
  };

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    let attribute, order;

    if (selectedSort === 'id-desc' || selectedSort === 'id-asc') {
      attribute = 'id';
    } else {
      attribute = 'lastModification';
    }

    order = selectedSort.endsWith('-desc') ? 'desc' : 'asc';

    setSortAttribute(attribute);
    setSortOrder(order);
  };

  const filteredFootballData = footballData.filter(
    (flt) =>
      (slctdStatus === 'All' || flt.status === slctdStatus) &&
      (flt.question.toLowerCase().includes(srch.toLowerCase()) ||
        flt.answer.toLowerCase().includes(srch.toLowerCase()))
  );

  return (
    <div className="flashcards-container">
      {editingCardId !== null && (
        <div className="edit-popup">
          <h3>Edit Flashcard</h3>
          <label>Question:</label>
          <input type="text" value={editedQuestion} onChange={(e) => handleInputChange(e, setEditedQuestion)} />
          <label>Answer:</label>
          <input type="text" value={editedAnswer} onChange={(e) => handleInputChange(e, setEditedAnswer)} />
          <label>Status:</label>
          <input type="text" value={editedStatus} onChange={(e) => handleInputChange(e, setEditedStatus)} />
          <div className="edit-buttons">
            <button onClick={handleUpdateFlashcard}>Update Flashcard</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </div>
        </div>
      )}

      <div className="search-container">
        <h3 className="flashcards-title">Football Flashcards</h3>
        <input type="text" placeholder="Search based on text" value={srch} onChange={(e) => handleInputChange(e, setSrch)} />
        <label>Filter:</label>
        <select id="flter" value={slctdStatus} onChange={(e) => handleInputChange(e, setSlctdStatus)}>
          <option value="All">All</option>
          <option value="Learned">Learned</option>
          <option value="Want to learn">Want to learn</option>
          <option value="Noted">Noted</option>
        </select>
        <label>Sort By:</label>
        <select id="sorter" onChange={handleSortChange}>
          <option value="lastModification-desc">Most Recent Modification</option>
          <option value="id-desc">ID (Desc)</option>
          <option value="id-asc">ID (Asc)</option>
        </select>
      </div>

      {isAddCardFormOpen ? (
        <div className="add-flashcard-form">
          <h3>Create New Flashcard</h3>
          <label>Question:</label>
          <input type="text" value={newQuestion} onChange={(e) => handleInputChange(e, setNewQuestion)} />
          <label>Answer:</label>
          <input type="text" value={newAnswer} onChange={(e) => handleInputChange(e, setNewAnswer)} />
          <label>Status:</label>
          <input type="text" value={newStatus} onChange={(e) => handleInputChange(e, setNewStatus)} />
          <button onClick={handleAddFlashcard}>Add Flashcard</button>
          <button onClick={() => setIsAddCardFormOpen(false)}>Cancel</button>
        </div>
      ) : (
        <center><button onClick={() => setIsAddCardFormOpen(true)}>Create</button></center>
      )}

      <ul className="flashcards-list">
        {filteredFootballData.map((object) => (
          <li
            key={object.id}
            className={`flashcard ${flippedCardId === object.id ? 'flipped' : ''} ${
              editingCardId === object.id ? 'editing' : ''
            }`}
            onClick={() => handleFlip(object.id)}
          >
            <div className="edit-delete-buttons">
              <div className="edit-button" onClick={(e) => { e.stopPropagation(); handleEditFlashcard(object.id); }}>
                <button>Edit</button>
              </div>
              <div className="delete-button" onClick={(e) => { e.stopPropagation(); handleDeleteFlashcard(object.id); }}>
                <button>Delete</button>
              </div>
            </div>
            <div className="front">
              {object.question}
            </div>
            <div className="back">
              {object.answer} <br />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Flashcards;
