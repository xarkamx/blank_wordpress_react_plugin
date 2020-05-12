<?php
add_action('rest_api_init', function () {

  $pluginPath = "cr/v1";
  register_rest_route($pluginPath, '/config', array(
    'methods' => 'GET',
    'callback' => [new ConfigController(), "index"],
  ));
  register_rest_route($pluginPath, '/config', array(
    'methods' => 'POST',
    'callback' => [new ConfigController(), "create"],
  ));
  /*
  register_rest_route($pluginPath, '/purchase', array(
    'methods' => 'POST',
    'callback' => [new PurchaseController(), "create"],
  ));
  register_rest_route($pluginPath, '/purchase/store', array(
    'methods' => 'GET',
    'callback' => [new PurchaseController(), "store"],
  ));
  register_rest_route($pluginPath, '/purchase/(?P<id>\d+)', array(
    'methods' => 'PUT',
    'callback' => [new PurchaseController(), "update"],
    'args' => array(
      'id' => array(
        'validate_callback' => function ($param, $request, $key) {
          return is_numeric($param);
        }
      )
    )
  ));
  register_rest_route($pluginPath, '/purchase', array(
    'methods' => 'GET',
    'callback' => [new PurchaseController(), "index"],
  ));
  register_rest_route($pluginPath, '/test', array(
    'methods' => 'GET',
    'callback' => [new PurchaseController(), "test"],
  ));*/
});
