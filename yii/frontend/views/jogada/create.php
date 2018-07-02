<?php

use yii\helpers\Html;


/* @var $this yii\web\View */
/* @var $model common\models\Jogada */

$this->title = 'Create Jogada';
$this->params['breadcrumbs'][] = ['label' => 'Jogadas', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="jogada-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
