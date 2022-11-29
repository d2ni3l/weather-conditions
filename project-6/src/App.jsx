import { useState, useEffect, useRef } from 'react'





function App() {
   const [input, setInput] = useState('');
   const [lat, setLat] = useState();
   const [lon, setLon] = useState();
   const [weather, setWeather] = useState();
   const [theme, setTheme] = useState(true);
   const [icon, setIcon] = useState();

   const inputRef = useRef();
   


   const getLocation = async (location) => {
      const response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=34d1dd48f3d7be50d9e81aa980188cc1`)
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
   setWeather(data)
   setIcon(data.weather[0].icon)

  }
 }
 
  useEffect(() => {
   if(input !== ''){
      getLocation(input)
   }
  }, [input]);

  function handleKeyPress(e) {
    if(e.key == 'Enter'){
      getWeather()
      inputRef.current.blur()
      
    }
}



  return (
<div data-theme={theme ? 'night' : 'winter'} className='flex flex-col justify-center h-[100vh] w-[100vw]  items-center '>

   <div className='md:min-w-[34rem] '>

   <div className="flex justify-between items-center mx-3">
   <h1 className="text-center font-black tracking-wide font-mono text-lg md:text-3xl text-primary ">Weather Conditions</h1>
   
   <button  className='theme flex justify-center items-center font-semibold tracking-widest text-sm md:text-lg  font-mono gap-2'> <span className=' -mt-1 md:-mt-2'>{theme ? 'Light' : 'Dark'}</span> <span><label  className="swap swap-rotate">
<input type="checkbox" />
<svg onClick={() => {setTheme(!theme)}}  className="swap-on fill-current w-8 h-8" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z"/></svg>
<svg onClick={() => {setTheme(!theme)}} className="swap-off fill-current w-9 h-9" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z"/></svg>

</label></span> 
</button>

   </div>
   
   <div className="mt-10"></div>

  
   <div className=" search  flex justify-center relative items-center">
   <svg xmlns="http://www.w3.org/2000/svg" className='w-7 h-7 ml-5 md:ml-0 fill-primary absolute left-8'  viewBox="0 0 512 512"><path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/></svg>
   <input ref={inputRef} type="text" placeholder="Search City..." className="input bg-base-300 placeholder:text-base md:placeholder:text-lg placeholder:tracking-wide px-20 md:px-24 py-[1.7rem] w-full  md:min-w-[35rem]  max-w-xs" value={input} onChange={(e) => {setInput(e.target.value)}} onKeyPress={handleKeyPress} />
   <button onClick={() => { getWeather()}} className='btn btn-ghost tracking-wider font-mono -ml-24'>search</button>
   </div>
    
   <div className="mt-10"></div>

   <div className='info  bg-base-300 p-6 outline outline-[1px] mx-3 outline-primary rounded-md'>
      <div className='flex justify-between items-center'>
        <div className="flex flex-col justify-center">
        <h1 className=' text-center font-black tracking-wider text-xl md:text-3xl px-3 text-primary flex justify-start items-center gap-2  '><span><svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 md:w-7 md:h-7 fill-primary mt-1' viewBox="0 0 640 512"><path d="M480 48c0-26.5-21.5-48-48-48H336c-26.5 0-48 21.5-48 48V96H224V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V96H112V24c0-13.3-10.7-24-24-24S64 10.7 64 24V96H48C21.5 96 0 117.5 0 144v96V464c0 26.5 21.5 48 48 48H304h32 96H592c26.5 0 48-21.5 48-48V240c0-26.5-21.5-48-48-48H480V48zm96 320v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM240 416H208c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zM128 400c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V368c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM560 256c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H528c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32zM256 176v32c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM112 160c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32zM256 304c0 8.8-7.2 16-16 16H208c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32zM112 320H80c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16zm304-48v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16zM400 64c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V80c0-8.8 7.2-16 16-16h32zm16 112v32c0 8.8-7.2 16-16 16H368c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16z"/></svg></span><span>{weather ? weather.name : 'City'}</span></h1>
        <p className='text-center pt-2 font-black tracking-wider text-xs md:text-xl text-secondary flex items-center gap-1'><span><svg className='w-4 h-4 md:w-6 md:h-6 fill-secondary mt-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M160 64c-26.5 0-48 21.5-48 48V276.5c0 17.3-7.1 31.9-15.3 42.5C86.2 332.6 80 349.5 80 368c0 44.2 35.8 80 80 80s80-35.8 80-80c0-18.5-6.2-35.4-16.7-48.9c-8.2-10.6-15.3-25.2-15.3-42.5V112c0-26.5-21.5-48-48-48zM48 112C48 50.2 98.1 0 160 0s112 50.1 112 112V276.5c0 .1 .1 .3 .2 .6c.2 .6 .8 1.6 1.7 2.8c18.9 24.4 30.1 55 30.1 88.1c0 79.5-64.5 144-144 144S16 447.5 16 368c0-33.2 11.2-63.8 30.1-88.1c.9-1.2 1.5-2.2 1.7-2.8c.1-.3 .2-.5 .2-.6V112zM208 368c0 26.5-21.5 48-48 48s-48-21.5-48-48c0-20.9 13.4-38.7 32-45.3V152c0-8.8 7.2-16 16-16s16 7.2 16 16V322.7c18.6 6.6 32 24.4 32 45.3z"/></svg></span> Temperature: <span className='font-mono mt-[2px]'>{weather ? Math.round(weather.main.temp) : '0'}</span></p>
        </div>
        <div className='flex flex-col justify-center'><h2 className='text-center font-black tracking-wide text-lg md:text-3xl text-primary  flex items-center gap-1'> <span><svg className='w-4 h-4 md:w-7 md:h-7 fill-primary mt-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 256c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64s-28.7 64-64 64z"/></svg></span> Coords</h2>
        <p className='text-center font-black pt-2 tracking-wider text-sm md:text-xl text-secondary'>Lon: <span className="font-mono">{weather ? Math.ceil(weather.coord.lon) : '0'} </span>Lat: <span className='font-mono'>{weather ? Math.ceil(weather.coord.lat) : '0'}</span></p>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center pt-12">
        <h1 className='text-center font-black tracking-wide text-2xl md:text-3xl  text-primary flex items-center gap-1'><span><svg xmlns="http://www.w3.org/2000/svg" className='w-5 h-5 md:w-7 md:h-7 fill-primary mt-1' viewBox="0 0 640 512"><path d="M0 336c0 79.5 64.5 144 144 144H512c70.7 0 128-57.3 128-128c0-61.9-44-113.6-102.4-125.4c4.1-10.7 6.4-22.4 6.4-34.6c0-53-43-96-96-96c-19.7 0-38.1 6-53.3 16.2C367 64.2 315.3 32 256 32C167.6 32 96 103.6 96 192c0 2.7 .1 5.4 .2 8.1C40.2 219.8 0 273.2 0 336z"/></svg></span> Weather:  </h1>

        <div className={`${theme ? 'bg-base-200' : 'bg-[#e5e2e2]'} py-2 outline outline-[1px] outline-primary rounded-lg px-20 mt-5`}>
        <div className="flex items-center">
        <h2 className='text-center font-black tracking-wide text-3xl  text-secondary font-mono'>{weather ? weather.weather[0].main : 'none'}</h2>
        <img className='mt-2' src={weather ? `http://openweathermap.org/img/w/${icon}.png` : `http://openweathermap.org/img/w/02d.png`} alt="" />
        </div>
        </div>

      </div>

      <div className="flex   justify-between  pt-12">
      <div className='flex flex-col items-start '>
        <h3 className='text-center font-black tracking-wide text-sm md:text-xl text-secondary flex items-center gap-1 md:gap-2'> <span> <svg className='w-5 h-5 md:w-7 md:h-7 fill-secondary mt-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M288 32c0 17.7 14.3 32 32 32h32c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H352c53 0 96-43 96-96s-43-96-96-96H320c-17.7 0-32 14.3-32 32zm64 352c0 17.7 14.3 32 32 32h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32 14.3-32 32zM128 512h32c53 0 96-43 96-96s-43-96-96-96H32c-17.7 0-32 14.3-32 32s14.3 32 32 32H160c17.7 0 32 14.3 32 32s-14.3 32-32 32H128c-17.7 0-32 14.3-32 32s14.3 32 32 32z"/></svg></span>Wind Condition </h3>
        <p className='text-center font-black pt-2 tracking-wider text-xs md:text-lg text-secondary'>Speed: <span className="font-mono">{weather ? weather.wind.speed : '000'}</span><br /><span className='flex justify-start'>Deg: <span className="font-mono -ml-1">&nbsp;{weather ? weather.wind.deg :'000'}</span></span></p>
      </div>

      <div className='flex gap-2 items-start  justify-center'>
        <h3 className='text-center font-black tracking-wider text-sm md:text-xl text-secondary flex items-center'><span><svg className='w-5 h-5 md:w-7 md:h-7 fill-secondary mt-1' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><g data-name="Glyph"><path d="M47.03 10a2.194 2.194 0 0 0-1.82.95c-.71 1.01-1.73 2.5-2.87 4.26-2.95-4.78-5.86-9.06-7.84-11.91a3.054 3.054 0 0 0-5 0c-5.67 8.11-18.85 27.98-18.85 37.35a21.348 21.348 0 0 0 42.21 4.53 13.145 13.145 0 0 0 7.29-11.74c0-5.71-7.9-17.63-11.3-22.49a2.22 2.22 0 0 0-1.82-.95ZM32 60a19.371 19.371 0 0 1-19.35-19.35c0-9.05 14.15-30 18.49-36.2a1.057 1.057 0 0 1 1.72 0c4.34 6.2 18.49 27.15 18.49 36.2A19.371 19.371 0 0 1 32 60Z"/><path d="M40.224 23.4a1 1 0 0 0 .87.505.984.984 0 0 0 .494-.132 1 1 0 0 0 .374-1.363 184.044 184.044 0 0 0-3.933-6.56 1 1 0 0 0-1.7 1.062 177.525 177.525 0 0 1 3.895 6.488zM29.38 32.13a6.508 6.508 0 0 0-3.6-.99 6.469 6.469 0 0 0-3.59.99 5.179 5.179 0 0 1-4.25.47.991.991 0 0 0-1.29.55 21.536 21.536 0 0 0-2 7.5 17.35 17.35 0 1 0 34.7 0 21.642 21.642 0 0 0-2.01-7.51 1 1 0 0 0-1.28-.55 5.14 5.14 0 0 1-4.27-.46 7.022 7.022 0 0 0-7.19 0 5.031 5.031 0 0 1-5.22 0zM28 38a3 3 0 1 1-3 3 3.009 3.009 0 0 1 3-3zm8 13a3 3 0 1 1 3-3 3.009 3.009 0 0 1-3 3zm1.32-12.74a1 1 0 1 1 1.36 1.48l-12 11a1 1 0 0 1-1.36-1.48z"/><circle cx="28" cy="41" r="1"/><circle cx="36" cy="48" r="1"/><circle cx="43" cy="26" r="1"/></g></svg></span>&nbsp;Humidity: <span className="font-mono mt-1 ml-1"> {weather ? weather.main.humidity : '00'}%</span></h3>
      </div>


      </div>
   </div> 
   </div>
</div>
  )
}

export default App;

// add svg

         

