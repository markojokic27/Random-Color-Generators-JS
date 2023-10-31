const buttonWrapperElements = document.querySelectorAll(".buttonWrapper");
const buttonWrapperTop = buttonWrapperElements[0];
const buttonWrapperBottom = buttonWrapperElements[1];

function wc_hex_is_light(color) {
  const hex = color.replace("#", "");
  const c_r = parseInt(hex.substr(0, 2), 16);
  const c_g = parseInt(hex.substr(2, 2), 16);
  const c_b = parseInt(hex.substr(4, 2), 16);
  const brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}
const changeColor = (color, button) => {
  button.style.backgroundColor = color;
  button.textContent = color;
  button.style.color = wc_hex_is_light(color) ? "black" : "white";
  button.textContent = button.textContent.toUpperCase();
  button.style.fontWeight = "bold";
  button.style.fontFamily = "Times New Roman";
  
};

const getRandomColor = async (btn) => {
  const random = Math.random();

  try {
    const response = await fetch("https://www.colr.org/json/color/random?nocache=" + random)
      
    const data = await response.json()

    const randomColor = "#" + data.new_color;
    if(randomColor.length != 7){
      console.log(btn.backgroundColor);
      console.log(btn.textContent.length);
      getRandomColor(btn);
    }
    changeColor(randomColor, btn);
  } catch (error) {
    console.log(error);
    
  }
};

for (let i = 0; i < 4; i++) {
  const newButtonTop = document.createElement("button");
  newButtonTop.className = "button";
  getRandomColor(newButtonTop);
  newButtonTop.addEventListener("click", () => getRandomColor(newButtonTop));
  buttonWrapperTop.appendChild(newButtonTop);
}

for (let i = 0; i < 2; i++) {
  const newButtonBottom = document.createElement("button");
  newButtonBottom.className = "button";
  getRandomColor(newButtonBottom);
  newButtonBottom.addEventListener("click", () =>
    getRandomColor(newButtonBottom)
  );
  buttonWrapperBottom.appendChild(newButtonBottom);
}
