import { useRef } from "react";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }
  insert(word) {
    let curr = this.root;
    for (const ch of word.toLowerCase()) {
      if (!curr.children[ch]) {
        curr.children[ch] = new TrieNode();
      }
      curr = curr.children[ch];
    }
    curr.isEnd = true;
  }
  getWordWithPrefix(prefix) {
    let curr = this.root;
    for (const ch of prefix.toLowerCase()) {
      if (!curr.children[ch]) return [];
      curr = curr.children[ch];
    }

    const result = [];
    const dfs = (node, path) => {
      if (result.length >= 5) return; //limit suggestion
      if (node.isEnd) result.push(path);
      for (const ch of node.children) {
        dfs(node.children[ch], path + ch);
      }
    };
    dfs(curr, prefix.toLowerCase());
    return result;
  }
}

export const useTrie = (initialWords) => {
  const trie = useRef(new Trie());

  if (initialWords && trie.current.root && !trie.current._initialized) {
    initialWords.forEach((word) => trie.current.insert(word));
    trie.current._initialized = true;
  }
  return {
    insert: (word) => trie.current.insert(word),
    search: (prefix) => trie.current.getWordWithPrefix(prefix),
  };
};
