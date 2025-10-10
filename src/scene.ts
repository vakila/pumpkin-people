import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { addGLTFtoScene } from './gltf';
import { addDirectionalLight } from './3d/lights';
import { AxesHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { desert, land } from './desert.ts';
import { cacti } from './cacti.ts'




// Set up 

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const scene = new Scene();
const camera = new PerspectiveCamera(75, WIDTH / HEIGHT);
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
const START_COLOR_LAND = '#a5988a';

function getColorPicker(name: string, startColor: string) {
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
    input.value = startColor;
colorPicker.appendChild(input);

    return colorPicker;
}

const cactiColorPicker = getColorPicker('cacti', START_COLOR_CACTI);
cactiColorPicker.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    light.color.set(input.value);
});
overlay.appendChild(cactiColorPicker);


const desertColorPicker = getColorPicker('desert', START_COLOR_LAND);
desertColorPicker.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    land.material.color.set(input.value);
});
overlay.appendChild(desertColorPicker);


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




// Pull it all together and set initial colors



const stringToColor = (color: string) => parseInt(color.replace('#', '0x'));
const light = addDirectionalLight(cacti, stringToColor(START_COLOR_CACTI), 10);
scene.add(cacti);

land.material.color.set(START_COLOR_LAND);
scene.add(desert);



// Render
renderer.setAnimationLoop(() =>
    renderer.render(scene, camera)
)




export {
    renderer,
    scene,
    camera
}