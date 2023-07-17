class minHeap {
    constructor() {
        this.nodes = [];
        this.size = 0;
    }

    insert(x) {
        this.nodes.push(x);
        let childIdx = this.nodes.length - 1;
        let parentIdx = Math.floor((childIdx - 1)/2);
        while( childIdx > 0 && this.nodes[parentIdx].freq > this.nodes[childIdx].freq) {
            this.swap(parentIdx, childIdx);
            childIdx = parentIdx;
            parentIdx = Math.floor((childIdx-1)/2);
        }
        this.size += 1;
    }

    swap(idx1, idx2) {
        let temp = this.nodes[idx1];
        this.nodes[idx1] = this.nodes[idx2];
        this.nodes[idx2] = temp;
    }

    getMin() {
        if (this.nodes.length > 0){
            return this.nodes[0];
        }
        else{
            return -1;
        }
    }

    delMin() {
        if(this.size === 0){
            return -1;
        }
        let lstEle = this.nodes[this.size-1];
        this.nodes[0] = lstEle;
        this.nodes.pop();
        this.size -= 1
        this.heapify(0);
    }

    heapify(idx) {
        if(this.size <= 1){
            return;
        }
        let leftChild = 2*idx + 1;
        let rightChild = 2*idx + 2;

        let smallestValIdx = idx;
        let l = this.size;

        if(leftChild < l && this.nodes[leftChild].freq < this.nodes[idx].freq) {
            smallestValIdx = leftChild;
        }

        if(rightChild < l && this.nodes[rightChild].freq < this.nodes[smallestValIdx].freq) {
            smallestValIdx = rightChild;
        }

        if(smallestValIdx !== idx) {
            let temp = this.nodes[smallestValIdx];
            this.nodes[smallestValIdx] = this.nodes[idx];
            this.nodes[idx] = temp;
            this.heapify(smallestValIdx);
        }
    }
}

export default minHeap;