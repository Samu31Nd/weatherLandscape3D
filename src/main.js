import './style.css';

import * as THREE from 'three';
import { GLTFLoader, OrbitControls } from 'three/examples/jsm/Addons.js';


// ! ESCENA
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x05080f);
scene.fog = new THREE.Fog(0x05080f, 10, 60); // lluvia + profundidad



// ! CAMARA
const camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    0.1,
    70,
);
//camera.position.set(12, 9, 5);
camera.position.set(11.57, 3.67, -4.14);
camera.rotation.set(-2.592, 1.060, 2.650);


const cameraIdle = {
    enabled: true,
    amplitude: 1, // qué tanto se mueve
    speed: 0.0005,   // qué tan lento
    offset: Math.random() * Math.PI * 2
};

const baseCameraPosition = camera.position.clone();

// ! RENDERER
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.enabled = true;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.8;

renderer.setSize(innerWidth, window.innerHeight);

// ? Color correcto
renderer.outputColorSpace = THREE.SRGBColorSpace;
document.body.appendChild(renderer.domElement);

// ! CONTROLES
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

controls.target.set(0, -0.3, 2);
controls.update();

// ! LUCES
const ambientLight = new THREE.AmbientLight(0x223344, 0.15);
scene.add(ambientLight);

const moonLight = new THREE.DirectionalLight(0x88aaff, 1.2);
moonLight.position.set(10, 20, 10);
moonLight.castShadow = true;

moonLight.shadow.mapSize.set(2048, 2048);
moonLight.shadow.normalBias = 0.05;

scene.add(moonLight);

const fillLight = new THREE.DirectionalLight(0x445566, 0.3);
fillLight.position.set(-10, 5, -10);
scene.add(fillLight);

const rimLight = new THREE.DirectionalLight(0x99bbff, 0.4);
rimLight.position.set(0, 6, -15);
scene.add(rimLight);

const houseLight1 = new THREE.PointLight(0xffcc88, 0.3, 12);
houseLight1.position.set(1, 1, 0);
scene.add(houseLight1);

const houseLight2 = new THREE.PointLight(0xffcc88, 0.3, 1);
houseLight2.position.set(1.1, 0.2, 0);
scene.add(houseLight2);

const houseLight3 = new THREE.PointLight(0xffcc88, 0.7, 12);
houseLight3.position.set(0, 0.4, -1);
scene.add(houseLight3);

const houseLight4 = new THREE.PointLight(0xffcc88, 0.7, 12);
houseLight4.position.set(0, 0.4, 1);
scene.add(houseLight4);


const loader = new GLTFLoader();

// ! CASA cargando...
loader.load(
    "/models/houseThree.glb",
    (gltf) => {
        const model = gltf.scene;

        model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                child.castShadow = true;
                child.receiveShadow = true;

            };
        })

        scene.add(model);
    }, undefined,
    (error) => {
        console.error('Error cargando el GLB:', error);
    }
);

// ! Terreno cercano cargando

loader.load(
    '/models/terrain.glb',
    (gltf) => {
        const terrain = gltf.scene;

        terrain.position.set(0, 0, 0);
        terrain.scale.set(1, 1, 1);

        terrain.traverse((child) => {
            if (child.isMesh) {
                child.receiveShadow = true;
                child.castShadow = false; // normalmente el terreno no proyecta
            }
        });

        scene.add(terrain);
    },
    undefined,
    (error) => {
        console.error('Error cargando el terreno:', error);
    }
);

loader.load(
    '/models/distantTerrain.glb',
    (gltf) => {
        const terrain = gltf.scene;

        terrain.position.set(10, 0, 5);
        terrain.scale.set(1, 1, 1);

        terrain.traverse((child) => {
            if (child.isMesh) {
                child.receiveShadow = false;
                child.castShadow = false; // normalmente el terreno no proyecta
            }
            if (child.material) {
                child.material.color.multiplyScalar(0.7);
            }
        });

        scene.add(terrain);
    },
    undefined,
    (error) => {
        console.error('Error cargando el terreno:', error);
    }
);


// ! RESIZE
window.addEventListener("resize", () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
})

controls.addEventListener('start', () => {
    cameraIdle.enabled = false;
});

controls.addEventListener('end', () => {
    cameraIdle.enabled = true;
    baseCameraPosition.copy(camera.position);
});



// ! LLUVIA LOL
const rainCount = 6000;
const positions = new Float32Array(rainCount * 6);

for (let i = 0; i < rainCount; i++) {
    const x = Math.random() * 50 - 25;
    const y = Math.random() * 50;
    const z = Math.random() * 50 - 25;

    const length = Math.random() * 0.5 + 0.2;

    const idx = i * 6;

    // punto inicial
    positions[idx] = x;
    positions[idx + 1] = y;
    positions[idx + 2] = z;

    // punto final (línea vertical)
    positions[idx + 3] = x;
    positions[idx + 4] = y - length;
    positions[idx + 5] = z;
}

const geometryRainDrops = new THREE.BufferGeometry();
geometryRainDrops.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const materialRainDrops = new THREE.LineBasicMaterial({
    color: 0x8fbfff,
    transparent: true,
    opacity: 0.5,
});

const rain = new THREE.LineSegments(geometryRainDrops, materialRainDrops);
scene.add(rain);

// ? Efecto animado lluvia
const floorY = -10;
const topY = 50;

const speeds = new Float32Array(rainCount);
for (let i = 0; i < rainCount; i++) {
    speeds[i] = 0.2 + Math.random() * 0.3;
}


function animateRain() {
    const pos = rain.geometry.attributes.position.array;

    for (let i = 0; i < pos.length; i += 6) {
        const idx = i / 6;
        const s = speeds[idx];

        pos[i + 1] -= s;
        pos[i + 4] -= s;

        if (pos[i + 4] < floorY) {
            const newY = topY + Math.random() * 20;

            pos[i + 1] = newY;
            pos[i + 4] = newY - (Math.random() * 0.5 + 0.2);
        }
    }


    rain.geometry.attributes.position.needsUpdate = true;
}

// ! LOOP
let lastTrigger = 0;

function animate(time) {

    if (time - lastTrigger >= 10) {
        lastTrigger = time;

        if (cameraIdle.enabled) {
            const sway = Math.sin(time * cameraIdle.speed + cameraIdle.offset);
            camera.position.x = baseCameraPosition.x + sway * cameraIdle.amplitude;
            camera.position.y = baseCameraPosition.y + sway * cameraIdle.amplitude;
        }
    }

    requestAnimationFrame(animate);
    controls.update();
    animateRain();
    renderer.render(scene, camera);
}



// ! To change the camera this snippet is helpul
/*
window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        const pos = camera.position;
        const rot = camera.rotation;

        console.log('📷 CAMERA POSITION');
        console.log(`camera.position.set(${pos.x.toFixed(2)}, ${pos.y.toFixed(2)}, ${pos.z.toFixed(2)});`);

        console.log('📷 CAMERA ROTATION');
        console.log(`camera.rotation.set(${rot.x.toFixed(3)}, ${rot.y.toFixed(3)}, ${rot.z.toFixed(3)});`);
    }
});
*/

// Alchile no se que hace esto
const fogHeight = 10;
const fogGeo = new THREE.BoxGeometry(80, fogHeight, 80);


const fogMat = new THREE.ShaderMaterial({
    transparent: true,
    opacity: 0.5,
    depthWrite: false,
    uniforms: {
        color: { value: new THREE.Color(0x6d7585) },
        topY: { value: -10 },
        bottomY: { value: -20 }
    },
    vertexShader: `
    varying float vY;
    void main() {
      vY = position.y;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
    }
  `,
    fragmentShader: `
    uniform vec3 color;
    uniform float topY;
    uniform float bottomY;
    varying float vY;

    void main() {
      float alpha = smoothstep(bottomY, topY, vY);
      gl_FragColor = vec4(color, alpha * 0.4);
    }
  `
});
const fogMesh = new THREE.Mesh(fogGeo, fogMat);
fogMesh.position.y = -15;
scene.add(fogMesh);



animate();