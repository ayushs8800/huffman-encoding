import { useState } from "react";
import TextFileContext from "./textFileContext";
import "../Compressor.css";

function ReadTextFile(props) {
  const [fileContent, setFileContent] = useState("");
  const [showContent, setSowContent] = useState(false);
  const onFileChange = () => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      setSowContent(true);
      var divContent = document.getElementById("file-content");
      var file = document.querySelector("input").files[0];
      var reader = new FileReader();
      var textFile = /text.*/;

      if (file.type.match(textFile)) {
        reader.onload = function (e) {
          setFileContent(e.target.result);
          divContent.innerHTML = e.target.result;
        };
        reader.readAsText(file);
      } else {
        divContent.classList.add("error");
        divContent.innerHTML = "YOU SHOULD SELECT A TEXT FILE ONLY";
      }
    } else {
      alert("An error occurred, Please try in a different browser");
    }
  };
  return (
    <TextFileContext.Provider value={fileContent}>
      <div className="display-data">
        <span>
          <strong>STEP 1 : </strong>Choosing a text file
        </span>{" "}
        <br />
        <input type="file" className="compress-btn" onChange={onFileChange} />
        <br />
        {showContent && (
          <div style={{ padding: "10px" }}>
            <strong>Data in the text file : </strong>
          </div>
        )}
        <div id="file-content" style={{ fontSize: "1rem" }}></div>
      </div>
      <div>{props.children}</div>
    </TextFileContext.Provider>
  );
}

export default ReadTextFile;
