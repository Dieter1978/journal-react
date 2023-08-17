import React, { useEffect, useReducer} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CategorySelection from './CategorySelection'
import NewEntry from './NewEntry'
import Home from './Home'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import NavBar from './NavBar'
import ShowEntry from './ShowEntry'
import {useParams, useNavigate } from 'react-router-dom'

// const seedEntries = [
//   {category: 'Food', content: 'Food is yummy!'},
//   {category: 'Coding', content:'Coding is fun!'},
//   {category: 'Gaming', content: 'Skyrim is for the Nords!'}
// ]


function reducer(currentState, action){
  switch (action.type){
    case 'setEntries' :
      return {
         ...currentState,
        entries : action.entries
      }
    case 'addEntry' :
      return {
        ...currentState,
        entries : [...currentState.entries, action.entry]
      }
    default:
      return currentState
  }
  
}

const initialState =
{
  entries : [],
  categories : []
}

const App = () => {
  const nav = useNavigate()
  //const [entries,setEntries] = useState([])

  const [store, dispatch] = useReducer(reducer,initialState)
  const {entries} = store
 
  
  useEffect(() => {
    (
    async () => {
    const res = await fetch('http://localhost:5175/entries')
    const data = await res.json()
    //setEntries(data)
    dispatch({
      type : 'setEntries',
      entries : data,
    })
    }
    )()


  },[])
  //const {id} = useParams()
  //console.log(`id: ${id}`)
  


  async function addEntry (category, content) {
    
    const id = entries.length
    //Add the entry
    const returnedEntry = await fetch('https://express-journal-api-ccwk.onrender.com/entries',{ method: 'POST', 
    headers: {"Content-type": "application/json"},
    body : JSON.stringify({category, content})
    })

    //setEntries([...entries,await returnedEntry.json()])
    dispatch({
      type : 'addEntry',
      entry : await returnedEntry.json(),
    })

    nav(`/entry/${id}`)
  }

  async function updateEntry (entry, content){
    const id = entries.length

    const returnedEntry = await fetch(`https://express-journal-api-ccwk.onrender.com/entries/${entry._id}`,{ method: 'PUT', 
    headers: {"Content-type": "application/json"},
    body : JSON.stringify({content})
    })

    setEntries([...entries,await returnedEntry.json()])

    nav(`/`)
  }


    //HOC Higer Order Component
    function ShowEntryWrapper (){
      const {id} = useParams()
      return <ShowEntry entry={entries[id]} updateEntry={updateEntry}/>
    }
  


  return (
    <>
     
    
     <NavBar />
        <Routes>
          <Route path='/' element={<Home entries={entries} />} />
          <Route path='/category' element={<CategorySelection/>} />
          <Route path="/entry">
              <Route path='new/:category' element={<NewEntry addEntry={addEntry}/>} />
              <Route path=':id' element={ <ShowEntryWrapper/> }/>
            
          </Route>
         
          <Route path='*' element={<h3>Page not found 404</h3>} />
        </Routes>
        
   
     {/*<Home />
     <CategorySelection />
  <NewEntry />*/}
    </>
  )
}

export default App
