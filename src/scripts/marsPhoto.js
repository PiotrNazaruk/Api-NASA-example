import insight from "./insight";

const marsPhoto= (prom)=>{
  prom.then(data =>{
      let insightItems = document.querySelectorAll('.insight__picture')
      insightItems.forEach((item,index)=>{
        item.style.backgroundImage = `url(${data.photos[index].img_src})`
  
      })
      // apoPictureDiv.style.backgroundImage=`url(${data.url})`
   
  })

}
export default marsPhoto;