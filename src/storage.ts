
// Check if we can use localStorage
type Storage = globalThis.Storage;
const cactiKey = '🌵🏜️ cactivacation 🏜️🌵';


export const DEFAULT_SCENE = {
    colors: {
        cacti: '#FFFFFF',
        desert: '#a5988a',
    },
    people: [
        { position: { x: 0, z: 0 } },
    ]
};
export type SceneData = typeof DEFAULT_SCENE;
export type CactusData = SceneData['people'][number];



export function loadScene(): SceneData {
    let savedScene = DEFAULT_SCENE;

    function getSave(storage: Storage): SceneData | null {
        try {
            const oldSave = storage.getItem(cactiKey);
            console.log('got item', oldSave);
            // TODO read save
            if (oldSave) {
                return JSON.parse(oldSave);
            } else {
                return null;
            }
        } catch (e) {
            console.error('error loading save:', e);
            return null;
        }
    }


    try {
        const localSave = getSave(window.localStorage);
        if (localSave) {
            savedScene = localSave;
            console.log('loaded from localStorage', savedScene);
        }
        
    } catch (e) {
        // try again with fall back to sessionStorage
        console.error(e);
        try {
            const sessionSave = getSave(window.sessionStorage);
            if (sessionSave) {
                savedScene = sessionSave;
                console.log('loaded from sessionStorage', savedScene);
            }
        } catch (e) {
            console.error('oh no, could not load scene');
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
            console.error('oh no, could not save');
            console.error(e);
            console.log(value);
        }
    }
    
}
