import React, {useState} from 'react'
import {Input} from 'antd'

function SearchBar(props) {
    const [searchText, setSearchText] = useState('');

    function onSearchHanlder() {
        props.handleFilters(searchText);
    }

    function onCahngeHanlder(e) {
        setSearchText(e.target.value)
    }

    return (
        <div>
            <Input.Search 
                placeholder="input search text" 
                onChange={onCahngeHanlder} 
                onSearch={onSearchHanlder}  
                value={searchText}
                enterButton />
        </div>
    )
}

export default SearchBar
