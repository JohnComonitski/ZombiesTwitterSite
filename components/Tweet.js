import React, { useState, useEffect } from 'react'

const Tweet = () => {
  const [tweet, setTweet] = useState({
    tweet: "",
    username: "",
    at: "",
    img: "",
    id: "",
    positive: "",
    incorrect: ""
  })

  useEffect(()=>{
    async function getTweet(){
      const res = await fetch(`/api/getTweet`);
      const result = await res.json()
      if(res.status === 200){
        setTweet(result["tweet"])
      }
    }
    if(tweet?.tweet===""){
      getTweet();
    }
  },[])

  async function updateSentiment(newSentiment){
    //Update Tweet
    const res = await fetch(`/api/updateTweet?newsentiment=${newSentiment}&sentiment=${tweet.positive}&id=${tweet.id}`);
    //Get New Tweet
    const newTweet = await fetch(`/api/getTweet`);
    const result = await newTweet.json()
    if(res.status === 200){
      setTweet(result["tweet"])
    }
  }
  
  return (
    <div className='bg-white border-gray-200 border-2 rounded-lg mb-2 p-2'>
        <div className='flex'>
            <img className='rounded-full w-10 h-10 mr-2' src={(tweet?.img==="") ? "https://pbs.twimg.com/media/Efpe1GYX0AYHuoL.jpg" : tweet?.img} alt=""/>
            <div className='block'>
                <div className='flex'>
                    <h1 className='text-black text-md font-bold mr-2 pt-2'> {tweet?.username}</h1>
                    <p className='text-gray-500 text-xs pt-3'> @{tweet?.at}</p>
                </div>
                <p className='text-md'> 
                  {tweet?.tweet}
                </p>
                <hr className='mt-2 mb-2'></hr>
                <p className='text-sm'> Is this tweet Positive, Negative or Irrelevant?</p>
                <div className='grid grid-cols-3'>
                    <p className='cursor-pointer' onClick={()=>{updateSentiment("0")}} >👍</p>
                    <p className='cursor-pointer' onClick={()=>{updateSentiment("2")}}>👎</p>
                    <p className='cursor-pointer' onClick={()=>{updateSentiment("1")}}>🤷‍♂️</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Tweet