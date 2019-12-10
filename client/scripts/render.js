var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);


var loader = new THREE.STLLoader();
	// console.log({__dirname})
loader.load('./client/scripts/fish.stl', function (geometry) {

		console.log(geometry)
	scene.add(new THREE.Mesh(geometry));
});

camera.position.z = 5;

var animate = function () {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
};

animate();

