import World from './systems/World';

class Main {
    static world: World = new World();

    static run() {
        Main.world.start();
    }
}

Main.run();


// Make main available to the window for debugging
declare global {
    interface Window { Main: any; }
}

window.Main = window.Main || Main;
