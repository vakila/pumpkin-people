import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { addGLTFtoScene } from './gltf';
// import { addAmbientLight, addDirectionalLight } from './3d/lights';
import { AxesHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import {desert} from './desert.ts'

// Set up 

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
camera.position.z = 5;


const renderer = new WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// Helpers

const axesHelper = new AxesHelper(10);
scene.add(axesHelper);

// Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => renderer.render(scene, camera));
controls.screenSpacePanning = true;
controls.enableZoom = true;
controls.minPolarAngle = 0;
// controls.maxPolarAngle = Math.PI * 0.5;

// Lights

// addAmbientLight(scene);
// addDirectionalLight(scene);




// Elements
scene.add( desert );



renderer.render(scene, camera);


export {
    renderer,
    scene,
    camera
}