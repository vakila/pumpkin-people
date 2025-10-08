import { Scene } from "three";
import { addGLTFtoScene } from "./3d/gltf";

const cacti = new Scene();

// Cacti 1-3: textures not rendering correctly

const cactus1 = await addGLTFtoScene(cacti, 'cactus_1/scene.gltf');

const cactus2 = await addGLTFtoScene(cacti, 'cactus_2.glb');
cactus2!.position.x = 10;
cactus2?.scale.setScalar(500);

// const bbox2 = new BoxHelper(cactus2!);
// cacti.add(bbox2);

const cactus3 = await addGLTFtoScene(cacti, 'cactus_3/scene.gltf');
cactus3!.position.x = 20;

const cactus4 = await addGLTFtoScene(cacti, 'cactus_4.glb');
cactus4!.position.x = -30;
cactus4!.position.z = 20;
cactus4!.scale.setScalar(6);

const cactus5 = await addGLTFtoScene(cacti, 'cactus_5/scene.gltf');
cactus5!.position.x = 40;
cactus5!.position.z = 40;
cactus5!.scale.setScalar(5);


export {cacti};