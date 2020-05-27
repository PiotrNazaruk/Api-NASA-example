const insight = (prom) => {
  prom.then((data) => {
    const solKeys = [...data.sol_keys];
    console.log(data[solKeys[0]]);
    solKeys.forEach((element) => {
      const insightDataDiv = document.getElementById("insight__data");
      const div = document.createElement("div");
      div.classList.add("insight__div");
      const markup = createMarkup(data[element], element);
      div.innerHTML = markup;
      insightDataDiv.appendChild(div);
    });
  });
  const createMarkup = (data, element) => {
    return `
   
  <div class="insight__picture"> </div>
  <h3>SOL ${element}</h3>
  <div class="insight__content"> 
 
  <span>${data.First_UTC.slice(0, 10)}</span>
  <span>Low: ${data.AT.mn.toFixed(0)}° F</span>
  <span>High: ${data.AT.mx.toFixed(0)}° F</span>
  </div>
  `;
  };
};
export default insight;
