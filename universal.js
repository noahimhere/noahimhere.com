import "./style.css";
import barba from '@barba/core';


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
var scene, camera, renderer;
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
