const colorList = document.getElementsByClassName("colorsList")[0];
const colorInput = document.getElementById("colorInput");

document.getElementById("btn").addEventListener("click", () => {
  const random = Math.random();
  fetch("https://www.colr.org/json/color/random?nocache=" + random)
    .then((response) => response.json())
    .then((data) => {
      const randomColor = "#" + data.new_color;
      addColor(randomColor, "bottom");
    });
});

colorInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    const newColor = colorInput.value.trim();
    if(/#[0-9A-Fa-f]{6}/.test(newColor))
      addColor(newColor, "top");
    else 
      alert("Invalid color");
    colorInput.value = "";
  }
});

addColor = (newColor, position) => {
  const colorItem = document.createElement("div");
  colorItem.className = "colorBox";

  const arrowUp = document.createElement("div");
  arrowUp.className = "fa fa-arrow-up";
  arrowUp.addEventListener("click", () => {
    const previousSibling = colorItem.previousSibling;
    if (previousSibling) {
      colorList.insertBefore(colorItem, previousSibling);
    }
  });

  const arrowDown = document.createElement("div");
  arrowDown.className = "fa fa-arrow-down";
  arrowDown.addEventListener("click", () => {
    const nextSibling = colorItem.nextSibling;
    if (nextSibling) {
      colorList.insertBefore(colorItem, nextSibling.nextSibling);
    }
  });

  const arrows = document.createElement("div");
  arrows.className = "arrows";
  arrows.appendChild(arrowUp);
  arrows.appendChild(arrowDown);

  const color = document.createElement("div");
  color.className = "color";
  color.style.backgroundColor = newColor;
  color.innerHTML = newColor;

  const trash = document.createElement("div");
  trash.className = "fa fa-trash";
  trash.addEventListener("click", () => {
    colorList.removeChild(colorItem);
  });

  colorItem.appendChild(arrows);
  colorItem.appendChild(color);
  colorItem.appendChild(trash);

  if (position == "bottom") 
    colorList.appendChild(colorItem);
  else 
    colorList.insertBefore(colorItem, colorList.firstChild);
};
