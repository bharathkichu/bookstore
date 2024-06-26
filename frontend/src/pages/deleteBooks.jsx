import React, {useState} from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const deleteBooks = () => {
  const [loading, setLoading] = useState([""]);
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeleteBook = () =>{
    setLoading(true);
    axios.delete(`https://bookstore-spr4.onrender.com/books/${id}`)
    .then(()=>{
      setLoading(false);
      navigate("/");
    }).catch((error)=>{
      setLoading(false);
      alert("An error happened, plaease check console");
      console.log(error);
    });
  };
  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Delete Book</h1>
      {loading ? <Spinner/> : ""}
      <div className='flex flex-col items-center border-2 border-sky-400 rounded-xl -[600px] p-4 mx-auto'>
        <h1 className='text-2xl'>Are you sure you want to delete this book </h1>
        <button className='p-4 bg-red-300 text-white m-8 w-full' onClick={handleDeleteBook}>Yes, Delete it</button>
      </div>
    </div>
  );
};

export default deleteBooks;