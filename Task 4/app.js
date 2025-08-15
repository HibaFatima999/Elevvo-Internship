/* ===== Config ===== */
const POSTS_PER_PAGE = 10; // Changed from 6 to 10

/* ===== Sample Posts ===== */
const posts = [
  { id: 1, title: "How I Set Up My Dev Environment", image: "https://picsum.photos/id/180/800/450", desc: "A walkthrough of my editor, extensions, terminals, and shortcuts that keep me fast and happy.", date: "2025-08-10", category: "Tech" },
  { id: 2, title: "A Weekend in Skardu", image: "https://picsum.photos/id/1018/800/450", desc: "Glaciers, turquoise lakes, and tips for first-time travelers to Skardu.", date: "2025-07-24", category: "Travel" },
  { id: 3, title: "Mastering CSS Grid in a Day", image: "https://picsum.photos/id/1060/800/450", desc: "Grid areas, auto-fit, minmax… and a mental model that finally clicks.", date: "2025-06-30", category: "Tech" },
  { id: 4, title: "Street Food in Lahore: My Top 7", image: "https://picsum.photos/id/292/800/450", desc: "From samosas to siri paya—what to eat and where to find it.", date: "2025-06-12", category: "Food" },
  { id: 5, title: "Why I Switched Keyboards (and You Might Too)", image: "https://picsum.photos/id/1/800/450", desc: "Ergonomics, switches, and the surprising joy of a proper keyboard.", date: "2025-05-20", category: "Tech" },
  { id: 6, title: "Hiking the Margalla Hills", image: "https://picsum.photos/id/1043/800/450", desc: "Which trail to choose, when to go, and what to pack for a safe, scenic day.", date: "2025-05-07", category: "Travel" },
  { id: 7, title: "Coffee Beans 101", image: "https://picsum.photos/id/443/800/450", desc: "Arabica vs Robusta, roast levels, and how to buy beans you’ll love.", date: "2025-04-28", category: "Food" },
  { id: 8, title: "Understanding Promises in JavaScript", image: "https://picsum.photos/id/0/800/450", desc: "Promises made friendly—with code patterns you’ll reuse later.", date: "2025-04-05", category: "Tech" },
  { id: 9, title: "Karachi Seaview at Sunrise", image: "https://picsum.photos/id/1056/800/450", desc: "The quietest hour, photo spots, and chai stops nearby.", date: "2025-03-22", category: "Travel" },
  { id: 10, title: "Budget-Friendly Meal Prep", image: "https://picsum.photos/id/1080/800/450", desc: "A week of tasty meals under a tight budget—shopping list included.", date: "2025-03-02", category: "Food" },
  { id: 11, title: "Deploying a Static Site the Easy Way", image: "https://picsum.photos/id/1005/800/450", desc: "Pick a host, push your code, automate with a CI—done.", date: "2025-02-18", category: "Tech" },
  { id: 12, title: "Cultural Gems of Hunza", image: "https://picsum.photos/id/1011/800/450", desc: "People, pottery, music—how to travel respectfully and learn lots.", date: "2025-02-02", category: "Travel" }
].sort((a, b) => new Date(b.date) - new Date(a.date));

/* ===== State ===== */
const state = { category: "all", query: "", page: 1 };

/* ===== DOM ===== */
const postsEl = document.getElementById("posts");
const categoryEl = document.getElementById("categoryFilter");
const searchEl = document.getElementById("searchInput");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
document.getElementById("year").textContent = new Date().getFullYear();

/* ===== Helpers ===== */
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}
function matchesCategory(post, category) {
  return category === "all" ? true : post.category === category;
}
function matchesQuery(post, q) {
  if (!q) return true;
  return post.title.toLowerCase().includes(q.toLowerCase().trim());
}
function paginate(items, page, perPage) {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), pages);
  const start = (current - 1) * perPage;
  const end = start + perPage;
  return { slice: items.slice(start, end), current, pages, total };
}

/* ===== Render ===== */
function render() {
  const filtered = posts.filter(p => matchesCategory(p, state.category) && matchesQuery(p, state.query));
  const { slice, current, pages, total } = paginate(filtered, state.page, POSTS_PER_PAGE);
  state.page = current;

  postsEl.innerHTML = "";

  if (slice.length === 0) {
    postsEl.appendChild(document.getElementById("emptyTemplate").content.cloneNode(true));
  } else {
    const tmpl = document.getElementById("cardTemplate");
    slice.forEach(post => {
      const node = tmpl.content.cloneNode(true);
      const img = node.querySelector("img");
      img.src = post.image;
      img.alt = `${post.title} — ${post.category}`;
      img.onerror = () => { img.src = "https://picsum.photos/800/450"; };
      node.querySelector(".card-title").textContent = post.title;
      node.querySelector(".card-desc").textContent = post.desc;
      node.querySelector(".chip-category").textContent = post.category;
      const time = node.querySelector("time");
      time.dateTime = post.date;
      time.textContent = formatDate(post.date);
      postsEl.appendChild(node);
    });
  }

  pageInfo.textContent = `Page ${current} of ${pages}${total ? ` • ${total} post${total === 1 ? "" : "s"}` : ""}`;
  prevBtn.disabled = current <= 1;
  nextBtn.disabled = current >= pages;
}

/* ===== Events ===== */
categoryEl.addEventListener("change", e => { state.category = e.target.value; state.page = 1; render(); });
searchEl.addEventListener("input", e => { state.query = e.target.value; state.page = 1; render(); });
searchEl.addEventListener("keydown", e => { if (e.key === "Enter") e.preventDefault(); });
prevBtn.addEventListener("click", () => { state.page -= 1; render(); });
nextBtn.addEventListener("click", () => { state.page += 1; render(); });

/* ===== Init ===== */
render();
