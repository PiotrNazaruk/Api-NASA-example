import "../styles/index.scss";
console.log("webpack starterkit");
import apod from "./apod";
import smoothScroll from "./smooth";
import insight from './insight';
import marsPhoto from './marsPhoto';
import earth from './earth';

const myApp = (function () {
  let initialPictureDate = "2020-04-25";
  let initialLatitude = 37.234894;
  let initialLongitude = -115.81082;


  const navigation = document.querySelector(".navigation");
  const navigationItemFirst = document.querySelector(".navigation-burger__item--first");
  const navigationItemSecond = document.querySelector(".navigation-burger__item--second");
  const navigationItemThird = document.querySelector(".navigation-burger__item--third");
  const navigationItems = document.querySelectorAll(".navigation-burger__item");
  const navigationLinks = document.querySelectorAll(".navigation__link");

  const translateBurger = () => {
    navigation.classList.toggle("fade");
    navigation.classList.remove("hide");
    navigationItemSecond.classList.toggle("display-none");
    navigationItemFirst.classList.toggle("translateAdd");
    navigationItemThird.classList.toggle("translateMinus");
  };

  const navigationBurger = document
    .querySelector(".navigation-burger")
    .addEventListener("click", translateBurger);
  navigationLinks.forEach((item) => {
    item.addEventListener("click", function () {
      navigation.classList.add("hide");
      navigation.classList.toggle("fade");
      navigationItemSecond.classList.toggle("display-none");
      navigationItemFirst.classList.toggle("translateAdd");
      navigationItemThird.classList.toggle("translateMinus");
    });
  });
  const getDate = () => {
    const input = document.getElementById("input");
    input.addEventListener("change", (e) => {
      initialPictureDate = e.target.value;
      console.log(initialPictureDate);
    });
  };
  const apodButton = () => {
    const button = document.getElementById("button");
    button.addEventListener("click", () => {
      fetchData();
    });
  };
  const getCoords =()=>{
    const inputs = document.querySelectorAll('.earth__input');
   
    inputs.forEach(input =>{
      input.addEventListener('change',(e)=>{
        if(e.target.name =='Latitude') {
          initialLatitude = e.target.value
          console.log(initialLatitude)
        } 
        else if(e.target.name =='Longitude'){
          initialLongitude = e.target.value
          console.log(initialLongitude)
        }
      })
    })

  }
  const submitCoords = ()=>{
    const button = document.getElementById('earth__button')
    button.addEventListener('click',()=>{
      fetchData()
    })
  }
   const fetchData=()=>{
    const EpicApi = fetch(
      "https://api.nasa.gov/insight_weather/?api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT&feedtype=json&ver=1.0",{sol: 0, total_photos: 6, cameras: [ "CHEMCAM", "FHAZ", "MARDI", "RHAZ"]}
    );
    const ApodApi = fetch(
      `https://api.nasa.gov/planetary/apod?date=${initialPictureDate}&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT`
    );
    const MarsPhoto = fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT`
    );
    const EarthApi = fetch(`
    https://api.nasa.gov/planetary/earth/assets?lon=${initialLongitude}&lat=${initialLatitude}&date=2018-01-01&&dim=0.5&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT
    `)
    try {
      Promise.all([EpicApi, ApodApi,MarsPhoto,EarthApi]).then((files) => {
        apod(files[1].json());
        insight(files[0].json());
        marsPhoto(files[2].json())
        earth(files[3].json())
      });
    } catch (error) {
      console.error(error);
    }
  };

  const init = () => {
    fetchData();
    getDate();
    apodButton();
    submitCoords()
    getCoords()
    smoothScroll.init({
      speed: 1000,
      easing: "easeInOutCubic",
      offset: 0,
      updateURL: true,
      callbackBefore: function (toggle, anchor) {},
      callbackAfter: function (toggle, anchor) {},
    });
  };

  return {
    init: init,
  };
})();

myApp.init();
