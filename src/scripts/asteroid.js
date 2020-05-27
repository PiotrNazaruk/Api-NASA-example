const asteroid = (prom , todayDate)=>{
  prom.then(data =>{
    let day = todayDate;
    let object = data;
    let nearEarthObjects = object.near_earth_objects[day];
    console.log(nearEarthObjects)
    for(let i=0; i <4; i++){
      const asteroidContent = document.getElementById("asteroids__content");
      const div = document.createElement("div");
      const markup = createMarkup(nearEarthObjects[i]);
      div.classList.add('asteroid__box')
      div.innerHTML = markup;
      asteroidContent.appendChild(div);
    }
  })
  const createMarkup = (data) => {
    const km = data.close_approach_data[0].miss_distance.kilometers;
    const estimatedDiameters = data.estimated_diameter.kilometers.estimated_diameter_max;
    let estimatedFixed = parseFloat(estimatedDiameters).toFixed(2)
    let pureKm = parseInt(km)
    console.log(pureKm)
    return `
   

    <span><b>name:</b> ${data.name}</span>
    <span><b>danger</b> ${data.is_potentially_hazardous_asteroid ? 'hazardous': 'not hazardous'}</span>
    <span><b>istance:</b> ${pureKm} km</span>
    <span><b>estimated-diameter:</b> ${estimatedFixed} km</span>

  `;
  };
}
export default asteroid;
