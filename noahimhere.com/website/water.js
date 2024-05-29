import "./style.css";

import * as THREE from "three";
import * as TWEEN from "@tweenjs/tween.js";
import { Sky } from 'three/addons/objects/Sky.js';
import { Water } from 'three/addons/objects/Water.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';



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
water.position.y = -50;

scene.add( water );