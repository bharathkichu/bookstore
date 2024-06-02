import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const editBooks = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishYear, setPublishYear] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        const { author, publishYear, title } = response.data;
        setAuthor(author);
        setPublishYear(publishYear);
        setTitle(title);
      })
      .catch((error) => {
        console.error("Error fetching book details:", error);
        alert("An error occurred while fetching book details. Please try again.");
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEditBook = () => {
    const data = { title, author, publishYear };
    setLoading(true);
    axios.put(`http://localhost:5555/books/${id}`, data)
      .then(() => navigate("/"))
      .catch((error) => {
        console.error("Error editing book:", error);
        alert("An error occurred while saving the book details. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Edit Book</h1>
      {loading && <Spinner />}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl -[600px] p-4 mx-auto'>

        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div>
          <label className='text-xl mr-4 text-gray-500'>Author</label>
          <input
            type='text'
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div>
          <label className='text-xl mr-4 text-gray-500'>Publish Year</label>
          <input
            type='number'
            inputMode='numeric'
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleEditBook}>Save</button>
      </div>
    </div>
  );
};

export default editBooks;


