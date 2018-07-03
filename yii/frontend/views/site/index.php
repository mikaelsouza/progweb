<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'Site do Mikas :)';
?>
<div class="site-index">

    <div class="jumbotron">

        <h1>Parabéns!</h1>
        <?= Html::img('@web/imgs/skifree.jpg',['width'=>'400']) ?>
        <p class="lead">Você está prestes a jogar uma cópia barata de Skifree!</p>

        <p><a class="btn btn-lg btn-success" href="index.php?r=jogo">Jogar!</a></p>
    </div>
</div>
