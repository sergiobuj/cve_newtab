function setup() {

  fetch('https://cors-anywhere.herokuapp.com/https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss-analyzed.xml', { cache: "force-cache" })
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      console.log(data);
      const items = data.querySelectorAll("item");
      let html = ``;
      items.forEach(el => {
        html = `
<article>
<h2>
<a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
${el.querySelector("title").innerHTML}
</a>
</h2>
<p>${el.querySelector("description").innerHTML}</p>
</article>
` + html;
      });
      document.getElementById('rss_url_analyzed').innerHTML = html;
    });

  fetch('https://cors-anywhere.herokuapp.com/https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml', { cache: "force-cache" })
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      console.log(data);
      const items = data.querySelectorAll("item");
      let html = ``;
      items.forEach(el => {
        html = `
<article>
<h2>
<a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
${el.querySelector("title").innerHTML}
</a>
</h2>
<p>${el.querySelector("description").innerHTML}</p>
</article>
` + html;
      });
      document.getElementById('rss_url_latest').innerHTML = html;
    });
}

setup();
