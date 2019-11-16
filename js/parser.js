
const input = document.querySelector('input[type="file"]');
input.addEventListener('change', function (e) {
    const reader = new FileReader()
    reader.onload = function () {
        var fileContents = reader.result
        document.getElementById("STLdataview").value = fileContents;
    }
    reader.readAsText(input.files[0], "UTF-8")
}, false)

