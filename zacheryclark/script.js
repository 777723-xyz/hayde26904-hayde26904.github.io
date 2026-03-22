const fadeSections = document.querySelectorAll('.fade-section');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
      } else {
        entry.target.classList.remove('in-view');
      }
    });
  },
  {
    threshold: 0.35,
    rootMargin: '0px 0px -5% 0px'
  }
);

fadeSections.forEach((section) => observer.observe(section));

const summaryBlocks = document.querySelectorAll('.book-copy');
const COLLAPSED_LINES = 4;

function setupSummary(card) {
  const summary = card.querySelector('.book-summary');
  const button = card.querySelector('.read-more-btn');

  if (!summary || !button) {
    return;
  }

  const computed = window.getComputedStyle(summary);
  const lineHeight = parseFloat(computed.lineHeight) || 24;
  const collapsedHeight = Math.round(lineHeight * COLLAPSED_LINES);
  const fullHeight = summary.scrollHeight;

  if (fullHeight <= collapsedHeight + 4) {
    card.classList.remove('is-collapsed', 'is-expanded');
    summary.style.maxHeight = 'none';
    button.hidden = true;
    return;
  }

  button.hidden = false;

  if (!card.classList.contains('is-expanded')) {
    card.classList.add('is-collapsed');
    summary.style.maxHeight = `${collapsedHeight}px`;
    button.textContent = 'Read more';
    button.setAttribute('aria-expanded', 'false');
  } else {
    summary.style.maxHeight = `${fullHeight}px`;
    button.textContent = 'Read less';
    button.setAttribute('aria-expanded', 'true');
  }

  button.onclick = () => {
    const expanded = card.classList.toggle('is-expanded');
    card.classList.toggle('is-collapsed', !expanded);

    if (expanded) {
      summary.style.maxHeight = `${summary.scrollHeight}px`;
      button.textContent = 'Read less';
      button.setAttribute('aria-expanded', 'true');
    } else {
      summary.style.maxHeight = `${collapsedHeight}px`;
      button.textContent = 'Read more';
      button.setAttribute('aria-expanded', 'false');
    }
  };
}

summaryBlocks.forEach((card) => setupSummary(card));

window.addEventListener('resize', () => {
  summaryBlocks.forEach((card) => setupSummary(card));
});
