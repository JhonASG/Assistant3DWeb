import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

//Set up the scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
const light = new THREE.AmbientLight( 0x404040, 10 );
const grid = new THREE.GridHelper( 30, 30 );

//Set up the avatar
const loader = new FBXLoader();

//Variables
let mixer
const clock = new THREE.Clock();

loader.load('./animations/yelling_withSkin.fbx', function (object) {
    scene.add(object);

    object.scale.set(0.01, 0.01, 0.01);
    object.position.set(0, 0, 0);
    object.rotation.set(0, 0, 0);
    
    mixer = new THREE.AnimationMixer(object);
    const clips = object.animations;
    const clip = THREE.AnimationClip.findByName(clips, "mixamo.com");
    const action = mixer.clipAction(clip);

    action.play();
}, undefined, function (error) {
    console.error( error );
});

//Initial set up of the scene
camera.position.set(0, 1.475, 0.85);
scene.add( grid );
scene.add(light);
renderer.setClearColor(0xA3A3A3);
renderer.setAnimationLoop( animate );
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

function animate() {
    if (mixer != undefined) {
        mixer.update(clock.getDelta());
    }
    renderer.render( scene, camera );
}

//Resize the window
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
});