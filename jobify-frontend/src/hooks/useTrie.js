import { useEffect, useRef, useState } from "react";
import { getJobKeywords } from "../api/jobApi";

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
  suggest(prefix) {
    let curr = this.root;
    for (const ch of prefix.toLowerCase()) {
      if (!curr.children[ch]) return [];
      curr = curr.children[ch];
    }

    const result = [];
    const dfs = (node, path) => {
      if (result.length >= 5) return; //limit suggestion
      if (node.isEnd) result.push(path);
      for (const ch of Object.keys(node.children)) {
        dfs(node.children[ch], path + ch);
      }
    };
    dfs(curr, prefix.toLowerCase());
    return result;
  }
}

export const useJobTrie = () => {
  const trieRef = useRef(new Trie());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchKeywords = async () => {
      const res = await getJobKeywords();
      res.keywords.forEach((word) => {
        return trieRef.current.insert(word);
      });
      setLoading(false);
    };
    fetchKeywords();
  }, []);

  return {
    suggest: (word) => trieRef.current.suggest(word),
    loading,
  };
};
