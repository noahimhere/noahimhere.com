import "./style.css";

import * as THREE from "three";

var mouseX, mouseY;
document.addEventListener("mousemove", function (evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
});

var scene, camera, renderer;
var geometry, material, mesh;
var pointer;

init();
animate();
function getmouse() {}
function init() {
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
    color: 0xffffff,
    wireframe: true,
  });
  pointer = new THREE.Mesh(cursor, cursorm);
  scene.add(pointer);
  camera.up
}

function animate() {
  requestAnimationFrame(animate);

  mesh.rotation.x += 0.01;
  mesh.rotation.y += 0.02;

  var vec = new THREE.Vector3(); // create once and reuse
  var pos = new THREE.Vector3(); // create once and reuse
  pos = new THREE.Vector3((mouseX / window.innerWidth) * 800 - 400, -(mouseY / window.innerHeight) * 800 + 400, 0);
  // vec.set(
  //   ( ClientX / window.innerWidth ) * 2 - 1,
  //   - ( CcreenY / window.innerHeight ) * 2 + 1,
  //   0.5,
  // );

  // vec.unproject( camera );

  // vec.sub( camera.position ).normalize();

  // var distance = - camera.position.z / vec.z;

  // pos.copy( camera.position ).add( vec.multiplyScalar( distance ) );
  pointer.position.set(pos.x, pos.y, pos.z);
  console.log(pointer.position);
  camera.lookAt(pointer.position.x, pointer.position.y, pointer.position.z);

  renderer.render(scene, camera);
}
