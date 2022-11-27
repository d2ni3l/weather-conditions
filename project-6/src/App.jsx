import { useState, useEffect } from 'react'





function App() {
   const [input, setInput] = useState('');
   const [lat, setLat] = useState();
   const [lon, setLon] = useState();
   const [weather, setWeather] = useState();
   const [theme, setTheme] = useState(true);
   const [icon, setIcon] = useState();
   


   const getLocation = async (location) => {
      const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=34d1dd48f3d7be50d9e81aa980188cc1`)
      const data = await response.json();
      console.log(data)
      setLat(data[0].lat)
      setLon(data[0].lon)
    }

 const getWeather = async () => {
  const res = await getLocation;
  if(lat && lon !== ''){
   const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=34d1dd48f3d7be50d9e81aa980188cc1`)
   const data = await response.json()
   console.log(data)
   setWeather(data.weather)
   setIcon(data.weather[0].icon)

  }
 }
 
  useEffect(() => {
   if(input !== ''){
      getLocation(input)
   }
  }, [input])

 

  return (
<div data-theme={theme ? 'night' : 'winter'} className='flex flex-col justify-center h-[100vh] w-[100vw]  items-center '>

   <div className='md:min-w-[35rem] '>

   <div className="flex justify-between ">
   <h1 className="text-center font-black tracking-wide text-lg md:text-3xl text-primary ">Weather detector</h1> 
    <button  className='theme flex justify-center items-center font-semibold tracking-widest text-base md:text-lg  font-mono gap-2'> <span className='-mt-3 md:-mt-2'>{theme ? 'Light' : 'Dark'}</span> <span><label  className="swap swap-rotate">
  <input type="checkbox" />
  

  <svg onClick={() => {setTheme(!theme)}}  className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
  

  <svg onClick={() => {setTheme(!theme)}} className="swap-off fill-current w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>
  
</label></span> 
</button>
   </div>
   
   <div className="mt-10"></div>
   

   <div className=" search  flex justify-center relative items-center">
   <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7 -mr-20 fill-primary absolute left-8'  viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>
   <input type="text" placeholder="Search City..." className="input bg-base-300 placeholder:text-base md:placeholder:text-lg placeholder:tracking-wide px-20 md:px-24 py-[1.7rem] w-full  md:min-w-[35rem]  max-w-xs" value={input} onChange={(e) => {setInput(e.target.value)}} />
   <button onClick={() => { getWeather()}} className='btn btn-ghost -ml-24'>search</button>
   </div>
    
   <div className="mt-10"></div>

   <div className='info  bg-base-300'>
    <div className="flex justify-between mx-12">
    
         
         <img src={icon ? `http://openweathermap.org/img/w/${icon}.png` : 'http://openweathermap.org/img/w/02d.png'} alt="" />
    
      <div>
        <h1 className='text-center font-black tracking-wide text-3xl text-secondary '>Lagos</h1>
      </div>
    </div>
   </div>



   </div>
   
   
</div>
  )
}

export default App;
