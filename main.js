import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "./GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let content;
const scene = new THREE.Scene();
const buttons = document.getElementsByClassName("btn");
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.25,
  20
);
camera.position.set(-1.8, 0.6, 2.7);

const render = () => {
  renderer.render(scene, camera);
}

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

const reset = () => {
  if (content) {
    scene.remove(content);
  }
  for(let i = 0; i < buttons.length; i++){
    buttons[i].classList.remove("active");
  }
}

// Set up Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
document.body.appendChild(renderer.domElement);
renderer.setAnimationLoop(render);

// Set Up Contols
const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 10;
controls.target.set(0, 0, -0.2);
controls.update();

// Add directional light
const color = 0xffffff;
const directionalLightIntensity = 1;
const directionalLight = new THREE.DirectionalLight(color, directionalLightIntensity);
directionalLight.position.set(0, 10, 0);
directionalLight.target.position.set(-5, 0, 0);
scene.add(directionalLight);
scene.add(directionalLight.target);

// Add hemisphere light
const skyColor = 0xb1e1ff; // light blue
const groundColor = 0xb97a20; // brownish orange
const intensity = 10;
const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
scene.add(light);

window.addEventListener("resize", onWindowResize);

const loadGLTF = () => {
  reset();

  const { pathname } = window.location;
  const loader = new GLTFLoader().setPath(`${pathname}gltf/`);

  // Load GLTF as a Preset
  loader.load("DamagedHelmet.gltf", (gltf) => {
    content = gltf.scene;
    scene.add(gltf.scene);
    buttons[0].classList.add("active");
  });
}

const loadGLTFEmbedded = () => {
  reset();

  const { pathname } = window.location;
  const loader = new GLTFLoader().setPath(`${pathname}gltf-embedded/`);

  // Load GLTF as a Preset
  loader.load("DamagedHelmet_embed.gltf", (gltf) => {
    content = gltf.scene;
    scene.add(gltf.scene);
    buttons[1].classList.add("active");
  });
}

const loadGLTFBinary = () => {
  reset();

  const { pathname } = window.location;
  const loader = new GLTFLoader().setPath(`${pathname}glb/`);

  // Load GLTF as a Preset
  loader.load("DamagedHelmet.glb", (gltf) => {
    content = gltf.scene;
    scene.add(gltf.scene);
    buttons[2].classList.add("active");
  });
}



loadGLTF();

buttons[0].addEventListener("click",loadGLTF)
buttons[1].addEventListener("click",loadGLTFEmbedded)
buttons[2].addEventListener("click",loadGLTFBinary)