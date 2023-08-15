import React, { useState, useEffect } from 'react'
import {Link} from 'react-router-dom'

const CategorySelection = () => {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    const getCats = async () =>{
    const res = await fetch('https://express-journal-api-ccwk.onrender.com/categories')
    const data = await res.json()
    setCategories(data)
  }
  getCats()
  },[])

  return (
    <>
    <h3>Please select a category :</h3>
    <ul>
        {categories.map(cat => (
            <li key={cat._id}>
                <Link to={`/entry/new/${cat.name}`}>{cat.name}</Link>
            </li>

        ))}

    </ul>
    </>
  )
}

export default CategorySelection