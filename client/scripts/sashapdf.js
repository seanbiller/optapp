<title> jsPDF </title>
<meta http-equiv="Content-Type" content="text/html: charset=UTF-8" />
<script type="text/javascript" src="jspdf.min.js"></script>
<script type="text/javascript" src="html2canvas.js"></script>

function genPDF() {

var doc = new jsPDF();

doc.text(20,20, 'Test Message');
doc.addPage();
doc.text(20,20, 'Test Page 2');
doc.save('Test.pdf');

}

function screengrabPDF() {
    html2canvas(document.body).then(function(canvas)) {
        var img= canvas.toDataURL('image/png');
        var doc = new jsPDF();
                doc.addImage(img, 'JPEG', 20, 20);
                doc.save('test.pdf');
            });

//If you only want to grab certain parts of the page you can use this line
    //html2canvas(document.getElementById('results')).then(function(canvas) {

