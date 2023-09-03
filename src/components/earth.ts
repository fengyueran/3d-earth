import {
  BufferGeometry,
  TextureLoader,
  MeshPhongMaterial,
  Mesh,
  SphereGeometry,
} from "three";

import { ObjectWithUpdate } from "../core";
import floorWood from "../assets/floor-wood.jpg";

const createMesh = (geom: BufferGeometry, imageFile: string) => {
  const texture = new TextureLoader().load(imageFile);
  const mat = new MeshPhongMaterial();
  mat.map = texture;

  const mesh = new Mesh(geom, mat);
  return mesh;
};

export class Earth implements ObjectWithUpdate {
  private step: 0;
  private mesh: Mesh;

  constructor(radius: number) {
    this.step = 0;
    this.mesh = createMesh(new SphereGeometry(radius, 20, 20), floorWood);
  }

  getMesh = () => this.mesh;

  update = () => {
    this.step += 0.01;
    this.mesh.rotation.y = this.step;
  };
}
