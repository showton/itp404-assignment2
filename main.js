$("#submit").on("click", function(event) {
  event.preventDefault();
  $("#results").html("Loading...");

  Handlebars.registerHelper("formatNumber", function(x) {
    return x.toLocaleString();
  });

  let resultsTemplateString = document.getElementById("results-template")
    .innerHTML;
  let renderResults = Handlebars.compile(resultsTemplateString);

  let subreddit = $("#subreddit").val();
  let url = "https://www.reddit.com/r/" + subreddit + ".json";

  $.getJSON(url).then(
    function(response) {
      console.log(response);
      let renderedResults = renderResults({
        result: response.data.children
      });
      //append tacks on, html replaces
      $("#results").html(renderedResults);
    },
    function() {
      console.error("an error occured");
      $("#results").html("Oops! Looks like this Subreddit doesn't exist!");
    }
  );
});
