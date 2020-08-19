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
      moveEmyPlane();
      bulletCollide();
    }
  }, 300);
};

function bomb(bombPlane) {

  bombPlane.className = 'bombPlane';
  bombPlane.style.backgroundImage = "url(./img/wsparticle_06.png)";
  bombPlane.style.backgroundPosition = "center";
  bombPlane.style.backgroundRepeat = "no-repeat";
  setTimeout(function () {
    bombPlane.style.backgroundImage = "url(./img/wsparticle_07.png)";
    console.log(1);
  }, 200);
  setTimeout(function () {
    battleBG.removeChild(bombPlane);
    console.log(2);
  }, 300);
}

function bulletCollide() {
  var emyPlanes = document.getElementsByClassName('emyPlane');
  var myBullets = document.getElementsByClassName('myBullet');
  for (var i = 0; i < emyPlanes.length; i++) {
    for (var j = 0; j < myBullets.length; j++) {
      var bLeft = parseInt(myBullets[j].style.left);
      var bTop = parseInt(myBullets[j].style.top);
      var epLeft = parseInt(emyPlanes[i].style.left);
      var epTop = parseInt(emyPlanes[i].style.top);
      if ((epLeft - bLeft) < 14 && (epLeft - bLeft) > -98) {
        var dif = bTop - epTop;
        if ((dif > 0) ? (dif < 76) : (dif > -32)) {
          bomb(emyPlanes[i])
          console.log('击中');
        }
      }
    }
  }
}

function moveEmyPlane() {
  var emyPlanes = document.getElementsByClassName('emyPlane');
  for (var i = 0; i < emyPlanes.length; i++) {
    var top = parseInt(emyPlanes[i].style.top);
    emyPlanes[i].style.top = top + emyPlanes[i].speed + 'px';
    if (parseInt(emyPlanes[i].style.top) > 768) {
      battleBG.removeChild(emyPlanes[i]);
    }
  }
}

function createEmyPlane() {
  var emyPlane = document.createElement('div');
  emyPlane.className = 'emyPlane';
  if (distance % 5 === 0) {
    var x = Math.random() * (513 - 98) + 'px';
    emyPlane.style.left = x;
    emyPlane.style.top = '-10px';
    emyPlane.speed = 5;
    //emyPlane.hp = 1;
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