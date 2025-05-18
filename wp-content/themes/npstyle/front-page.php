<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package npstyle
 */

get_header();
?>

<div id="carouselNpStyleCaptions" class="carousel slide">
    <div class=" carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active"
            aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"
            aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"
            aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
        <div class="carousel-item active">
            <img src="<?php echo get_template_directory_uri() . '/img/fon33.jpg' ?>" class="d-block w-100" alt="...">
            <div class="carousel-caption d-none d-md-block">
                <h3>Натяжные потолки <span class="carousel-caption-header">в Минске <br>с установкой</span></h3>
                <p class="carousel-caption-price">от <span>479 <span
                            class="carousel-caption-currency">руб/м2</span></span>
                </p>
                <div class="carousel-caption-description">
                    <p class="carousel-caption-description-text">Узнайте точную стоимость вашего проекта</p>
                    <a href="#" class="carousel-caption-description-link">Узнать стоимость</a>
                </div>

            </div>
        </div>
        <div class="carousel-item">
            <img src="<?php echo get_template_directory_uri() . '/img/potoplk1-fon.png' ?>" class="d-block w-100"
                alt="...">
            <div class="carousel-caption d-none d-md-block">
                <h3>Натяжные потолки <span class="carousel-caption-header">в Минске <br>с установкой</span></h3>
                <p class="carousel-caption-price">от <span>479 <span
                            class="carousel-caption-currency">руб/м2</span></span>
                </p>
                <div class="carousel-caption-description">
                    <p class="carousel-caption-description-text">Узнайте точную стоимость вашего проекта</p>
                    <a href="#" class="carousel-caption-description-link">Узнать стоимость</a>
                </div>

            </div>
        </div>
        <div class="carousel-item">
            <img src="<?php echo get_template_directory_uri() . '/img/slide-one.png' ?>" class="d-block w-100"
                alt="...">
            <div class="carousel-caption d-none d-md-block">
                <h3>Натяжные потолки <span class="carousel-caption-header">в Минске <br>с установкой</span></h3>
                <p class="carousel-caption-price">от <span>479 <span
                            class="carousel-caption-currency">руб/м2</span></span>
                </p>
                <div class="carousel-caption-description">
                    <p class="carousel-caption-description-text">Узнайте точную стоимость вашего проекта</p>
                    <a href="#" class="carousel-caption-description-link">Узнать стоимость</a>
                </div>

            </div>
        </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
    </button>
</div>

<div class="our-change">
    <div class="container">
        <h3 class="home-title">Почему выбирают нас</h3>
        <div class="row">
            <div class="col">
                <div class="card">
                    <img src="<?php echo get_template_directory_uri() . '/img/montaj3.png' ?>" class="card-img-top"
                        alt="...">
                    <div class="card-body">
                        <p class="card-text">Чистый и безопасный монтаж</p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="<?php echo get_template_directory_uri() . '/img/price-akcii.png' ?>" class="card-img-top"
                        alt="...">
                    <div class="card-body">
                        <p class="card-text">Акции для любой ситуации и цены без вреда для семейного бюджета</p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="<?php echo get_template_directory_uri() . '/img/montaj2.png' ?>" class="card-img-top"
                        alt="...">
                    <div class="card-body">
                        <p class="card-text">Выполняем монтаж любой сложности на высшем уровне</p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="<?php echo get_template_directory_uri() . '/img/eta-rlient.png' ?>" class="card-img-top"
                        alt="...">
                    <div class="card-body">
                        <p class="card-text">Учитываем пожелания клиента и согласовываем детали работы на каждом этапе
                        </p>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="<?php echo get_template_directory_uri() . '/img/garantia.png' ?>" class="card-img-top"
                        alt="...">
                    <div class="card-body">
                        <p class="card-text">Гарантируем качественный материал и комплектующие при доступных ценах</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="types-of-ceilings">
    <div class="container">
        <h3 class="home-title">Виды натяжных потолков</h3>

        <div class="custom-menu-container">
            <?php
            wp_nav_menu([
                'menu' => 'ceilings-menu',
                'menu_class' => 'custom-menu',
                'container' => false,
            ]);
            ?>

            <div class="menu-content-container" id="menu-content-container">
                <!-- Здесь будет подгружаться контент -->
            </div>
        </div>

    </div>
</div>
<?php echo do_shortcode('[cost_calculator]');?>
<main id="primary" class="site-main">

    <?php
    while (have_posts()):
        the_post();

        get_template_part('template-parts/content', 'page');

        // If comments are open or we have at least one comment, load up the comment template.
        if (comments_open() || get_comments_number()):
            comments_template();
        endif;

    endwhile; // End of the loop.
    ?>

</main><!-- #main -->

<?php
// get_sidebar();
get_footer();
