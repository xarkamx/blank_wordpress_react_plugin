<?php
class Purchase extends Model
{
    protected $table = "purchases";
    public $columns = ["QTY", "item", "fullName", "total", "address", "email", "tel", "token", "status", "completed"];
    protected $data = [];
}
