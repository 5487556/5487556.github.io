let cursor = document.getElementById("myCursor");
let circle = document.getElementById("circle");

window.addEventListener("mousemove",function(e){
  let x = e.clientX;
  let y = e.clientY;
  cursor.style.left = x-27+"px";
  cursor.style.top = y-27+"px";
  circle.style.left = x-17+"px";
  circle.style.top = y-17+"px";
  
})