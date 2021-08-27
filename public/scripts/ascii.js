const canvas = document.querySelector('canvas.webgl')

const PI = Math.PI

const scene = new THREE.Scene()
scene.background = new THREE.Color( 0, 0, 0 );

const sizes = {
    height: window.innerHeight,
    width: window.innerWidth
}

const camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
camera.position.z = 25;
camera.position.y = 5
scene.add(camera)

const pointLight1 = new THREE.PointLight( 0xffffff );
pointLight1.position.set( 500, 500, 500 );
scene.add( pointLight1 );

const pointLight2 = new THREE.PointLight( 0xffffff, 0.25 );
pointLight2.position.set( - 500, - 500, - 500 );
scene.add( pointLight2 );

const sphere = new THREE.Mesh( new THREE.TorusGeometry( 10, 5, 15, 100 ), new THREE.MeshPhongMaterial( { flatShading: true } ) );
scene.add( sphere );

window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = (sizes.width / sizes.height)
    camera.updateProjectionMatrix()

    effect.setSize(sizes.width, sizes.height)
})

const renderer = new THREE.WebGLRenderer()
renderer.setSize(sizes.width, sizes.height)

const effect = new AsciiEffect( renderer );
effect.setSize( window.innerWidth, window.innerHeight );
effect.domElement.style.color = 'black';
effect.domElement.style.backgroundColor = 'white';
effect.domElement.setAttribute("class", "only-on-home")
document.body.appendChild( effect.domElement );
effect.render(scene,camera)

const clock = new THREE.Clock()

const tick = () => {
    const ElapsedTime = clock.getElapsedTime()

    sphere.rotation.x = ElapsedTime / 2
    sphere.rotation.y = ElapsedTime / 2

    effect.render(scene,camera)

    window.requestAnimationFrame(tick)
}
tick()