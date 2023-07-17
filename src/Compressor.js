import React, { useContext, useState } from "react";

import "./Compressor.css";

import TextFileContext from "./context/textFileContext";
import Huffman from "./huffman-algorithm/Huffman";

const Compressor = () => {
  const [binState, setBinState] = useState([]);
  const [encodedStr, setEncodedStr] = useState("");
  const [decodedStr, setDecodedStr] = useState("");
  const [showCompress, setShowCompress] = useState(false);
  const [showDecompress, setShowDecompress] = useState(false);
  const context = useContext(TextFileContext);

  const downloadCompressedTextFile = (encodedText, fileName) => {
    const aTag = document.createElement("a");
    const file = new Blob([encodedText], {
      type: "text/plain;charset=utf-8",
    });

    aTag.href = URL.createObjectURL(file);
    aTag.download = `${fileName}.txt`;
    document.body.appendChild(aTag);
    aTag.click();
  };

  const onCompress = () => {
    if (context.length > 0) {
      const huffmanObj = new Huffman(context);
      const arr = huffmanObj.compress();
      const encoded = huffmanObj.getEncodedString();
      const decoded = huffmanObj.decodeEncodedString();
      setShowCompress(true);
      setBinState(arr);
      setEncodedStr(encoded);
      setDecodedStr(decoded);
      downloadCompressedTextFile(encoded, "encoded_huffman");
    } else {
      alert("Please Upload the text File");
    }
  };

  const onDeCompress = () => {
    if (encodedStr.length > 0) {
      setShowDecompress(true);
      downloadCompressedTextFile(decodedStr, "decoded_huffman");
    } else {
      alert("Please Upload the Text File");
    }
  };

  return (
    <div className="compress display-data">
      <div>
        <br />
        <br />
        <span>
          <strong>STEP 2 : </strong>Compress the File
        </span>{" "}
        <br />
        <input
          type="button"
          value="Compress the File"
          className="compress-btn"
          onClick={onCompress}
        />
        {showCompress && (
          <>
            <div className="display-data">
              <div
                style={{
                  padding: "10px",
                }}
              >
                <p
                  style={{
                    fontSize: "20px",
                  }}
                >
                  {" "}
                  <strong> HUFFMAN ENCODED BINARY STRINGS 👇</strong>
                </p>
              </div>
              {binState.length > 0 ? (
                <table style={{ margin: "auto" }}>
                  <tbody>
                    {binState.map((obj, idx) => (
                      <tr key={idx}>
                        <td
                          style={{
                            paddingLeft: "5px",
                            fontSize: "1.1rem",
                            textAlign: "left",
                          }}
                        >
                          <strong>{obj.char}</strong>
                        </td>
                        <td
                          style={{
                            paddingLeft: "15px",
                            fontSize: "1rem",
                            textAlign: "left",
                          }}
                        >
                          {obj.binStr}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div style={{ color: "#2CD3E1" }}>
                  Choose a Text File to see the huffman code words
                </div>
              )}
            </div>

            <div className="display-data encoded-string">
              <br />
              <strong>Encoded String : </strong>
              {encodedStr.length > 0 ? (
                <div
                  style={{
                    padding: "10px",
                    fontSize: "1rem",
                    width: "150%",
                    height: "200px",
                    overflow: "auto",
                    wordWrap: "break-word",
                    scrollbarWidth: "thin",
                    scrollbarColor: "gray",
                    borderRadius: "5px",
                  }}
                >
                  <style>
                    {`
      div::-webkit-scrollbar {
        width: 8px;
      }

      div::-webkit-scrollbar-track {
        background-color: transparent;
      }

      div::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 5px;
      }
    `}
                  </style>
                  {encodedStr}
                </div>
              ) : (
                <div style={{ color: "#2CD3E1" }}>
                  Choose a Text File to see Encoded Binary String
                </div>
              )}
            </div>
          </>
        )}
      </div>
      <div>
        <br />
        <br />
        <span>
          <strong>STEP 3 : </strong>DeCompress the File
        </span>{" "}
        <br />
        <input
          type="button"
          value="DeCompress the File"
          className="compress-btn"
          onClick={onDeCompress}
        />
        {showDecompress && (
          <div className="display-data encoded-string">
            <br />
            <strong>Decoded String : </strong>
            {decodedStr.length > 0 ? (
              <div
                style={{
                  padding: "10px",
                  fontSize: "1rem",
                  width: "100%",
                  height: "200px",
                  overflow: "auto",
                  wordWrap: "break-word",
                  scrollbarWidth: "thin",
                  scrollbarColor: "gray",
                  borderRadius: "5px",
                }}
              >
                <style>
                  {`
      div::-webkit-scrollbar {
        width: 8px;
      }

      div::-webkit-scrollbar-track {
        background-color: transparent;
      }

      div::-webkit-scrollbar-thumb {
        background-color: gray;
        border-radius: 5px;
      }
    `}
                </style>
                {decodedStr}
              </div>
            ) : (
              <div style={{ color: "#2CD3E1" }}>
                Choose a Text File to see Encoded Binary String
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Compressor;
