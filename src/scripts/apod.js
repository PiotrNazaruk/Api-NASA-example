const apod = (prom)=>{
  prom.then(data =>{
    console.log(data)
    let paragraph = document.createElement('img')
    paragraph.src = data.url;
    document.getElementById('data').appendChild(paragraph)
  })
}
export default apod;
