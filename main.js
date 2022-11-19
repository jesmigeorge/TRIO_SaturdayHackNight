import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);


// Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x00B1B0 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// const donutTexture = new THREE.MeshStandardMaterial({color:0x39174d});
//const wrapTexture = new THREE.TextureLoader().load('donut.jpg');
const donut = new THREE.Mesh(
      new THREE.TorusGeometry(10,3,16,100),
      new THREE.MeshStandardMaterial({
          color:0xFEC84D,
          //  normalMap : wrapTexture
      })
);
scene.add(donut);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

// Helpers

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

function addCube1(){
  
  const geometry = new THREE.BoxGeometry(3, 2, 1);
  const cubtex1 = new THREE.TextureLoader().load('cube.jpeg');

  const material = new THREE.MeshBasicMaterial({ map:cubtex1 });
  const cube = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  cube.position.set(x, y, z);
  scene.add(cube);
}
function addCube2(){
  const geometry = new THREE.BoxGeometry(0.8,0.9,0.9);
  const material = new THREE.MeshStandardMaterial({ color: 0x89345f });
  const cube = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  cube.position.set(x, y, z);
  scene.add(cube);
}



Array(100).fill().forEach(addStar);
Array(10).fill().forEach(addCube1);
Array(10).fill().forEach(addCube2);



// Background

const spaceTexture = new THREE.TextureLoader().load('bg.jpeg');
scene.background = spaceTexture;

// function changeBackground(color) {
//   document.body.style.background = color;
// }

// window.addEventListener("load",function() { changeBackground('red') });
// document.body.style.backgroundColor = "#AA0000";

// Avatar

const jeffTexture = new THREE.TextureLoader().load('donut.jpg');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

// Moon

const moonTexture = new THREE.TextureLoader().load('ball.jpg');
const normalTexture = new THREE.TextureLoader().load('ball.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

jeff.position.z = -5;
jeff.position.x = 2;

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  moon.rotation.x += 0.05;
  moon.rotation.y += 0.075;
  moon.rotation.z += 0.05;
  // Array(200).fill().forEach(star.rotation.x+=.25);
  // Array(200).fill().forEach(star.rotation.x+=.25);


  jeff.rotation.y += 0.01;
  jeff.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);



  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
 
  
  donut.rotation.x += 0.021;
  donut.rotation.y += 0.0005;
  donut.rotation.z += 0.01;

  


  controls.update();

  renderer.render(scene, camera);
}


animate();
