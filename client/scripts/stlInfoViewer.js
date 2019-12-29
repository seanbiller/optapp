/*
 * This function takes in the model's geometry and runs it through the functions of calculations.js,
 * assigning the returned values to their respective html elements being created within this file,
 * which will then be added to index.html and displayed adjacent to the rendered 3D model.
 */

function stlInfoViewer(geometry, elementID) {
    var elem = document.getElementById(elementID);

    geometry.computeBoundingBox();
    var bbox = geometry.boundingBox;
    let middle = new THREE.Vector3(geometry.center());

    bbox.getSize(middle);
    console.log("Dimensions of Model's Bounding-Box: " + JSON.stringify(middle));
}