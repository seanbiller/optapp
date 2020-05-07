let geo = null;
let volume = null;
let mesh = null;
let mesh_color = null;
let controls = null;
let visualBbox = null;
let middle = null;
let axesHelper = null;

function stlModelViewer(geometry, elementID) {
  var elem = document.getElementById(elementID)
  var camera = new THREE.PerspectiveCamera(55, elem.clientWidth / elem.clientHeight, .01, 10000);

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
  });

  renderer.setSize(elem.clientWidth, elem.clientHeight);
  elem.appendChild(renderer.domElement, elem.childNodes[0]);

  window.addEventListener('resize', function () {
    renderer.setSize(elem.clientWidth, elem.clientHeight);
    camera.aspect = elem.clientWidth / elem.clientHeight;
    camera.updateProjectionMatrix();
  }, false);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.rotateSpeed = 0.5;
  controls.dampingFactor = 0.1;
  controls.enableZoom = true;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 3.75;

  var scene = new THREE.Scene();
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

  mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  /******************************************************************************/
  /****The following code deals with the bounding box of the rendered model******/

  geometry.computeBoundingBox(); // The model's bounding box data is computed/updated
  var bbox = geometry.boundingBox; // The computed/updated bounding box data is stored in variable 'bbox'
  visualBbox = new THREE.Box3Helper(bbox, 0xffff00); // Box3Helper uses bbox's data to create a visual representation of the model's bounding box, set to a default color
  middle = new THREE.Vector3(geometry.center()); // The point vector located at the model's center is stored in the new Vector3 object 'middle'
  bbox.getSize(middle); // Using the central point vector for reference, the bounding box's {x,y,z} dimensions are found and saved to 'middle'
  
  let x = middle.x.toFixed(1);
  let y = middle.y.toFixed(1);
  let z = middle.z.toFixed(1);

  scene.add(visualBbox);
  visualBbox.visible = false;

  /*******************************************************************************/
  geometry.center();

  var largestDimension = Math.max(geometry.boundingBox.max.x,
    geometry.boundingBox.max.y,
    geometry.boundingBox.max.z)
  camera.position.z = largestDimension * 3.5;
  camera.position.y = largestDimension * 1.5;

  // Creates a visual representation of the axes in the viewer for users to reference when viewing their 3D model
  axesHelper = new THREE.AxesHelper(largestDimension * 1.5);
  scene.add(axesHelper);
  axesHelper.visible = false;

  scene.add(new THREE.HemisphereLight(0xffffff, 2.5));

  var pointLight = new THREE.PointLight(0xffffff, 0.3); // 0xffffff
  pointLight.position.set(0, -25, 10);
  camera.add(pointLight); // look into differences between adding lights to camera v.s. scene

  /*******************************************************************************/
  /**Assigns calculated model data, such as volume, to html elements for display**/
  geo = geometry;

  $id("model_bbox").innerHTML = x + " x " + y + " x " + z; // Displays the model's bounding box dimensions
  volume = getVolume().toFixed(2);
  $id("model_volume").innerHTML = numberWithCommas(volume); // Displays the model's volume
  /*******************************************************************************/

  var animate = function () {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  };
  animate();
}

function $id(id) {
  return document.getElementById(id);
}

function setAutoRotation(choice) {
  if (choice == true) { controls.autoRotate = true; }
  else { controls.autoRotate = false; }
  controls.update();
}

// Toggles visibility for x, y, and z axes on the canvas where the model is rendered
function displayAxes(choice) {
  if (choice == true) { axesHelper.visible = true; }
  else { axesHelper.visible = false; }
}

function displayModelBbox(choice) {
  if (choice == true) { visualBbox.visible = true; }
  else { visualBbox.visible = false; }
}

function set_color(o, o_color, is_bg_color) {
  is_bg_color=is_bg_color||false;
  
  if (is_bg_color) {
    bg_color=o_color;
    if (o_color=='transparent') { renderer.setClearColor(0x000000, 0); }
    else { renderer.setClearColor(o_color, 1); }
    return;
  }
  
  c = $id('cpal').getElementsByTagName("div");
  var i=c.length;	// i=length of the array of div elements that are children of the element with id='cpal'

  while(i--) {
      // if the div at this location in the array is equal to 'o' 
      // (the current div, entered into the function's parameter as 'this'),
      // style the div's border with a thin dark-green line 
      // (lets us know which color we selected).
      if (c[i]==o) { c[i].style.border="2px solid #012101"; }
      else { c[i].style.border="2px solid transparent"; }
  }
  mesh_color=o_color; // was 'var mesh_color=0_color;'
  update_mesh_color();
}

function update_mesh_color() {
  if (mesh==null) return;
  mesh.material.color.set(parseInt(mesh_color.substr(1),16));
}

// Calculates the volume of the model in mm^3
function getVolume() {
  if (!geo.isBufferGeometry) {
    console.log("'geometry' must be an indexed or non-indexed buffer geometry");
    return 0;
  }

  var isIndexed = geo.index !== null;
  let position = geo.attributes.position;
  let sum = 0;
  let p1 = new THREE.Vector3(),
    p2 = new THREE.Vector3(),
    p3 = new THREE.Vector3();
  
  if (!isIndexed) {
    let faces = position.count / 3;
    for (let i = 0; i < faces; i++) {
      p1.fromBufferAttribute(position, i * 3 + 0);
      p2.fromBufferAttribute(position, i * 3 + 1);
      p3.fromBufferAttribute(position, i * 3 + 2);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
  }
  else {
    let index = geo.index;
    let faces = index.count / 3;
    for (let i = 0; i < faces; i++){
      p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
      p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
      p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
  }
  return sum;
}

function signedVolumeOfTriangle(p1, p2, p3) {
  return p1.dot(p2.cross(p3)) / 6.0;
}

function calculatePrice() {
    var x = document.getElementById('resin').value;
    let inLiters = volume/1000000 //convert to Liters
    switch(x) {
      case 'none':
        var price = 0;
        break;
      case 'PCLG':
        var price = 59.90 * inLiters;
        break;
      case 'PCTR':
        var price = 69.98 * inLiters;
        break;
      case 'P3D':
        var price = 76.90 * inLiters;
        break;
      case 'BCO':
        var price = 138.69 * inLiters;
        break;
      case 'BCx5':
        var price = 142.99 * inLiters;
        break;
      case 'ZRS':
        var price = 345.99 * inLiters;
        break;
    }
    document.getElementById('total_cost').innerHTML = '$' + numberWithCommas(price.toFixed(2)) + ' USD';
}

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

// Getting values for printing time
function set_printing_time(z) {
    var p = view_units == 2 ? 0:0;
    var slider = document.getElementById("time");
    var output = document.getElementById("ispeed");
    var output1 = document.getElementById("itime");
    output1.innerHTML = (slider.value/10) * numberWithCommas(z.toFixed(p)) + " seconds";
    output.innerHTML = (slider.value/10) + " mm/sec";
    slider.oninput = function() {
        output1.innerHTML = (this.value/10) * numberWithCommas(z.toFixed(p)) + " seconds";
        output.innerHTML = (this.value/10) + " mm/sec";
    }
}