import './index.css';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { addDirectionalLight } from './src/3d/lights.ts';
import { AxesHelper, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { desert, land } from './src/desert.ts';
import { cacti, addCactus, type CactusIndex } from './src/cacti.ts'
import type { Group, Object3DEventMap } from 'three';
import { disposeOf } from './src/3d/gltf.ts';



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


//// new cactus
function getButton(name: string, text: string) {
    const button = document.createElement('button');
    button.id = `button-${name}`;
    button.innerText = text;
    return button;
}

function cactusPositioner(cactus: Group<Object3DEventMap>) {
    if (!cactus)
        throw new Error('cannot position a nonexistent cactus!');
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    return (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersection = raycaster.intersectObject(land)[0]?.point;
        if (intersection) {
            cactus!.position.x = intersection.x;
            cactus!.position.z = intersection.z;
        }
    }

}
const newButton = getButton('new', 'new cactus');
newButton.addEventListener('click', async (e) => {
    console.log('new cactus');
    const cactusType = Math.ceil(Math.random() * 4) as CactusIndex;
    const newCactus = await addCactus(cactusType);
    console.log(newCactus);
    console.log(cacti.children.length);
    if (!newCactus) {
        throw new Error('error adding cactus ' + cactusType);
    }
    const onPointerMove = cactusPositioner(newCactus);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('click', () => {
        window.removeEventListener('pointermove', onPointerMove);
    });

    // newCactus!.position.x = e.clientX / window.innerWidth;
    // newCactus!.position.z = e.clientY;

})
overlay.appendChild(newButton);

// Clear scene
const clearButton = getButton('clear', 'clear cacti');
clearButton.addEventListener('click', () => {
    while (cacti.children.length > 0) {
        const last = cacti.children.pop();
        if (last) {
            disposeOf(last);
        }
    }
});
overlay.appendChild(clearButton);




// Pull it all together and set initial colors


// wrap cacti in their own scene so lighting changes color
const litCacti = new Scene();
const stringToColor = (color: string) => parseInt(color.replace('#', '0x'));
const light = addDirectionalLight(litCacti, stringToColor(START_COLOR_CACTI), 10);
litCacti.add(cacti);
scene.add(litCacti);

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