import * as THREE from 'three';
import { SQUARE_SIZE } from '../utils/constants';
import { getSquareWorldPosition } from '../utils/boardCoordinates';

export class SnakeMesh {
  mesh: THREE.Group = new THREE.Group();
  startSquare: number;
  endSquare: number;

  constructor(startSquare: number, endSquare: number) {
    this.startSquare = startSquare;
    this.endSquare = endSquare;
    this.createSnake();
  }

  private createSnake(): void {
    const startPos = getSquareWorldPosition(this.startSquare);
    const endPos = getSquareWorldPosition(this.endSquare);

    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(startPos.x + SQUARE_SIZE / 2, 0.2, startPos.z + SQUARE_SIZE / 2),
      new THREE.Vector3(startPos.x + SQUARE_SIZE / 2 + 0.5, 0.3, startPos.z + SQUARE_SIZE / 2 - 0.3),
      new THREE.Vector3((startPos.x + endPos.x) / 2, 0.1, (startPos.z + endPos.z) / 2),
      new THREE.Vector3(endPos.x + SQUARE_SIZE / 2 - 0.5, 0.3, endPos.z + SQUARE_SIZE / 2 + 0.3),
      new THREE.Vector3(endPos.x + SQUARE_SIZE / 2, 0.2, endPos.z + SQUARE_SIZE / 2),
    ]);

    const geometry = new THREE.TubeGeometry(curve, 20, 0.08, 8);
    const material = new THREE.MeshPhongMaterial({
      color: 0x1B5E20,
      shininess: 40,
    });

    const snakeBody = new THREE.Mesh(geometry, material);
    snakeBody.castShadow = true;
    snakeBody.receiveShadow = true;
    this.mesh.add(snakeBody);

    this.createSnakeHead(endPos);
  }

  private createSnakeHead(endPos: THREE.Vector3Like): void {
    const headGeometry = new THREE.SphereGeometry(0.12, 16, 16);
    const headMaterial = new THREE.MeshPhongMaterial({ color: 0xFFD54F });
    const head = new THREE.Mesh(headGeometry, headMaterial);
    head.position.set(endPos.x + SQUARE_SIZE / 2, 0.2, endPos.z + SQUARE_SIZE / 2);
    head.castShadow = true;
    this.mesh.add(head);
  }
}
