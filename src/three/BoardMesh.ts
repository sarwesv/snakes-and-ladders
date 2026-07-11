import * as THREE from 'three';
import { BOARD_COLS, BOARD_ROWS, SQUARE_SIZE } from '../utils/constants';
import { getSquareWorldPosition } from '../utils/boardCoordinates';

export class BoardMesh {
  group: THREE.Group = new THREE.Group();
  squares: THREE.Mesh[] = [];

  constructor() {
    this.createBoard();
  }

  private createBoard(): void {
    const boardGeometry = new THREE.PlaneGeometry(BOARD_COLS * SQUARE_SIZE, BOARD_ROWS * SQUARE_SIZE);
    const boardMaterial = new THREE.MeshPhongMaterial({
      color: 0xf5e6d3,
      shininess: 30,
    });

    const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
    boardMesh.receiveShadow = true;
    boardMesh.rotation.x = -Math.PI / 2;
    this.group.add(boardMesh);

    this.createSquares();
    this.createBorder();
  }

  private createSquares(): void {
    for (let i = 1; i <= 100; i++) {
      const pos = getSquareWorldPosition(i);
      const squareGeometry = new THREE.PlaneGeometry(SQUARE_SIZE * 0.95, SQUARE_SIZE * 0.95);

      const isLight = (i % 2 === 0);
      const color = isLight ? 0xf5e6d3 : 0xf0dcc8;
      const squareMaterial = new THREE.MeshPhongMaterial({
        color,
        shininess: 20,
      });

      const square = new THREE.Mesh(squareGeometry, squareMaterial);
      square.position.set(pos.x + SQUARE_SIZE / 2, 0.01, pos.z + SQUARE_SIZE / 2);
      square.rotation.x = -Math.PI / 2;
      this.group.add(square);
      this.squares.push(square);

      this.createSquareNumber(i, pos);
    }
  }

  private createSquareNumber(squareNumber: number, pos: THREE.Vector3Like): void {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#3E2723';
    ctx.font = 'bold 28px Georgia';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(squareNumber.toString(), 32, 32);

    const texture = new THREE.CanvasTexture(canvas);
    const numberGeometry = new THREE.PlaneGeometry(0.4, 0.4);
    const numberMaterial = new THREE.MeshBasicMaterial({ map: texture });
    const numberMesh = new THREE.Mesh(numberGeometry, numberMaterial);

    numberMesh.position.set(pos.x + SQUARE_SIZE / 2 + 0.2, 0.02, pos.z + SQUARE_SIZE / 2 - 0.2);
    numberMesh.rotation.x = -Math.PI / 2;
    this.group.add(numberMesh);
  }

  private createBorder(): void {
    const borderThickness = 0.05;
    const borderHeight = 0.1;
    const boardWidth = BOARD_COLS * SQUARE_SIZE;
    const boardDepth = BOARD_ROWS * SQUARE_SIZE;

    const borderColor = new THREE.MeshPhongMaterial({ color: 0x3E2723 });

    const topBorder = new THREE.Mesh(new THREE.BoxGeometry(boardWidth, borderHeight, borderThickness), borderColor);
    topBorder.position.set(boardWidth / 2, 0.05, -borderThickness / 2);
    this.group.add(topBorder);

    const bottomBorder = new THREE.Mesh(new THREE.BoxGeometry(boardWidth, borderHeight, borderThickness), borderColor);
    bottomBorder.position.set(boardWidth / 2, 0.05, boardDepth + borderThickness / 2);
    this.group.add(bottomBorder);

    const leftBorder = new THREE.Mesh(new THREE.BoxGeometry(borderThickness, borderHeight, boardDepth), borderColor);
    leftBorder.position.set(-borderThickness / 2, 0.05, boardDepth / 2);
    this.group.add(leftBorder);

    const rightBorder = new THREE.Mesh(new THREE.BoxGeometry(borderThickness, borderHeight, boardDepth), borderColor);
    rightBorder.position.set(boardWidth + borderThickness / 2, 0.05, boardDepth / 2);
    this.group.add(rightBorder);
  }
}
