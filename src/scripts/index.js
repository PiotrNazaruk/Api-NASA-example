import '../styles/index.scss';
console.log('webpack starterkit');
import apod from './apod';

const myApp = (function() {  
  const fetchData = async () => {
  
      const EpicApi = fetch('https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT')
      const ApodApi = fetch('https://api.nasa.gov/planetary/apod?api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT')
      try {
         Promise.all([EpicApi,ApodApi])
          .then(files =>{
            files.forEach(file=>{
              apod(file.json())
            })
          })
      } catch (error) {
          console.error(error);
      }

  }
  
  const init = () => {
      fetchData();
  }

  return {
      init: init
  }
})();

myApp.init();