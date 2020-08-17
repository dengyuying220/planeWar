//全局变量
var myPlane;
var wrapper = document.getElementById("wrapper");
var battleBG = document.getElementById("battleField");
var startBG = document.getElementById("startBG");
var distance = 0; //飞行距离
var score = 0; //我的分数
var bulletSpeed = 10;

var isPause = false;
var imgPath = "./img/";
var meter = document.createElement("img");
meter.src = imgPath + "path_f_1.png";
meter.style.width = "20px";
var distanceDiv = document.getElementById("distance");
var scoreDiv = document.getElementById("my_score");
startBG.onclick = function () {
  init();
  setInterval(function () {
    if (!isPause) {
      distance++;
      score++;
      updateDistance();
      if (distance % bulletSpeed === 0) {
        createBullet();
      }
      moveBullet(); //移动子弹
      createEmyPlane();
    }
  }, 300);
};

function createEmyPlane() {
  var emyPlane = document.createElement('div');
  emyPlane.className = 'emyPlane';
  if (distance % 30 === 0) {
    var x = Math.random() * (513 - 98) + 'px';
    emyPlane.style.left = x;
    emyPlane.style.top = '10px';
    battleBG.appendChild(emyPlane);
  }
}

function moveBullet() {
  var myBullets = document.getElementsByClassName('myBullet');
  for (var i = 0; i < myBullets.length; i++) {
    var top = parseInt(myBullets[i].style.top);
    var height = parseInt(myBullets[i].offsetHeight);
    myBullets[i].style.top = top - height + 'px';
    if (top < -height) {
      battleBG.removeChild(myBullets[i]);
    }
  }
}


function createBullet() {
  var myBullet = document.createElement("div");
  myBullet.className = "myBullet";
  myBullet.style.left =
    parseInt(myPlane.style.left) + parseInt(myPlane.style.width) / 2 - 7 + "px";
  myBullet.style.top = parseInt(myPlane.style.top) - 32 + "px";
  battleBG.appendChild(myBullet);
}

function updateDistance() {
  var len = distance.toString();

  battleBG.style.backgroundPosition = "0px " + distance + "px";
  scoreDiv.innerHTML = "";
  distanceDiv.innerHTML = "";
  distanceDiv.appendChild(meter);
  for (var i = len.length - 1, j = 0; i >= 0; i--, j++) {
    var dimg = document.createElement("img");
    dimg.src = imgPath + "path_" + len[i] + ".png";
    distanceDiv.appendChild(dimg);
    var simg = document.createElement("img");
    simg.src = imgPath + "number_" + len[j] + ".png";
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
  var planeX = e.clientX - wrapper.offsetLeft - 116 / 2;
  var planeY = e.clientY - wrapper.offsetTop - 92 / 2;
  planeX = Math.max(-58, Math.min(planeX, 454));
  planeY = Math.max(-46, Math.min(planeY, 722));
  myPlane.style.top = planeY + "px";
  myPlane.style.left = planeX + "px";
  /* var x = document.getElementById("ul1").children[0];
  x.innerHTML = "X :" + e.clientX + "  planeX:" + planeX + " battleBG.offsetLeft:" + wrapper.offsetLeft;
  var y = document.getElementById("ul1").children[1];
  y.innerHTML = "Y :" + e.clientY + "  planeY:" + planeY + " battleBG.offsetTop:" + wrapper.offsetTop; */
}