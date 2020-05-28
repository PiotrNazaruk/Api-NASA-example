import "../styles/index.scss";
console.log("webpack starterkit");
import apod from "./apod";
import smoothScroll from "./smooth";
import insight from "./insight";
import marsPhoto from "./marsPhoto";
import earth from "./earth";
import asteroid from "./asteroid";

const myApp = (function () {
  const data = {
    initialPictureDate: "2020-04-25",
    initialLatitude: 37.234894,
    initialLongitude: -115.81082,
    initialAsteroidDay: new Date().toISOString().slice(0, 10),
  };
  const domElements = {
    navigation: document.querySelector(".navigation"),
    navigationItemFirst: document.querySelector(
      ".navigation-burger__item--first"
    ),
    navigationItemSecond: document.querySelector(
      ".navigation-burger__item--second"
    ),
    navigationItemThird: document.querySelector(
      ".navigation-burger__item--third"
    ),
    navigationItems: document.querySelectorAll(".navigation-burger__item"),
    navigationLinks: document.querySelectorAll(".navigation__link"),
    buttons: document.querySelectorAll(".button_base"),
    inputs: document.querySelectorAll("#input"),
  };

  const translateBurger = () => {
    const {
      navigation,
      navigationItemFirst,
      navigationItemSecond,
      navigationItemThird,
    } = domElements;
    navigation.classList.toggle("fade");
    navigation.classList.remove("hide");
    navigationItemSecond.classList.toggle("display-none");
    navigationItemFirst.classList.toggle("translateAdd");
    navigationItemThird.classList.toggle("translateMinus");
  };

  const navigationBurger = document
    .querySelector(".navigation-burger")
    .addEventListener("click", translateBurger);
      domElements.navigationLinks.forEach((item) => {
        item.addEventListener("click", function () {
          navigation.classList.add("hide");
          navigation.classList.toggle("fade");
          navigationItemSecond.classList.toggle("display-none");
          navigationItemFirst.classList.toggle("translateAdd");
          navigationItemThird.classList.toggle("translateMinus");
    });
  });

  const getDataFromInputs = () => {
    const inputs = document.querySelectorAll("#input");
    console.log(inputs);
    inputs.forEach((input) => {
      if (input.type == "date") {
        input.addEventListener("change", (e) => {
          data.initialPictureDate = e.target.value;
          console.log(data.initialPictureDate);
        });
      } else if (input.type == "number") {
        input.addEventListener("change", (e) => {
          if (e.target.name == "Latitude") {
            data.initialLatitude = e.target.value;
            console.log(data.initialLatitude);
          } else if (e.target.name == "Longitude") {
            data.initialLongitude = e.target.value;
            console.log(data.initialLongitude);
          }
        });
      }
    });
  };

  const renderData = (buttons) => {
    let btns = buttons;
    btns.forEach((button) => {
      button.addEventListener("click", () => {
        fetchData();
      });
    });
  };
  const fetchData = () => {
    const {
      initialPictureDate,
      initialLongitude,
      initialLatitude,
      initialAsteroidDay,
    } = data;
    const EpicApi = fetch(
      "https://api.nasa.gov/insight_weather/?api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT&feedtype=json&ver=1.0",
      { sol: 0, total_photos: 6, cameras: ["CHEMCAM", "FHAZ", "MARDI", "RHAZ"] }
    );
    const ApodApi = fetch(
      `https://api.nasa.gov/planetary/apod?date=${initialPictureDate}&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT`
    );
    const MarsPhoto = fetch(
      `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&page=2&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT`
    );
    const EarthApi = fetch(`
    https://api.nasa.gov/planetary/earth/assets?lon=${initialLongitude}&lat=${initialLatitude}&date=2018-01-01&&dim=0.5&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT
    `);
    const Asteroid = fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${initialAsteroidDay}&end_date=${initialAsteroidDay}&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT`
    );
    try {
      Promise.all([EpicApi, ApodApi, MarsPhoto, EarthApi, Asteroid]).then(
        (files) => {
          apod(files[1].json());
          insight(files[0].json());
          marsPhoto(files[2].json());
          earth(files[3].json());
          asteroid(files[4].json(), initialAsteroidDay);
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const init = () => {
    const { inputs, buttons } = domElements;
    fetchData();
    getDataFromInputs(inputs);
    renderData(buttons);
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
