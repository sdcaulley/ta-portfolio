var project = [];

var Project = function(opts) {
    this.title = opts.title;
    this.category = opts.category;
    this.creation = opts.creation;
    this.image = opts.image;
    this.alt = opts.alt;
    this.description = opts.description;
    this.href = opts.href;
};

Project.prototype.toHtml = function() {
  this.daysAgo = parseInt((new Date() - new Date(this.publishedOn))/60/60/24/1000);
  this.publishStatus = this.publishedOn ? 'published ' + this.daysAgo + ' days ago' : '(draft)';

  var source = $('#template').html();
  var template = Handlebars.compile(source);
  var html = template(this);

  //html template for THIS article.
  return html;
};

projectsArray.forEach(function(ele) {
    project.push(new Project(ele));
});

project.forEach(function(a) {
  $('#projectHome').append(a.toHtml());
});
