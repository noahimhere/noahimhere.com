import "./style.css";

import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
// import { Sky } from 'three/addons/objects/Sky.js';
// import { Water } from 'three/addons/objects/Water.js';
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "./node_modules/gsap/index.js";
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
var menuon = false;
document.addEventListener("mousemove", function (evt) {
  mouseX = evt.clientX;
  mouseY = evt.clientY;
});
import $ from 'jquery';
window.$ = $;
var scene, camera, renderer;
var geometry, material;
var pointer;
var centerpiece;
var ran = 0;
var changing = [["NOAH KIM", "NOAHIMHERE", "NOAH KIM", "NOAHIMHERE"],["FRONTEND DEVELOPER", "BLENDER ARTIST", "STUDENT", "ASTRONOMER"]]


const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

var scrambling = false;



import * as POSTPROCESSING from "postprocessing"
import { SSGIEffect, TRAAEffect, MotionBlurEffect, VelocityDepthNormalPass } from "realism-effects"



var temp = "";

init();
function getmouse() {}
function init() {
  //BASIC STARTER STUFF
  clock.start();
  clock.running = true;
  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha:true,
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
      // scene.background = envMap;
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
  // scene.add(centergroup);

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
    (mouseX / window.innerWidth) * 250 - 125,
    -(mouseY / window.innerHeight) * 250 + 125,
    0
  );
  pos = new THREE.Vector3(
    (mouseX / window.innerWidth) * 250 - 125,
    -(mouseY / window.innerHeight) * 250 + 125,
    0
  );
  pointer.position.set(pos.x, pos.y, pos.z);

  const textm = new THREE.MeshBasicMaterial({
    color: 0x4020b5,
    wireframe: true,
  })
  const herotextm = new THREE.MeshBasicMaterial({
    color:0xffffff,
  })

  const loader = new GLTFLoader();
  loader.load(
    '/models/IBM.glb',
    function(gltf){
      gltf.scene.traverse((child) => {
        let meshIndex = 0;
        if (child.isMesh){

          switch(meshIndex){
            case 0:
              child.material = textm;
              
              scene.add(gltf.scene);
              gltf.scene.rotation.x = -.05;
              gltf.scene.rotation.y = -2.15;
              gltf.scene.position.z = -150;
              gltf.scene.position.y = -150;
              // gltf.scene.position.x = -350;
              console.log(gltf.scene.rotation);
              console.log(child.name);
              break;
            case 1:
              child.material = new THREE.MeshBasicMaterial({color : 0xffffff, wireframe: true,});
          }
          meshIndex++;
        }
      })
    }
  )
  // loader.load(
  //   '/models/herotext.glb',
  //   function(gltf){
  //     gltf.scene.traverse((child) => {
  //       let meshIndex = 0;
  //       if (child.isMesh){

  //         switch(meshIndex){
  //           case 0:
  //             child.material = herotextm;
              
  //             scene.add(gltf.scene);
  //             gltf.scene.rotation.x = 1.5;
  //             gltf.scene.position.z = -550;
  //             gltf.scene.position.y = 0;
  //             console.log(gltf.scene.rotation);
  //             console.log(child.name);
  //             break;
  //           case 1:
  //             child.material = new THREE.MeshBasicMaterial({color : 0xffffff, wireframe: true,});
  //         }
  //         meshIndex++;
  //       }
  //     })
  //   }
  // )
  


  oldX = mouseX;
  oldY = mouseY;
  //RENDERING
  renderer.setClearColor( 0x000000, 0 ); // the default
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

  let targetx = (mouseX / window.innerWidth) * 200 - 100;
  let targety = -(mouseY / window.innerHeight) * 200 + 100;
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
  camtargetx = pointer.position.x * -1.5;
  camtargety = pointer.position.y * -2;
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

  console.log(Math.round(clock.getElapsedTime()));
}


const lexicon = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var mode = 0;
window.setInterval(function(){
  let iters = 0;
  temp = "";
  const scramble = document.getElementsByClassName("scrambletime");
  for(let i = 0; i < 2; i++){
    const interval = setInterval(() =>{
    //changing the first one's text. This is definitely not the best way of doing it in terms of optimization, but I can't think of a better way for now.
    scramble[i].innerText = changing[i][mode];
    scramble[i].innerText = scramble[i].innerText.split("")
      .map((lexicons, index) => {
        if(index < iters){
          return changing[i][mode][index];
        }
        return lexicon[Math.floor(Math.random() * 26)]
        })
      .join("");
      if(iters >= changing[i][mode].length) clearInterval(interval);


      iters += 1 / 2;

    }, 25);
  }


  if(mode >= 3){
    mode = 0;
  }
  else{
  mode += 1;
  }
}, 3000);

const titletext = document.getElementById("titletext")

//ESC MENU

document.body.addEventListener('keydown', function(e) {
  if (e.key == "Escape" && menuon == false) {
    gsap.to("#menu", {x:window.innerWidth})
    menuon = true;
  }
  else if (e.key == "Escape" && menuon == true){
    gsap.to("#menu", {x:-window.innerWidth})
    menuon = false
  }
});

document.addEventListener('DOMContentLoaded', (event) => {
  let h1s = document.getElementsByClassName("scramblehover");
  let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // Ensure letters is defined

  function createHoverHandler() {
    let interval;

    return function(event) {
      let iteration = 0;
      clearInterval(interval);

      interval = setInterval(() => {
        event.target.innerText = event.target.innerText
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return event.target.dataset.value[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join("");

        if (iteration >= event.target.dataset.value.length) {
          clearInterval(interval);
        }

        iteration += 1 / 3;
      }, 30);
    };
  }

  console.log(h1s);
  for (let i = 0; i < h1s.length; i++) {
    h1s[i].onmouseover = createHoverHandler();
  }
});


const blob = document.getElementById("blob");
// const mixer = document.getElementById("mixer");

document.body.onpointermove = event => {
  const {clientX, clientY} = event;
  blob.animate({
    left: `${clientX}px`,
    top: `${clientY}px`,
  }, {duration: 750, fill: "forwards"});
  // mixer.animate({
  //   left: `${clientX}px`,
  //   top: `${clientY}px`,
  // }, {duration: 3000, fill: "forwards"});
}
