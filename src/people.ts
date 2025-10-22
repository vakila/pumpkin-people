import { Scene, type Group, type Object3DEventMap } from "three";
import { addGLTFtoScene } from "./3d/gltf";
import { type CactusData } from "./storage";


// import model assets so vite can do its thing
// @ts-expect-error cannot find module
import scarecrow from './assets/hatless-scarecrow.glb';
// @ts-expect-error cannot find module
import pumpkin from './assets/halloween_pumpkin_low_poly.glb';
import { degToRad } from "three/src/math/MathUtils.js";

const people = new Scene();

const PP_MODELS: {[i: number]: {file: string, scale: number, rotation?: number}} = {
    1: { file: scarecrow, scale: 10 },
    2: {file: pumpkin, scale: 5, rotation: 180}
    
};
// export type CactusIndex = keyof typeof PP_MODELS;

export async function addPerson(position?: { x: number, y?:number, z: number }) {
    console.log('addPerson');
    const person = new Scene();
    for (const glb of Object.values(PP_MODELS)) {
        const { file, scale, rotation } = glb;
        const model = await addGLTFtoScene(people, file);
        if (!model) throw new Error('no model!');
        model.scale.setScalar(scale);
        if (position) {
            model.position.x = position.x;
            model.position.y = position.y || 0;
            model.position.z = position.z;
        }
        if (rotation) {
            model.rotateY(degToRad(rotation));
        }
        if (file === pumpkin) {recolorModel(model);}
        person.add(model);
    }
    console.log('person', person);
    return person;
}

function recolorModel(model: Group<Object3DEventMap>) {
    model.traverse((child) => {
        if (child.isMesh) {
            child.material.color.r = Math.min(Math.random(), 0.6);
            child.material.color.b = 0;
            child.material.color.g = Math.min(Math.max(0.3, Math.random()), 0.8);

        }
    })
}

export async function positionPeople(people: CactusData[]) {
    for (const person of people) {
        const { position } = person;
        console.log('adding person at ', position);
        addPerson(position);
    }
}

export { people };