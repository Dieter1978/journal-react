import '@testing-library/jest-dom'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from "react-router-dom"
import {render , screen} from '@testing-library/react'
import {describe, it, expect} from 'vitest'
import  userEvent  from '@testing-library/user-event'

describe('App Component', () => {
    let container

    beforeEach(() => {
        container = render(
            <BrowserRouter>
             <App />
            </BrowserRouter>
        ).container
    })

    it('Renders the Home component', () => {
   
        expect(container.querySelector('ul')).not.toBeNull()
        expect(container.querySelector('h2')).toHaveTextContent('Journal Entries')
        //expect(screen.getByRole('heading',{level:2})).toHaveTextContent('Journal Entries')

    })

    it('Renders categoryselection component when new entry is clicked', async () => {
        
        
        await userEvent.click(screen.getByText('New Entry'))

        expect(container.querySelector('h3')).not.toBeNull()
        expect(container.querySelector('h3')).toHaveTextContent('Please select a category :')
            //expect(screen.getByRole('heading',{level:2})).toHaveTextContent('Journal Entries')
    
    })
})