<?php

class Gas extends Model
{
    protected $table = "gas";
    public $columns = ["price","minPurchase","type"];
    protected $data = [];
}
