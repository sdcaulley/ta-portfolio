var project = [];

var Project = function(opts) {
    this.title = opts.title;
    this.creation = opts.creation;
    this.image = opts.image;
    this.alt = opts.alt;
    this.description = opts.description;
    this.href = opts.href;
};

Project.prototype.toHtml = function() {
    var $newArticle = $('article.template').clone();

    $newArticle.find('time[pubdate]').attr('title', this.creation);
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.creation))/60/60/24/1000) + ' days ago');
    $newArticle.find('a').attr('href', this.href).html(this.title);
    $newArticle.find('.article-body').html(this.description);
    $newArticle.find('img').attr('src', this.image).attr('alt', this.alt);

    $newArticle.removeAttr('class');
    return $newArticle;
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
