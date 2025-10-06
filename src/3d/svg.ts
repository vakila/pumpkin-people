
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';

// SVG as shapes 
const loader = new SVGLoader();
const tsLogo = await loader.loadAsync('/typescript.svg');


const group = new THREE.Group();
group.scale.multiplyScalar(0.01);
group.position.x = 0;
group.position.y = 0;

let renderOrder = 0;

for (const path of tsLogo.paths) {

    const fillColor = path.userData?.style.fill;

    if (fillColor !== undefined && fillColor !== 'none') {

        const material = new THREE.MeshBasicMaterial({
            color: new THREE.Color().setStyle(fillColor),
            opacity: path.userData?.style.fillOpacity || 1,
            transparent: true,
            side: THREE.DoubleSide,
            depthWrite: false,
        });

        const shapes = SVGLoader.createShapes(path);

        for (const shape of shapes) {

            const geometry = new THREE.ShapeGeometry(shape);
            const mesh = new THREE.Mesh(geometry, material);
            mesh.renderOrder = renderOrder++;

            group.add(mesh);

        }



        const strokeColor = path.userData?.style.stroke;

        if (strokeColor !== undefined && strokeColor !== 'none') {

            const material = new THREE.MeshBasicMaterial({
                color: new THREE.Color().setStyle(strokeColor),
                opacity: path.userData?.style.strokeOpacity || 1,
                transparent: true,
                side: THREE.DoubleSide,
                depthWrite: false,
            });

            for (const subPath of path.subPaths) {

                const geometry = SVGLoader.pointsToStroke(subPath.getPoints(), path.userData?.style);

                if (geometry) {

                    const mesh = new THREE.Mesh(geometry, material);
                    mesh.renderOrder = renderOrder++;

                    group.add(mesh);

                }

            }

        }

    }
}

// scene.add(group);


// SVG as texture

// const texLoader = new THREE.TextureLoader();
// const viteTex = await texLoader.loadAsync('/vite.svg');
// viteTex.colorSpace = THREE.SRGBColorSpace;

// const viteMat = new THREE.MeshBasicMaterial({
//     map: viteTex,
// });