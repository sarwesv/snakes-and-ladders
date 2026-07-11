import * as THREE from 'three';

export class DiceMesh {
  mesh: THREE.Mesh;

  constructor() {
    const geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const materials = this.createDiceMaterials();
    this.mesh = new THREE.Mesh(geometry, materials);
    this.mesh.position.set(7, 0.5, -1.5);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.setDiceNumber(1);
  }

  private createDiceMaterials(): THREE.Material[] {
    const materials: THREE.Material[] = [];

    for (let i = 0; i < 6; i++) {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;

      ctx.fillStyle = '#D84315';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = '#2C1810';
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, 124, 124);

      const diceNumber = i + 1;
      this.drawDiceNumber(ctx, diceNumber);

      const texture = new THREE.CanvasTexture(canvas);
      materials.push(new THREE.MeshPhongMaterial({ map: texture }));
    }

    return materials;
  }

  private drawDiceNumber(ctx: CanvasRenderingContext2D, number: number): void {
    const pips: [number, number][] = [
      [32, 32], [96, 32], [32, 96], [96, 96], [64, 64],
      [32, 64], [96, 64], [32, 32], [96, 32], [32, 96],
      [96, 96], [32, 64], [96, 64], [64, 32], [64, 96],
    ];

    ctx.fillStyle = '#2C1810';
    ctx.beginPath();

    let pipIndices: number[] = [];
    if (number === 1) pipIndices = [4];
    else if (number === 2) pipIndices = [0, 3];
    else if (number === 3) pipIndices = [0, 4, 3];
    else if (number === 4) pipIndices = [0, 1, 2, 3];
    else if (number === 5) pipIndices = [0, 1, 4, 2, 3];
    else if (number === 6) pipIndices = [0, 1, 2, 3, 5, 6];

    for (const idx of pipIndices) {
      const [x, y] = pips[idx];
      ctx.fillRect(x - 8, y - 8, 16, 16);
    }
  }

  setDiceNumber(number: number): void {
    if (number < 1 || number > 6) return;

    const material = this.mesh.material as THREE.Material[];
    (material[4].userData as any).diceNumber = number;
  }
}
