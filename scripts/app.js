const Project = function(opts) {
    this.title = opts.title;
    this.creation = opts.creation;
    this.image = opts.image;
    this.alt = opts.alt;
    this.description = opts.description;
    this.href = opts.href;
};

Project.prototype.toHtml = function() {
    let $newArticle = $('article.template').clone();

    $newArticle.find('time[pubdate]').attr('title', this.creation);
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.creation))/60/60/24/1000) + ' days ago');
    $newArticle.find('a').attr('href', this.href).html(this.title);
    $newArticle.find('.article-body').html(this.description);
    $newArticle.find('img').attr('src', this.image).attr('alt', this.alt);

    $newArticle.removeAttr('class');
    return $newArticle;
};

projectsArray.sort((curElem, nextElem) => new Date(nextElem.creation) - new Date(curElem.creation))
  .map(project => new Project(project)).forEach(a => $('#projectHome')
  .append(a.toHtml()));
