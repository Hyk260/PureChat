class loaderProxy {
  constructor() {
    this.scriptLoaderCache = [];
  }

  loadCss = src => {
    const element = document.createElement("link");
    element.rel = "stylesheet";
    element.href = src;
    document.body.appendChild(element);
  };

  loadScript = async src => {
    if (this.scriptLoaderCache.includes(src)) {
      return src;
    } else {
      const element = document.createElement("script");
      element.src = src;
      document.body.appendChild(element);
      element.onload = () => {
        return this.scriptLoaderCache.push(src);
      };
    }
  };

  loadScriptConcurrent = async srcList => {
    if (!Array.isArray(srcList)) return;
    const len = srcList.length;
    if (len > 0) {
      let count = 0;
      srcList.map(src => {
        if (src) {
          this.loadScript(src).then(() => {
            count++;
            if (count === len) {
              return;
            }
          });
        }
      });
    }
  };
}

export const loader = new loaderProxy();

// loader.loadScript(data).then(() => {})
