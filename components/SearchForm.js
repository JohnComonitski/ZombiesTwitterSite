import React, { useState } from 'react'
import SearchedTweet from './SearchedTweet'

const SearchForm = () => {
    const [ hits, setHits ] = useState([])

    const search = async (event) => {
        const q = event.target.value;

        if(q.length > 2){
            const params = new URLSearchParams({q})
            const res = await fetch('/api/search?' + params);
            const result = await res.json()

            setHits(result['tweets'])
        }
    }

    return (
        <div className='pb-4'>
            <div id='helpUsImprove' className='p-4 pt-1 pb-0'>
                <h1 className='text-xl text-white'> Search Tweets</h1>
                <p className='text-sm text-white pb-1'> Search our tweet database <span className='text-xs '>{(hits?.length > 0) ? "(Showing only first 10 results)" : ""}</span></p>
                <input className='rounded-md mb-2 h-8 p-2 w-64' type="search" id="search" name="search" onChange={search}></input>
            </div>

            <ul>
                {hits.map((hit,i) => (
                    <li className="pl-4 pr-4" key={i}>
                        <SearchedTweet tweet={hit}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default SearchForm