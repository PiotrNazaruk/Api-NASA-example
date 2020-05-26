const apod = (prom)=>{
  prom.then(data =>{
      let apoPictureDiv = document.getElementById('apod__image')
      apoPictureDiv.style.backgroundImage=`url(${data.url})`
  })

}
export default apod;
