import "./style.css";

import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Sky } from 'three/addons/objects/Sky.js';
import { Water } from 'three/addons/objects/Water.js';
var clock = new THREE.Clock();
var pos = new THREE.Vector3(); // create once and reuse
var mouseX = window.innerWidth / 2;
var mouseY = window.innerHeight / 2;
var oldX = 0;
var oldY = 0;
var speed = 0.05;
var speedcam = 0.005;
var controls, water, sun;
document.addEventListener("mousemove", function (evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
});

var scene, camera, renderer;
var geometry, material;
var pointer;

init();

function getmouse() {}
function init() {
  sun = new THREE.Vector3();
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



  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });
  renderer.setSize(window.innerWidth, window.innerHeight);

  document.body.appendChild(renderer.domElement);

  const cursor = new THREE.SphereGeometry(12, 4, 2);
  const cursorm = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
  });
  pointer = new THREE.Mesh(cursor, cursorm);
  scene.add(pointer);
  var pos = new THREE.Vector3(
    (mouseX / window.innerWidth) * 800 - 400,
    -(mouseY / window.innerHeight) * 800 + 400,
    0
  );
  pos = new THREE.Vector3(
    (mouseX / window.innerWidth) * 800 - 400,
    -(mouseY / window.innerHeight) * 800 + 400,
    0
  );
  pointer.position.set(pos.x, pos.y, pos.z);
  //   var tween = new TWEEN.Tween(pointer.position);

  const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );
  water = new Water(
      waterGeometry,
      {
          textureWidth: 512,
          textureHeight: 512,
          waterNormals: new THREE.TextureLoader().load( 'textures/waternormals.jpg', function ( texture ) {

              texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

          } ),
          sunDirection: new THREE.Vector3(),
          sunColor: 0xf5c242,
          waterColor: 0x001A1F,
          distortionScale: 15.7,
          fog: true,
      }
  );

  water.rotation.x = - Math.PI / 2;
  water.position.y = -100;

  scene.add( water );

  const sky = new Sky();
  sky.scale.setScalar( 10000 );
  scene.add( sky );

  const skyUniforms = sky.material.uniforms;

  skyUniforms[ 'turbidity' ].value = 10;
  skyUniforms[ 'rayleigh' ].value = 2;
  skyUniforms[ 'mieCoefficient' ].value = 0.005;
  skyUniforms[ 'mieDirectionalG' ].value = 0.8;

  const parameters = {
      elevation: 2,
      azimuth: 220,
  };

  const pmremGenerator = new THREE.PMREMGenerator( renderer );
  const sceneEnv = new THREE.Scene();

  let renderTarget;

  function updateSun() {

      const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
      const theta = THREE.MathUtils.degToRad( parameters.azimuth );

      sun.setFromSphericalCoords( 1, phi, theta );

      sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
      water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

      if ( renderTarget !== undefined ) renderTarget.dispose();

      sceneEnv.add( sky );
      renderTarget = pmremGenerator.fromScene( sceneEnv );
      scene.add( sky );

      scene.environment = renderTarget.texture;

  }

  updateSun();
}

animate();

function animate() {
  //   TWEEN.update();
  requestAnimationFrame(animate);
  let targetx = (mouseX / window.innerWidth) * 800 - 400;
  let targety = -(mouseY / window.innerHeight) * 800 + 400;
  let distx = targetx - pointer.position.x;
  let disty = targety - pointer.position.y;
  //   tween = new TWEEN.Tween(pointer.position).to({x:pos.x, y:pos.y, z:pos.z}, 10000).start();
  //   tween.start();
  //   TWEEN.update();
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

  pointer.position.set(
    pointer.position.x + distx * speed,
    pointer.position.y + disty * speed,
    pos.z
  );

  water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

  camera.lookAt(pointer.position);

  let diffx = pointer.position.x / 2;
  let diffy = pointer.position.y / 2;
  

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
  camera.rotation.z = (distx * speed) / -250;
  console.log(camera.rotation.z);
  renderer.render(scene, camera);
}
