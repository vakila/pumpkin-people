import { MathUtils, Scene } from "three";
import { addGLTFtoScene } from "./3d/gltf";

const cacti = new Scene();

// Cacti 1-3: textures not rendering correctly

const cactus1 = await addGLTFtoScene(cacti, 'cactus_1-v1.glb');
cactus1!.position.x = -10;
cactus1!.position.z = -20;
cactus1!.rotation.set(0, MathUtils.degToRad(220), 0);

const cactus2 = await addGLTFtoScene(cacti, 'cactus_2-v1.glb');
cactus2!.position.x = 25;
cactus2!.position.z = 25;
cactus2?.scale.setScalar(500);

// const bbox2 = new BoxHelper(cactus2!);
// cacti.add(bbox2);

const cactus3 = await addGLTFtoScene(cacti, 'cactus_3-v1.glb');
cactus3!.position.x = -20;
cactus3!.position.z = -10;

const cactus4 = await addGLTFtoScene(cacti, 'cactus_4.glb');
cactus4!.position.x = -30;
cactus4!.position.z = 30;
cactus4!.scale.setScalar(6);

const cactus5 = await addGLTFtoScene(cacti, 'cactus_5/scene.gltf');
cactus5!.position.x = 20;
cactus5!.position.z = 50;
cactus5!.scale.setScalar(4);


export {cacti};