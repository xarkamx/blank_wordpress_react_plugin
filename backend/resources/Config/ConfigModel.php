<?php
class Config extends Model
{
    protected $data = [];
    public $columns = ["keyName", "content"];
    protected $table = "config";
}
