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
 * This function is designed to be callable multiple times (e.g., on initial load and after page transitions).
 */
const initializeMermaid = () => {
  console.log('Initializing/Re-initializing Mermaid diagrams...');

  // Select all elements with the class "mermaid" currently in the DOM
  const mermaidElements = document.querySelectorAll<HTMLElement>('.mermaid');

  if (mermaidElements.length === 0) {
    console.log('No Mermaid diagrams found on the page.');
    return;
  }

  console.log(`Found ${mermaidElements.length} .mermaid elements.`);

  mermaidElements.forEach((element, index) => {
    try {
      // Retrieve the raw Mermaid diagram definition from the data-content attribute.
      // This attribute is expected to be present for diagrams that haven't been initialized yet.
      const rawDiagramDefinition = element.dataset.content;

      if (rawDiagramDefinition) {
        // Unescape the diagram definition
        const unescapedDiagramDefinition = unescapeHTML(rawDiagramDefinition);

        // Clear the existing inner HTML of the element. This is important for re-runs,
        // ensuring that if Astro replaces the element but keeps the old SVG for a moment,
        // we definitely replace it with the definition that mermaid.run() will process.
        // It also ensures that if data-content changes, the old diagram is removed.
        element.innerHTML = '';

        // Set the element's inner HTML to the unescaped Mermaid diagram definition.
        // Mermaid will pick this up when mermaid.run() is called.
        element.innerHTML = unescapedDiagramDefinition;

        // Remove the data-content attribute as it has now been processed.
        // This prevents re-processing the same data-content if initializeMermaid is called
        // again before a page transition that would replace the element.
        element.removeAttribute('data-content');
        console.log(`Prepared Mermaid diagram at index ${index} from data-content.`);
      } else if (element.innerHTML.trim() === '') {
        // If there's no data-content and the element is empty, it might be an issue
        // if this element was expected to render a diagram.
        // Or, it could be an element that was processed, its SVG removed by a DOM update,
        // and it's now awaiting re-rendering by mermaid.run() if its definition was already set.
        console.warn(`Mermaid element at index ${index} has no data-content and is empty. If it was previously rendered, mermaid.run() might attempt to re-render it if its content was set by an earlier call.`);
      } else {
        // If no data-content and the element is not empty (e.g., contains an SVG),
        // mermaid.run() will decide whether to re-render it or skip it.
        console.log(`Mermaid element at index ${index} has no data-content, assuming it's already processed or will be handled by mermaid.run().`);
      }
    } catch (error) {
      console.error(`Error processing Mermaid element at index ${index}:`, error);
    }
  });

  try {
    // After preparing all elements, call mermaid.run() to render all diagrams.
    // Passing the specific nodes is generally safer and more explicit.
    // Mermaid.js's run() function is generally idempotent and can be called multiple times.
    // It should correctly initialize diagrams that have their definition in place
    // and skip or update already rendered diagrams as appropriate.
    console.log('Calling mermaid.run() for all .mermaid elements...');
    mermaid.run({ nodes: mermaidElements });
    console.log('Mermaid diagrams rendered/re-rendered successfully.');
  } catch (error)
{
    // Catch errors specifically from mermaid.run()
    console.error('Error during mermaid.run():', error);
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
