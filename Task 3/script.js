// Current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(link=>{
  link.addEventListener('click', e=>{
    const id = link.getAttribute('href');
    if(id.length > 1){
      e.preventDefault();
      document.querySelector(id)?.scrollIntoView({behavior:'smooth'});
    }
  });
});

// Intersection Observer for reveal animations
const revealables = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
},{threshold:0.16});

revealables.forEach(el=>io.observe(el));
