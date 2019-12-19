function processStl() {
    var file = document.getElementById("uploadInput").files[0]
    var reader = new FileReader();

    // set "on load" handler for reader
    reader.onload = function (e) {
        var contents = reader.result;
        let loader = new THREE.STLLoader();

        /* -For those who are curious- 
            *
            * Although the stlLoader module has a .load() function
            * that takes in a static file path as a parameter
            * and passes it on to the file's .parse() function to
            * read through it's contents, returning the parsed result
            * as a bufferGeometry object, we omitted .load() from our code
            * due to the fact that it couldn't take in a user-uploaded file
            * as a parameter. 
            * 
            * We worked around this by plugging the file's data directly 
            * into loader.parse() and setting it equal to the variabe 'geometry',
            * bypassing the need for .load() altogether (we hope), and allowing us
            * to move on to generating our scene.
            */

        let geometry = loader.parse(contents);
        stlModelViewer(geometry, "model");

        let vol = getVolume(geometry);
        console.log("Part Volume: " + vol.toFixed(2)+ " mm^3");

        // stlInfoViewer(geometry);
    }

    // read the file using the reader
    if (reader.readAsBinaryString !== undefined) {
        reader.readAsBinaryString(file);
    } 
    else { reader.readAsArrayBuffer(file); }

}