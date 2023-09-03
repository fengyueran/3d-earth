import { useRef, useEffect } from "react";
import * as THREE from "three";

import { RenderManager } from "./core";
import { Earth } from "./components";

const App = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current!;

    const rm = new RenderManager(container);

    // add spotlight for the shadows
    const ambiLight = new THREE.AmbientLight(0x141414);
    rm.scene.add(ambiLight);

    const light = new THREE.DirectionalLight();
    light.position.set(10, 300, 2000);
    rm.scene.add(light);

    const earth = new Earth(10);
    rm.add(earth);

    rm.render();
  }, []);

  return <div style={{ width: "800px", height: "400px" }} ref={containerRef} />;
};

export default App;
