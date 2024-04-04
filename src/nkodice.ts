import { FontLoader, OrbitControls, TextGeometry } from "three/examples/jsm/Addons.js";
import { intRandom, randomChoice } from "./rand";
import * as THREE from "three";

export const main = (dom: HTMLElement): void => {
  const shakeAudio = document.querySelector<HTMLAudioElement>("#shake");
  shakeAudio?.play();

  const chars: string[] = [
    'O ', 'CHI ', 'N ', 'MA ', 'U ', 'KO '
  ];

  // string
  let word: string = chars[intRandom(0, 1)];

  for (let i = 1; i < 5; i++) {
    word += randomChoice(chars);
  }


  // Scene
  // const canvas = document.querySelector('canvas');
  const scene = new THREE.Scene();

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //camera
  const camera = new THREE.PerspectiveCamera(
    75,
    sizes.width / sizes.height,
    0.1,
    100
  );
  camera.position.set(1, 1, 2);
  // scene.add(camera);
  const loader = new FontLoader();
  loader.load('../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    const textGeometory = new TextGeometry(word, {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 5,
      bevelEnabled: true,
      bevelThickness: 0.007,
      bevelSize: 0.01,
      bevelOffset: 0,
      bevelSegments: 4,
    });
    textGeometory.center();
    const textMaterial = new THREE.MeshBasicMaterial({
      color: '#fff'
    });
    const line = new THREE.LineSegments(
      new THREE.EdgesGeometry(textGeometory), // 線を生成する元になるgeometry
      new THREE.LineBasicMaterial({ color: '#ff0000' }) // 線のmaterial
    );
    const text = new THREE.Mesh(textGeometory, textMaterial);
    text.add(line);
    scene.add(text);
  });

  // Renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  try {
    dom.appendChild(renderer.domElement);
  } catch (e) {
    console.error(e);
    dom.innerText = word;
  }

  const grateAudio = document.querySelector<HTMLAudioElement>("#nice")

  if (word === "O CHI N CHI N") {
    alert('Fantastic!');
    grateAudio?.play();
  } else if (word.includes('O MA N KO')) {
    alert('Rush!!!');
    grateAudio?.play();
  }

  // Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;

  // Animate
  const animate = () => {
    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(animate);
  };

  window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  animate();
}