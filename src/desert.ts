import { MathUtils, Scene, Vector3, PlaneGeometry, PlaneHelper, Plane, Mesh, MeshStandardMaterial, DoubleSide, MeshBasicMaterial, MeshDepthMaterial, MeshMatcapMaterial, MeshToonMaterial, MeshPhysicalMaterial, TextureLoader } from 'three';
import { Sky } from 'three/addons/objects/Sky.js';


const desert = new Scene()

// Sky
const sky = new Sky();
sky.scale.setScalar( 450000 );

const phi = MathUtils.degToRad( 88 );
const theta = MathUtils.degToRad( 30 ); 
const sunPosition = new Vector3().setFromSphericalCoords(1, phi, theta);

sky.material.uniforms.sunPosition.value = sunPosition;
// sky.material.uniforms.up.value = new Vector3(0, -10, 0);
desert.add(sky);


// Land 
const plane = new PlaneGeometry(500, 500);
plane.rotateX(MathUtils.degToRad(270));


const mat = new MeshBasicMaterial({ color: 0x000000 });


const loader = new TextureLoader();
const land = new Mesh(plane, mat)
loader.load('dry_ground_rocks_diff_2k.jpg', (texture) => {
    const material = new MeshBasicMaterial({
        map: texture,
    });
    land.material = material;
});
desert.add(land);





export { desert, land, sky }