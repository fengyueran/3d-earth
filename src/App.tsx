import { useRef, useEffect } from "react";
import * as THREE from "three";

import floorWood from "./assets/floor-wood.jpg";

const createMesh = (geom: THREE.BufferGeometry, imageFile: string) => {
  const texture = new THREE.TextureLoader().load(imageFile);
  const mat = new THREE.MeshPhongMaterial();
  mat.map = texture;

  const mesh = new THREE.Mesh(geom, mat);
  return mesh;
};

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // create a scene, that will hold all our elements such as objects, cameras and lights.
    const scene = new THREE.Scene();

    const container = containerRef.current!;
    // create a camera, which defines where we're looking at.
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    // create a render and set the size
    const webGLRenderer = new THREE.WebGLRenderer();
    webGLRenderer.setClearColor(new THREE.Color(0x000));
    webGLRenderer.setSize(container.clientWidth, container.clientHeight);
    webGLRenderer.shadowMap.enabled = true;

    const sphere = createMesh(new THREE.SphereGeometry(5, 20, 20), floorWood);
    scene.add(sphere);

    // position and point the camera to the center of the scene
    camera.position.x = 0;
    camera.position.y = 0;
    camera.position.z = 26;
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // add spotlight for the shadows
    const ambiLight = new THREE.AmbientLight(0x141414);
    scene.add(ambiLight);

    const light = new THREE.DirectionalLight();
    light.position.set(10, 300, 2000);
    scene.add(light);

    container.appendChild(webGLRenderer.domElement);
    let step = 0;
    function render() {
      step += 0.01;
      sphere.rotation.y = step;
      requestAnimationFrame(render);
      webGLRenderer.render(scene, camera);
    }
    render();
  }, []);

  return <div style={{ width: "800px", height: "400px" }} ref={containerRef} />;
};

export default App;
