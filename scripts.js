(function () {
  let analyzedURL = `https://cors-anywhere.herokuapp.com/https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss-analyzed.xml`;
  let latestURL = `https://cors-anywhere.herokuapp.com/https://nvd.nist.gov/feeds/xml/cve/misc/nvd-rss.xml`;

  function renderCVE(url, element) {
    fetch(url, { cache: "no-cache" })
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");

        let html = [];
        items.forEach(el => {
          let article =
            `<article>
            <h3>
              <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                ${el.querySelector("title").innerHTML}
              </a>
            </h3>
            <p>${el.querySelector("description").innerHTML}</p>
            <p>${el.querySelector("date").innerHTML}</p>
          </article>`;
          html.unshift(article);
        });
        html.length = 10;
        document.getElementById(element).innerHTML = html.join('').toString();
      });
  }

  renderCVE(analyzedURL, `rss_url_analyzed`);
  renderCVE(latestURL, `rss_url_latest`);

})();
