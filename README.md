# cactivacation

🌵 a place to place cacti 

🏜️ for meditation through cactification

💚 made at the [recurse center](https://recurse.com)

## how it works

The scene is a 3d model built and rendered to the canvas with [Three.js](https://threejs.org). 

The desert is a [plane geometry](https://threejs.org/docs/?q=plane#api/en/geometries/PlaneGeometry) drawn at Y=0 across the X and Z axes. A [material](https://threejs.org/manual/#en/materials) with the selected color and a "rocky" [texture](https://threejs.org/manual/#en/textures) image is applied to that plane to represent the land. The sky behind it is rendered by the [Three.js Sky plugin](https://threejs.org/docs/?q=sky#examples/en/objects/Sky).

Click the "new cactus" button, and one of 5 [glTF models](https://threejs.org/manual/?q=gltf#en/load-gltf) of a cactus is chosen at random and added to the scene. Move the pointer to reposition the new cactus before clicking to place it.

The cactus positioning is the most complex part, though conveniently Three.JS's built in [raycaster](https://threejs.org/docs/?q=ray#api/en/core/Raycaster) makes it easy to implement. Essentially, this casts a ray from the pointer position in the browser viewport, through the camera's "eye", and onto the desert plane, and finds the point of intersection with the plane geometry. This maps the pointer's XY coordinates in the viewport onto XZ coordinates in the 3d scene where the base of the cactus is then positioned (on the Y=0 desert plane).

Additional buttons allow you to change the scene colors, though these work by different mechanisms. The cacti color is set by casting a [directional light](https://threejs.org/docs/?q=direction#api/en/lights/DirectionalLight) of the given hue; if the light is white, the underlying cactus model's own colors show through. The desert's color, on the other hand, is set as an attribute of the material applied to the plane geometry. The desert is in a [scene](https://threejs.org/docs/?q=scene#api/en/scenes/Scene) of its own so that it is not affected by the cacti's lighting.

## features & roadmap

- [x] place cacti on a desert scene
- [x] change the colors of the cacti and/or desert
- [x] clear all the cacti for a fresh start
- [x] your desert scene saves automatically to your browser's localStorage when changed
- [x] your scene reloads the next time you return to the page, for continued cactivacation
- [ ] save an image of your scene
- [ ] starry night sky
- [ ] moar cacti models
- [ ] choose your cactus model for a less chaotic experience
- [ ] generate a random scene for a more chaotic experience

## development with vite

To run the development server locally: 

```
npm run dev
``` 

Your local desert will be available at [localhost:5173](http://localhost:5173).


To build the site to `dist/` for production:

```
npm run build
```

To preview the built production site from 'dist/':

```
npm run preview
```

The production preview will be available at [localhost:4173](http://localhost:4173).


## credits

Desert texture from Poly Haven: [Dry Ground Rocks by Rob Tuytel](https://polyhaven.com/a/dry_ground_rocks)

Cactus models from [SketchFab](https://sketchfab.com):
1. [Cactus 1 by rhcreations](https://sketchfab.com/3d-models/cactus-1-downloadable-976b67b80efd4a7388ec85bfc4e39ecf)
2. [Cactus by upeglnf951](https://sketchfab.com/3d-models/cactus-2bb7c79c178c4f40b60357b815052cc8)
3. [Cactus 3 by rhcreations](https://sketchfab.com/3d-models/cactus-3-2ca57ae2e5364ac199837c9cd24e463a)
4. [Realistic HD Saguaro Cactus by PlantCatalog](https://sketchfab.com/3d-models/realistic-hd-saguaro-cactus-1430-14bd58cea78140fba468a8d6f57b0ff3)
5. [Fish Hook Barrel Cactus by gabe2252](https://sketchfab.com/3d-models/fish-hook-barrel-cactus-e3515e3afd814ae5983a3623729fe7a7)


[Three.JS](https://threejs.org) is awesome, and made this little project possible (and [Vite](https://vite.dev/) made developing it simple). And [gltf.report](https://gltf.report), by the same [author](https://www.donmccurdy.com/), proved indispensable in fixing issues with model textures that were not rendering correctly.




