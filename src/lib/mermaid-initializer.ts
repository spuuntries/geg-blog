import mermaid from 'mermaid';

const renderMermaid = () => {
  const mermaidElements = document.querySelectorAll<HTMLElement>('.mermaid');
  if (mermaidElements.length === 0) {
    return;
  }

  // Unescape content and prepare for rendering
  mermaidElements.forEach((element) => {
    const rawContent = element.dataset.content;
    if (rawContent) {
      const textarea = document.createElement('textarea');
      textarea.innerHTML = rawContent.replace(/%0A/g, '\n');
      element.innerHTML = textarea.value;
      element.removeAttribute('data-content');
    }
    // The element is now ready for mermaid
    element.removeAttribute('data-processed');
  });

  // Render all mermaid elements on the page
  try {
    mermaid.run({ nodes: mermaidElements });
  } catch (error) {
    console.error('Error rendering Mermaid diagrams:', error);
  }
};

// Run on initial page load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderMermaid);
} else {
  renderMermaid();
}

// Re-render after Astro's view transitions
document.addEventListener('astro:after-swap', renderMermaid);
