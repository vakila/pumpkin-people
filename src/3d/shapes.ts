import * as THREE from 'three';


// Cube and Sphere



const geometry = new THREE.BoxGeometry(1, 1, 1);
const normalMat = new THREE.MeshNormalMaterial();
const blueMat = new THREE.MeshBasicMaterial({ color: 'blue' });
const greenMat = new THREE.MeshBasicMaterial({ color: 'green' });

const cube = new THREE.Mesh(geometry, blueMat);
// scene.add(cube);
// console.log(scene);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(1), normalMat);
sphere.position.setX(-5);
// scene.add(sphere);
// console.log(scene);


// function animate() {


//   cube.rotation.x += 0.01;
//   cube.rotation.y += 0.01;

//   renderer.render(scene, camera);

// }
// renderer.setAnimationLoop(animate);