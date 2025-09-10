import { ArrowLeft, ArrowLeftIcon } from 'lucide-react'
import React, { useState } from 'react'
import { Link } from "react-router";

// 2: 34:35
const CreatePage = () => {
  // create states (changing things) for user
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState("")



  const handleSubmit = () => {



  }

  return <div className='min-h-screen bg-base-200'>
    <div className='containter mx-auto px-4 py-8'>
      <div className='max-w-2xl mx-auto'>
        <Link to={"/"} className="btn btn-ghost mb-6">
          <ArrowLeftIcon className='size-5'/>
          Back to Notes
        </Link>
      </div>

    </div>
  </div>
}

export default CreatePage
 