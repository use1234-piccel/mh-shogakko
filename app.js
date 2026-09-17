function showPage(pageId) {
  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

function saveNews() {
  const text = document.getElementById("newsText").value.trim();

  if (!text) {
    alert("お知らせを入力してください。");
    return;
  }

  const news = JSON.parse(
    localStorage.getItem("mh_news") || "[]"
  );

  news.unshift({
    text: text,
    date: new Date().toLocaleString("ja-JP")
  });

  localStorage.setItem(
    "mh_news",
    JSON.stringify(news)
  );

  document.getElementById("newsText").value = "";

  displayNews();
}

function displayNews() {
  const news = JSON.parse(
    localStorage.getItem("mh_news") || "[]"
  );

  const list = document.getElementById("newsList");

  list.innerHTML = "";

  news.forEach(item => {
    const box = document.createElement("div");

    box.className = "classbox";

    box.innerHTML = `
      <p>${escapeHTML(item.text)}</p>
      <small>${item.date}</small>
    `;

    list.appendChild(box);
  });
}

function escapeHTML(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

displayNews();