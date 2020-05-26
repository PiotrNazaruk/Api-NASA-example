const apod = (prom)=>{
  prom.then(data =>{
      let img = document.getElementById('img')
      img.src = data.url
  })

}
export default apod;
