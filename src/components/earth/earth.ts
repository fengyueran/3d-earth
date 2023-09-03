import * as THREE from "three";

import { ObjectWithUpdate } from "../../core";
import earthImg from "../../assets/earth.jpg";
import { earthVertex } from "./earth-vertex";
import { earthFragment } from "./earth-fragment";

interface Uniforms {
  glowColor: { value: THREE.Color };
  scale: { type: string; value: number };
  bias: { type: string; value: number };
  power: { type: string; value: number };
  time: { type: string; value: number };
  isHover: { value: boolean };
  map: { value: THREE.Texture };
}

export class Earth implements ObjectWithUpdate {
  private step: 0;
  private mesh: THREE.Mesh;
  private uniforms: Uniforms;
  private timeValue = 100;

  constructor(radius: number) {
    this.step = 0;

    this.uniforms = {
      glowColor: {
        value: new THREE.Color(0x0cd1eb),
      },
      scale: {
        type: "f",
        value: -1.0,
      },
      bias: {
        type: "f",
        value: 1.0,
      },
      power: {
        type: "f",
        value: 3.3,
      },
      time: {
        type: "f",
        value: this.timeValue,
      },
      isHover: {
        value: false,
      },
      map: {
        value: new THREE.TextureLoader().load(earthImg),
      },
    };

    const earthGeometry = new THREE.SphereGeometry(radius, 50, 50);
    const earthMaterial = new THREE.ShaderMaterial({
      // wireframe:true,
      uniforms: this.uniforms as unknown as {
        [uniform: string]: THREE.IUniform<any>;
      },
      vertexShader: earthVertex,
      fragmentShader: earthFragment,
    });
    this.mesh = new THREE.Mesh(earthGeometry, earthMaterial);
  }

  getMesh = () => this.mesh;

  update = () => {
    this.step += 0.001;
    this.mesh.rotation.y = this.step;
  };
}
