import * as THREE from 'three';
import { getCameraPosition } from '../utils/boardCoordinates';

export class SceneSetup {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;

  constructor(container: HTMLElement) {
    try {
      console.log('SceneSetup: Initializing...');
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x1a1a1a);
      console.log('SceneSetup: Scene created');

      this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
      const startCameraPos = getCameraPosition(1);
      console.log('SceneSetup: Camera position:', startCameraPos);
      this.camera.position.set(startCameraPos.x, startCameraPos.y, startCameraPos.z);
      this.camera.lookAt(5, 0.5, 5);

      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.shadowMap.enabled = true;
      container.appendChild(this.renderer.domElement);
      console.log('SceneSetup: Renderer created and added to DOM');

      this.setupLighting();
      this.setupEventListeners();
      console.log('SceneSetup: Initialization complete');
    } catch (error) {
      console.error('SceneSetup: Error during initialization', error);
      throw error;
    }
  }

  private setupLighting(): void {
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    this.scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 15, 5);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 1024;
    directionalLight.shadow.mapSize.height = 1024;
    directionalLight.shadow.camera.far = 100;
    this.scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0xffaa88, 0.3);
    pointLight.position.set(5, 10, 5);
    this.scene.add(pointLight);
  }

  private setupEventListeners(): void {
    window.addEventListener('resize', () => this.onWindowResize());
  }

  private onWindowResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  dispose(): void {
    this.renderer.dispose();
  }
}
