import { MathUtils, Scene, Vector3, PlaneGeometry, PlaneHelper, Plane, Mesh, MeshStandardMaterial, DoubleSide, MeshBasicMaterial, MeshDepthMaterial, MeshMatcapMaterial } from 'three';
import { Sky } from 'three/addons/objects/Sky.js';


const desert = new Scene()

// Sky
const sky = new Sky();
sky.scale.setScalar( 450000 );

const phi = MathUtils.degToRad( 88 );
const theta = MathUtils.degToRad( 30 ); 
const sunPosition = new Vector3().setFromSphericalCoords( 1, phi, theta );

sky.material.uniforms.sunPosition.value = sunPosition;

// desert.add(sky);


// Land 
const plane = new PlaneGeometry(800, 800);
plane.rotateX(MathUtils.degToRad(270));
const mat = new MeshBasicMaterial({ color: 0x000000 });
const depthMat = new MeshMatcapMaterial();
const land = new Mesh(plane, depthMat)
desert.add(land);




export { desert, land, sky }