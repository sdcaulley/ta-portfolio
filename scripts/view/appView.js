var projectView = {};

projectView.tabView = function() {
    $('.main-nav').on('click', '.tab', function() {
    $('.tab-content').hide();
        var content = $(this).attr('data-content');
    $('#' + content).fadeIn(1500);
    });
    $('.main-nav .tab:first').click();
};

projectView.init = function() {
  projectView.tabView();
};

projectView.init();
