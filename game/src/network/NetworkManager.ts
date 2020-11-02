class NetworkManager {
    //worldManager: WorldManager

    constructor() {

    }
}


/**
 * Websocket flow:
 *  - Each client keeps track of the world objects that they "own"
 *  - Client sends server the status / context of each of these objects
 *  - Other clients receive this status / context and updates each of these objects accordingly
 */