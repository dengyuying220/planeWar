//全局变量
var myPlane;
var battleBG = document.getElementById("battleField");
var startBG = document.getElementById("startBG");
function init() {
  startBG.style.display = "none";
  createMyPlane();
  document.onmousemove = function (e) {
    e = e || window.event;
    movePlane(e);
  };
}

function createMyPlane() {
  myPlane = document.createElement("div");
  myPlane.style.width = "116px";
  myPlane.style.height = "92px";
  myPlane.style.background = "url('../img/img_plane_main.png')";
  myPlane.style.backgroundPositionX = "-393px";
  myPlane.style.backgroundPositionY = "-102px";
  myPlane.style.position = "absolute";
  myPlane.style.top = "600px";
  myPlane.style.left = "198px";
  battleBG.appendChild(myPlane);
}

function movePlane(e) {
  var planeX = e.clientX - battleBG.offsetLeft - 116 / 2;
  var planeY = e.clientY - battleBG.offsetTop - 92 / 2;
  planeX = Math.max(-58, Math.min(planeX, 454));
  planeY = Math.max(-46, Math.min(planeY, 722));
  myPlane.style.top = planeY + "px";
  myPlane.style.left = planeX + "px";
}

startBG.onclick = function () {
  init();
};
