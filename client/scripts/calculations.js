function getVolume(geometry) {
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
  return sum;
}
  
function signedVolumeOfTriangle(p1, p2, p3) {
    return p1.dot(p2.cross(p3)) / 6.0;
}

function calculatePrintingPrice(volume, printTime, resinType) {
    let inLiters = volume * 0.0000010 //convert to Liters
    // Each case below is a type of resin
    switch(resinType) {
        case 'pcLightgrey':
            return inLiters * 59.90;
        case 'pcTRed':
            return inLiters * 69.98;
        case 'pc3D':
            return inLiters * 76.90;
        case 'bcBlue':
            return inLiters * 138.69;
        case 'bcX5':
            return inLiters * 142.99;
        case 'zrsgr':
            return inLiters * 345.99;
        default:
            return 0;
    }
}

function re_real_price() {
    var x = document.getElementById('material1').value;
    var vl = vol.toFixed(2);
    switch (x)
    {
      case 'PCLG':
        var price = 59.90 * (vl/1000000);
        document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
        break;
      case 'PCTR':
        var price = 69.98 * (vl/1000000);
        document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
        break;
      case 'P3D':
        var price = 76.90 * (vl/1000000);
        document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
        break;
      case 'BCO':
        var price = 138.69 * (vl/1000000);
        document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
        break;
      case 'BCx5':
        var price = 142.99 * (vl/1000000);
        document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
        break;
      case 'ZRS':
        var price = 345.99 * (vl/1000000);
        document.getElementById('esprice1').innerHTML = '$' + price.toFixed(2) + ' USD';
        break;
    }
}
