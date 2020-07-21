class Node {
    constructor(key = null, val = null) {
        this.key = key;
        this.val = val;
        this.next = null;
        this.prev = null;
    }
}

class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
        this.head = new Node();
        this.tail = new Node();
        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    get = (key) => {
        // console.log('=====', key);
        // console.log(this.cache);
        if (!this.cache.has(key)){
            return -1;
        }

        const node = this.cache.get(key);
        this._detach(node); // remove from the linked list
        this._append(node); // append it to last of the linked list
        return node.val;
    }

    put = (key, value) => {
        let node;
        if (this.cache.has(key)) {
            node = this.cache.get(key);
            this._detach(node);
        }
        else if (this.capacity === this.cache.size){
            node = this._evict(); // LRU evict
        }else{
            node = new Node();
        }
        node.key = key;
        node.val = value;
        this.cache.set(key, node);
        this._append(node);

    }

    _detach = (node) => {
        node.prev.next = node.next;
        node.next.prev = node.prev;
    }

    _append = (node) => {
        node.prev = this.tail.prev;
        node.next = this.tail;
        this.tail.prev.next = node;
        this.tail.prev = node;
    }

    _evict = () => {
        const node = this.head.next;
        this._detach(node);
        this.cache.delete(node.key);
        return node;
    }

}