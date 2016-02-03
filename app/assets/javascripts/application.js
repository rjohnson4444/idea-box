// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require semantic_ui/semantic_ui
//= require_tree .

$(document).ready(function(){
  fetchIdeas()
})

function renderIdea(idea){
  $('#idea-column').append(
    "<div class='ui centered card' data-id='"
      + idea.id
      + "'><div class='content'><div class='header'>"
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
    url:  'http://localhost:3000/api/v1/ideas.json',
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
    
  })
}
