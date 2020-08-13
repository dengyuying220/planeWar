//全局变量
var myPlane;
var battleBG = document.getElementById("battleField");
var startBG = document.getElementById("startBG");
var distance = 0; //飞行距离
var score = 0; //我的分数
var isPause = false;
var imgPath = './img/';
var meter = document.createElement('img');
meter.src = imgPath + 'path_f_1.png';
meter.style.width = '20px';
var distanceDiv = document.getElementById('distance');
var scoreDiv = document.getElementById('my_score');
startBG.onclick = function () {
  init();
  setInterval(function () {
    if (!isPause) {
      distance++;
      score++;
      updateDistance();

    }

  }, 80);

};

function updateDistance() {
  var len = distance.toString();


  battleBG.style.backgroundPosition = '0px ' + distance + 'px';
  scoreDiv.innerHTML = "";
  distanceDiv.innerHTML = "";
  distanceDiv.appendChild(meter);
  for (var i = len.length - 1, j = 0; i >= 0; i--, j++) {
    var dimg = document.createElement('img');
    dimg.src = imgPath + 'path_' + len[i] + '.png';
    distanceDiv.appendChild(dimg);
    var simg = document.createElement('img');
    simg.src = imgPath + 'number_' + len[j] + '.png';
    scoreDiv.appendChild(simg);
  }
}

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