import React, {useState, useEffect, useRef} from 'react'

const MapBox = (props) => {
  const { maps } = props;
  const [map, setMap] = useState()
  const selector = useRef()

  useEffect(()=>{
      var i = 0;
      for (const map in maps){
          if(i === 0){
              setMap({name:map, ...maps["tranzit"]})
          }
          var opt = document.createElement('option');
          opt.value = map;
          opt.innerHTML = `${maps[map].emoji} ${toTitleCase(map)}`;
          selector.current.appendChild(opt);
      }
  },[])

  function updateMap(e){
      setMap(maps[e.target.value])
  }

  return (
    <div className= "bg-white border-gray-200 border-2 rounded-lg mr-4 ml-4 mb-2 p-2" >
        <div className='flex mb-1'>
            <h1 className='text-black font-bold mb-2 mr-2'> Breakdown by Map: </h1>
            <select ref={selector} onChange={updateMap} className='text-black mb-2' name="maps" id="maps">
            </select>
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 text-left md:grid-cols-4 md:text-center'>
            <h1 className='text-black mb-4'> <span className='bg-gray-700 p-2 rounded-3xl mr-1'>✅</span> Percetange Positve:<span className='font-bold'> {(map?.positive/map?.count).toFixed(2)}% </span></h1>
            <h1 className='text-black mb-4'> <span className='bg-gray-700 p-2 rounded-3xl mr-1'>📊</span>  Reception Score: <span className='font-bold'> {map?.reception} </span> </h1>
            <h1 className='text-black mb-4'> <span className='bg-gray-700 p-2 rounded-3xl mr-1'>👍👎</span> Like to Dislike: <span className='font-bold'> {map?.likes}:{map?.dislikes} </span> </h1>
            <h1 className='text-black mb-4'> <span className='bg-gray-700 p-2 rounded-3xl mr-1'>📣</span> Tweets:<span className='font-bold'> {map?.tweets.length} </span></h1>
        </div>
    </div>
  )

  function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
  }
}

export default MapBox