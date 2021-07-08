import React, {useState} from 'react'
import { useMutation } from '@apollo/client'
import {SET_BIRTHYEAR, ALL_AUTHORS} from '../queries'
import Select from 'react-select'

const SetBirthYear = (props) => {
    const [born, setBorn] = useState('')
    const [selectedAuthor, setSelectedAuthor] = useState(null)
    const [editAuthor] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [ {query: ALL_AUTHORS} ]
    })

    const submit = async (event) => {
        event.preventDefault()
        await editAuthor({variables: {name: selectedAuthor.value, born: Number(born)}})
        setBorn('')
    }

    const options = []

    for (const author of props.authors) {
        const newOption = {
            value: author.name,
            label: author.name
        }
        options.push(newOption)
    }

    return (
        <div>
            <h2>Set birthborn</h2>
            <form onSubmit={submit}>
                <Select
                    defaultValue={selectedAuthor}
                    onChange={setSelectedAuthor}
                    options={options}
                />
                <div>
                born <input value={born}
                    onChange={({ target }) => setBorn(target.value)}
                />
                </div>
                <button type='submit'>Update author</button>
            </form>
            </div>
    )
}

export default SetBirthYear