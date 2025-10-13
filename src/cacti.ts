import { Scene } from "three";
import { addGLTFtoScene } from "./3d/gltf";
import { type CactusData } from "./storage";


// import model assets so vite can do its thing
// @ts-expect-error cannot find module
import cactus1 from './assets/cactus_1.glb';
// @ts-expect-error cannot find module
import cactus2 from './assets/cactus_2.glb';
// @ts-expect-error cannot find module
import cactus3 from './assets/cactus_3.glb';
// @ts-expect-error cannot find module
import cactus4 from './assets/cactus_4.glb';
// @ts-expect-error cannot find module
import cactus5 from './assets/cactus_5.glb';

const cacti = new Scene();

const CACTUS_MODELS = {
    1: { file: cactus1, scale: 1 },
    2: { file: cactus2, scale: 550 },
    3: { file: cactus3, scale: 1 },
    4: { file: cactus4, scale: 6 },
    5: { file: cactus5, scale: 4 }
};
export type CactusIndex = keyof typeof CACTUS_MODELS;

export async function addCactus(i: CactusIndex, position?: { x: number, z: number }) {
    const { file, scale } = CACTUS_MODELS[i];
    const cactus = await addGLTFtoScene(cacti, file);
    if (!cactus) throw new Error('no cactus!');
    cactus.scale.setScalar(scale);
    if (position) {
        cactus.position.x = position.x;
        cactus.position.z = position.z;
    }
    return cactus;
}

export async function positionCacti(cacti: CactusData[]) {
    for (const cactus of cacti) {
        const { type, position } = cactus;
        addCactus(type as CactusIndex, position);
    }
}

export { cacti };