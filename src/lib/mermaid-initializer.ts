// Import the Mermaid library
import mermaid from 'mermaid';

/**
 * Unescapes HTML entities in a string.
 * Specifically decodes %0A to \n and other common HTML entities.
 * @param {string} text The string to unescape.
 * @returns {string} The unescaped string.
 */
const unescapeHTML = (text: string): string => {
  if (!text) {
    return '';
  }
  // Create a textarea element to leverage the browser's decoding capabilities.
  // This is a common trick to handle a wide range of HTML entities.
  const textarea = document.createElement('textarea');
  // First, replace %0A with newline characters, as textarea won't decode these.
  const textWithNewlines = text.replace(/%0A/g, '\n');
  textarea.innerHTML = textWithNewlines;
  return textarea.value;
};

/**
 * Initializes Mermaid diagrams on the page.
 * Finds elements with the class "mermaid", extracts the diagram definition
 * from the "data-content" attribute, unescapes it, and then renders the diagram.
 */
const initializeMermaid = () => {
  console.log('Initializing Mermaid diagrams (or re-initializing after page load)...');

  // Select all elements with the class "mermaid"
  const mermaidElements = document.querySelectorAll<HTMLElement>('.mermaid');

  if (mermaidElements.length === 0) {
    console.log('No Mermaid diagrams found on the page.');
    return;
  }

  mermaidElements.forEach((element, index) => {
    try {
      // Retrieve the raw Mermaid diagram definition from the data-content attribute
      // If data-content is not present, it might have been processed already by a previous run,
      // or it's a new element that needs processing.
      const rawDiagramDefinition = element.dataset.content;

      // If there's a definition, process it.
      // If not, Mermaid.run() might still re-render existing diagrams if they were manipulated by Astro.
      if (rawDiagramDefinition) {
        // Unescape the diagram definition
        const unescapedDiagramDefinition = unescapeHTML(rawDiagramDefinition);

        // Clear the existing inner HTML of the element to prevent duplication
        // if initializeMermaid is called multiple times on the same static elements (though less likely with Astro)
        element.innerHTML = '';

        // Set the element's inner HTML to the unescaped Mermaid diagram definition
        // Mermaid will pick this up when mermaid.run() is called.
        element.innerHTML = unescapedDiagramDefinition;

        // Remove the data-content attribute as it's no longer needed
        element.removeAttribute('data-content');
        console.log(`Prepared Mermaid diagram at index ${index} from data-content.`);
      } else if (!element.innerHTML.includes('<svg')) {
        // If no data-content and no SVG, it might be an empty .mermaid div that needs its content (if any was intended)
        // or it's already processed and just fine.
        // For safety, we'll log if it's empty and wasn't processed by data-content this run.
        console.warn(`Mermaid element at index ${index} has no data-content and no existing SVG. Ensure it's correctly set up if it was intended to render.`);
      }


    } catch (error) {
      console.error(`Error processing Mermaid element at index ${index}:`, error);
    }
  });

  try {
    // After processing all elements, call mermaid.run() to render all diagrams
    // The { nodes } option specifies which elements to render.
    // This will render newly prepared diagrams and should re-render existing ones if necessary.
    console.log('Running Mermaid to render/re-render diagrams...');
    // Explicitly tell mermaid what to render. If elements were already rendered and are still in the DOM,
    // mermaid.run() might re-process them or skip them if their content hasn't changed in a way it detects.
    // By clearing and resetting content above from 'data-content', we ensure new/changed ones are processed.
    mermaid.run({ nodes: Array.from(mermaidElements).filter(el => el.hasAttribute('data-mermaid-processed') === false) });

    // Mark elements as processed to avoid re-processing if not needed by mermaid.run's internal logic
    mermaidElements.forEach(el => el.setAttribute('data-mermaid-processed', 'true'));

    console.log('Mermaid diagrams rendered/re-rendered successfully.');
  } catch (error) {
    console.error('Error rendering/re-rendering Mermaid diagrams:', error);
  }
};

// Initialize Mermaid when the DOM is fully loaded and parsed for the first time.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeMermaid);
} else {
  // DOMContentLoaded has already fired
  initializeMermaid();
}

// Add event listener for Astro's page load event to re-initialize Mermaid on page transitions.
document.addEventListener('astro:page-load', initializeMermaid);
