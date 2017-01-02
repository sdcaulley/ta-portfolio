var projectView = {};

projectView.populateFilters = function() {
    $('article').not('.template').each(function() {
        var category = $(this).attr('data-category');
        var optionTag = '<option value="' + category + '">' + category + '</option>';
        if ($('#category-filter option[value="' + category + '"]').length === 0) {
            $('#category-filter').append(optionTag);
        }
    });
};

projectView.handleCategoryFilter = function() {
    $('#category-filter').on('change', function() {
        if ($(this).val()) {
            $('article').hide();
            $('article').not('.template').each(function() {
                var category = $(this).attr('data-category');
                var selector = $('#category-filter').val();
                if (category === selector) {
                    $(this).fadeIn(1500);
                }
            });
        } else {$('data-category').text();
            $('article').not('.template').fadeIn(1500);
        }
        $('#author-filter').val('');
    });
};

projectView.tabView = function() {
    $('.main-nav').on('click', '.tab', function() {
        $('.tab-content').hide();
        var content = $(this).attr('data-content');
        $('#' + content).fadeIn(1500);
    });
    $('.main-nav .tab:first').click();
};

projectView.setTeasers = function() {
    $('.article-body *:nth-of-type(n+2)').hide();
    $('.read-on').on('click', function(e) {
        e.preventDefault();
        if($(this).text() === 'Read on') {
            $(this).parent().find('*').fadeIn();
            $(this).html('Show Less');
        } else {
            $(this).html('Read on');
            $(this).parent().find('.article-body *:nth-of-type(n+2)').hide();
        }
    });
};

projectView.init = function() {
  Project.all.forEach(function(a) {
    $('#projectHome').append(a.toHtml());
  });
    projectView.tabView();
    projectView.setTeasers();
    projectView.populateFilters();
    projectView.handleCategoryFilter();
};

Project.fetchAll();
