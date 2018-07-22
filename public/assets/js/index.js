// Make sure we wait to attach our handlers until the DOM is fully loaded.
$(function() {
 

 


  $("#scrape").on("click", function(event) {
    event.preventDefault();

    $.ajax("/", { type: "POST",  }).then( function() {
     // Reload the page to get the updated list
      location.reload();
    // window.location.href = "/";
    //window.location.reload(true);
    $('#alertModal').modal('show');
   
      });

  //     $.ajax({
  //       url: '/',
  //       type: 'GET',
  //       success: function (response) {
  //         $('#numArticles').text(response.count);
  //       },
  //       error: function (error) {
  //         showErrorModal(error);
  //       },
  //       complete: function (result){
          
  //         $('#alertModal').modal('show');
  //       }
  //     });

  // });
//     var id = $(this).data("id");
//     var newSleep = $(this).data("newsleep");

//     var newSleepState = {
//       sleepy: newSleep
//     };

//     // Send the PUT request.
//     $.ajax("/api/cats/" + id, {
//       type: "PUT",
//       data: newSleepState
//     }).then(
//       function() {
//         console.log("changed sleep to", newSleep);
//         // Reload the page to get the updated list
//         location.reload();
//       }
//     );
//   });

//   $(".create-form").on("submit", function(event) {
//     // Make sure to preventDefault on a submit event.
//     event.preventDefault();

//     var newCat = {
//       name: $("#ca").val().trim(),
//       sleepy: $("[name=sleepy]:checked").val().trim()
//     };

//     // Send the POST request.
    
//   });

//   $(".delete-cat").on("click", function(event) {
//     var id = $(this).data("id");

//     // Send the DELETE request.
//     $.ajax("/api/cats/" + id, {
//       type: "DELETE"
//     }).then(
//       function() {
//         console.log("deleted cat", id);
//         // Reload the page to get the updated list
//         location.reload();
//       }
//     );
   });
 });
