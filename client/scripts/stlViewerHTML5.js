function STLViewerHTML5(geometry, elementID) {
    var elem = document.getElementById(elementID)

    var camera = new THREE.PerspectiveCamera(50, elem.clientWidth / elem.clientHeight, 1, 1000);

    var renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
    });
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    elem.appendChild(renderer.domElement);

    window.addEventListener('resize', function () {
      renderer.setSize(elem.clientWidth, elem.clientHeight);
      camera.aspect = elem.clientWidth / elem.clientHeight;
      camera.updateProjectionMatrix();
    }, false);

    var controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.rotateSpeed = 0.5;
    controls.dampingFactor = 0.1;
    controls.enableZoom = true;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 10.75;

    var scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 1.5));
    
    camera.position.set(0,0,100);
		scene.add(camera);

    geometry.computeVertexNormals()
    geometry.normalizeNormals()

    if (geometry.hasColors) {
      var material = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
    }
    else {
      //var material = new THREE.MeshStandardMaterial();
      var material=new THREE.MeshLambertMaterial({color:0x909090, overdraw: 1, wireframe: false, shading:THREE.FlatShading, vertexColors: THREE.FaceColors});
    }
    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    var middle = new THREE.Vector3();
    geometry.computeBoundingBox();
    geometry.boundingBox.getCenter(middle);
    mesh.position.x = -1 * middle.x;
    mesh.position.y = -1 * middle.y;
    mesh.position.z = -1 * middle.z;

    var largestDimension = Math.max(geometry.boundingBox.max.x,
      geometry.boundingBox.max.y,
      geometry.boundingBox.max.z)
    camera.position.z = largestDimension * 1.5;
    camera.position.y = largestDimension * 1.5;

    // ambientLight = new THREE.AmbientLight(0x202020);
    // camera.add(ambientLight);
  
    pointLight = new THREE.PointLight(0xffffff, 0.3);
    pointLight.position.x = 0;
    pointLight.position.y = -25;
    pointLight.position.z = 10;
    camera.add(pointLight);	

    var animate = function () {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
  }