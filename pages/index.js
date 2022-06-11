import React, { useState, useEffect } from "react"
import Head from 'next/head'
import Image from "next/image"
import BarChart from "../components/BarChart"
import DataBox from '../components/DataBox'
import Tweet from "../components/Tweet"
import MapBox from "../components/MapBox"
import { prepBarGraph, prepBarGraphAll, prepMostTweets, prepLeastTweets, prepMostDisliked, prepMostControversial, countTweets } from "../lib/dataPrep"
import SearchForm from "../components/SearchForm"

const loading = require("../img/loading.gif")

export default function Home() {
  const [mapData, setMapData] = useState(null)
  const [numTweet, setNumTweets] = useState(0)
  const [showFull, setShowFull] = useState(false)
  const [barGraphData, setBarGraphData] = useState(null)
  const [barGraphDataAll, setBarGraphDataAll] = useState(null)
  const [barGraphMessage, setBarGraphMessage] = useState('(Want to see the full rankings?)')
  const [mostTweeted, setMostTweeted] = useState(null)
  const [mostControversial, setMostControversial] = useState(null)
  const [leastTweeted, setLeastTweeted] = useState(null)
  const [mostDisliked, setMostDisliked] = useState(null)

  useEffect(()=>{
    if(mapData === null){
      fetch('/api/stats')
      .then(response => response.json())
      .then(data => {
        setMapData(data)
        setBarGraphData(prepBarGraph(data))
        setBarGraphDataAll(prepBarGraphAll(data))
        setMostTweeted(prepMostTweets(data))
        setLeastTweeted(prepLeastTweets(data))
        setMostDisliked(prepMostDisliked(data))
        setMostControversial(prepMostControversial(data))
        setNumTweets(countTweets(data))
      });
    }
  },[mapData])

  function updateBarGraph(){
    if(showFull){
      setBarGraphMessage('(Want to see the full rankings?)')
      setShowFull(false)

    }
    else{
      setBarGraphMessage('(Want to see the only the top 10?)')
      setShowFull(true)
    }
  }

  return ( 
    (numTweet !== 0) ?
      <div style={{backgroundColor: "#1DA1F2"}} className="w-100vh h-100vh">
        <Head>
          <title>Zombies Twitter</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div id="header" className='text-center text-white'> 
          <h1 className=" text-3xl font-bold  p-2">
            Zombies Twitter
          </h1>
          <hr className="ml-20 mr-20 md:ml-40 md:mr-40 lg:ml-80 lg:mr-80 pb-2"></hr>
          <p className="ml-16 mr-16 text-sm pb-2">
           <span className="text-black"> Can we rank every Zombies map? </span> Zombies Twitter is attempting to use Machine Learning and real-world Twitter data to answer this question! For over a year, a bot has been scrapping Twitter for any tweets discussing or giving opinions on Zombies maps. Those tweets were then used to fine-tune and furtger train a pre-trained BERT Sentiment Analysis model. Our Machine Learning model is now every week analyzing the latest tweets from Zombies fans to update our DEFINITIVE ranking of all the Zombies maps.
          </p>
          <h2 className='text-xl pb-2'>
            Data compiled using over <span className='text-black font-bold'> {numTweet} </span> Zombies Fan&rsquo;s Tweets!
          </h2>
        </div>

        <div id="chart" className="bg-white border-gray-200 border-2 rounded-lg mr-4 ml-4 mb-2 pt-2" >
          {
            showFull ?
            <BarChart barGraphData={barGraphDataAll} height={1200}/>
            :
            <BarChart barGraphData={barGraphData} height={400}/>
          }
          <p className="ml-16 mr-16 text-sm text-center text-black pb-4">
            Methodology: Maps are rated using an &quot;Approval Scor&quot;". The Approval Score begins with our BERT Model rating tweets as &lsquo;postive&rsquo;, &lsquo;negative&rsquo;, or &lsquo;irrelevant&rsquo;. We then calculate every Map&rsquo;s approval rating (positive tweets/total tweets). Next we calculate a confidence interval, convert it into a percentage of confidence and plug that percentage of confidence into a softplus function. Finally, that number is multiplied by our approval rating to generate a final &quot;Approval Score&quot;.
            <span onClick={updateBarGraph} className="hover:text-gray-500 cursor-pointer"> {barGraphMessage} </span>
          </p>
        </div>


        <div id="dataBoxes" className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 '>
          <DataBox tweetInfo={mostTweeted}/>
          <DataBox tweetInfo={mostControversial}/>
          <DataBox tweetInfo={leastTweeted}/>
          <DataBox tweetInfo={mostDisliked}/>
        </div>

        <div id="dataBoxes" className='pb-4'>
          <MapBox maps={mapData} />
        </div>

        <hr className="ml-6 mr-8"></hr>

        <div id='helpUsImprove' className='p-4 pb-1'>
          <h1 className='text-xl text-white'> Help Zombie Twitter Improve!</h1>
          <p className='text-sm text-white pb-2'> Help us verify our model&rsquo;s results and inturn create the next training set to better imporve next BERT Model.</p>
          <div className='grid grid-cols-1'>
            <div className='sm:mr-2'>
              <Tweet />
            </div>
          </div>
        </div>

        <SearchForm />
      </div>
    :
      <div style={{backgroundColor: "#1DA1F2"}} className="w-100vh h-screen flex flex-col my-auto items-center">
        <Head>
          <title>Zombies Twitter</title>
          <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        </Head>
        <div style={{width: "50px", height:"50px"}} className="m-auto">
          <Image src={loading} alt="" className="" />
        </div>
      </div>
  )
}
