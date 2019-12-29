function stlModelViewer(geometry, elementID) {
    var elem = document.getElementById(elementID)

    var camera = new THREE.PerspectiveCamera(55, elem.clientWidth / elem.clientHeight, .01, 10000);

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
    controls.autoRotateSpeed = 3.75;

    var scene = new THREE.Scene();
    scene.add(new THREE.HemisphereLight(0xffffff, 1.5));

    camera.position.set(0, 0, 0);
		scene.add(camera);

    geometry.computeVertexNormals()
    geometry.normalizeNormals()

    if (geometry.hasColors) {
      var material = new THREE.MeshPhongMaterial({ opacity: geometry.alpha, vertexColors: THREE.VertexColors });
    }
    else { 
      // Provides a default color and a metallic material to simulate a more natural reflection of light
      var material = new THREE.MeshStandardMaterial();
    }
    //NOTE: THREE.DoubleSide not supported in Internet Explorer
    material.side = THREE.DoubleSide;

    var mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    geometry.computeBoundingBox();
    var bbox = geometry.boundingBox;
    var visualBbox = new THREE.Box3Helper(bbox, 0xffff00); // Bounding box of model
    let middle = new THREE.Vector3(geometry.center());

    bbox.getSize(middle);
    console.log("Dimensions of Model's Bounding-Box: " + JSON.stringify(middle));

    // Move functionality to stlInfoViewer & work-in a conditional so this can be turned off
    scene.add(visualBbox);
    geometry.center();

    var largestDimension = Math.max(geometry.boundingBox.max.x,
      geometry.boundingBox.max.y,
      geometry.boundingBox.max.z)
    camera.position.z = largestDimension * 3.5;
    camera.position.y = largestDimension * 1.5;
  
    var pointLight = new THREE.PointLight(0xffffff, 0.3);
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