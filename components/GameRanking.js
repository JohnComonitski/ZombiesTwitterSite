import React, { useState, useEffect } from 'react'
import {sortByPercentageLikesWSoftplus} from "../lib/dataPrep"

const GameRanking = (props) => {
  const { maps } = props;
  const [gameRanks, setGameRanks] = useState([
    {"name":'World At War', "avg":0, "emoji" : "🥇"},
    {"name":'Black Ops 1', "avg":0, "emoji" : "🥈"},  
    {"name":'Black Ops 2', "avg":0, "emoji" : "🥉"},
    {"name":'Black Ops 3', "avg":0, "emoji" : "4️⃣"},  
    {"name":'Black Ops 4', "avg":0, "emoji" : "5️⃣"},
    {"name":'Black Ops Cold War', "avg":0, "emoji" : "6️⃣"} 
  ])

  useEffect(()=>{
    if(maps != undefined){
        var rankings = sortByPercentageLikesWSoftplus(maps)
        var games = {
            'World At War': 0,
            'Black Ops 1': 0,  
            'Black Ops 2': 0,
            'Black Ops 3': 0,  
            'Black Ops 4': 0,
            'Black Ops Cold War': 0  
        }
        var mapsMaping = {
            "nacht der untoten":'World At War',
            "verruckt":'World At War',
            "shi no numa":'World At War',
            "der riese":'World At War',
            "kino der toten":'Black Ops 1',
            "five":'Black Ops 1',
            "ascension":'Black Ops 1',
            "call of the dead":'Black Ops 1',
            "shangri-la":'Black Ops 1',
            "moon":'Black Ops 1',
            "tranzit":'Black Ops 2',
            "nuketown":'Black Ops 2',
            "die rise":'Black Ops 2',
            "mob of the dead":'Black Ops 2',
            "buried":'Black Ops 2',
            "origins":'Black Ops 2',
            "shadows of evil":'Black Ops 3',
            "der eisendrache":'Black Ops 3',
            "zetsubou no shima":'Black Ops 3',
            "gorod krovi":'Black Ops 3',
            "revelations":'Black Ops 3',
            "voyage of despair":'Black Ops 4',
            "ix":'Black Ops 4',
            "blood of the dead":'Black Ops 4',
            "classified":'Black Ops 4',
            "dead of the night":'Black Ops 4',
            "ancient evil":'Black Ops 4',
            "alpha omega":'Black Ops 4',
            "tag der toten":'Black Ops 4',
            "die maschine":'Black Ops Cold War',
            "firebase z": 'Black Ops Cold War'
        }
        
        for (var i = 0; i < rankings.length; i++){
            games[mapsMaping[rankings[i].name]] += i+1
        }
        games = {
            'World At War': games['World At War']/4,
            'Black Ops 1': games['Black Ops 2']/6,  
            'Black Ops 2': games['Black Ops 2']/6,
            'Black Ops 3': games['Black Ops 3']/5,  
            'Black Ops 4': games['Black Ops 4']/8,
            'Black Ops Cold War': games['Black Ops Cold War']/2  
        }
        var avg = sortByAvg(games)
        avg[0] = {"emoji": "🥇", ...avg[0]}
        avg[1] = {"emoji": "🥈", ...avg[1]}
        avg[2] = {"emoji": "🥉", ...avg[2]}
        avg[3] = {"emoji": "4️⃣", ...avg[3]}
        avg[4] = {"emoji": "5️⃣", ...avg[4]}
        avg[5] = {"emoji": "6️⃣", ...avg[5]}
        setGameRanks(avg)
        console.log(avg)
    }
  },[maps])

  function sortByAvg(games){
        var tmp = []
        for (const game in games){
            tmp.push({name:game, avg: games[game]})
        }
        return tmp.sort(compare)

        function compare( a, b ) {
            if ( a.avg > b.avg ){
                return 1;
            }
            if ( a.avg < b.avg ){
                return -1;
            }
            return 0;
        }
    }

  return (
    <div className="bg-white border-gray-200 border-2 rounded-lg mr-4 ml-4 mb-2 p-2" >
    <h1 className='text-black font-bold mb-2'> Game Rankings </h1>
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {
            gameRanks.map((game, i)=>(
                <p className='text-gray-700 mb-4 ml-0 sm:ml-2' key={game.name +i}> <span className='bg-gray-700 p-2 rounded-3xl mr-1 text-white'> {game.emoji}</span> <span className='font-bold'>{game.name} </span>- Avg Map Ranking: <span className='font-bold'> {game.avg.toFixed(2)} </span></p>
            ))
        }
    </div>
</div>
  )
}

export default GameRanking