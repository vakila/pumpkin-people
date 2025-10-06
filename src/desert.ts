import { MathUtils, Scene, Vector3 } from 'three';
import { Sky } from 'three/addons/objects/Sky.js';


const desert = new Scene()

// Sky
const sky = new Sky();
sky.scale.setScalar( 450000 );

const phi = MathUtils.degToRad( 88 );
const theta = MathUtils.degToRad( 30 ); 
const sunPosition = new Vector3().setFromSphericalCoords( 1, phi, theta );

sky.material.uniforms.sunPosition.value = sunPosition;

desert.add(sky);


// 




export {desert}