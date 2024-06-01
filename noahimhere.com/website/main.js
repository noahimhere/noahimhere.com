import "./style.css";

import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
// import { Sky } from 'three/addons/objects/Sky.js';
// import { Water } from 'three/addons/objects/Water.js';
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
var clock = new THREE.Clock();
var pos = new THREE.Vector3(); // create once and reuse
var mouseX = window.innerWidth / 2;
var mouseY = window.innerHeight / 2;
var oldX = 0;
var oldY = 0;
var speed = 0.05;
var speedcam = 0.1;
var controls, water, sun;
var camtargetx, camtargety;
var centersphere;
var centergroup;
var herotext;
document.addEventListener("mousemove", function (evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
});

var scene, camera, renderer;
var geometry, material;
var pointer;
var centerpiece;

init();
function getmouse() {}
function init() {
  //BASIC STARTER STUFF
  clock.start();
  clock.running = true;
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });
  scene = new THREE.Scene();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  //HDRI
  const hdrEquirect = new RGBELoader()
    .setPath("textures/")
    .load("studio_small_08_2k.hdr", function (texture) {
      hdrEquirect.mapping = THREE.EquirectangularReflectionMapping;
      var envMap = pmremGenerator.fromEquirectangular(texture).texture;
      scene.background = envMap;
      scene.environment = envMap;
      texture.dispose();
      pmremGenerator.dispose();
    });
    var pmremGenerator = new THREE.PMREMGenerator( renderer );
    pmremGenerator.compileEquirectangularShader();

  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.z = 1000;
  scene.background = hdrEquirect;
  //CENTER MAIN

  const centerpieceo = new THREE.BoxGeometry(500, 500, 500);
  const centerpiecem = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 0.2,
    roughness: 0.5,
    ior: 1.1,
    envMap: hdrEquirect,
    envMapIntensity: 1,
    transmission: 1, // use material.transmission for glass materials
    specularIntensity: 1,
    specularColor: 0xffffff,
    opacity: 1,
    side: THREE.DoubleSide,
    transparent: true,
  });
  centerpiece = new THREE.Mesh(centerpieceo, centerpiecem);

  const centersphereo = new THREE.SphereGeometry(225);
  const centerspherem = new THREE.MeshStandardMaterial({
    color: 0xffffff,
  })
  centersphere = new THREE.Mesh(centersphereo, centerspherem);
  centergroup = new THREE.Group();
  centergroup.add(centerpiece);
  centergroup.add(centersphere);
  scene.add(centergroup);

  //BACKGROUND
  const backgroundg = new THREE.PlaneGeometry(1000, 1000, 1000);
  const platecolor = new THREE.TextureLoader().load(
    "textures/MetalPlates004_4K-JPG/MetalPlates004_4K-JPG_Color.jpg"
  );
  platecolor.wrapS = THREE.RepeatWrapping;
  platecolor.wrapT = THREE.RepeatWrapping;
  platecolor.repeat.set(4, 4);
  const backgroundm = new THREE.MeshStandardMaterial({
    map: platecolor,
  });

  //CURSOR FOR CAMERA PLACEMENT

  const cursor = new THREE.SphereGeometry(0, 4, 2);
  const cursorm = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 1,
  });
  pointer = new THREE.Mesh(cursor, cursorm);
  scene.add(pointer);
  var pos = new THREE.Vector3(
    (mouseX / window.innerWidth) * 500 - 250,
    -(mouseY / window.innerHeight) * 500 + 250,
    0
  );
  pos = new THREE.Vector3(
    (mouseX / window.innerWidth) * 500 - 250,
    -(mouseY / window.innerHeight) * 500 + 250,
    0
  );
  pointer.position.set(pos.x, pos.y, pos.z);

  const textm = new THREE.MeshStandardMaterial({
    color: 0x000000,
  })

  const loader = new GLTFLoader();
  loader.load(
    '/models/herotext.glb',
    function(gltf){
      gltf.scene.traverse((child) => {
        let meshIndex = 0;
        if (child.isMesh){
          console.log("le child is le mesh");

          switch(meshIndex){
            case 0:
              child.material = textm;
              
              scene.add(gltf.scene);
              gltf.scene.rotation.x = 1.5;
              gltf.scene.rotation.y = 0;
              gltf.scene.position.z = -250;
              console.log(gltf.scene.rotation);
              child.name = "herotext";
              console.log(child.name);
              break;
            case 1:
              child.material = new THREE.MeshBasicMaterial({color : 0xffffff});
          }
          meshIndex++;
        }
      })
    }
  )
  


  oldX = mouseX;
  oldY = mouseY;
  //RENDERING
  renderer.toneMappingExposure = 1;
  renderer.gammaInput = true;
  renderer.gammaOutput = true;
}

function generateTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 2;
  canvas.height = 2;

  const context = canvas.getContext("2d");
  context.fillStyle = "white";
  context.fillRect(0, 1, 2, 1);

  return canvas;
}

animate();

function animate() {
  //   TWEEN.update();
  requestAnimationFrame(animate);
  herotext = scene.getObjectByName("herotext", true);

  let targetx = (mouseX / window.innerWidth) * 500 - 250;
  let targety = -(mouseY / window.innerHeight) * 500 + 250;
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
    0
  );

  if (pointer.position.x > 400) {
    pointer.position.x = 400;
  }
  if (pointer.position.x < -400) {
    pointer.position.x = -400;
  }

  if (pointer.position.y > 400) {
    pointer.position.y = 400;
  }
  if (pointer.position.y < -400) {
    pointer.position.y = -400;
  }

  // water.material.uniforms[ 'time' ].value += 1.0 / 60.0;

  camera.lookAt(pointer.position);

  //   camera.position.x = camera.position.x + pointer.position.x / 200;

  let diffx = pointer.position.x / 2;
  let diffy = pointer.position.y / 2;

  //   console.log("IT AINT NAN BOI")
  //   }
  //   else{
  //     pointer.position.set(0, 0, 0);
  //     console.log("its... nan?")
  //   }
  //   console.log(pointer.position);
  camera.lookAt(pointer.position.x, pointer.position.y, pointer.position.z);
  camera.rotation.z = camera.rotation.z + (distx * speed) / -550;
  camtargetx = pointer.position.x * -0.6;
  camtargety = pointer.position.y * -0.4;
  camera.position.x = camtargetx;
  camera.position.y = camtargety;
  centerpiece.position.z = -1;
  let currentime = clock.getElapsedTime();
  if (currentime < 1) {
    currentime *= 50;
    let animrate = -0.5 * currentime ** 2 + 50 * currentime - 9;
    animrate = animrate - 1350;
    centergroup.position.y = animrate;
  } else if (currentime < 3) {
  }
  
  centergroup.rotation.y += 0.01;
  centergroup.rotation.z += 0.01;



  // if(herotext != null){herotext.lookAt(camera)};



  renderer.render(scene, camera);
}
