import type { CactusIndex } from "./cacti";

// Check if we can use localStorage
type Storage = globalThis.Storage;
const cactiKey = '🌵🏜️ cactivacation 🏜️🌵';


export const DEFAULT_SCENE = {
    colors: {
        cacti: '#FFFFFF',
        desert: '#a5988a',
    },
    cacti: [
        { type: 1, position: { x: -10, z: -20 } },
        { type: 2, position: { x: 25, z: 25 } },
        { type: 3, position: { x: -20, z: -10 } },
        { type: 4, position: { x: -30, z: 30 } },
        { type: 5, position: { x: 20, z: 50 } }
    ]
};
export type SceneData = typeof DEFAULT_SCENE;
export type CactusData = SceneData['cacti'][number];



export function loadScene() {
    let savedScene = DEFAULT_SCENE;

    function getSave(storage: Storage) {
        if (storage) {
            const oldSave = storage.getItem(cactiKey);
            // TODO read save
            if (oldSave) {
                return JSON.parse(oldSave);
            }
        } else {
            return DEFAULT_SCENE
        }
    }


    try {
        savedScene = getSave(window.localStorage);
        console.log('loaded from localStorage', savedScene);
        
    } catch (e) {
        // try again with fall back to sessionStorage
        console.error(e);
        try {
            savedScene = getSave(window.sessionStorage);
            console.log('loaded from sessionStorage', savedScene);
        } catch (e) {
            console.error('oh no');
            console.error(e);
        }
    } 
    return savedScene;
}

export function saveScene(data?: SceneData) {
    console.log(cactiKey);
    const value = JSON.stringify(data);
    console.log();


    function setSave(storage: Storage) {
        storage.setItem(cactiKey, value);
    }


    try {
        setSave(window.localStorage);
        console.log('saved to localStorage', value)
        
    } catch (e) {
        // try again with fall back to sessionStorage
        console.error(e);
        try {
            setSave(window.sessionStorage);
            console.log('saved to sessionStorage', value);
        } catch (e) {
            // failing that, give up and just log the state
            console.error('oh no');
            console.error(e);
        }
    }
    
}

export function loadOrInitScene(data: SceneData) {
    return data;
}