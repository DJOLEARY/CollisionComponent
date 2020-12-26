class Demo {

    static _USE_SPATIAL_HASHING = true
    static _NUM_OF_NPCS = 1000

    static _PLAYER = {}

    constructor() {
        if (Demo._USE_SPATIAL_HASHING) {
            this._gridHeight = 100
            this._gridWidth = 100
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
            this._collisionManager.useSpatialHashing(this._gridHeight, this._gridWidth)

        Demo._PLAYER = new Player()
        this._collisionManager.addCollider(Demo._PLAYER.collider)

        var polygonVertices = [
            new Vector2(600, 25), 
            new Vector2(610, 10), 
            new Vector2(630, 40), 
            new Vector2(650, 70), 
            new Vector2(660, 90), 
            new Vector2(640, 120), 
            new Vector2(620, 150), 
            new Vector2(600, 80)
        ]
        var polygonObjectTags = ["rock"]
        var polygonIgnoreTags = []
        this._collisionManager.addCollider(new PolygonCollider(polygonVertices, polygonObjectTags, polygonIgnoreTags))

        var npcRadius = 10
        var npcObjectTags = ["npc"]
        var npcIgnoreTags = ["npc"]
        for (var i = 0; i < Demo._NUM_OF_NPCS; i++) {
            var position = new Vector2(Math.random() * window.innerWidth, Math.random() * window.innerHeight + window.innerHeight / 2)
            this._collisionManager.addCollider(new CircleCollider(position, npcRadius, npcObjectTags, npcIgnoreTags))
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
                return

            switch (event.code) {
                case "KeyW":
                    Demo._PLAYER.move(0, -5)
                    break

                case "KeyS":
                    Demo._PLAYER.move(0, 5)
                    break

                case "KeyA":
                    Demo._PLAYER.move(-5, 0)
                    break

                case "KeyD":
                    Demo._PLAYER.move(5, 0)
                    break

                case "KeyQ":
                    Demo._PLAYER.rotate(-5)
                    break

                case "KeyE":
                    Demo._PLAYER.rotate(5)
                    break

                case "KeyR":
                    Demo._PLAYER.scale(2)
                    break

                case "KeyF":
                    Demo._PLAYER.scale(0.5)
                    break

                case "Digit1":
                    Demo._PLAYER.convertToBoxCollider()
                    break

                case "Digit2":
                    Demo._PLAYER.convertToCircleCollider()
                    break

                case "Digit3":
                    Demo._PLAYER.convertToPolygonCollider()
                    break
            }

            event.preventDefault()
        }, true)
    }

    update() {
        if (Demo._PLAYER.needToRefreshCollider)
            this._refreshPlayerCollider()

        this._collisionManager.checkAllColliders()
        this._render()

        window.requestAnimationFrame(this.update.bind(this))
    }

    _refreshPlayerCollider() {
        this._collisionManager.removeCollider(Demo._PLAYER.previousCollider)
        Demo._PLAYER.previousCollider = null

        this._collisionManager.addCollider(Demo._PLAYER.collider)
    }

    _render() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
        this._collisionManager.render(this._context)
    }
}