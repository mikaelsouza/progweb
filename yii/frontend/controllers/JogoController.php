<?php

namespace frontend\controllers;

class JogoController extends \yii\web\Controller
{
    public function actionIndex()
    {
        return $this->render('index');
    }

    public function actionRanking()
    {
        return $this->render('ranking');
    }

    public function actionSave()
    {
        return $this->render('save');
    }

}
