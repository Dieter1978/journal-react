import React,{useState} from 'react'
import {useParams} from 'react-router-dom'



const NewEntry = ({addEntry}) => {
  const {category} = useParams()
  const [content, setContent] = useState('')
 

  function submit(e){
    e.preventDefault()
    addEntry(category,content)
    
  }


  return (
    <>
    <h3>New entry in {category} category</h3>
    <form className="container" onSubmit={submit}> <div class="mb-3"><textarea value={content} className="form-control" rows="8" onChange={e => setContent(e.target.value)}>
   
        </textarea></div><button className="btn btn-primary mt-2">Create Entry</button></form>
        
    </>
  )
}

export default NewEntry