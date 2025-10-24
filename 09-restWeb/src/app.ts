import { envs } from "./config/envs.js";
import { appRoutes } from "./presentation/routes.js";
import { Server } from "./presentation/server.js";

( async() => {
    main();
})();

function main() {

    const server = new Server({
        port: envs.PORT,
        public_path: envs.PUBLIC_PATH,
        routes: appRoutes.routes,
    });
    server.start();
}