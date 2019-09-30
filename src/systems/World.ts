
import THREE from 'three';

export default class World {

    animationFrameId: number;
    scenes: { [name: string]: THREE.Scene } = {};

    constructor() {
        this.scenes = {};
    }

    start(): void {
        this.addScene(new THREE.Scene(), 'default');
    }

    addScene(scene: THREE.Scene, name: string): void {
        this.scenes[name] = scene;
    }
}
