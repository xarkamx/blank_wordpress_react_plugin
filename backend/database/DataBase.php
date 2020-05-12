<?php 
class DbResource{
    private $sql = "";
    private $table="";
    private $columns = [];
    function __construct($wpdb){
        $this->db = $wpdb;
    }
    function create(string $tableName){
         $charset_collate = $this->wpdb->get_charset_collate();

        $this->sql = "CREATE TABLE $tableName (
            id mediumint(9) NOT NULL AUTO_INCREMENT,
            time datetime DEFAULT '0000-00-00 00:00:00' NOT NULL,
            name tinytext NOT NULL,
            text text NOT NULL,
            url varchar(55) DEFAULT '' NOT NULL,
            PRIMARY KEY  (id)
            ) $charset_collate;";
        return $this;
        
    }
    function getColumns($columns) {
        return implode($columns);
    }
    function autoincrement(string $name){
        $this->columns[]="$name mediumint(9) NOT NULL AUTO_INCREMENT";
    }
    function timeStamp(){
        $this->columns[]= "createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP";
        $this->columns[]= "updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP";
    }
    function text(string $name,string $default){
        $this->columns[]="$name text $default";
    }
    function integer(string $name,string $default="NULL"){
        $this->columns[]="$name mediumint(9) $default";
    }

}