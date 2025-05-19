<?php
/*
Plugin Name: Simple Cost Calculator Fixed
Description: Исправленный калькулятор стоимости для WordPress
Version: 1.1
Author: Ваше имя
*/

if (!defined('ABSPATH'))
    exit;

class SimpleCostCalculator
{
    public function __construct()
    {
        add_action('wp_enqueue_scripts', [$this, 'enqueue_assets']);
        add_shortcode('cost_calculator', [$this, 'display_calculator']);
        add_action('wp_ajax_calculate_cost', [$this, 'calculate_cost']);
        add_action('wp_ajax_nopriv_calculate_cost', [$this, 'calculate_cost']);
    }

    public function enqueue_assets()
    {
        wp_enqueue_style('scc-style', plugins_url('css/style.css', __FILE__));
        wp_enqueue_script('scc-script', plugins_url('js/script.js', __FILE__), ['jquery'], '1.1', true);

        wp_localize_script('scc-script', 'scc_data', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('scc_nonce')
        ]);
    }

    public function display_calculator()
    {
        ob_start(); ?>
        <div class="scc-calculator">
            <h3>Калькулятор</h3>
            <p>Рссчитайте стоимость вашего полотна с уствновкой</p>
            <div class="scc-body">
                <!-- Основные поля -->
                <div class="scc-field-wrapper">
                    <div class="scc-field">
                        <label for="scc-quantity">Площадь (м2):</label>
                        <input type="number" id="scc-quantity" min="1" step="0.25" value="1" class="scc-input">
                    </div>

                    <div class="scc-field field-price">
                        <label for="scc-price">Цена:</label>
                        <input type="number" id="scc-price" min="0" step="0.01" value="100" class="scc-input">
                    </div>

                    <div class="scc-field">
                        <label for="scc-price-metr">Доп. углы:</label>
                        <input type="number" id="scc-price-metr" min="0" step="1" value="0" class="scc-input">
                    </div>

                    <div class="scc-field">
                        <label>Вариант обработки:</label>
                        <div class="scc-radio-group">
                            <label class="scc-radio">
                                <input type="radio" name="scc-processing" value="1.0" checked>
                                <span class="radio-checkmark"></span>
                                Люстра
                            </label>
                            <label class="scc-radio">
                                <input type="radio" name="scc-processing" value="1.15">
                                <span class="radio-checkmark"></span>
                                Светильники
                            </label>
                        </div>
                    </div>

                    <!-- Новые поля -->
                    <div class="scc-field">
                        <label for="scc-delivery">Полотно:</label>
                        <select id="scc-delivery" class="scc-input">
                            <option value="0">Выберите</option>
                            <option value="300">Матовое</option>
                            <option value="500">Глянцевое</option>
                            <option value="600">Сатиновое</option>
                        </select>
                    </div>

                    <div class="scc-field">
                        <label for="scc-material">Материал:</label>
                        <select id="scc-material" class="scc-input">
                            <option value="1.0">Стандарт (без наценки)</option>
                            <option value="1.2">Премиум (+20%)</option>
                            <option value="1.5">Люкс (+50%)</option>
                        </select>
                    </div>

                    <div class="scc-field">
                        <label for="scc-discount">Скидка (%):</label>
                        <input type="number" id="scc-discount" min="0" max="100" value="0" class="scc-input">
                    </div>

                    <button id="scc-calculate" class="scc-button">Рассчитать</button>
                </div>
                <div class="scc-result">
                    <h4>Итоговая стоимость:</h4>
                    <div id="scc-total">0.00</div>
                </div>
            </div>
        </div>
        <?php
        return ob_get_clean();
    }

    public function calculate_cost()
    {
        check_ajax_referer('scc_nonce', 'security');

        $data = [
            'quantity' => isset($_POST['quantity']) ? (int) $_POST['quantity'] : 0,
            'price' => isset($_POST['price']) ? (float) $_POST['price'] : 0,
            'price2' => isset($_POST['price2']) ? (float) $_POST['price2'] : 0,
            'delivery' => isset($_POST['delivery']) ? (float) $_POST['delivery'] : 0,
            'material' => isset($_POST['material']) ? (float) $_POST['material'] : 1.0,
            'processing' => isset($_POST['processing']) ? (float) $_POST['processing'] : 1.0,
            'discount' => isset($_POST['discount']) ? (float) $_POST['discount'] : 0
        ];

        // Валидация
        if ($data['quantity'] <= 0 || $data['price'] < 0 || $data['discount'] < 0 || $data['discount'] > 100) {
            wp_send_json_error('Некорректные данные');
        }

        // Расчет
        $subtotal = $data['quantity'] * $data['price'] * $data['price2'] * $data['material'] * $data['processing'];
        $discount_value = $subtotal * ($data['discount'] / 100);
        $total = $subtotal - $discount_value + $data['delivery'];

        wp_send_json_success([
            'total' => number_format($total, 2, '.', ''),
            'subtotal' => number_format($subtotal, 2),
            'discount_value' => number_format($discount_value, 2),
            'delivery' => number_format($data['delivery'], 2),
            'processing_rate' => (($data['processing'] - 1) * 100) // Процент наценки
        ]);
    }
}

new SimpleCostCalculator();