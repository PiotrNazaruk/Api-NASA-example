import "../styles/index.scss";
console.log("webpack starterkit");
import apod from "./apod";
import smoothScroll from "./smooth";
const myApp = (function () {
  let date = "2020-05-05";
  const navigation = document.querySelector(".navigation");
  const navigationItemFirst = document.querySelector(
    ".navigation-burger__item--first"
  );
  const navigationItemSecond = document.querySelector(
    ".navigation-burger__item--second"
  );
  const navigationItemThird = document.querySelector(
    ".navigation-burger__item--third"
  );
  const navigationItems = document.querySelectorAll(".navigation-burger__item");
  const navigationLinks = document.querySelectorAll(".navigation__link");

  const translateBurger = () => {
    navigation.classList.toggle("fade");
    navigation.classList.remove("hide");
    navigationItemSecond.classList.toggle("display-none");
    navigationItemFirst.classList.toggle("translateAdd");
    navigationItemThird.classList.toggle("translateMinus");
    // navigationItems.forEach((item) => {
    //   item.classList.toggle("dark-background");
    // });
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
      navigationItems.forEach((item) => {
        item.classList.toggle("dark-background");
      });
    });
  });
  const getDate = () => {
    const input = document.getElementById("input");
    input.addEventListener("change", (e) => {
      date = e.target.value;
      console.log(date);
    });
  };
  const apodButton = () => {
    const button = document.getElementById("button");
    button.addEventListener("click", () => {
      fetchData();
    });
  };

  const fetchData = () => {
    const EpicApi = fetch(
      "https://api.nasa.gov/EPIC/api/natural/date/2019-05-30?api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT"
    );
    const ApodApi = fetch(
      `https://api.nasa.gov/planetary/apod?date=${date}&api_key=PCu6RzkaGWhA8vuuf4Onq1rDgRSBhfvlQPeWofgT`
    );
    try {
      Promise.all([EpicApi, ApodApi]).then((files) => {
        apod(files[1].json());
      });
    } catch (error) {
      console.error(error);
    }
  };

  const init = () => {
    fetchData();
    getDate();
    apodButton();
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
