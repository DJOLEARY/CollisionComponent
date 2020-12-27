class Demo {

    static _USE_SPATIAL_HASHING = true

    static _PLAYER = {}

    constructor() {
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
            this._collisionManager.useSpatialHashing(100, 100)        

        Demo._PLAYER = new Player()
        this._collisionManager.addCollider(Demo._PLAYER.collider)

        this._initSeparatingAxisTheoremNpc()
        this._initSpatialHashingDemoNpcs()
        this._initEventListeners()
    }

    _initSeparatingAxisTheoremNpc() {
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
        var shape = new Polygon(polygonVertices)
        var tags = new Tags(["rock"], [])
        this._collisionManager.addCollider(new Collider(shape, tags))
    }

    _initSpatialHashingDemoNpcs() {
        var radius = 10
        var numOfNpcs = 1000
        for (var i = 0; i < numOfNpcs; i++) {
            var position = new Vector2(Math.random() * window.innerWidth, Math.random() * window.innerHeight + window.innerHeight / 2)
            var shape = new Circle(position, radius)
            var tags = new Tags(["npc"], ["npc"])
            this._collisionManager.addCollider(new Collider(shape, tags))
        }
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
            "    Swap shape:",
            "        Rectangle: 1",
            "        Circle: 2",
            "        Convex Polygon: 3",
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
                    Demo._PLAYER.convertToRectangle()
                    break

                case "Digit2":
                    Demo._PLAYER.convertToCircle()
                    break

                case "Digit3":
                    Demo._PLAYER.convertToConvexPolygon()
                    break
            }

            event.preventDefault()
        }, true)
    }

    update() {
        this._collisionManager.checkForCollisions()
        this._render()

        window.requestAnimationFrame(this.update.bind(this))
    }

    _render() {
        this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
        this._collisionManager.render(this._context)
    }
}