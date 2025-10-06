import * as THREE from 'three';

export function addAmbientLight(scene: THREE.Scene) {
    const color = 0xFFFFFF;
    const ambLight = new THREE.AmbientLight(color, 1);
    scene.add(ambLight);
    return ambLight
}


type Position = [number, number, number];
export function addDirectionalLight(scene: THREE.Scene,
    color = 0xFFFFFF,
    intensity = 10,
    position: Position = [0, 100, 100],
    targetPosition: Position = [5, 5, 0]
) {
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(...position);
    light.target.position.set(...targetPosition);
    scene.add(light);
    scene.add(light.target);
    return light;
}