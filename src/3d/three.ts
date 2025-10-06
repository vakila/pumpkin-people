import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { Sky } from 'three/addons/objects/Sky.js';
import { addGLTFtoScene } from './gltf';
import { addAmbientLight, addDirectionalLight } from './lights';

// Set up 

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => renderer.render(scene, camera));
controls.screenSpacePanning = true;
controls.enableZoom = true;
controls.minPolarAngle = 0;
// controls.maxPolarAngle = Math.PI * 0.5;


camera.position.z = 5;

addAmbientLight(scene);
addDirectionalLight(scene);

// const sky = new Sky();
// scene.add(sky);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

const tinyInt = await addGLTFtoScene(scene, 'tinyint.glb');
if (!tinyInt) throw new Error('no tinyInt');
const bbox = new THREE.BoxHelper(tinyInt);
console.log(bbox.translateOnAxis);
scene.add(bbox);





const thow1 = await addGLTFtoScene(scene, 'tiny-house/scene.gltf');
console.log(thow1?.position, thow1?.getWorldPosition(new THREE.Vector3));

thow1?.position.setY(-3);

const thow2 = await addGLTFtoScene(scene, 'tiny_house/scene.gltf');
console.log(thow2?.position, thow2?.getWorldPosition(new THREE.Vector3));

// addGLTFtoScene(scene, 'tiny_home_on_trailer.glb');



renderer.render(scene, camera);
