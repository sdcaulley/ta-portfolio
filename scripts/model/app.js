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
  $.ajax('/scripts/model/data.json').done(function (response){
    Project.loadAll(response);
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
