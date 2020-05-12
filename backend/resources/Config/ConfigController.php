<?php
class ConfigController
{
    public function __constructor()
    {
        $this->request =  $_POST;
    }
    public function create($request)
    {
        $model = new Config();

        $request = $request->get_params();
        foreach ($model->columns as $columnName) {
            $model->$columnName($request[$columnName]);
        }
        $model->save();
        return $model->latest();
    }
    public function index()
    {
        $model = new Config();
        return $model->where(['keyName' => $_GET['keyname']])->latest();
    }
}
