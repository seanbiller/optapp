var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 500);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
document.body.appendChild(renderer.domElement);


// var geometry = new THREE.BoxGeometry( 1, 1, 1 );
// var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// var cube = new THREE.Mesh( geometry, material );
// scene.add( cube );

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