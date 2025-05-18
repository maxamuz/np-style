jQuery(document).ready(function ($) {
  $("#scc-calculate").on("click", function (e) {
    e.preventDefault();

    var data = {
      action: "calculate_cost",
      quantity: $("#scc-quantity").val(),
      price: $("#scc-price").val(),
      price2: $("#scc-price-metr").val(),
      delivery: $("#scc-delivery").val(),
      material: $("#scc-material").val(),
      processing: $('input[name="scc-processing"]:checked').val(), // Получаем выбранный radio
      discount: $("#scc-discount").val(),
      security: scc_data.nonce,
    };

    $.ajax({
      url: scc_data.ajax_url,
      type: "POST",
      data: data,
      dataType: "json",
      beforeSend: function () {
        $("#scc-total").html('<span class="loading">Расчет...</span>');
      },
      success: function (response) {
        if (response.success) {
          var result = `
                        <div>Стоимость товаров: ${response.data.subtotal} руб.</div>
                        <div>Наценка за обработку: +${response.data.processing_rate}%</div>
                        <div>Скидка: -${response.data.discount_value} руб.</div>
                        <div>Доставка: +${response.data.delivery} руб.</div>
                        <div class="total-sum">Итого: ${response.data.total} руб.</div>
                    `;
          $("#scc-total").html(result);
        } else {
          $("#scc-total").html(
            '<span class="error">Ошибка: ' + response.data + "</span>"
          );
        }
      },
      error: function (xhr) {
        $("#scc-total").html('<span class="error">Ошибка сервера</span>');
        console.error("AJAX Error:", xhr.responseText);
      },
    });
  });
});
