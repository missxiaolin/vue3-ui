class MentionSearch {
  [x: string]: any;
  constructor(mention: any) {
    this.mention = mention;
    this.mention.search = this;
  }

  simpleFilter(pattern: any, array: any[]) {
    return array.filter((string) => {
      return this.test(pattern, string);
    });
  }

  test(pattern: any, string: any) {
    return this.match(pattern, string) !== null;
  }

  match(
    pattern: string,
    string: string,
    opts?: { pre?: any; post?: any; caseSensitive?: any; skip?: any } | undefined
  ) {
    opts = opts || {};
    let patternIdx = 0,
      result = [],
      len = string.length,
      totalScore = 0,
      currScore = 0,
      pre = opts.pre || '',
      post = opts.post || '',
      compareString = (opts.caseSensitive && string) || string.toLowerCase(),
      ch,
      compareChar;

    if (opts.skip) {
      return { rendered: string, score: 0 };
    }

    pattern = (opts.caseSensitive && pattern) || pattern.toLowerCase();

    let patternCache = this.traverse(compareString, pattern, 0, 0, []);
    if (!patternCache) {
      return null;
    }
    return {
      rendered: this.render(string, patternCache.cache, pre, post),
      score: patternCache.score
    };
  }

  traverse(
    string: string | any[],
    pattern: string,
    stringIndex: number,
    patternIndex: number,
    patternCache: any[]
  ): any {
    if (this.mention.autocompleteSeparator) {
      // if the pattern search at end
      pattern = pattern.split(this.mention.autocompleteSeparator).splice(-1)[0];
    }

    if (pattern.length === patternIndex) {
      // calculate score and copy the cache containing the indices where it's found
      return {
        score: this.calculateScore(patternCache),
        cache: patternCache.slice()
      };
    }

    // if string at end or remaining pattern > remaining string
    if (string.length === stringIndex || pattern.length - patternIndex > string.length - stringIndex) {
      return undefined;
    }

    let c = pattern[patternIndex];
    let index = string.indexOf(c, stringIndex);
    let best, temp;

    while (index > -1) {
      patternCache.push(index);
      temp = this.traverse(string, pattern, index + 1, patternIndex + 1, patternCache);
      patternCache.pop();

      // if downstream traversal failed, return best answer so far
      if (!temp) {
        return best;
      }

      if (!best || best.score < temp.score) {
        best = temp;
      }

      index = string.indexOf(c, index + 1);
    }

    return best;
  }

  calculateScore(patternCache: any[]) {
    let score = 0;
    let temp = 1;

    patternCache.forEach((index, i) => {
      if (i > 0) {
        if (patternCache[i - 1] + 1 === index) {
          temp += temp + 1;
        } else {
          temp = 1;
        }
      }

      score += temp;
    });

    return score;
  }

  render(string: string, indices: any[], pre: any, post: any) {
    var rendered = string.substring(0, indices[0]);

    indices.forEach((index, i) => {
      rendered +=
        pre + string[index] + post + string.substring(index + 1, indices[i + 1] ? indices[i + 1] : string.length);
    });

    return rendered;
  }

  filter(pattern: string, arr: any[], opts: any) {
    opts = opts || {};
    return arr
      .reduce((prev, element, idx, arr) => {
        let str = element;

        if (opts.extract) {
          str = opts.extract(element);

          if (!str) {
            // take care of undefineds / nulls / etc.
            str = '';
          }
        }

        let rendered = this.match(pattern, str, opts);
        // 增加只有连续字符串匹配才能匹配
        let flag = str.toLowerCase().includes(pattern.toLowerCase());
        if (rendered != null && flag) {
          prev[prev.length] = {
            string: rendered.rendered,
            score: rendered.score,
            index: idx,
            original: element
          };
        }

        return prev;
      }, [])

      .sort((a: { score: number; index: number }, b: { score: number; index: number }) => {
        let compare = b.score - a.score;
        if (compare) return compare;
        return a.index - b.index;
      });
  }
}

export default MentionSearch;
