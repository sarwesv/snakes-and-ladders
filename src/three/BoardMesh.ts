import * as THREE from 'three';
import { BOARD_COLS, SQUARE_SIZE } from '../utils/constants';

export class BoardMesh {
  group: THREE.Group = new THREE.Group();
  squares: THREE.Mesh[] = [];

  constructor() {
    this.createBoard();
  }

  private createBoard(): void {
    const boardGeometry = new THREE.PlaneGeometry(BOARD_COLS * SQUARE_SIZE, BOARD_COLS * SQUARE_SIZE);
    const boardMaterial = new THREE.MeshPhongMaterial({
      color: 0xd4a574,
      shininess: 30,
    });

    const boardMesh = new THREE.Mesh(boardGeometry, boardMaterial);
    boardMesh.receiveShadow = true;
    boardMesh.rotation.x = -Math.PI / 2;
    boardMesh.position.y = -0.01;
    this.group.add(boardMesh);

    // Simple grid pattern without complex textures
    this.createSimpleGrid();
    this.createBorder();
  }

  private createSimpleGrid(): void {
    const gridSize = BOARD_COLS;

    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        const x = col * SQUARE_SIZE + SQUARE_SIZE / 2;
        const z = row * SQUARE_SIZE + SQUARE_SIZE / 2;

        // Alternating colors
        const isLight = (row + col) % 2 === 0;
        const color = isLight ? 0xf5e6d3 : 0xe8d7c3;

        const squareGeometry = new THREE.PlaneGeometry(SQUARE_SIZE * 0.98, SQUARE_SIZE * 0.98);
        const squareMaterial = new THREE.MeshPhongMaterial({
          color,
          shininess: 20,
        });

        const square = new THREE.Mesh(squareGeometry, squareMaterial);
        square.position.set(x, 0.01, z);
        square.rotation.x = -Math.PI / 2;
        this.group.add(square);
        this.squares.push(square);
      }
    }
  }

  private createBorder(): void {
    const borderThickness = 0.08;
    const borderHeight = 0.15;
    const boardWidth = BOARD_COLS * SQUARE_SIZE;

    const borderColor = new THREE.MeshPhongMaterial({ color: 0x3E2723 });

    const topBorder = new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth + borderThickness * 2, borderHeight, borderThickness),
      borderColor
    );
    topBorder.position.set(boardWidth / 2, 0.075, -borderThickness / 2);
    this.group.add(topBorder);

    const bottomBorder = new THREE.Mesh(
      new THREE.BoxGeometry(boardWidth + borderThickness * 2, borderHeight, borderThickness),
      borderColor
    );
    bottomBorder.position.set(boardWidth / 2, 0.075, boardWidth + borderThickness / 2);
    this.group.add(bottomBorder);

    const leftBorder = new THREE.Mesh(
      new THREE.BoxGeometry(borderThickness, borderHeight, boardWidth),
      borderColor
    );
    leftBorder.position.set(-borderThickness / 2, 0.075, boardWidth / 2);
    this.group.add(leftBorder);

    const rightBorder = new THREE.Mesh(
      new THREE.BoxGeometry(borderThickness, borderHeight, boardWidth),
      borderColor
    );
    rightBorder.position.set(boardWidth + borderThickness / 2, 0.075, boardWidth / 2);
    this.group.add(rightBorder);
  }
}
