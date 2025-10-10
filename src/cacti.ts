import { MathUtils, Scene } from "three";
import { addGLTFtoScene } from "./3d/gltf";

const cacti = new Scene();

const CACTUS_MODELS = {
    1: { file: 'cactus_1-v1.glb', scale: 1 },
    2: { file: 'cactus_2-v1.glb', scale: 550 },
    3: { file: 'cactus_3-v1.glb', scale: 1 },
    4: { file: 'cactus_4.glb', scale: 6 },
    5: { file: 'cactus_5/scene.gltf', scale: 4 }
};
export type CactusIndex = keyof typeof CACTUS_MODELS;

export async function addCactus(i: CactusIndex) {
    const { file, scale } = CACTUS_MODELS[i];
    const cactus = await addGLTFtoScene(cacti, file);
    cactus!.scale.setScalar(scale);
    return cactus;
}



const cactus1 = await addCactus(1);
cactus1!.position.x = -10;
cactus1!.position.z = -20;
cactus1!.rotation.set(0, MathUtils.degToRad(220), 0);

const cactus2 = await addCactus(2);
cactus2!.position.x = 25;
cactus2!.position.z = 25;

// const bbox2 = new BoxHelper(cactus2!);
// cacti.add(bbox2);

const cactus3 = await addCactus(3);
cactus3!.position.x = -20;
cactus3!.position.z = -10;

const cactus4 = await addCactus(4);
cactus4!.position.x = -30;
cactus4!.position.z = 30;

const cactus5 = await addCactus(5);
cactus5!.position.x = 20;
cactus5!.position.z = 50;




export { cacti };