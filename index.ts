import './index.css';
import { addDirectionalLight } from './src/3d/lights.ts';
import { PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { desert, land } from './src/desert.ts';
import { cacti, addCactus, type CactusIndex, positionCacti } from './src/cacti.ts'
import type { Group, Object3DEventMap } from 'three';
import { disposeOf } from './src/3d/gltf.ts';
import { loadScene, saveScene } from './src/storage.ts';



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


// Saved "game" state
const sceneData = loadScene();

//// colors

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

const cactiColorPicker = getColorPicker('cacti', sceneData.colors.cacti);
cactiColorPicker.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    light.color.set(input.value);
    sceneData.colors.cacti = input.value;
    saveScene(sceneData);
});
overlay.appendChild(cactiColorPicker);


const desertColorPicker = getColorPicker('desert', sceneData.colors.desert);
desertColorPicker.addEventListener('input', (e) => {
    const input = e.target as HTMLInputElement;
    land.material.color.set(input.value);
    sceneData.colors.desert = input.value;
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
    const onPointerMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersection = raycaster.intersectObject(land)[0]?.point;
        if (intersection) {
            cactus.position.x = intersection.x;
            cactus.position.z = intersection.z;
        }
    }
    return onPointerMove;

}
const newButton = getButton('new', 'new cactus');
newButton.addEventListener('click', async (event) => {
    const cactusType = Math.ceil(Math.random() * 5) as CactusIndex;
    const newCactus = await addCactus(cactusType);
    if (!newCactus) {
        throw new Error('error adding cactus ' + cactusType);
    }

    const onPointerMove = cactusPositioner(newCactus);
    window.addEventListener('pointermove', onPointerMove);
    onPointerMove(event); // set initial position

    const onClick = () => {
        window.removeEventListener('pointermove', onPointerMove);
        sceneData.cacti.push({
            type: cactusType,
            position: {
                x: newCactus.position.x,
                z: newCactus.position.z
            }
        });
        saveScene(sceneData);
        window.removeEventListener('click', onClick);
    }
    window.addEventListener('click', onClick);

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
    saveScene({ ...sceneData, cacti: [] });
});
overlay.appendChild(clearButton);




// Pull it all together and set initial colors


// wrap cacti in their own scene so lighting changes color
const litCacti = new Scene();
const stringToColor = (color: string) => parseInt(color.replace('#', '0x'));
const light = addDirectionalLight(litCacti, stringToColor(sceneData.colors.cacti), 10);


await positionCacti(sceneData.cacti);
litCacti.add(cacti);
scene.add(litCacti);

land.material.color.set(sceneData.colors.desert);
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