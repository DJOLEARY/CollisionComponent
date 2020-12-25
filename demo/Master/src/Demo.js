class Demo {

    static _USE_SPATIAL_HASHING = true
    static _NUM_OF_NPCS = 1000

    static PLAYER = {}

    constructor() {
        if (Demo._USE_SPATIAL_HASHING) {
            this._gridHeight = 50
            this._gridWidth = 50
        }
    }

    init() {
        this._initCanvas()
        this._printControlsToConsole()
        this._initDemoObjects()
    }

    _initCanvas() {
        this._canvas = document.createElement("canvas")
        this._canvas.id = "demoCanvas"
        this._canvas.height = window.innerHeight
        this._canvas.width = window.innerWidth
        this._context = this._canvas.getContext("2d")
        document.body.appendChild(this._canvas)
    }

    _initDemoObjects() {
        this._collisionManager = new CollisionManager()
        if (Demo._USE_SPATIAL_HASHING)
            this._collisionManager.updateSpatialHashing(this._gridWidth, this._gridHeight)

        Demo.PLAYER = new BoxCollider(new Vector2(0, 0), 50, 50, ["player"])
        this._collisionManager.addBoxCollider(Demo.PLAYER)

        var npcRadius = 10
        var npcObjectTags = ["npc"]
        var npcIgnoreTags = ["npc"]
        for (var i = 0; i < Demo._NUM_OF_NPCS; i++) {
            var position = new Vector2(Math.random() * window.innerWidth, Math.random() * window.innerHeight + window.innerHeight / 2)
            var npcCollider = new CircleCollider(position, npcRadius, npcObjectTags, npcIgnoreTags)
            this._collisionManager.addCircleCollider(npcCollider)
        }

        this._initEventListeners()
    }

    _printControlsToConsole() {
        var instructions = [
            "Controls:",
            "    Movement:",
            "        Up: W",
            "        Down: S",
            "        Left: A",
            "        Right: D",
            "    Scale:",
            "        Up: R",
            "        Down: F",
            "    Rotation:",
            "        Anti-Clockwise: Q",
            "        Clockwise: E",
            "    Swap Collider:",
            "        BoxCollider: 1",
            "        CircleCollider: 2",
            "        PolygonCollider: 3",
        ]
        console.log(instructions.join("\n"))
    }

    _initEventListeners() {
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented)
                return;

            switch (event.code) {
                case "KeyW":
                    Demo.PLAYER.move(0, -5)
                    break

                case "KeyS":
                    Demo.PLAYER.move(0, 5)
                    break

                case "KeyA":
                    Demo.PLAYER.move(-5, 0)
                    break

                case "KeyD":
                    Demo.PLAYER.move(5, 0)
                    break

                case "KeyQ":
                    if (Demo.PLAYER instanceof PolygonCollider)
                        Demo.PLAYER.rotate(-5)
                    break

                case "KeyE":
                    if (Demo.PLAYER instanceof PolygonCollider)
                        Demo.PLAYER.rotate(5)
                    break

                case "KeyR":
                    Demo.PLAYER.scale(2)
                    break

                case "KeyF":
                    Demo.PLAYER.scale(0.5)
                    break

                case "Digit1":
                    if (Demo.PLAYER instanceof BoxCollider)
                        break
                    // todo Swap player to BoxCollider
                    break

                case "Digit2":
                    if (Demo.PLAYER instanceof CircleCollider)
                        break
                    // todo Swap player to CircleCollider
                    break

                case "Digit3":
                    if (Demo.PLAYER instanceof PolygonCollider)
                        break
                    // todo Swap player to PolygonCollider
                    break
            }

            event.preventDefault();
        }, true);
    }

    update() {
        this._collisionManager.checkAllColliders();
        this._render();

        window.requestAnimationFrame(this.update.bind(this));
    }

    _render() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
        this._collisionManager.render(this._context)
    }
}