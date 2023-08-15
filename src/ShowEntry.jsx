import React,{useState} from 'react'

const ShowEntry = ({entry, updateEntry}) => {
  const [content, setContent] = useState(entry.content)

  function Update(e){
    e.preventDefault()
    //addEntry(category,content)
    console.log(e)
    updateEntry(entry, content)
    
   
    
  }

  function Delete(e){
    e.preventDefault()
    //deleteEntry()
  }

  return  entry ? (
    <> 
    <form className="container" > <div class="mb-3"><textarea value={content} className="form-control" rows="8" onChange={e => setContent(e.target.value)}>
    </textarea></div><button className="btn btn-primary mt-2" onClick={Update}>Update </button><button className="btn btn-primary mt-2" onClick={Delete}>Delete</button></form>
    <p>Posted in {entry.category.name}</p>
    </>
  ) : (<p>Entry not found!</p>)
}

export default ShowEntry