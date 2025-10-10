import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { addGLTFtoScene } from './gltf';
import { addDirectionalLight } from './3d/lights';
import { AxesHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { desert } from './desert.ts';
import { cacti } from './cacti.ts'




// Set up 

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(100, WIDTH / HEIGHT, 0.1, 1000);
camera.position.y = 10;
camera.position.z = 80;


const renderer = new WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// Helpers

const axesHelper = new AxesHelper(10);
scene.add(axesHelper);
axesHelper.removeFromParent();


// UI

const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);

//// colors
const START_COLOR_CACTI = '#FFFFFF';
const START_COLOR_LAND = '#000000';

function getColorPicker(name: string) {
    const colorPicker = document.createElement('div');
colorPicker.classList.add('buttonish');
const label = document.createElement('label');
    label.setAttribute('for', `color-${name}`);
    label.innerText = name;
colorPicker.appendChild(label);
const input = document.createElement('input');
input.type = 'color';
    input.name = `color-${name}`;
    input.id = `color-${name}`;
    input.value = START_COLOR_CACTI;
colorPicker.appendChild(input);
colorPicker.addEventListener('input', () => {
    console.log('color picked');
    console.log(input.value);
    light.color.set(input.value);
});
    return colorPicker;
}

const cactiColorPicker = getColorPicker('cacti');
overlay.appendChild(cactiColorPicker);

// // // dev ui
// const button = document.createElement('button');
// button.innerText = 'show axes';
// button.addEventListener('click', () => {
//     console.log('clicked');
//     console.log(axesHelper);
//     if (axesHelper.parent) {
//         console.log('removing');
//         axesHelper.removeFromParent();
//         button.innerText = 'show axes';
//     } else {
//         console.log('adding');
//         scene.add(axesHelper);
//         button.innerText = 'hide axes';
//     }
// })
// overlay.appendChild(button);




// Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => renderer.render(scene, camera));
controls.screenSpacePanning = true;
controls.enableZoom = true;
controls.minPolarAngle = 0;
// controls.maxPolarAngle = Math.PI * 0.5;




// Elements
// addDirectionalLight(scene);
const stringToColor = (color: string) => parseInt(color.replace('#', '0x'));
const light = addDirectionalLight(scene, stringToColor(START_COLOR_CACTI), 10);
console.log('LIGHT', light);
scene.add(desert);
scene.add(cacti);



// Render
renderer.setAnimationLoop(() =>
    renderer.render(scene, camera)
)




export {
    renderer,
    scene,
    camera
}