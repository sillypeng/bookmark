import React from 'react'
import {Input} from 'material-ui'

const Search = ({searchText, onChange}) => (
    <Input placeholder='search' value={searchText} onChange={e => onChange(e.target.value)}/>
)

export default Search