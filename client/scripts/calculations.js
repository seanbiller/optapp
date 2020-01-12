
function calculatePrintingPrice(volume, resinType) { //printTime was the second parameter
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


