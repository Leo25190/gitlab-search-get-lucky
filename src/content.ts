/**
 * GitLab Search Get Lucky Extension
 * Automatically redirects to the first search result when pressing Enter in GitLab search
 * Prioritizes projects over other result types
 */

// Global state variables
let currentSearch = '';
let lastResults: any[] = [];
let searchTimer: number;

/**
 * Performs a search request to GitLab's autocomplete API
 * @param term - The search term to query
 */
async function searchGitLab(term: string): Promise<void> {
  try {
    // Build the GitLab autocomplete API URL
    const url = window.location.origin + '/search/autocomplete?term=' + encodeURIComponent(term);
    
    // Make the request with proper headers
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      credentials: 'same-origin'
    });
    
    // Parse and store the results
    if (response.ok) {
      lastResults = await response.json();
    }
  } catch (error) {
    console.error('Failed to perform search:', error);
  }
}

/**
 * Redirects to the first search result, prioritizing projects
 * If no projects are found, redirects to the first result of any type
 */
async function goToFirstResult(): Promise<void> {
  // Fetch fresh results if needed
  if (lastResults.length === 0 && currentSearch) {
    await searchGitLab(currentSearch);
  }
  
  // Check if we have any results
  if (lastResults.length === 0) {
    return;
  }
  
  // Look for the first project in results
  const firstProject = lastResults.find(result => result.category === 'Projects');
  
  let chosenResult;
  
  if (firstProject) {
    // Prioritize project if found
    chosenResult = firstProject;
  } else {
    // Fall back to first result of any type
    chosenResult = lastResults[0];
  }
  
  // Build full URL and redirect
  const fullUrl = window.location.origin + chosenResult.url;
  
  window.location.href = fullUrl;
}

/**
 * Checks if the currently focused element is the GitLab search input
 * @returns true if user is currently in GitLab search input
 */
function isInGitLabSearch(): boolean {
  const activeElement = document.activeElement as HTMLInputElement;
  
  // Check if the focused element matches GitLab search input selectors
  return activeElement && (
    activeElement.id === 'search' || 
    activeElement.matches('input[data-testid="global-search-input"]')
  );
}

// Event listener for input changes in search field
document.addEventListener('input', (event) => {
  const target = event.target as HTMLInputElement;
  
  // Check if the input event is from GitLab search field
  if (target.id === 'search' || target.matches('input[data-testid="global-search-input"]')) {
    currentSearch = target.value.trim();
    
    // Clear previous search timer
    clearTimeout(searchTimer);
    
    // Debounce search requests - wait 300ms after user stops typing
    if (currentSearch) {
      searchTimer = window.setTimeout(() => {
        searchGitLab(currentSearch);
      }, 300);
    } else {
      // Clear results if search is empty
      lastResults = [];
    }
  }
});

// Event listener for Enter key press
document.addEventListener('keydown', (event) => {
  // Only handle Enter key presses
  if (event.key !== 'Enter') {
    return;
  }
  
  // Only proceed if user is in GitLab search input
  if (!isInGitLabSearch()) {
    return;
  }
  
  // Get the current search value
  const searchInput = document.activeElement as HTMLInputElement;
  const searchValue = searchInput.value.trim();
  
  // Do nothing if search is empty
  if (!searchValue) {
    return;
  }
  
  
  // Prevent GitLab's default search behavior
  event.preventDefault();
  event.stopPropagation();
  
  // Update search term and redirect to first result
  currentSearch = searchValue;
  goToFirstResult();
}, true); // Use capture phase to intercept before GitLab

// Extension initialization