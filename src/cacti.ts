import { Scene } from "three";
import { addGLTFtoScene } from "./3d/gltf";
import { type CactusData } from "./storage";

const cacti = new Scene();

const CACTUS_MODELS = {
    1: { file: 'cactus_1-v1.glb', scale: 1 },
    2: { file: 'cactus_2-v1.glb', scale: 550 },
    3: { file: 'cactus_3-v1.glb', scale: 1 },
    4: { file: 'cactus_4.glb', scale: 6 },
    5: { file: 'cactus_5/scene.gltf', scale: 4 }
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