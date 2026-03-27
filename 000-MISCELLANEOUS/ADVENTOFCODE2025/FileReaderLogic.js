window.onload = function () {
  //Check the support for the File API support
  if (window.File && window.FileReader && window.FileList && window.Blob) {
    const fileSelected = document.getElementById('txtfiletoread');
    fileSelected.addEventListener('change', function (e) {
      //Set the extension for the file
      const fileExtension = /text.*/;
      //Get the file object
      const fileTobeRead = fileSelected.files[0];
      //Check of the extension match
      if (fileTobeRead.type.match(fileExtension)) {
        //Initialize the FileReader object to read the 2file
        const fileReader = new FileReader();
        fileReader.onload = function (e) {
          const fileContents = document.getElementById('filecontents');
          fileContents.innerText = fileReader.result;
        }
        fileReader.readAsText(fileTobeRead);
      }
      else {
        alert("Please select text file");
      }

    }, false);
  }
  else {
    alert("Files are not supported");
  }
}