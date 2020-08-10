//全局变量
var myPlane;
var battleBG = document.getElementById('battleField');

function init() {
    createMyPlane();
    document.onmousemove = function (e) {
        e = e || window.event;
        movePlane(e);
    }

}

function createMyPlane() {
    myPlane = document.createElement('div');
    myPlane.style.width = '116px';
    myPlane.style.height = '92px';
    myPlane.style.background = "url('../img/img_plane_main.png')";
    myPlane.style.backgroundPositionX = '-393px';
    myPlane.style.backgroundPositionY = '-102px';
    myPlane.style.position = 'absolute';
    myPlane.style.top = '600px';
    myPlane.style.left = '198px';
    battleBG.appendChild(myPlane);

}

function movePlane() {

}

init();