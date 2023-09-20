import React, { useRef } from 'react'
import { useEffect,useState } from 'react'
import { useSpeechSynthesis } from 'react-speech-kit';
import defaultNewsImage  from "D:/react/Julie/frontend/src/components/images/news.jpg";
import ReactSwitch from 'react-switch';
const News = () => {
  const [news,setNews]=useState([]);
  const { speak,voices,cancel} = useSpeechSynthesis();
 const [checked,setChecked]=useState(true)
  const [c,setc]=useState(0)
  const cref=useRef()
  const swh=useRef(true)
  var arr=[]
  useEffect(()=>{
     fetch("https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=f37b8c87e24c4483a0ac5847d180da75")
     .then((data)=>data.json())
     .then((response)=>setNews(response.articles))
  },[])
  news.map((data)=>(
    data.title?
    arr.push(data.title)
    :""
  ))
  const rate=1;
  const handleImage=(event)=>{
    event.target.src =defaultNewsImage;
}

 
  cref.current=c
  const itr=async ()=>{
   
        for(var i=0;i<arr.length;i++){
          if(swh.current===false){
          break;
          }
            console.log(swh.current)
           
            setc(i)
            cancel()
            speak({ text: "             "+arr[i] ,rate ,voice:voices[5]})
         
            await new Promise(resolve => setTimeout(resolve, 9000));
         
        
      }

  }



  useEffect(()=>{
          itr()
  },[news,checked])
  swh.current=checked
  const handleChange=()=>{
    checked?setChecked(false):setChecked(true)
    
  }
  return (
    <div className='newsContainer'>
      <div className='toggle'><ReactSwitch
        checked={checked}
        onChange={handleChange}
      /></div> 
       {
news.map((data,index)=>(
 data.title?
  <card className={index===cref.current?"selected":"card"}>
    <a href={data.url} target='_blank'>
   <img src={data.urlToImage===null?defaultNewsImage:data.urlToImage} alt="News Thumbnail" onError={handleImage}/>
  <div className={index===cref.current?"cardTop1":"cardTop"}>
  <h6>{(new Date(data.publishedAt)).toDateString()}</h6>
  <h6>{data.source.name}</h6>
  </div>
   <h4 key={index} >{data.title}</h4>
   </a>
</card>
 :(()=>{
  cref.current+=1
  return null
 })()
 

))

}
       
    </div>
  )
}









export default News
