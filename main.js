import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera;
const scene = new THREE.Scene();



const container = document.createElement("div");
document.body.appendChild(container);

camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.25,
  20
);
camera.position.set(-1.8, 0.6, 2.7);

(() => {
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(0, 10, 0);
  light.target.position.set(-5, 0, 0);
  scene.add(light);
  scene.add(light.target);
})();

(() => {
  const color = 0xffffff;
  const skyColor = 0xb1e1ff; // light blue
  const groundColor = 0xb97a20; // brownish orange
  const intensity = 10;
  const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
  scene.add(light);
})();
const loader = new GLTFLoader().setPath("/gltf/");
loader.load("DamagedHelmet.gltf", function (gltf) {
  scene.add(gltf.scene);
});

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
container.appendChild(renderer.domElement);
renderer.setAnimationLoop( render );

const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", render); // use if there is no animation loop
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, -0.2);
controls.update();

window.addEventListener("resize", onWindowResize);


function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function render() {
  renderer.render(scene, camera);
}
