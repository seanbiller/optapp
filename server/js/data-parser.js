/* 
This server-side .js file does the following...
    1.) Receives an html form containing the user-uploaded .stl file from the client-side
    2.) Uses the node-stl node module to parse the file's contents for the data that we need
    3.) ...
*/
const NodeStl = require('node-stl')

var stl = new NodeStl(__dirname + '/test-assets/Ball_10mm.stl');
console.log('--------------------------------------------------------------------------------------')
console.log('VOLUME --------------------> ' + stl.volume + ' cm^3');       // 21cm^3
console.log('--------------------------------------------------------------------------------------')
console.log('WEIGHT --------------------> ' + stl.weight + ' gm');         //  1gm
console.log('--------------------------------------------------------------------------------------')
console.log('BOUNDING BOX DIMENSIONS ---> ' + stl.boundingBox + ' (mm)');  // [60,45,50] (mm)
console.log('--------------------------------------------------------------------------------------')
console.log('AREA ----------------------> ' + stl.area + ' (m)');          // 91.26 (m)
console.log('--------------------------------------------------------------------------------------')
console.log('CENTER OF MASS ------------> ' + stl.centerOfMass + ' (mm)'); // [30,22.5,25] (mm)
console.log('--------------------------------------------------------------------------------------')