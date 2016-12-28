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
    this.daysAgo = parseInt((new Date() - new Date(this.creation))/60/60/24/1000);
    this.publishedOn = 'about ' + this.daysAgo + 'days ago';
    var source = $('#template').html();
    var template = Handlebars.compile(source);
    var html = template(this);
    return html;
};

projectsArray.sort(function(curElem, nextElem) {
    return (new Date(nextElem.creation)) - (new Date(curElem.creation));
});

projectsArray.forEach(function(ele) {
    project.push(new Project(ele));
});

project.forEach(function(a) {
  $('#projectHome').append(a.toHtml());
});
