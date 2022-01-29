var CodeWizard = CodeWizard || {};

/**
 * This file contains the Client side JS for the table 
 */
CodeWizard.Utils = (function () {

  // Sort the Json based upon required field
  function sortJson(json, fieldToSort) {
    return json.sort((a, b) => {
      if (a[fieldToSort] && a[fieldToSort] > b[fieldToSort]) {
        return 1;
      }
      else if (a[fieldToSort] < b[fieldToSort]) {
        return -1;
      }
      return 0;
    });
  };

  /** Filter the results based upon the search query */
  function markResults(searchString) {

    // Hide the un relevant rows
    $("[data-search] tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchString) > -1)
    });
    // Update the counter
    $(`#recordsCounter`).text($("[data-search] tbody tr").filter(":visible").length);

  }

  /**
   * Register the search event
   */
  function registerSearch() {
    // Listen for typing
    $(`[name=searchField]`)
      .on("keyup", function () {
        markResults($(this).val().toLowerCase());
      });

    // Register the clear button
    $('.clearSearch')
      .on("click", function () {
        $('[name=searchField]').val('');
        markResults('');
      });
  }

  return {
    sortJson,
    registerSearch
  }

})();

/** Register the search if its on page */
$(document).ready(function () {
  CodeWizard.Utils.registerSearch();
});
