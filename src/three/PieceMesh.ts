import * as THREE from 'three';
import { SQUARE_SIZE } from '../utils/constants';
import { getSquareWorldPosition } from '../utils/boardCoordinates';

export class PieceMesh {
  mesh: THREE.Mesh;
  playerId: string;
  color: string;

  constructor(playerId: string, color: string) {
    this.playerId = playerId;
    this.color = color;

    const geometry = new THREE.CylinderGeometry(0.15, 0.15, 0.5, 32);
    const material = new THREE.MeshPhongMaterial({
      color,
      shininess: 60,
      emissive: 0x000000,
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    this.setPosition(0);
  }

  setPosition(squareNumber: number): void {
    const pos = getSquareWorldPosition(squareNumber);
    this.mesh.position.set(pos.x + SQUARE_SIZE / 2, 0.3, pos.z + SQUARE_SIZE / 2);
  }
}
