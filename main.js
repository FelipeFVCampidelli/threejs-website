import './style.css'

import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Default
const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

// Giant Donut
const geometry = new THREE.TorusGeometry( 10, 3, 16, 8);
const material = new THREE.MeshStandardMaterial( {color: 0xFF6347} );
const torus = new THREE.Mesh( geometry, material);
scene.add(torus)

// Lights
const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(pointLight, ambientLight);

const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);

function moveCamera() {
  const move = document.body.getBoundingClientRect().top;
  
  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;

  cubicEarth.rotation.y += 0.01;
  cubicEarth.rotation.z += 0.01;

  camera.position.z = move*-0.01;
  camera.position.x = move*-0.0002;
  camera.position.y = move*-0.0002;
}
document.body.onscroll = moveCamera

// Stars
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25);
  const material = new THREE.MeshStandardMaterial({ color: 0xfaaaaa });
  const star = new THREE.Mesh( geometry, material );

  const [x, y, z] = Array(3).fill().map(()=> THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(250).fill().forEach(addStar);

// add background
const spaceTexture = new THREE.TextureLoader().load('textures/space.jpg');
scene.background = spaceTexture;

// cubicEarth
const cubicEarthTexture = new THREE.TextureLoader().load('textures/8k_earth_daymap.jpg');
const cubicEarth = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: cubicEarthTexture })
);
scene.add(cubicEarth);

// Moon

const moonTexture = new THREE.TextureLoader().load('textures/8k_moon.jpg');
const normalTexture = new THREE.TextureLoader().load('textures/normal.jpg');
const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
);
moon.position.set(-10, 0, 30);
scene.add(moon);

// MoonRings
const ringTexture = new THREE.TextureLoader().load('textures/8k_saturn_ring_alpha.png');
const verticalRing = new THREE.Mesh(
  new THREE.RingGeometry(3.5, 5, 32),
  new THREE.MeshLambertMaterial({
    map: ringTexture,
    side: THREE.DoubleSide
  })
);
verticalRing.position.set(-10, 0, 30);
scene.add(verticalRing);

const horizontalRing = new THREE.Mesh(
  new THREE.RingGeometry(3.5, 5, 32),
  new THREE.MeshLambertMaterial({
    map: ringTexture,
    side: THREE.DoubleSide
  })
);
horizontalRing.position.set(-10, 0, 30);
horizontalRing.rotation.x += 1.5708
scene.add(horizontalRing);

// Animation
function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

//  verticalRing.rotation.x += 0.02;
  verticalRing.rotation.y += 0.02;
  verticalRing.rotation.z += 0.02;

  horizontalRing.rotation.x += 0.02;
//  horizontalRing.rotation.y += 0.02;
  horizontalRing.rotation.z += -0.02;

  controls.update();

  renderer.render(scene, camera);
}
animate();