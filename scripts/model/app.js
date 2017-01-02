var Project = function(opts) {
  for (keys in opts) {
  this[keys] = opts[keys];
  }
};

Project.all = [];

Project.prototype.toHtml = function() {
    this.daysAgo = parseInt((new Date() - new Date(this.creation))/60/60/24/1000);
    this.publishedOn = 'about ' + this.daysAgo + 'days ago';
    var source = $('#template').html();
    var template = Handlebars.compile(source);
    var html = template(this);
    return html;
};

Project.fetchAll = function() {
  if (localStorage.projectItem) {
    $.ajax({
      type: 'HEAD',
      url: '/scripts/model/data.json',
      success: function(data, message, xhr) {
        var eTag = xhr.getResponseHeader('eTag');
        if (!localStorage.eTag || eTag !== localStorage.eTag) {
          localStorage.eTag = eTag;
          Project.getAll();
          Project.loadAll(data);
          projectView.init();
        } else {
          Project.loadAll(JSON.parse(localStorage.projectItem));
          projectView.init();
        }
      }
    });
  } else {
    Project.getAll();
  }
};

Project.getAll = function() {
  $.getJSON('/scripts/model/data.json', function(responseData) {
    localStorage.projectItem = JSON.stringify(responseData);
    Project.loadAll(responseData);
    projectView.init();
  });
};

Project.loadAll = function(input) {
  input.sort(function(curElem, nextElem) {
      return (new Date(nextElem.creation)) - (new Date(curElem.creation));
    }).forEach(function(ele) {
      Project.all.push(new Project(ele));
    });
  };
