const Project = opts => {
    this.title = opts.title;
    this.category = opts.category;
    this.creation = opts.creation;
    this.image = opts.image;
    this.alt = opts.alt;
    this.description = opts.description;
    this.href = opts.href;
};

Project.prototype.toHtml = () => {
    let $newArticle = $('article.template').clone();
    $newArticle.attr('data-category', this.category);
    $newArticle.find('time[pubdate]').attr('title', this.creation);
    $newArticle.find('time').html('about ' + parseInt((new Date() - new Date(this.creation))/60/60/24/1000) + ' days ago');
    $newArticle.find('h1 a').attr('href', this.href).html(this.title);
    $newArticle.find('.article-body').html(this.description);
    $newArticle.find('img').attr('src', this.image).attr('alt', this.alt);

    $newArticle.removeAttr('class');
    return $newArticle;
};

projectsArray.sort((curElem, nextElem) => new Date(nextElem.creation) - new Date(curElem.creation))
  .map(project => new Project(project)).forEach(a => $('#projectHome')
  .append(a.toHtml()));
