jQuery(document).ready(function ($) {
  $(".custom-menu a").on("click", function (e) {
    e.preventDefault();

    // Добавляем класс active к текущей ссылке
    $(".custom-menu a").removeClass("active");
    $(this).addClass("active");

    var linkUrl = $(this).attr("href");
    var pageId = extractPageId(linkUrl);

    if (pageId) {
      loadPageContent(pageId);
    } else {
      // Если не удалось извлечь ID из URL, делаем AJAX запрос
      $.ajax({
        url: ajax_object.ajax_url,
        type: "POST",
        data: {
          action: "get_page_id_by_url",
          page_url: linkUrl,
        },
        success: function (response) {
          if (response.success && response.data.page_id) {
            loadPageContent(response.data.page_id);
          }
        },
      });
    }
  });

  // Функция для извлечения ID страницы из URL
  function extractPageId(url) {
    var idMatch = url.match(/[?&](p|page_id)=(\d+)/);
    if (idMatch && idMatch[2]) {
      return idMatch[2];
    }

    var path = url.replace(/^https?:\/\/[^\/]+/, "");
    if (path) {
      var cachedId = sessionStorage.getItem("page_id_cache_" + path);
      if (cachedId) return cachedId;
    }

    return null;
  }

  // Функция загрузки контента (без индикатора загрузки)
  function loadPageContent(pageId) {
    $.ajax({
      url: ajax_object.ajax_url,
      type: "POST",
      data: {
        action: "load_menu_content",
        page_id: pageId,
      },
      success: function (response) {
        $("#menu-content-container").html(response);
        var currentUrl = $(".custom-menu a.active").attr("href");
        if (currentUrl) {
          var path = currentUrl.replace(/^https?:\/\/[^\/]+/, "");
          sessionStorage.setItem("page_id_cache_" + path, pageId);
        }
      },
    });
  }

  // Загружаем контент первой страницы при загрузке
  var firstLink = $(".custom-menu a").first();
  if (firstLink.length) {
    firstLink.trigger("click");
  }
});
