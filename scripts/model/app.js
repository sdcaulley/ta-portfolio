const project = [];

const Project = function(opts) {
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
    let source = $('#template').html();
    let template = Handlebars.compile(source);
    let html = template(this);
    return html;
};

projectsArray.sort((curElem, nextElem) => new Date(nextElem.creation) - new Date(curElem.creation))
  .map(project => new Project(project)).forEach(a => $('#projectHome')
  .append(a.toHtml()));
