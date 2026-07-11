import * as THREE from 'three';
import { SQUARE_SIZE } from '../utils/constants';
import { getSquareWorldPosition } from '../utils/boardCoordinates';

export class LadderMesh {
  mesh: THREE.Group = new THREE.Group();
  startSquare: number;
  endSquare: number;

  constructor(startSquare: number, endSquare: number) {
    this.startSquare = startSquare;
    this.endSquare = endSquare;
    this.createLadder();
  }

  private createLadder(): void {
    const startPos = getSquareWorldPosition(this.startSquare);
    const endPos = getSquareWorldPosition(this.endSquare);

    const startX = startPos.x + SQUARE_SIZE / 2;
    const startZ = startPos.z + SQUARE_SIZE / 2;
    const endX = endPos.x + SQUARE_SIZE / 2;
    const endZ = endPos.z + SQUARE_SIZE / 2;

    this.createSides(startX, startZ, endX, endZ);
    this.createRungs(startX, startZ, endX, endZ);
  }

  private createSides(x1: number, z1: number, x2: number, z2: number): void {
    const height = 0.8;
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(z2 - z1, 2));

    const sideGeometry = new THREE.BoxGeometry(0.08, height, distance);
    const sideMaterial = new THREE.MeshPhongMaterial({ color: 0xBF8F00 });

    const leftSide = new THREE.Mesh(sideGeometry, sideMaterial);
    leftSide.position.set((x1 + x2) / 2 - 0.15, 0.4, (z1 + z2) / 2);
    leftSide.rotation.y = Math.atan2(z2 - z1, x2 - x1);
    leftSide.castShadow = true;
    this.mesh.add(leftSide);

    const rightSide = new THREE.Mesh(sideGeometry, sideMaterial);
    rightSide.position.set((x1 + x2) / 2 + 0.15, 0.4, (z1 + z2) / 2);
    rightSide.rotation.y = Math.atan2(z2 - z1, x2 - x1);
    rightSide.castShadow = true;
    this.mesh.add(rightSide);
  }

  private createRungs(x1: number, z1: number, x2: number, z2: number): void {
    const numRungs = 6;

    for (let i = 0; i <= numRungs; i++) {
      const t = i / numRungs;
      const x = x1 + (x2 - x1) * t;
      const z = z1 + (z2 - z1) * t;
      const y = 0.2 + (0.8 / numRungs) * i;

      const rungGeometry = new THREE.BoxGeometry(0.4, 0.06, 0.08);
      const rungMaterial = new THREE.MeshPhongMaterial({ color: 0xD4A574 });
      const rung = new THREE.Mesh(rungGeometry, rungMaterial);

      rung.position.set(x, y, z);
      rung.rotation.y = Math.atan2(z2 - z1, x2 - x1);
      rung.castShadow = true;
      this.mesh.add(rung);
    }
  }
}
