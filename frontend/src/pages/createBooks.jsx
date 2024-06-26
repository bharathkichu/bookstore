import React, { useState } from 'react';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';

function CreateBooks() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSaveBook = () => {
    // if (!title || !author || !publishYear) {
    //   setError('Please fill in all fields');
    //   return;
    // }

    const data = {
      title,
      author,
      publishYear
    };
    setLoading(true);
    axios.post(`https://bookstore-spr4.onrender.com/books`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      }).catch((error) => {
        setLoading(false);
        alert("An error occurred, Please try again");
        console.log(error);
        
      });
  }


  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Create Book</h1>
      {loading ? <Spinner /> : null}
      {error && <div className="text-red-600">{error}</div>}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>

        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishYear}
            onChange={(e) => setPublishYear(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' />
        </div>
        {/* <button type='button' className='p-2 bg-sky-300 m-8' onClick={handleSaveBook }>Save</button> */}
        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSaveBook }>Save</button>
      </div>
    </div>
  )
}

export default CreateBooks;
