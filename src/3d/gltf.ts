import type { Group, Object3D, Scene } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

export async function addGLTFtoScene(scene: Scene, filename: string, dir?: string) {
    if (dir) {
        loader.setPath(dir);
        loader.setResourcePath(dir);
    }


    try {

        const model = await loader.loadAsync(filename);
        console.log(`Loaded model ${dir ? `${dir}/` : ''}${filename}`);
        scene.add(model.scene);
        return model.scene;

    } catch (error) {
        console.error(`Error loading ${dir ? `${dir}/` : ''}${filename}`);
        console.error(error);

        return null;
    };
}

export function disposeOf(object: Group | Object3D) {
    if (!object) return;
    if (object.children) {
        for (const child of object.children) {
            disposeOf(child);
        }
    }
    if (object.parent) {
        object.removeFromParent();
    }
}