import { ArrowLeft, ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router";
import axios from "axios";
import api from '../lib/axios';

// 2: 34:35
const CreatePage = () => {
  // create states (changing things) for user
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()



  // get the event (e)
  const handleSubmit = async (e) => {
    // prevent the values refresh and gone
    e.preventDefault()
    
    if (!title.trim() || !content.trim()) {
      toast.error("All fields are required")
      return
    }

    setLoading(true)
    try {
      await api.post("/notes", {
        title,
        content
      })
      toast.success("Note created successfully!")
      // navigate the users back to home page
      navigate("/")

    }catch(error){
      console.log("Error creating note", error)
      if (error.response.status === 429){
        toast.error("Slow down! you are creating notes too fast!", {
          duration: 4000,
          icon: "stop"
        })
      } else{
        toast.error("Failed to create note")
      }

    }finally{
      setLoading(false)
    }



  }

  return <div className='min-h-screen bg-base-200'>
    <div className='containter mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className='size-5'/> {/**Link to home page */}
          Back to Notes
        </Link>
        <div className='card bg-base-100'>
          <div className='card-body'>
            <h2 className='card-title text-2xl mb-4'>Create New Notes</h2>
            <form onSubmit={handleSubmit}>
              <div className='fom-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Title</span>
                </label>
                <input 
                  type='text'
                  placeholder='Note Title'
                  className='input input-bordered'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}>
                </input>
              </div>

              <div className='fom-control mb-4'>
                <label className='label'>
                  <span className='label-text'>Content</span>
                </label>
                <textarea
                  type='text'
                  placeholder='Write your note here'
                  className='textarea textarea-bordered h-32'
                  value={content}
                  onChange={(e) => setContent(e.target.value)}>
                </textarea>
              </div>

              <div className='card-actions justify-end'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </button>
              </div>
              
            </form>
          </div>
        </div>
      </div>

    </div>
  </div>
}

export default CreatePage
 