<?php

/**
 * Crea tabla de configuracion bancaria.
 *
 * @param string $tableName
 * @return void
 */
function createConfigTable(string $tableName)
{
    global $wpdb;
    $tableName = $wpdb->prefix . $tableName;
    $charset_collate = $wpdb->get_charset_collate();
    $sql = "CREATE TABLE $tableName (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            keyName TEXT null,
            content TEXT null,
            PRIMARY KEY  (id)
            ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
/**
 * Crea una tabla con sus columnas de manera dinamica.
 *
 * @param string $tableName
 * @param array $columns
 * @return void
 */
function createTable(string $tableName, array $columns)
{
    global $wpdb;
    $tableName = $wpdb->prefix . $tableName;
    $charset_collate = $wpdb->get_charset_collate();
    $stringColumns = implode(",", $columns);
    $sql = "CREATE TABLE $tableName (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            $stringColumns,
            timestamp timestamp default now(),
            PRIMARY KEY  (id)
            ) $charset_collate;";
    require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
    dbDelta($sql);
}
//register_activation_hook(__FILE__, 'createConfigTable');
