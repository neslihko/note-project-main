import React from 'react';
import NoteCard from './NoteCard';
import Loader from './Loader';

const NoteCardContainer = ({ notes, loading }) => {
  if (loading) {
    return <Loader loading={loading} />;
  }

  if (notes.length === 0) {
    return <p>No notes found.</p>;
  }

  return (
    <div className="container">
      <div className="note-has-grid row">
        {notes.map(note => (
          <NoteCard key={note.id} note={note} />
        ))}
      </div>
    </div>
  );
};

export default NoteCardContainer;