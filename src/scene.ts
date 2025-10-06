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

const button = document.createElement('button');
button.innerText = 'show axes';
button.addEventListener('click', () => {
    console.log('clicked');
    console.log(axesHelper);
    if (axesHelper.parent) {
        console.log('removing');
        axesHelper.removeFromParent();
        button.innerText = 'show axes';
    } else {
        console.log('adding');
        scene.add(axesHelper);
        button.innerText = 'hide axes';
    }
})
document.body.appendChild(button);




// Orbit Controls

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener('change', () => renderer.render(scene, camera));
controls.screenSpacePanning = true;
controls.enableZoom = true;
controls.minPolarAngle = 0;
// controls.maxPolarAngle = Math.PI * 0.5;




// Elements
addDirectionalLight(scene);
scene.add( desert );
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