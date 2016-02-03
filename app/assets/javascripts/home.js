// $(document).ready(function(){
//   fetchIdeas()
// })
//
// function renderIdea(idea){
//   $('#idea-column').append(
//     "<div class='card' data-id='"
//       + idea.id
//       + "'><div class='content'><div class='header'>"
//       + idea.title
//       + "</div><div class='meta'>"
//       + idea.quality
//       + "</div><div class='description'>"
//       + idea.body
//       + "</div></div><div class='extra content'>"
//       + "<div class='ui two buttons'>"
//       + "<div class='ui basic green button'><i class='thumbs outline up icon'></i></div>"
//       + "<div class='ui basic red button'><i class='thumbs outline down icon'></div>"
//       + "</div></div></div>"
//   )
// }
//
// function fetchIdeas() {
//   // var newestItemID = parseInt($(".post").last().attr("data-id"))
//   var newIdeaId = parseInt($('.card').first().attr('data-id'))
//
//   $.ajax({
//     type: 'GET',
//     url:  'http://localhost:3000/api/v1/ideas.json',
//     success: function(ideas) {
//       console.log(ideas)
//       $.each(ideas, function(index, idea){
//         if (isNaN(newIdeaId) || idea.id > newIdeaId) {
//           renderIdea(idea);
//         }
//       })
//     },
//     error: function(xhr){
//       console.log(xhr.responseText);
//     }
//   })
// }
