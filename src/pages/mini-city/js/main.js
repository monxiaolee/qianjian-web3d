/* eslint-disable */
var scene, camera
var renderer
var width, width

var cars = []
// var stats

var config = {
    isMobile: false,
    background: 0x282828
}

width = window.innerWidth
height = window.innerHeight

scene = new THREE.Scene()
camera = new THREE.PerspectiveCamera(45, width / height, 1, 5000)
camera.position.set(330, 330, 330)
camera.lookAt(scene.position)

renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height)
renderer.setClearColor(config.background)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
document.body.appendChild(renderer.domElement)

checkUserAgent()

buildAuxSystem()
buildLightSystem()
buildbuilding()
buildRoad()
buildStaticCars()
buildMovingCars()

loop()
onWindowResize()

function checkUserAgent() {
    var n = navigator.userAgent;
    if (n.match(/Android/i) || n.match(/webOS/i) || n.match(/iPhone/i) || n.match(/iPad/i) || n.match(/iPod/i) || n.match(/BlackBerry/i)) {
        config.isMobile = true
        camera.position.set(420, 420, 420)
        renderer.shadowMap.enabled = false
    }
}

function buildMovingCars() {
    var carsPosition = [
        [-130, 145, 0],
        [10, 145, 0],
        [145, 20, 0.5],
        [30, -145, 1],
        [-145, -60, 1.5]
    ]
    carsPosition.forEach(function (elem) {
        var car = new Car()
        var x = elem[0],
            z = elem[1],
            r = elem[2]
        car.setPosition(x, 0, z)
        car.mesh.rotation.y = r * Math.PI
        cars.push(car)
        scene.add(car.mesh)
    })
}

function buildStaticCars() {
    var carsPosition = [
        [-84, 82, 1.5],
        [-58, 82, 1.5],
        [-32, 82, 1.5],
        [84, 82, 1.5]
    ]
    carsPosition.forEach(function (elem) {
        var car = new Car()
        var x = elem[0],
            z = elem[1],
            r = elem[2]
        car.setPosition(x, 0, z)
        car.mesh.rotation.y = r * Math.PI
        scene.add(car.mesh)
    })
}

function buildRoad() {
    var road = new THREE.Object3D()
    var roadColor = 0xffffff
    var roadBorderOuterCoords = [
        [-160, 160],
        [160, 160],
        [160, -160],
        [-160, -160],
    ]
    var roadBorderOuterHoleCoords = [
        [-159, 159],
        [-159, -159],
        [159, -159],
        [159, 159]
    ]
    var roadBorderOuterShape = utils.makeShape(roadBorderOuterCoords, roadBorderOuterHoleCoords)
    var roadBorderOuterGeometry = utils.makeExtrudeGeometry(roadBorderOuterShape, 0.1)
    var roadBorderOuter = utils.makeMesh('phong', roadBorderOuterGeometry, roadColor)
    road.add(roadBorderOuter)

    var roadBorderInnerCoords = [
        [-131, 131],
        [-131, -131],
        [131, -131],
        [131, 131],
        [19, 131],
        [19, 99],
        [99, 99],
        [99, -99],
        [-99, -99],
        [-99, 99],
        [-19, 99],
        [-19, 131]
    ]
    var roadBorderInnerShape = utils.makeShape(roadBorderInnerCoords)
    var roadBorderInnnerGeometry = utils.makeExtrudeGeometry(roadBorderInnerShape, 0.1)
    var roadBoaderInnder = utils.makeMesh('phong', roadBorderInnnerGeometry, roadColor)
    roadBoaderInnder.rotation.y = Math.PI
    road.add(roadBoaderInnder)

    var roadLinesGeometry = new THREE.Geometry()
    var roadLineGeometry = new THREE.BoxGeometry(20, 0.1, 2)

    var roadLinesBottomGeometry = new THREE.Geometry()
    for (var i = 0; i < 9; i++) {
        var geometry = roadLineGeometry.clone()
        geometry.translate(i * 30, 0, -1)
        roadLinesBottomGeometry.merge(geometry)
    }
    roadLinesBottomGeometry.translate(-120, 0, 145)
    roadLinesGeometry.merge(roadLinesBottomGeometry)

    var roadLinesTopGeometry = roadLinesBottomGeometry.clone()
    roadLinesTopGeometry.translate(0, 0, -290)
    roadLinesGeometry.merge(roadLinesTopGeometry)

    var roadLinesLeftGeometry = roadLinesBottomGeometry.clone()
    roadLinesLeftGeometry.rotateY(0.5 * Math.PI)
    roadLinesGeometry.merge(roadLinesLeftGeometry)

    var roadLinesRightGeometry = roadLinesBottomGeometry.clone()
    roadLinesRightGeometry.rotateY(-0.5 * Math.PI)
    roadLinesGeometry.merge(roadLinesRightGeometry)
    roadLinesGeometry = new THREE.BufferGeometry().fromGeometry(roadLinesGeometry)
    var roadLines = utils.makeMesh('phong', roadLinesGeometry, roadColor)
    road.add(roadLines)

    scene.add(road)
}

function buildbuilding() {
    var planeGeometry = new THREE.BoxBufferGeometry(320, 6, 320)
    var plane = utils.makeMesh('lambert', planeGeometry, 0x6f5f6a)
    plane.position.y = -3
    scene.add(plane)

    addFense()
    addGreen()
    addTrees()
    addHospital()
    addLamps()

    function addLamps() {
        var lampsPosition = [
            [-12.5, 12.5, 1.25],
            [-7.5, 12.5, -0.5],
            [-2.5, 12.5, -0.5],
            [2.5, 12.5, -0.5],
            [7.5, 12.5, -0.5],
            [12.5, 12.5, -0.25],
            [12.5, 7.5, 0],
            [12.5, 2.5, 0],
            [12.5, -2.5, 0],
            [12.5, -7.5, 0],
            [12.5, -12.5, 0.25],
            [7.5, -12.5, 0.5],
            [2.5, -12.5, 0.5],
            [-2.5, -12.5, 0.5],
            [-7.5, -12.5, 0.5],
            [-12.5, -12.5, 0.75],
            [-12.5, -7.5, 1],
            [-12.5, -2.5, 1],
            [-12.5, 2.5, 1],
            [-12.5, 7.5, 1],
        ]

        lampsPosition.forEach(function (elem) {
            var x = elem[0] * 10,
                z = elem[1] * 10,
                r = elem[2]
            var lamp = createLamp()
            lamp.rotation.y = r * Math.PI
            lamp.position.set(x, 0, z)
            scene.add(lamp)
        })
    }

    function addHospital() {
        var hospital = createHospital()
        hospital.position.z = -20
        scene.add(hospital)
    }

    function addGreen() {
        var greenCoords = [
            [-120, -120],
            [-120, 120],
            [120, 120],
            [120, -120],
            [20, -120],
            [20, -100],
            [100, -100],
            [100, 100],
            [-100, 100],
            [-100, -100],
            [-20, -100],
            [-20, -120],
            [-120, -120]
        ]
        var greenShape = utils.makeShape(greenCoords)

        var greenGeometry = utils.makeExtrudeGeometry(greenShape, 3)
        var green = utils.makeMesh('lambert', greenGeometry, 0xc0c06a)
        scene.add(green)
    }

    function addFense() {
        var fenseCoords = [
            [-130, -130],
            [-130, 130],
            [130, 130],
            [130, -130],
            [20, -130],
            [20, -120],
            [120, -120],
            [120, 120],
            [-120, 120],
            [-120, -120],
            [-20, -120],
            [-20, -130],
            [-130, -130]
        ]
        var fenseShape = utils.makeShape(fenseCoords)

        var fenseGeometry = utils.makeExtrudeGeometry(fenseShape, 3)
        var fense = utils.makeMesh('lambert', fenseGeometry, 0xe5cabf)
        scene.add(fense)
    }

    function addTrees() {
        var treesPosition = [
            [-110, -110],
            [-90, -110],
            [-70, -110],
            [-50, -110],
            [-30, -110],
            [-10, -110],
            [10, -110],
            [30, -110],
            [50, -110],
            [70, -110],
            [90, -110],
            [-110, 110],
            [-110, 90],
            [-110, 70],
            [-110, 50],
            [-110, 30],
            [-110, 10],
            [-110, -10],
            [-110, -30],
            [-110, -50],
            [-110, -70],
            [-110, -90],
            [110, 110],
            [90, 110],
            [70, 110],
            [50, 110],
            [30, 110],
            [-30, 110],
            [-50, 110],
            [-70, 110],
            [-90, 110],
            [110, -110],
            [110, -90],
            [110, -70],
            [110, -50],
            [110, -30],
            [110, -10],
            [110, 10],
            [110, 30],
            [110, 50],
            [110, 70],
            [110, 90],
        ]
        treesPosition.forEach(function (elem) {
            var x = elem[0],
                y = 1,
                z = elem[1]
            var tree = createTree(x, y, z)
            scene.add(tree)
        })
    }

    function createLamp() {
        var lamp = new THREE.Object3D()
        var pillarGeomertry = new THREE.CubeGeometry(2, 30, 2)
        pillarGeomertry.translate(0, 15, 0)
        var pillar = utils.makeMesh('phong', pillarGeomertry, 0xebd1c2)
        lamp.add(pillar)

        var connectGeometry = new THREE.CubeGeometry(10, 1, 1)
        var connect = utils.makeMesh('phong', connectGeometry, 0x2c0e0e)
        connect.position.set(3, 30, 0)
        lamp.add(connect)

        var lightGeometry = new THREE.CubeGeometry(6, 2, 4)
        light = utils.makeMesh('phong', lightGeometry, 0xebd1c2)
        light.position.set(10, 30, 0)
        lamp.add(light)

        return lamp
    }

    function createHospital() {
        var hospital = new THREE.Object3D()

        var baseGeometry = new THREE.BoxBufferGeometry(180, 3, 140)
        var base = utils.makeMesh('lambert', baseGeometry, 0xffffff)
        base.position.y = 1
        hospital.add(base)

        var frontMainCoords = [
            [-80, -30],
            [-80, 20],
            [50, 20],
            [50, 0],
            [20, -30],
            [-80, -30]
        ]
        var frontMainShape = utils.makeShape(frontMainCoords)
        var frontMainGeometry = utils.makeExtrudeGeometry(frontMainShape, 100)
        var frontMainMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
        frontMainMaterial.map.repeat.set(0.1, 0.08)
        var frontMain = new THREE.Mesh(frontMainGeometry, frontMainMaterial)
        frontMain.castShadow = true
        frontMain.receiveShadow = true
        hospital.add(frontMain)

        var frontTopShape = frontMainShape
        var frontTopGeometry = utils.makeExtrudeGeometry(frontTopShape, 5)
        var frontTop = utils.makeMesh('lambert', frontTopGeometry, 0xb1a7af)
        frontTop.position.y = 100
        hospital.add(frontTop)

        var frontRoofShelfGeometry = new THREE.Geometry()
        var frontRoofShelfCubeGeometry = new THREE.BoxGeometry(2, 2, 40)
        // for z-axis
        for (var i = 0; i < 12; i++) {
            var geometry = frontRoofShelfCubeGeometry.clone()
            geometry.translate(i * 5, 0, 0)
            frontRoofShelfGeometry.merge(geometry)
        }
        // for x-axis
        for (var i = 0; i < 2; i++) {
            var geometry = frontRoofShelfCubeGeometry.clone()
            geometry.rotateY(0.5 * Math.PI)
            geometry.scale(1.6, 1, 1)
            geometry.translate(27, 0, -15 + i * 30)
            frontRoofShelfGeometry.merge(geometry)
        }
        // for y-axis
        var frontRoofShelfCubeYPosition = [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ]
        for (var i = 0; i < frontRoofShelfCubeYPosition.length; i++) {
            var p = frontRoofShelfCubeYPosition[i]
            var geometry = frontRoofShelfCubeGeometry.clone()
            geometry.scale(1, 1, 0.4)
            geometry.rotateX(0.5 * Math.PI)
            geometry.translate(p[0] * 55, 0, -15 + p[1] * 30)
            frontRoofShelfGeometry.merge(geometry)
        }
        frontRoofShelfGeometry = new THREE.BufferGeometry().fromGeometry(frontRoofShelfGeometry)
        var frontRoofShelf = utils.makeMesh('phong', frontRoofShelfGeometry, 0xffffff)
        frontRoofShelf.position.set(-70, 115, 5)
        hospital.add(frontRoofShelf)

        var frontPlatGeometry = new THREE.BoxBufferGeometry(150, 3, 90)
        var fronPlat = utils.makeMesh('lambert', frontPlatGeometry, 0x0792a5)
        fronPlat.position.set(-3, 18, 25)
        hospital.add(fronPlat)

        var frontPlatVerticalGeometry = new THREE.BoxBufferGeometry(150, 15, 3)
        var frontPlatVertical = utils.makeMesh('phong', frontPlatVerticalGeometry, 0x0792a5)
        frontPlatVertical.receiveShadow = false
        frontPlatVertical.position.set(-3, 24, 68.5)
        hospital.add(frontPlatVertical)

        var frontPlatVerticalWhiteGeometry = new THREE.BoxBufferGeometry(150, 3, 3)
        var frontPlatVerticalWhite = utils.makeMesh('phong', frontPlatVerticalWhiteGeometry, 0xffffff)
        frontPlatVerticalWhite.position.set(-3, 33, 68.5)
        hospital.add(frontPlatVerticalWhite)

        var frontPlatPillarGeometry = new THREE.CylinderGeometry(2, 2, 15, 32)
        var frontPlatPillar = utils.makeMesh('lambert', frontPlatPillarGeometry, 0xffffff)
        frontPlatPillar.position.set(-60, 10, 55)
        hospital.add(frontPlatPillar)

        var frontPlatPillar2 = frontPlatPillar.clone()
        frontPlatPillar2.position.set(55, 10, 55)
        hospital.add(frontPlatPillar2)

        var frontBorderVerticles = new THREE.Object3D()
        var frontBorderVerticleGeometry = new THREE.BoxBufferGeometry(4, 106, 4)
        var frontBorderVerticleMesh = utils.makeMesh('phong', frontBorderVerticleGeometry, 0xffffff)
        var frontBorderVerticle1 = frontBorderVerticleMesh.clone()
        frontBorderVerticle1.position.set(-80, 52, 30)
        frontBorderVerticles.add(frontBorderVerticle1)
        var frontBorderVerticle2 = frontBorderVerticleMesh.clone()
        frontBorderVerticle2.position.set(-80, 52, -20)
        frontBorderVerticles.add(frontBorderVerticle2)
        var frontBorderVerticle3 = frontBorderVerticleMesh.clone()
        frontBorderVerticle3.position.set(50, 52, -18)
        frontBorderVerticles.add(frontBorderVerticle3)
        hospital.add(frontBorderVerticles)

        var frontRoofCoords = [
            [-82, -32],
            [20, -32],
            [52, 0],
            [52, 22],
            [-82, 22],
            [-82, -32]
        ]
        var frontRoofHolePath = [
            [-78, -28],
            [20, -28],
            [48, 0],
            [48, 18],
            [-78, 18],
            [-78, -28]
        ]
        var frontRoofShape = utils.makeShape(frontRoofCoords, frontRoofHolePath)
        var frontRoofGeometry = utils.makeExtrudeGeometry(frontRoofShape, 8)
        var frontRoof = utils.makeMesh('phong', frontRoofGeometry, 0xffffff)
        frontRoof.position.y = 100
        hospital.add(frontRoof)

        var backMainCoords = [
            [-80, 20],
            [-80, 60],
            [80, 60],
            [80, 20],
            [-80, 20]
        ]
        var backMainHolePath = [
            [-78, 22],
            [78, 22],
            [78, 58],
            [-78, 58],
            [-78, 22]
        ]
        var backMainShape = utils.makeShape(backMainCoords, backMainHolePath)

        var backMainGeometry = utils.makeExtrudeGeometry(backMainShape, 90)
        var backMain = utils.makeMesh('lambert', backMainGeometry, 0xf2e21b)
        hospital.add(backMain)

        var backMiddleCoords = [
            [0, 0],
            [36, 0],
            [36, 70],
            [0, 70],
            [0, 0]
        ]
        var backMiddleHolePath = [
            [2, 2],
            [34, 2],
            [34, 68],
            [2, 68],
            [2, 2]
        ]
        var backMiddleShape = utils.makeShape(backMiddleCoords, backMiddleHolePath)
        var backMiddkeGeometry = utils.makeExtrudeGeometry(backMiddleShape, 165)
        var backMiddle = utils.makeMesh('lambert', backMiddkeGeometry, 0xffffff)

        backMiddle.rotation.x = -0.5 * Math.PI
        backMiddle.rotation.z = -0.5 * Math.PI
        backMiddle.position.y = 86
        backMiddle.position.z = -58
        backMiddle.position.x = -78
        hospital.add(backMiddle)

        var backMiddleWindowGeometry = new THREE.PlaneGeometry(32, 66, 1, 1)
        var backMiddleWindowMaterial = new THREE.MeshPhongMaterial({ map: textures.window() })
        backMiddleWindowMaterial.map.repeat.set(2, 6)

        var backMiddleWindow = new THREE.Mesh(backMiddleWindowGeometry, backMiddleWindowMaterial)
        backMiddleWindow.position.set(83, 51, -40)
        backMiddleWindow.rotation.y = 0.5 * Math.PI
        hospital.add(backMiddleWindow)

        var windowBackOrigin = createWindow()
        windowBackOrigin.scale.set(0.6, 0.6, 1)
        windowBackOrigin.rotation.y = Math.PI
        windowBackOrigin.position.set(65, 75, -61)
        for (var i = 0; i < 7; i++) {
            for (var j = 0; j < 4; j++) {
                var windowObj = windowBackOrigin.clone()
                windowObj.position.x -= i * 22
                windowObj.position.y -= j * 20
                hospital.add(windowObj)
            }
        }

        return hospital
    }

    function createWindow() {
        var windowObj = new THREE.Object3D()
        var glassGeometry = new THREE.PlaneGeometry(20, 20)
        var glass = utils.makeMesh('phong', glassGeometry, 0x6a5e74)
        windowObj.add(glass)

        var windowBorderGeometry = new THREE.BoxBufferGeometry(22, 2, 2)
        var windowBorder = utils.makeMesh('phong', windowBorderGeometry, 0xffffff)

        var windowBorderTop = windowBorder.clone()
        windowBorderTop.position.y = 10
        windowObj.add(windowBorderTop)

        var windowBorderBottom = windowBorder.clone()
        windowBorderBottom.position.y = -10
        windowObj.add(windowBorderBottom)

        var windowBorderLeft = windowBorder.clone()
        windowBorderLeft.rotation.z = 0.5 * Math.PI
        windowBorderLeft.position.x = -10
        windowObj.add(windowBorderLeft)

        var windowBorderRight = windowBorderLeft.clone()
        windowBorderRight.position.x = 10
        windowObj.add(windowBorderRight)

        return windowObj
    }

    function createTree(x, y, z) {
        var x = x || 0
        var y = y || 0
        var z = z || 0

        var tree = new THREE.Object3D()

        var treeTrunkGeometry = new THREE.BoxBufferGeometry(2, 16, 2)
        var treeTrunk = utils.makeMesh('lambert', treeTrunkGeometry, 0x8a613a)
        treeTrunk.position.y = 8
        tree.add(treeTrunk)

        var treeLeafsGeometry = new THREE.BoxBufferGeometry(8, 8, 8)
        var treeLeafs = utils.makeMesh('lambert', treeLeafsGeometry, 0x9c9e5d)
        treeLeafs.position.y = 13
        tree.add(treeLeafs)

        tree.position.set(x, y, z)

        return tree
    }
}

function buildLightSystem() {

    if (!config.isMobile) {
        var directionalLight = new THREE.DirectionalLight(0xffffff, 1.1);
        directionalLight.position.set(300, 1000, 500);
        directionalLight.target.position.set(0, 0, 0);
        directionalLight.castShadow = true;

        var d = 300;
        directionalLight.shadow.camera = new THREE.OrthographicCamera(-d, d, d, -d, 500, 1600);
        directionalLight.shadow.bias = 0.0001;
        directionalLight.shadow.mapSize.width = directionalLight.shadow.mapSize.height = 1024;
        scene.add(directionalLight)

        var light = new THREE.AmbientLight(0xffffff, 0.3)
        scene.add(light)
    } else {
        var hemisphereLight = new THREE.HemisphereLight(0xffffff, 1)
        scene.add(hemisphereLight)

        var light = new THREE.AmbientLight(0xffffff, 0.15)
        scene.add(light)
    }

}

function buildAuxSystem() {
    // stats = new Stats()
    // stats.setMode(0)
    // stats.domElement.style.position = 'absolute'
    // stats.domElement.style.left = '5px'
    // stats.domElement.style.top = '5px'
    // document.body.appendChild(stats.domElement)

    // var axisHelper = new THREE.AxesHelper(200)
    // scene.add(axisHelper)

    var gridHelper = new THREE.GridHelper(320, 32)
    scene.add(gridHelper)

    var controls = new THREE.OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.25
    controls.rotateSpeed = 0.35
}

function carMoving(car) {
    var angle = car.mesh.rotation.y
    var x = car.mesh.position.x,
        z = car.mesh.position.z

    if (x < 145 && z === 145) {
        car.forward()
    } else if (angle < 0.5 * Math.PI) {
        car.turnLeft(0.5 * Math.PI, 0.1)
    } else if (x === 145 && z > -145) {
        car.forward()
    } else if (angle < Math.PI) {
        car.turnLeft(0.5 * Math.PI, 0.1)
    } else if (x > -145 && z == -145) {
        car.forward()
    } else if (angle < 1.5 * Math.PI) {
        car.turnLeft(0.5 * Math.PI, 0.1)
    } else if (x === -145 && z < 145) {
        car.mesh.rotation.y = 1.5 * Math.PI
        car.forward()
    } else if (angle < 2 * Math.PI) {
        car.turnLeft(0.5 * Math.PI, 0.1)
    } else {
        car.setPosition(-145, 0, 145)
        car.mesh.rotation.set(0, 0, 0)
    }
}

function loop() {
    // stats.update()
    cars.forEach(function (car) {
        carMoving(car)
    })
    renderer.render(scene, camera)
    requestAnimationFrame(loop)
}

function onWindowResize() {
    window.addEventListener('resize', function () {
        width = window.innerWidth
        height = window.innerHeight

        camera.aspect = width / height;
        camera.updateProjectionMatrix()

        renderer.setSize(width, height)
    })
}