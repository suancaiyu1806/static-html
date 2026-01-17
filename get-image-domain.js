// 获取页面上所有图片元素的域名集合
(function() {
  // 获取所有 img 标签
  const images = document.querySelectorAll('img');
  
  // 使用 Set 来存储唯一的域名
  const domains = new Set();
  
  images.forEach(img => {
    const src = img.src || img.getAttribute('data-src') || img.getAttribute('data-original');
    
    if (src) {
      try {
        const url = new URL(src, window.location.href);
        domains.add(url.hostname);
      } catch (e) {
        console.warn('无法解析图片URL:', src);
      }
    }
  });
  
  // 同时检查 CSS 背景图片
  const allElements = document.querySelectorAll('*');
  allElements.forEach(element => {
    const style = window.getComputedStyle(element);
    const bgImage = style.backgroundImage;
    
    if (bgImage && bgImage !== 'none') {
      // 提取 url() 中的地址
      const urlMatch = bgImage.match(/url\(['"]?(.*?)['"]?\)/g);
      if (urlMatch) {
        urlMatch.forEach(match => {
          const url = match.replace(/url\(['"]?|['"]?\)/g, '');
          try {
            const parsedUrl = new URL(url, window.location.href);
            domains.add(parsedUrl.hostname);
          } catch (e) {
            // 忽略无效的URL
          }
        });
      }
    }
  });
  
  // 打印结果
  console.log('=== 页面图片域名统计 ===');
  console.log(`共找到 ${images.length} 个 <img> 标签`);
  console.log(`共发现 ${domains.size} 个不同的域名:\n`);
  
  const sortedDomains = Array.from(domains).sort();
  sortedDomains.forEach((domain, index) => {
    console.log(`${index + 1}. ${domain}`);
  });
  
  console.log('\n=== 详细域名列表（可复制） ===');
  console.log(sortedDomains);
  
  return sortedDomains;
})();


