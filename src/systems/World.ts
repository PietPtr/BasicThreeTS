import THREE from 'three';

// The game manages the game state and the requestAnimationFrame. Anything to make the ThreeJS loop work is here.
export default class Game {

    animationFrameID: number;
    scenes: { [name: string]: THREE.Scene } = {};
    renderer: THREE.WebGLRenderer;
    camera: THREE.PerspectiveCamera;
    activeScene: string = 'default';

    constructor() {
        this.scenes = {};
    }

    start(): void {
        this.addScene(new THREE.Scene(), this.activeScene);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setClearColor(new THREE.Color('#000000'), 1);
        this.renderer.setSize(window.innerWidth, window.innerHeight);

        document.body.appendChild(this.renderer.domElement);

        window.addEventListener('resize', () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
        }, false);

        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.001, 100000);


        // --- Fill the scene ---


        // ----------------------

        var lastTimeMsec: number;
        let animate = (nowMsec: number) => {
            this.animationFrameID = requestAnimationFrame(animate);

            lastTimeMsec = lastTimeMsec || nowMsec-1000/60;
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;

            this.onFrame(deltaMsec / 1000, nowMsec / 1000);

        };
        this.animationFrameID = requestAnimationFrame(animate);
    }

    onFrame(dt: number, now: number) {

        this.renderer.render( this.scenes[this.activeScene], this.camera );
    }

    addScene(scene: THREE.Scene, name: string): void {
        this.scenes[name] = scene;
    }
}
