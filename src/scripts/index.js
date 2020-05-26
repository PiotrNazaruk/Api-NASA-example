import '../styles/index.scss';
console.log('webpack starterkit');
import apod from './apod';

const myApp = (function() { 
  let date = '2020-05-05' 
  const getDate = ()=>{
    const input = document.getElementById('input')
    input.addEventListener('change',(e)=>{
      date = e.target.value;
      console.log(date)
    })
   
  }
  const apodButton = ()=>{
   const button = document.getElementById('button')
    button.addEventListener('click',()=>{
     fetchData()
    })
  }

  const fetchData =  () => {
   
      const EpicApi = fetch('https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT')
      const ApodApi = fetch(`https://api.nasa.gov/planetary/apod?date=${date}&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT`)
      try {
         Promise.all([EpicApi,ApodApi])
          .then(files=>{
           apod(files[1].json())
          })
      } catch (error) {
          console.error(error);
      }

  }
  
  const init = () => {
      fetchData();
      getDate()
      apodButton()
     
  }

  return {
      init: init
  }
})();

myApp.init();