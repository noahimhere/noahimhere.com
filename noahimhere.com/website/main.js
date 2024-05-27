import "./style.css";

import * as THREE from "three";
import * as TWEEN from '@tweenjs/tween.js'
var clock = new THREE.Clock();
var pos = new THREE.Vector3(); // create once and reuse
var mouseX = 0;
var mouseY = 0;
var oldX = 0;
var oldY = 0;
var tween;
document.addEventListener("mousemove", function (evt) {
    mouseX = evt.clientX;
    mouseY = evt.clientY;
    
  });


var scene, camera, renderer;
var geometry, material, mesh;
var pointer;

init();

function getmouse() {}
function init() {
  clock.start();
  clock.running = true;

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 1000;

  geometry = new THREE.BoxGeometry(200, 200, 200);
  const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true,
  });
  

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const cursor = new THREE.SphereGeometry(12, 4 , 2);
  const cursorm = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
  });
  pointer = new THREE.Mesh(cursor, cursorm);
  scene.add(pointer);
  var pos = new THREE.Vector3((mouseX / window.innerWidth) * 800 - 400, -(mouseY / window.innerHeight) * 800 + 400, 0);
  pos = new THREE.Vector3((mouseX / window.innerWidth) * 800 - 400, -(mouseY / window.innerHeight) * 800 + 400, 0);
  pointer.position.set(pos.x, pos.y, pos.z);
//   var tween = new TWEEN.Tween(pointer.position);
}

animate();

function animate() {
//   TWEEN.update();
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;
  
  
  pos = new THREE.Vector3((mouseX / window.innerWidth) * 800 - 400, -(mouseY / window.innerHeight) * 800 + 400, 0);
  tween = new TWEEN.Tween(pointer.position);
  // vec.set(
  //   ( ClientX / window.innerWidth ) * 2 - 1,
  //   - ( CcreenY / window.innerHeight ) * 2 + 1,
  //   0.5,
  // );

  // vec.unproject( camera );

  // vec.sub( camera.position ).normalize();

  // var distance = - camera.position.z / vec.z;

  // pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
//   if(isNaN(pos.x) && isNaN(pos.y) == false){

     pointer.position.set(pos.x, pos.y, pos.z);
     camera.lookAt(pointer.position);
    
    oldX = mouseX;
    oldY = mouseY;
  
  
//   console.log("IT AINT NAN BOI")
//   }
//   else{
//     pointer.position.set(0, 0, 0);
//     console.log("its... nan?")
//   }
//   console.log(pointer.position);
//   console.log(clock.getElapsedTime());

  camera.lookAt(pointer.position.x, pointer.position.y, pointer.position.z);

  renderer.render(scene, camera);
}
