$(document).ready(function(){
  fetchIdeas();
  createIdea();
  deleteIdea();
  ['title', 'body'].forEach(editEvents)
  searchIdeas();
  increaseQuality();
  decreaseQuality();
})

function renderIdea(idea){
  $('#idea-column').append(
    "<div class='ui centered card idea' data-id='"
      + idea.id
      + "'><div class='content'><button class='ui right floated mini black button' id='delete-idea'>Delete</button>"
      + "<div contenteditable='true' class='header edit-idea-title'>"
      + idea.title
      + "</div><div class='meta quality' quality="
      + idea.quality
      + ">"
      + idea.quality
      + "</div><div contenteditable='true' class='description edit-idea-body'>"
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

// Create Idea

function createIdea() {
  $('#create-idea').on('click', function(){
    var ideaParams = {
      idea: {
        title: $('#idea-title').val(),
        body:  truncate($('#idea-body').val())
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

function truncate (string){
  debugger
  if (string.length > 100){
    return $.trim(string).substring(0, 100).split(" ").slice(0, -1).join(" ") + "...";
  } else {
    return string;
  }
}

// Delete Idea

function deleteIdea() {
  $('#idea-column').delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest('.idea')

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

//Inline Editing

function editEvents(key) {
  $('body').delegate('.edit-idea-' + key, 'keydown', function(event) {
    var enterKey = event.which == 13

    var data = { idea: {} }
    data.idea[key] = this.textContent

    if (enterKey) {
      var idea = this.closest('.idea')
      var ideaId = $(idea).attr('data-id')

      event.preventDefault();
      this.blur();

      $.ajax({
        type: 'PUT',
        url:  '/api/v1/ideas/' + ideaId,
        data: data,
        success: function(){},
        error: function(xhr){
          console.log(xhr.responseText)
        }
      })
    }
  })
}

//Search

function searchIdeas(){
  $('#search-ideas').keyup(function(event){
    var search = $(this).val().toLowerCase();
    var ideas = $('#idea-column').children();
    ideas.show();

    var hide = ideas.filter(function(){
      var all = $(this).children().text().toLowerCase();
      return !(all.includes(search));
    })

    hide.hide();
  })
}

// Quality
var qualityWords = ['Swill', 'Plausible', 'Genius']

var qualityIndexToWords = {
  0: "Swill",
  1: "Plausible",
  2: "Genius"
}

function increaseQuality(){
  $('body').delegate('.green.button', 'click', function(){
    var $idea    = $(this).closest('.idea')
    var ideaId   = $idea.attr('data-id')
    var currentQualityName = $idea.find('.quality').text()
    debugger
    var data = { idea: { quality: incrementQualtiyUp(qualityWords, currentQualityName) } }
    var updatedQualityIndex = data.idea.quality

    $.ajax({
      type: 'PATCH',
      url:  '/api/v1/ideas/' + ideaId,
      data: data,
      success: function(){
        updatedQuality($idea, updatedQualityIndex)
      },
      error: function(xhr){
        console.log(xhr.responseText)
      }
    })
  })
}

function decreaseQuality(){
  $('body').delegate('.red.button', 'click', function(){
    var $idea    = $(this).closest('.idea')
    var ideaId   = $idea.attr('data-id')
    var currentQualityName = $idea.find('.quality').text()
    debugger
    var data = { idea: { quality: decreaseQualtiyUp(qualityWords, currentQualityName) } }
    var updatedQualityIndex = data.idea.quality

    $.ajax({
      type: 'PATCH',
      url:  '/api/v1/ideas/' + ideaId,
      data: data,
      success: function(){
        updatedQuality($idea, updatedQualityIndex)
      },
      error: function(xhr){
        console.log(xhr.responseText)
      }
    })
  })
}

function updatedQuality(idea, index){
  var quality = qualityIndexToWords[index]
  return $(idea).find('.quality').text(quality);
}

var incrementQualtiyUp = function(qualityWords, currentQuality){

  if (currentQuality === 'Genius') {
    alert("You cannot increase the quality anymore!")
  } else {
    var currentQualityIndex = qualityWords.indexOf(currentQuality)
    var newQualityIndex = currentQualityIndex +=1
  }
  return newQualityIndex
}

var decreaseQualtiyUp = function(qualityWords, currentQuality){

  if (currentQuality === 'Swill') {
    alert("You cannot decrease the quality anymore!")
  } else {
    var currentQualityIndex = qualityWords.indexOf(currentQuality)
    var newQualityIndex = currentQualityIndex -=1
  }
  return newQualityIndex
}
