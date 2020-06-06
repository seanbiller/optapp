function setAutoRotation() {
  if (!controls.enableDamping) controls.enableDamping = true;

  if (document.getElementById("auto_rotate").checked) controls.autoRotate = true;
  else controls.autoRotate = false;
}

function displayAxes() {
  if (document.getElementById("model_axis").checked) axesHelper.visible = true;
  else axesHelper.visible = false;
}

function displayModelBbox() {
  if (document.getElementById("model_bbox_visual").checked) visualBbox.visible = true;
  else visualBbox.visible = false;
}

function set_color(o, o_color, is_bg_color) {
  is_bg_color = is_bg_color || false;

  if (is_bg_color) {
    bg_color = o_color;
    if (o_color == 'transparent') { renderer.setClearColor(0x000000, 0); }
    else { renderer.setClearColor(o_color, 1); }
    return;
  }
  c = document.getElementById('cpal').getElementsByTagName("div");
  var i = c.length;	// i=length of the array of div elements that are children of the element with id='cpal'

  // this loop lets us know which color we selected
  while(i--) {
      // if the div at this location in the array is equal to 'o' 
      // (the current div, entered into the function's parameter as 'this'),
      if (c[i] === o) { c[i].style.border = "2px solid #012101"; }
      else { c[i].style.border = "2px solid transparent"; }
  }
  let mesh_color = o_color;
  update_mesh_color(mesh_color);
}

function update_mesh_color(mesh_color) {
  if (mesh === null) return;
  mesh.material.color.set(parseInt(mesh_color.substr(1),16));
}

function getVolume(geometry) {
  console.time("Time taken to calculate model's volume: ");
  if (!geometry.isBufferGeometry) {
    console.log("'geometry' must be an indexed or non-indexed buffer geometry");
    return 0;
  }

  var isIndexed = geometry.index !== null;
  let position = geometry.attributes.position;
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
    let index = geometry.index;
    let faces = index.count / 3;
    for (let i = 0; i < faces; i++){
      p1.fromBufferAttribute(position, index.array[i * 3 + 0]);
      p2.fromBufferAttribute(position, index.array[i * 3 + 1]);
      p3.fromBufferAttribute(position, index.array[i * 3 + 2]);
      sum += signedVolumeOfTriangle(p1, p2, p3);
    }
  }
  console.timeEnd("Time taken to calculate model's volume: ");
  return sum;
}

function signedVolumeOfTriangle(p1, p2, p3) {
  return p1.dot(p2.cross(p3)) / 6.0;
}

function calculatePrice() {
  var x = document.getElementById('resin').value;
  let inLiters = volume/1000000
  switch(x) {
    case 'none': // change to a default(?)
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
  let parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}

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