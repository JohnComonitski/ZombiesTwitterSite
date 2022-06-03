import React, { useState, useEffect } from 'react'

const SearchedTweet = (props) => {
  const { tweet } = props
  const [show, setShow] = useState(true);
  const [checkSentiment, setCheckSentiment] = useState(false);

  useEffect(()=>{
      if(tweet != undefined){
          if(tweet.incorrect !== ""){
            setShow(false)
          }
      }
  },[tweet])

  async function updateSentiment(newSentiment){
    const res = await fetch(`/api/updateTweet?newsentiment=${newSentiment}&sentiment=${tweet.positive}&id=${tweet.id}`);
  }

  return (
    <div className='bg-white border-gray-200 border-2 rounded-lg mb-2 p-2'>
        <div className='flex'>
            <img className='rounded-full w-10 h-10 mr-2'  src={(tweet.img==="") ? "https://pbs.twimg.com/media/Efpe1GYX0AYHuoL.jpg" : tweet.img} alt=""/>
            <div className='block'>
                <div className='flex'>
                    <h1 className='text-black text-md font-bold mr-2 pt-2'> {tweet.username}</h1>
                    <p className='text-gray-500 text-xs pt-3'> @{tweet.at}</p>
                </div>
                <p className='text-md'> 
                    {tweet.tweet}
                </p>
                { 
                    show ?
                    <>
                        <hr className='mt-2 mb-2'></hr>
                        {
                            (!checkSentiment) ?
                            <p className='text-sm'> This tweet was marked as {(tweet.positive === "0") ? "positive" : "negative" }. Is this correct? 
                                <span className='cursor-pointer select-none' onClick={()=>{updateSentiment(tweet.positive); setShow(false)}}> ✅ </span>
                                <span className='cursor-pointer select-none' onClick={()=>{setCheckSentiment(true)}}> ❌ </span> 
                                
                            </p>
                            :
                            <p className='text-sm'> Is this tweet Positive, Negative or Irrelevant?
                                <span className='cursor-pointer select-none' onClick={()=>{updateSentiment("0"); setShow(false)}}> 👍 </span>
                                <span className='cursor-pointer select-none' onClick={()=>{updateSentiment("2"); setShow(false)}}> 👎 </span> 
                                <span className='cursor-pointer select-none' onClick={()=>{updateSentiment("1"); setShow(false)}}> 🤷‍♂️ </span>
                                
                            </p>
                        }                    
                    </>
                    :
                    <>
                    </>
                }
            </div>
        </div>
    </div>
  )
}

export default SearchedTweet