import { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import MainLayout from './layouts/MainLayout';
import AddNotePage from './pages/AddNotePage';
import NoteDetailPage from './pages/NoteDetailPage';
import EditNotePage from './pages/EditNotePage';
import axios from 'axios';
import { toast } from "react-toastify";
import { 
  createBrowserRouter, 
  createRoutesFromElements, 
  RouterProvider, 
  Route 
} from 'react-router-dom';
import { API_BASE_URL, MIN_SEARCH_LENGTH } from './config';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filterText, setFilterText] = useState("");

  const handleFilterText = (val) => {
    setFilterText(val);
  };

  const handleSearchText = (val) => {
    setSearchText(val);
  };

  const filteredNotes = notes.filter(note => {
    if (filterText === "") return true;
    return note.category === filterText;
  });

  useEffect(() => {
    if (searchText.length < MIN_SEARCH_LENGTH) return;
    setIsLoading(true);
    axios.get(`${API_BASE_URL}/notes-search/?search=${searchText}`)
      .then(res => {
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error searching notes:", err);
        toast.error("Failed to search notes. Please try again.");
        setIsLoading(false);
      });
  }, [searchText]);

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${API_BASE_URL}/notes/`)
      .then((res) => {
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
        toast.error("Failed to fetch notes. Please try again.");
        setIsLoading(false);
      });
  }, []);

  const addNote = (data) => {
    axios.post(`${API_BASE_URL}/notes/`, data)
      .then((res) => {
        setNotes([...notes, res.data]);
        toast.success("A new note has been added");
      })
      .catch((err) => {
        console.error("Error adding note:", err);
        toast.error("Failed to add note. Please try again.");
      });
  };

  const updateNote = (data, slug) => {
    axios.put(`${API_BASE_URL}/notes/${slug}/`, data)
      .then((res) => {
        const updatedNotes = notes.map(note => 
          note.slug === slug ? res.data : note
        );
        setNotes(updatedNotes);
        toast.success("Note updated successfully");
      })
      .catch((err) => {
        console.error("Error updating note:", err);
        toast.error("Failed to update note. Please try again.");
      });
  };

  const deleteNote = (slug) => {
    axios.delete(`${API_BASE_URL}/notes/${slug}/`)
      .then(() => {
        const updatedNotes = notes.filter(note => note.slug !== slug);
        setNotes(updatedNotes);
        toast.success("Note deleted successfully");
      })
      .catch((err) => {
        console.error("Error deleting note:", err);
        toast.error("Failed to delete note. Please try again.");
      });
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route 
        path='/' 
        element={
          <MainLayout 
            searchText={searchText} 
            handleSearchText={handleSearchText} 
          />
        }
      >
        <Route 
          index 
          element={
            <HomePage 
              notes={filteredNotes} 
              loading={isLoading} 
              handleFilterText={handleFilterText} 
            />
          } 
        />
        <Route path="/add-note" element={<AddNotePage addNote={addNote} />} />
        <Route 
          path="/edit-note/:slug" 
          element={<EditNotePage updateNote={updateNote} />} 
        />
        <Route 
          path="/notes/:slug" 
          element={<NoteDetailPage deleteNote={deleteNote} />} 
        />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;