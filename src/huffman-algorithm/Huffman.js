import minHeap from "./minHeap";

class HuffmanNode {
  constructor(char, freq) {
    this.freq = freq;
    this.char = char;
    this.left = null;
    this.right = null;
  }
}

class Huffman {
  constructor(text) {
    this.ascii_arr = new Array(128).fill(0);
    this.text = text;
    this.root = null;
    this.encoded = "";
    this.hmp = new Map();
    this.decodedStr = "";
    //console.log(text);
  }

  findFreq() {
    let l = this.text.length;
    for (let i = 0; i < l; i++) {
      let ascii_idx = this.text.charCodeAt(i);
      this.ascii_arr[ascii_idx] += 1;
    }
    var node_arr = [];
    for (let i = 0; i < 128; i++) {
      if (this.ascii_arr[i] > 0) {
        let new_node = new HuffmanNode(
          String.fromCharCode(i),
          this.ascii_arr[i]
        );
        node_arr.push(new_node);
      }
    }
    return node_arr;
  }

  compress() {
    let freq_arr = this.findFreq();
    let prioQueue = new minHeap();
    for (let i = 0; i < freq_arr.length; i++) {
      prioQueue.insert(freq_arr[i]);
    }
    while (prioQueue.nodes.length > 1) {
      let x = prioQueue.getMin();
      prioQueue.delMin();
      let y = prioQueue.getMin();
      prioQueue.delMin();
      let new_huff = new HuffmanNode();
      new_huff.freq = x.freq + y.freq;
      new_huff.char = "-1";
      new_huff.left = x;
      new_huff.right = y;
      this.root = new_huff;
      prioQueue.insert(new_huff);
    }
    let arr = [];
    let tempRoot = this.root;
    this.assignBin(tempRoot, "", arr);
    return arr;
  }

  assignBin(root, binStr, arr) {
    if (root.left === null && root.right === null) {
      let obj = { char: root.char, binStr: binStr };
      this.hmp.set(root.char, binStr);
      arr.push(obj);
      return;
    }
    if (root.left !== null) this.assignBin(root.left, binStr + "0", arr);
    if (root.right !== null) this.assignBin(root.right, binStr + "1", arr);
  }

  getEncodedString() {
    let encoded = "";
    for (let i = 0; i < this.text.length; i++) {
      encoded += this.hmp.get(this.text[i]);
    }
    this.encoded = encoded;
    return this.encoded;
  }

  decode(index, s, root) {
    if (root === null) {
      return index;
    }
    if (root.left === null && root.right === null) {
      this.decodedStr += root.char;
      return index;
    }
    index += 1;
    root = s[index] === "0" ? root.left : root.right;
    return this.decode(index, s, root);
  }

  decodeEncodedString() {
    let idx = -1;
    while (idx < this.encoded.length - 1) {
      idx = this.decode(idx, this.encoded, this.root);
    }
    return this.decodedStr;
  }
}

export default Huffman;
