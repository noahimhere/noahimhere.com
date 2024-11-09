import "./style.css";
// import barba from '@barba/core';
import * as THREE from "three";
// import { Sky } from 'three/addons/objects/Sky.js';
// import { Water } from 'three/addons/objects/Water.js';
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap/index.js";
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
var geometry, material;
var pointer;
var centerpiece;
var ran = 0;
var changing = [["NOAH KIM", "NOAHIMHERE", "NOAH KIM", "NOAHIMHERE"],["FRONTEND DEVELOPER", "BLENDER ARTIST", "STUDENT", "ASTRONOMER"]]

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

var scrambling = false;




const titletext = document.getElementById("titletext")

//ESC MENU

document.body.addEventListener('keydown', function(e) {
  if (e.key == "Escape" && menuon == false) {
    gsap.to("#HOME", {x:window.innerWidth, delay: 0});
    gsap.to("#WORKS", {x:window.innerWidth, delay: 0.1});
    gsap.to("#INFORMATION", {x:window.innerWidth, delay: 0.2});
    gsap.to("#CONTACT", {x:window.innerWidth, delay: 0.3});
    gsap.to("#menu", {backdropFilter: 'blur(200px)', delay: 0.4});
    menuon = true;
  }
  else if (e.key == "Escape" && menuon == true){
    gsap.to("#HOME", {x:-window.innerWidth, delay: 0});
    gsap.to("#WORKS", {x:-window.innerWidth, delay: 0.1});
    gsap.to("#INFORMATION", {x:-window.innerWidth, delay: 0.2});
    gsap.to("#CONTACT", {x:-window.innerWidth, delay: 0.3});
    gsap.to('#menu', {backdropFilter: 'blur(0px)', delay: 0.4});
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

        iteration += 1 / 2;
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
blob.style.display = "none"
document.body.onpointermove = event => {
  blob.style.display = "inline"
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



//transition

function pagetrans(){
  const threejs = document.getElementById("bg");
  if(threejs){threejs.style.display = "none"};
}

function pageanim(){
  const threejs = document.getElementById("bg");
  if(threejs){threejs.style.display = "block"}
}
function delay(n){
  n = n || 2000;
  return new Promise((done) => {
    setTimeout(() => {
      done();
    }, n);
  });
}

// barba.init({
//   sync: true,
//   transitions: [{
//     name: 'default-transition',
//     async leave(data) {
//       const done = this.async();
//       pagetrans();
//       await delay(1000);
//       done();
//     },
//     async enter(data) {
//       pageanim();
//     },
//     beforeEnter(data){


//     }
//   }]
// });