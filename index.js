import * as THREE from "./js/build/three.module.js";

import { TWEEN } from "./js/jsm/tween.module.min.js";
import { OrbitControls } from "./js/jsm/OrbitControls.js";
// import { TrackballControls } from "./js/jsm/TrackballControls.js";
// import { TrackballControls } from "./js/jsm/FirstPersonControls.js";
import { CSS3DRenderer, CSS3DObject } from "./js/jsm/CSS3DRenderer.js";

var camera, scene, renderer;
var controls;

var objects = [];
var targets = { grid: [] };

var realWindow = window.parent || window;

// const onKeyDown = (e) => {
//   console.log(e)
//   console.log(controls)
//   // controls.position.x += 0.1;
// }
// realWindow.addEventListener('keydown', onKeyDown, false);


const openRoom = (e) => {

  const target = e.target

  const nombre = target.childNodes[0].innerHTML;
  const titulo = target.childNodes[1].innerHTML;
  const detalles = target.childNodes[2].innerHTML;
  const link = target.childNodes[3].innerHTML;
  const descripcion = target.childNodes[4].innerHeight;
  // const url = `./pulsar.html?nombre=${nombre}&titulo=${titulo}&detalles=${detalles}`;
  const url = `./room.html?nombre=${nombre}&titulo=${titulo}&detalles=${detalles}&link=${link}&descripcion=${descripcion}`;
  window.open(url, "_self");


}

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 9000;

  scene = new THREE.Scene();

  // Crea las fichas de artistas
  for (var i = 0; i < artistas.length; i += 1) {

    // La ficha que contine los datos del artista
    var artista = document.createElement("div");

    artista.onclick = (e) => openRoom(e);

    artista.ontouchstart = (e) => openRoom(e);

    artista.className = "artista";
    // artista.style.backgroundColor = "rgba(0,0,0," + (Math.random() * 0.5 + 0.25) + ")";
    //artista.style.backgroundColor = "rgba(0,0,0,0.8)";

    var nombre = document.createElement("div");
    nombre.className = "nombre";
    nombre.textContent = artistas[i].nombre + "-" + i;
    artista.appendChild(nombre);

    var titulo = document.createElement("div");
    titulo.className = "titulo";
    titulo.textContent = artistas[i].titulo + "-" + (i * 2);
    artista.appendChild(titulo);

    var detalles = document.createElement("div");
    detalles.className = "detalles";
    detalles.innerHTML = artistas[i].fecha + "<br>" + artistas[i].duracion + "<br>" + artistas[i].tipo;
    artista.appendChild(detalles);

    var link = document.createElement("div");
    link.className = "link";
    link.textContent = artistas[i].link;
    artista.appendChild(link);

    var descripcion = document.createElement("div");
    descripcion.className = "descripcion";
    link.textContent = artistas[i].descripcion;
    artista.appendChild(descripcion);



    // Posición inicial
    var object = new CSS3DObject(artista);
    object.position.x = Math.random() * 9000 - 1000;
    object.position.y = Math.random() * 9000 - 2000;
    object.position.z = Math.random() * 9000 - 2000;

    scene.add(object);

    objects.push(object);

  }

  // grid

  for (var i = 0; i < objects.length; i++) {

    var object = new THREE.Object3D();

    object.position.x = (i % 5) * 400 - 800;
    object.position.y = -(Math.floor(i / 5) % 5) * 400 + 800;
    object.position.z = Math.floor(i / 25) * 1100 - 250;

    targets.grid.push(object);
  }

  console.log("targets: ", targets)




  // Render

  renderer = new CSS3DRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // Control

  // controls = new TrackballControls(camera, renderer.domElement);
  controls = new OrbitControls(camera, renderer.domElement);
  controls.minDistance = 300;
  controls.maxDistance = 6000;
  controls.addEventListener("change", render);

  var button = document.getElementById("reset");

  button.addEventListener(
    "click",
    function () {
      controls.reset();
    },
    false
  );

  // Animación para recolocar
  transform(targets.grid, 3000);

  window.addEventListener("resize", onWindowResize, false);
}

function transform(targets, duration) {

  TWEEN.removeAll();

  for (var i = 0; i < objects.length; i++) {

    var object = objects[i];
    var target = targets[i];

    new TWEEN.Tween(object.position)
      .to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Cubic.InOut)
      .start();

    new TWEEN.Tween(object.rotation)
      .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
      .easing(TWEEN.Easing.Cubic.Out)
      .start();
  }

  new TWEEN.Tween(this)
    .to({}, duration * 4)
    .onUpdate(render)
    .start();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);

  render();
}

function animate() {
  requestAnimationFrame(animate);

  TWEEN.update();

  controls.update();
}

function render() {
  renderer.render(scene, camera);
}

// Get the modal
var modal = document.getElementById("infoExposition");

// Get the button that opens the modal
var btn = document.getElementById("infoExpo");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
