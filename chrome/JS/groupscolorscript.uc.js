function updateTabGroupColors() {
  // Find the swatches container
  const swatchContainer = document.querySelector('.tab-group-editor-swatches');
  if (!swatchContainer) return;

  const colors = {
    blue: '#4287f5',
    pink: '#fb33cc',
    red: '#e3365e',
    orange: '#ee6748',
    purple: '#6f51e0',
    yellow: '#ffd85e',
    green: 'linear-gradient(90deg, #15d16c, #ffffff)'
  };

  // Update colors for each swatch
  Object.keys(colors).forEach(color => {
    const swatch = swatchContainer.querySelector(
      `.tab-group-editor-swatch[for="tab-group-editor-swatch-${color}"]`
    );

    if (swatch) {
      // Apply styles directly to the swatch
      swatch.style.setProperty('--tabgroup-swatch-color', colors[color]);
      swatch.style.setProperty('--tabgroup-swatch-color-invert', colors[color]);
      swatch.style.setProperty('--tabgroup-swatch-color-pale', colors[color]);
    }
  });
}

// Observer to monitor DOM changes
const observer = new MutationObserver(mutations => {
  for (const mutation of mutations) {
    for (const node of mutation.addedNodes) {
      if (node.classList && node.classList.contains('tab-group-editor-swatches')) {
        updateTabGroupColors();
        return;
      }
    }
  }
});

// Initialize observer and apply styles when the document is ready
function init() {
  observer.disconnect();

  const popupSet = document.getElementById('mainPopupSet');
  if (popupSet) {
    observer.observe(popupSet, { childList: true, subtree: true });
  }

  const existingSwatches = document.querySelector('.tab-group-editor-swatches');
  if (existingSwatches) {
    updateTabGroupColors();
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
