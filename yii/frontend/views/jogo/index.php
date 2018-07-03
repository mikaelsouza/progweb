<?php
/* @var $this yii\web\View */
require "game.html";

$this->registerJs("
var pontuacao = 100;
$.ajax({
   type: 'GET',
   url: 'jogo%2Fsave',
   data: {
      'pontuacao': pontuacao
   },
   error: function() {
      console.log('Deu algum erro!');
   }
   success: function(data) {
      console.log(data);
   }
});
")
?>

