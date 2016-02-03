$(document).ready(function(){
  fetchIdeas();
  createIdea();
  deleteIdea();
  editIdea();
})

function renderIdea(idea){
  $('#idea-column').append(
    "<div class='ui centered card idea' data-id='"
      + idea.id
      + "'><div class='content'><button class='ui right floated mini black button' id='delete-idea'>Delete</button>"
      + "<button class='ui right floated mini black button' id='edit-idea'>Edit</button>"
      + "<div class='header'>"
      + idea.title
      + "</div><div class='meta'>"
      + idea.quality
      + "</div><div class='description'>"
      + idea.body
      + "</div></div><div class='extra content'>"
      + "<div class='ui two buttons'>"
      + "<div class='ui basic green button'><i class='thumbs outline up icon'></i></div>"
      + "<div class='ui basic red button'><i class='thumbs outline down icon'></div>"
      + "</div></div></div>"
  )
}

function fetchIdeas() {
  var newIdeaId = parseInt($('.card').first().attr('data-id'))

  $.ajax({
    type: 'GET',
    url:  '/api/v1/ideas.json',
    success: function(ideas) {
      $.each(ideas, function(index, idea){
        if (isNaN(newIdeaId) || idea.id > newIdeaId) {
          renderIdea(idea)
        }
      })
    },
    error: function(xhr){
      console.log(xhr.responseText);
    }
  })
}

function createIdea() {
  $('#create-idea').on('click', function(){
    var ideaParams = {
      idea: {
        title: $('#idea-title').val(),
        body:  $('#idea-body').val()
      }
    }

    $.ajax({
      type:    'POST',
      url:     '/api/v1/ideas.json',
      data:    ideaParams,
      success: function(newIdea) {
        renderIdea(newIdea)
        $('#idea-title').val()
        $('#idea-body').val()
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

function deleteIdea() {
  $('#idea-column').delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest('.idea')
    console.log($idea)
    $.ajax({
      type:    'DELETE',
      url:     '/api/v1/ideas/' + $idea.attr('data-id') + '.json',
      success: function() {
        $idea.remove()
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

function editIdea() {
  $('#idea-column').delegate('#edit-idea', 'click', function() {
    var $idea = $(this).closest('.idea')

  })
}
