document.addEventListener("DOMContentLoaded", () => {
  fetch("publications.json")
    .then(res => res.json())
    .then(publications => {
      const recentList = document.getElementById("recent-list");
      const olderList = document.getElementById("older-list");
      const authorFilter = document.getElementById("author-filter");
      const topicFilter = document.getElementById("topic-filter");
      const clearBtn = document.getElementById("clear-filters");

      // Sort newest first
      publications.sort((a, b) => new Date(b.date) - new Date(a.date));

      // Split: 3 recent + rest older
      const recentPubs = publications.slice(0, 3);
      const olderPubs = publications.slice(3);

      // Render 3 most recent (not filtered)
      recentList.innerHTML = "";
      recentPubs.forEach(pub => recentList.appendChild(makeCard(pub)));

      // Collect unique authors/topics
      const authors = new Set();
      const topics = new Set();
      publications.forEach(pub => {
        pub.authors.split(",").map(a => a.trim()).forEach(a => authors.add(a));
        pub.topics.forEach(t => topics.add(t));
      });

      // Build checkbox filters
    authors.forEach(a => {
        const opt = document.createElement("div");
        opt.className = "filter-option";
        opt.textContent = a;
        opt.dataset.value = a;
        opt.addEventListener("click", () => {
            opt.classList.toggle("selected"); // toggle highlight
            render(); // refresh publications
        });

        authorFilter.appendChild(opt);
    });

    topics.forEach(t => {
        const opt = document.createElement("div");
        opt.className = "filter-option";
        opt.textContent = t;
        opt.dataset.value = t;
        opt.addEventListener("click", () => {
            opt.classList.toggle("selected");
            render();
        });
        topicFilter.appendChild(opt);
    });

    
      // Render older publications with filters applied
      function render() {
        olderList.innerHTML = "";

        const selectedAuthors = Array.from(authorFilter.querySelectorAll(".selected")).map(div => div.dataset.value);

        const selectedTopics = Array.from(topicFilter.querySelectorAll(".selected")).map(div => div.dataset.value);


        olderPubs.forEach(pub => {
          const pubAuthors = pub.authors.split(",").map(a => a.trim());
          const pubTopics = pub.topics;

          const authorMatch =
            selectedAuthors.length === 0 || selectedAuthors.some(a => pubAuthors.includes(a));
          const topicMatch =
            selectedTopics.length === 0 || selectedTopics.some(t => pubTopics.includes(t));

          if (authorMatch && topicMatch) {
            olderList.appendChild(makeCard(pub));
          }
        });
      }

      // Helper: build publication card
      function makeCard(pub) {
        const card = document.createElement("div");
        card.className = "publication";
        card.innerHTML = `
          <img src="${pub.image}" alt="${pub.title}">
          <div class="content">
            <h3>${pub.title}</h3>
            <div class="meta">${pub.authors} · ${new Date(pub.date).toLocaleDateString()}</div>
            <a href="${pub.link}" target="_blank">Read More</a>
          </div>
        `;
        return card;
      }

      // Initial render
      render();

      // Listeners for checkboxes
      authorFilter.addEventListener("change", render);
      topicFilter.addEventListener("change", render);

      // Clear filters
      clearBtn.addEventListener("click", () => {
        authorFilter.querySelectorAll("input").forEach(i => (i.checked = false));
        topicFilter.querySelectorAll("input").forEach(i => (i.checked = false));
        render();
      });

      // Dropdown toggle logic
      document.querySelectorAll(".dropbtn").forEach(btn => {
        btn.addEventListener("click", () => {
          const dropdown = btn.parentElement;
          dropdown.classList.toggle("show");
        });
      });

      // !TODO: Close dropdowns when clicking outside
      window.addEventListener("click", e => {
        if (!e.target.matches(".dropbtn")) {
            document.querySelectorAll(".dropdown").forEach(d => d.classList.remove("show"));
        }
      });
    });
});
