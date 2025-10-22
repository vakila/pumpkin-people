import './index.css';
import { addDirectionalLight } from './src/3d/lights.ts';
import { PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three';
import { desert, land } from './src/desert.ts';
import { people, addPerson, positionPeople } from './src/people.ts'
import { disposeOf } from './src/3d/gltf.ts';
import { loadScene, saveScene } from './src/storage.ts';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



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

const controls = new OrbitControls(camera, renderer.domElement);

const overlay = document.createElement('div');
overlay.id = 'overlay';
document.body.appendChild(overlay);


// Saved "game" state
const sceneData = {
    colors: {
        cacti: '#FFFFFF',
        desert: '#a5988a',
    },
    people: [
        { position: { x: 0, z: 0 } },
    ]
};
// console.log('sceneData', sceneData);

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
    saveScene(sceneData);
});
overlay.appendChild(desertColorPicker);


//// new cactus
function getButton(name: string, text: string) {
    const button = document.createElement('button');
    button.id = `button-${name}`;
    button.innerText = text;
    return button;
}

function cactusPositioner(person: Scene) {
    if (!person)
        throw new Error('cannot position a nonexistent person!');
    const raycaster = new Raycaster();
    const pointer = new Vector2();
    const onPointerMove = (e: PointerEvent) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = - (e.clientY / window.innerHeight) * 2 + 1;
        raycaster.setFromCamera(pointer, camera);
        const intersection = raycaster.intersectObject(land)[0]?.point;
        if (intersection) {
            person.position.x = intersection.x;
            person.position.z = intersection.z;
        }
    }
    return onPointerMove;

}
const newButton = getButton('new', 'new cactus');
newButton.addEventListener('click', async (event) => {
    // const cactusType = ///Math.ceil(Math.random() * 5) as CactusIndex;
    const newPerson = await addPerson();
    if (!newPerson) {
        throw new Error('error adding person');
    }

    const onPointerMove = cactusPositioner(newPerson);
    window.addEventListener('pointermove', onPointerMove);
    onPointerMove(event); // set initial position

    const onClick = () => {
        window.removeEventListener('pointermove', onPointerMove);
        sceneData.people.push({
            position: {
                x: newPerson.position.x,
                z: newPerson.position.z
            }
        });
        saveScene(sceneData);
        window.removeEventListener('click', onClick);
    }
    window.addEventListener('click', onClick);

})
overlay.appendChild(newButton);

// Clear scene
const clearButton = getButton('clear', 'clear cacti');
clearButton.addEventListener('click', () => {
    while (people.children.length > 0) {
        const last = people.children.pop();
        if (last) {
            disposeOf(last);
        }
    }
    saveScene({ ...sceneData, people: [] });
});
overlay.appendChild(clearButton);




// Pull it all together and set initial colors


// wrap cacti in their own scene so lighting changes color
// const litPeople = new Scene();
// const stringToColor = (color: string) => parseInt(color.replace('#', '0x'));
// const light = addDirectionalLight(litPeople, stringToColor(sceneData.colors.cacti), 10);

console.log('sceneData', sceneData);

await positionPeople(sceneData.people);
// litPeople.add(people);
scene.add(people);

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