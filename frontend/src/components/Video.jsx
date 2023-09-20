import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';
const Video = ({name}) => {
  const [vname,setvname]=useState("")
  useEffect(()=>{
      setvname(name)
  },[])
 
  const url = `https://youtube-v31.p.rapidapi.com/search?part=snippet&q=${vname}`;
  const [result,setResult]=useState([]);
  var videoId=[]
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': 'cc90540daamsh8507e7265ba9d32p12e34ajsncc333b7ef834',
		'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
	}
}; 
useEffect(()=>{
  fetch(url, options)
  .then((data)=>data.json())
  .then((response)=>{
    setResult(response.items)
  })
},[result]) 
result.map((data)=>(
videoId.push(data.id.videoId)

))
var vurl=`https://www.youtube.com/watch?v=${videoId[0]}`;
console.log(result)
console.log(videoId)
console.log(vurl);
  return (
    <div className='reactplayer'> 
    <ReactPlayer className="video" url={vurl} 
       playing={true}
       controls/>   
       
    </div>
  )
}

export default Video
