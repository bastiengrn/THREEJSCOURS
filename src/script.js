import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import typefaceFont from 'three/examples/fonts/helvetiker_regular.typeface.json'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()


const doorColorTexture = textureLoader.load('./textures/door/color.jpg')
doorColorTexture.colorSpace = THREE.SRGBColorSpace
const doorAlphaTexture = textureLoader.load('./textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('./textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('./textures/matcaps/1.png')
matcapTexture.colorSpace = THREE.SRGBColorSpace
const gradientTexture = textureLoader.load('/textures/gradients/5.jpg')
 //Objects
// MeshBasicMaterial
const geometrymaterial = new THREE.MeshStandardMaterial()
geometrymaterial.metalness = 0.7
geometrymaterial.roughness = 0.2

//FONT 
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        const textGeometry = new TextGeometry(
            'Bastien Garnier airline',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )
        const textMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
        const text = new THREE.Mesh(textGeometry, textMaterial)
        text.position.y = 5
        text.position.x = - 3
        text.position.z = 5
        
        for(let i = 0; i < 100; i++)
        {
            const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)
            const donutMaterial = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10
            const scale = Math.random()
            donut.scale.set(0.25, 0.25, 0.25)
            scene.add(donut)
        }


        scene.add(text)
    }
)

/**
 * Galaxy
 */

// const parameters = {};
// parameters.count = 100000;
// parameters.size = 0.02;
// parameters.radius = 5;
// parameters.branches = 3;
// parameters.spin = 1;
// parameters.randomness = 0.2;
// parameters.randomnessPower = 3;
// parameters.insideColor = "#c800ff";
// parameters.outsideColor = "#ff0000";

// let geometry = null;
// let material = null;
// let points = null;

// const generateGalaxy = () => {
//   // Destroy old galaxy
//   if (points !== null) {
//     geometry.dispose();
//     material.dispose();
//     scene.remove(points);
//   }

//   /**
//    * Geometry
//    */

//   geometry = new THREE.BufferGeometry();

//   const positions = new Float32Array(parameters.count * 3);
//   const colors = new Float32Array(parameters.count * 3);

//   const colorInside = new THREE.Color(parameters.insideColor);
//   const colorOutside = new THREE.Color(parameters.outsideColor);

//   for (let i = 0; i < parameters.count; i++) {
//     const i3 = i * 3;

//     const radius = Math.random() * parameters.radius;
//     const spinAngle = radius * parameters.spin;
//     const branchAngle =
//       ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

//     const randomX =
//       Math.pow(Math.random(), parameters.randomnessPower) *
//       (Math.random() < 0.5 ? 1 : -1) *
//       parameters.randomness *
//       radius;
//     const randomY =
//       Math.pow(Math.random(), parameters.randomnessPower) *
//       (Math.random() < 0.5 ? 1 : -1) *
//       parameters.randomness *
//       radius;
//     const randomZ =
//       Math.pow(Math.random(), parameters.randomnessPower) *
//       (Math.random() < 0.5 ? 1 : -1) *
//       parameters.randomness *
//       radius;

//     positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
//     positions[i3 + 1] = randomY;
//     positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

//     // Color
//     const mixedColor = colorInside.clone();
//     mixedColor.lerp(colorOutside, radius / parameters.radius);

//     colors[i3] = mixedColor.r;
//     colors[i3 + 1] = mixedColor.g;
//     colors[i3 + 2] = mixedColor.b;
//   }

//   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//   geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
//   geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

//   /**
//    * Textures
//    */
//   const textureLoader = new THREE.TextureLoader();
//   const particleTexture = textureLoader.load("/textures/Particles/4.png");

//   /**
//    * Material
//    */
//  ({
//     size: parameters.size,
//     sizeAttenuation: true,
//     depthWrite: false,
//     blending: THREE.AdditiveBlending,
//     vertexColors: true,
//   });
//   material.alphaMap = particleTexture;

//   /**
//    * Points
//    */
//   points = new THREE.Points(geometry, material);
//   scene.add(points);
// };
// generateGalaxy();


/**
 * Fog
 */
const fog = new THREE.Fog('#FFFFFF', 15, 15)
scene.fog = fog
/**
 * Environment map
 */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('textures/environmentMap/2k.hdr', (environmentMap) =>
{
    environmentMap.mapping = THREE.EquirectangularReflectionMapping

    scene.background = environmentMap
    scene.environment = environmentMap
})
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 16, 16),
    geometrymaterial
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1),
    geometrymaterial
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    geometrymaterial
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)


const loader = new GLTFLoader();

loader.load( 'textures/models/Airplane.glb', function ( gltf ) {

	scene.add( gltf.scene );
    gltf.scene.scale.set(0.0025, 0.0025, 0.0025)
    gltf.scene.position.set(2, 2, 2)
   

}, undefined, function ( error ) {

	console.error( error );

} );



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime
    

    sphere.rotation.x = - 0.15 * elapsedTime
    plane.rotation.x = - 0.15 * elapsedTime
    torus.rotation.x = - 0.15 * elapsedTime
    

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

