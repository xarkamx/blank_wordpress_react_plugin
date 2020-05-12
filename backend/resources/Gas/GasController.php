<?php
class GasController
{
    public function create($request)
    {

        $model = new Gas();
        $request = $request->get_params();
        $model->price($request['price']);
        $model->minPurchase($request['minPurchase'] ?? -1);
        $model->type($request['type'] ?? "gas");
        $model->save();

        return $model->latest();
    }
    public function index($request){
        $request = $request->get_params();
        $model =new Gas();
        $type = $request['type'] ?? "gas";
        return $model->where(["type"=>$type])->latest();
    }
}
