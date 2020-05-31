import * as THREE from "./js/build/three.module.js";

// import { TrackballControls } from "./js/jsm/TrackballControls.js";
import { OrbitControls } from "./js/jsm/OrbitControls.js";

import {
  CSS3DRenderer,
  CSS3DObject,
} from "./js/jsm/CSS3DRenderer.js";

function getUrlVars() {
  const vars = {};

  window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (
    m,
    key,
    value
  ) {
    vars[key] = decodeURIComponent(value);
  });

  return vars;
}

const vars = getUrlVars();

const nombre = vars.nombre;

const titulo = vars.titulo;

const detalles = vars.detalles;

// function setupKeyLogger() {
//   document.onkeydown = function (e) {
//     console.log(e);
//     camera.position.z + 10
//   }
// }

// setupKeyLogger();

var camera, scene, renderer;
var controls;

var Element = function (content, x, y, z, ry, rx, type) {

  var div = document.createElement("div");
  div.style.width = "480px";
  div.style.height = "360px";
  div.style.backgroundColor = "#000";

  if (type === "video") {
    var divVideo = document.createElement("div");
    divVideo.style.width = "480px";
    divVideo.style.height = "360px";
    divVideo.style.backgroundColor = "#000";
    divVideo.style.border = "2px rgba(0, 255, 255, 0.5) solid";
    divVideo.style.display = "flex";
    divVideo.style.alignItems = "center";
    divVideo.style.justifyContent = "center";
    var video = document.createElement('video');
    video.src = content;
    video.muted = true;
    video.autoplay = true;
    video.loop = true;
    video.style.width = "100%";
    video.style.height = "100%";
    divVideo.appendChild(video);
    div.appendChild(divVideo);
  }

  if (type === "nombre") {
    var divText = document.createElement("div");
    divText.style.width = "480px";
    divText.style.height = "360px";
    divText.style.color = "#000";
    divText.style.display = "flex";
    divText.style.alignItems = "center";
    divText.style.justifyContent = "center";
    divText.style.backgroundImage = "url(./assets/brick_diffuse.jpg)";
    divText.style.backgroundSize = "200px";
    var text = document.createElement("p");
    text.innerHTML = content;
    text.style.fontSize = "35px";
    divText.appendChild(text);
    div.appendChild(divText);
  }

  if (type === "titulo") {
    var divText = document.createElement("div");
    divText.style.width = "480px";
    divText.style.height = "360px";
    divText.style.color = "#000";
    divText.style.display = "flex";
    divText.style.alignItems = "center";
    divText.style.justifyContent = "center";
    divText.style.backgroundImage = "url(./assets/brick_diffuse.jpg)";
    divText.style.backgroundSize = "200px";
    var text = document.createElement("p");
    text.innerHTML = content;
    text.style.fontSize = "50px";
    text.style.lineHeight = "102%";
    divText.appendChild(text);
    div.appendChild(divText);
  }

  if (type === "image") {
    var img = new Image(480, 360);
    img.src = content;
    img.style.border = "2px rgba(0, 255, 255, 0.5) solid";
    div.appendChild(img);

  }

  if (type === "suelo") {
    var divText = document.createElement("div");
    divText.style.width = "480px";
    divText.style.height = "480px";
    divText.style.color = "#000";
    divText.style.border = "2px rgba(0, 255, 255, 0.5) solid";
    divText.style.display = "flex";
    divText.style.alignItems = "center";
    divText.style.justifyContent = "center";
    divText.style.backgroundImage = "url(./assets/hardwood2_diffuse.jpg)";
    divText.style.backgroundSize = "200px";
    var text = document.createElement("p");
    text.style.fontSize = "50px";
    text.style.lineHeight = "102%";
    divText.appendChild(text);
    div.appendChild(divText);
  }

  var object = new CSS3DObject(div);
  object.position.set(x, y, z);
  object.rotation.x = rx;
  object.rotation.y = ry;

  return object;
};

init();
animate();

function init() {
  var container = document.getElementById("container");

  camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    1,
    5000
  );
  // camera.position.set(500, 350, 750);
  camera.position.set(0, 5, 240);

  scene = new THREE.Scene();

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  var group = new THREE.Group();

  // Aquí se definen las paredes y el suelo.
  group.add(new Element("./assets/soliman.jpg", 0, 0, -240, 0, 0, "image"));
  group.add(new Element("./assets/kinect.mp4", -240, 0, 0, Math.PI / 2, 0, "video"));
  group.add(new Element(nombre, 0, 0, 240, Math.PI, 0, "nombre"));
  group.add(new Element(titulo, 240, 0, 0, -Math.PI / 2, 0, "titulo"));
  group.add(new Element(titulo, 0, -180, -60, 0, -Math.PI / 2, "suelo"));
  scene.add(group);

  // controls = new TrackballControls(camera, renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.rotateSpeed = 4;


  window.addEventListener("resize", onWindowResize, false);

  // Block iframe events when dragging camera

  var blocker = document.getElementById("blocker");
  blocker.style.display = "none";

  controls.addEventListener("start", function () {
    blocker.style.display = "";
  });
  controls.addEventListener("end", function () {
    blocker.style.display = "none";
  });
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}