import React from 'react'

const DataBox = (props) => {
    const { tweetInfo } = props
    
    return (
        <div className="bg-white border-gray-200 border-2 rounded-lg mr-4 ml-4 mb-2 p-2" >
            <h1 className='text-black font-bold mb-2'> {tweetInfo.title} </h1>
            <p className='text-gray-700 mb-2'> <span className='bg-gray-700 p-2 rounded-3xl mr-1'>{tweetInfo.emoji}</span> {tweetInfo.mapName} </p>
            <p className='text-gray-700'> {tweetInfo.descL} <span className='text-black font-bold'>{tweetInfo.data}</span> {tweetInfo.descR} </p>
        </div>
    )
}

export default DataBox