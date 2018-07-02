<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model common\models\Jogada */

$this->title = 'Update Jogada: ' . $model->id;
$this->params['breadcrumbs'][] = ['label' => 'Jogadas', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->id, 'url' => ['view', 'id' => $model->id]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="jogada-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
