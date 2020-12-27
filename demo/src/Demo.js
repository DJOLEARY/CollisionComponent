class Demo {

    static _USE_SPATIAL_HASHING = true

    static _PLAYER1 = {}
    static _PLAYER2 = {}

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

        Demo._PLAYER1 = new Player(new Vector2(50, 50))
        this._collisionManager.addCollider(Demo._PLAYER1.collider)

        Demo._PLAYER2 = new Player(new Vector2(200, 50))
        this._collisionManager.addCollider(Demo._PLAYER2.collider)

        this._initSpatialHashingDemoNpcs()
        this._initEventListeners()
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
            "Player 1 Controls:",
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
            "",
            "Player 2 Controls:",
            "    Movement:",
            "        Up: O",
            "        Down: L",
            "        Left: K",
            "        Right: ;",
            "    Scale:",
            "        Up: U",
            "        Down: J",
            "    Rotation:",
            "        Anti-Clockwise: I",
            "        Clockwise: P",
            "    Swap shape:",
            "        Rectangle: 8",
            "        Circle: 9",
            "        Convex Polygon: 0",
        ]
        console.log(instructions.join("\n"))
    }

    _initEventListeners() {
        window.addEventListener("keydown", function (event) {
            if (event.defaultPrevented)
                return

            switch (event.code) {
                // Player 1 controls
                case "KeyW":
                    Demo._PLAYER1.move(0, -5)
                    break

                case "KeyS":
                    Demo._PLAYER1.move(0, 5)
                    break

                case "KeyA":
                    Demo._PLAYER1.move(-5, 0)
                    break

                case "KeyD":
                    Demo._PLAYER1.move(5, 0)
                    break

                case "KeyQ":
                    Demo._PLAYER1.rotate(-5)
                    break

                case "KeyE":
                    Demo._PLAYER1.rotate(5)
                    break

                case "KeyR":
                    Demo._PLAYER1.scale(2)
                    break

                case "KeyF":
                    Demo._PLAYER1.scale(0.5)
                    break

                case "Digit1":
                    Demo._PLAYER1.convertToRectangle()
                    break

                case "Digit2":
                    Demo._PLAYER1.convertToCircle()
                    break

                case "Digit3":
                    Demo._PLAYER1.convertToConvexPolygon()
                    break

                // Player 2 Controls
                case "KeyO":
                    Demo._PLAYER2.move(0, -5)
                    break

                case "KeyL":
                    Demo._PLAYER2.move(0, 5)
                    break

                case "KeyK":
                    Demo._PLAYER2.move(-5, 0)
                    break

                case "Semicolon":
                    Demo._PLAYER2.move(5, 0)
                    break

                case "KeyI":
                    Demo._PLAYER2.rotate(-5)
                    break

                case "KeyP":
                    Demo._PLAYER2.rotate(5)
                    break

                case "KeyU":
                    Demo._PLAYER2.scale(2)
                    break

                case "KeyJ":
                    Demo._PLAYER2.scale(0.5)
                    break

                case "Digit8":
                    Demo._PLAYER2.convertToRectangle()
                    break

                case "Digit9":
                    Demo._PLAYER2.convertToCircle()
                    break

                case "Digit0":
                    Demo._PLAYER2.convertToConvexPolygon()
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