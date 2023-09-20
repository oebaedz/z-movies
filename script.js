function cariMovie() {
  $("#movie-list").html("");

  $.ajax({
    url: "https://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "568c5992",
      s: $("#search-input").val(),
    },
    success: function (result) {
      if (result.Response == "True") {
        let movies = result.Search;

        $.each(movies, function (i, data) {
          $("#movie-list").append(
            `
            <div class='col-md-3 '>
            <div class="card mb-3" >
            <img src="` +
              data.Poster +
              `" class="card-img-top">
            <div class="card-body">
            <h5 class="card-title">` +
              data.Title +
              `</h5>
            <p class="card-text">` +
              data.Year +
              `</p>
            <a href="#" class="btn btn-dark see-detail" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal"
            data-id=` +
              data.imdbID +
              `>See Details</a>
                </div>
                </div>
            </div>
            `
          );
        });
      } else {
        $("#movie-list").html(
          `
        <div class='col'>
            <h2 class='text-center'>` +
            result.Error +
            `</h2>
        </div>
        `
        );
      }
    },
  });
}

$("#search-button").on("click", function () {
  cariMovie();
});

$("#search-input").on("keyup", function (e) {
  if (e.keyCode == 13) {
    cariMovie();
  }
});

$("#movie-list").on("click", ".see-detail", function () {
  $.ajax({
    url: "http://www.omdbapi.com",
    type: "get",
    dataType: "json",
    data: {
      apikey: "568c5992",
      i: $(this).data("id"),
    },
    success: function (movie) {
      if (movie.Response === "True") {
        $(".modal-body").html(
          `
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-4">
                            <img src='` +
            movie.Poster +
            `' class='img-fluid'>
                        </div>
                        <div class="col-md-8">
                        <ul class="list-group">
                            <li class="list-group-item"><h3>` +
            movie.Title +
            `</h3></li>
                            <li class="list-group-item">Released : ` +
            movie.Released +
            `</li>
                            <li class="list-group-item">Genre : ` +
            movie.Genre +
            `</li>
                            <li class="list-group-item">Actor : ` +
            movie.Actor +
            `</li>
                            <li class="list-group-item">Plot : ` +
            movie.Plot +
            `</li>
                        </ul>
                        </div>
                    </div>
                </div>
                `
        );
      }
    },
  });
});
