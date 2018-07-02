<?php

/* @var $this yii\web\View */

use yii\helpers\Html;

$this->title = 'About';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="site-about">
    <h1><?= Html::encode($this->title) ?></h1>

    <p>Este é o website do jogo Skifree implementado por Mikael Souza como atividade de Programação Web.</p>

    <p>Data: <?= $date ?></p>

</div>
