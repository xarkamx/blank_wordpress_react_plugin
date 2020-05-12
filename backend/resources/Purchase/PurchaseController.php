<?php
class PurchaseController
{
    public function index($request)
    {
        $model = new Purchase();
        return $model->search($request['search'])->paginate(8);
    }
    public function create($request)
    {
        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $request = $request->get_params();
        $bank = $this->pay($request);
        $request['token'] = $bank[0]['token'];
        if (!isset($bank[0]["error"])) {
            $this->saveCustomer($request);
        }
        return $bank;
    }
    public function store($request)
    {
        $request = $request->get_params();
        $id = $request['id'];
        $this->setChargeStatus($id);
    }
    /**
     * Actualiza el estado de la compra segun el banco.
     *
     * @param string $id
     * @return void
     */
    public function setChargeStatus($id)
    {

        error_reporting(E_ERROR | E_WARNING | E_PARSE);
        $bank = $this->getBank();
        $bankData = $bank->getPaymentStatus($id);
        $model = new Purchase();
        $model->where(['token' => $id])
            ->status($bankData->status)
            ->update();
        $model = new Purchase();
    }
    /**
     * Permite actualizar la informacion de compra.
     *
     * @param [type] $request
     * @return void
     */
    public function update($request)
    {
        $model = new Purchase();
        $request = $request->get_params();
        return $model->find($request['id'])
            ->completed($request['completed'])
            ->update()
            ->toArray();
    }
    public function test(){
        $bank = $this->getBank();
        $bank->test();
    }
    private function pay($data)
    {
        $total = round($data['total'], 2);
        $bank = $this->getBank();
        $desc = $this->setDescription($data['item']);
        $config = (new Config())->latest();
        return [$bank->name($data['name'])
            ->last_name($data['lastName'])
            ->email($data['email'])
            ->phone_number($data['tel'])
            ->affiliation_bbva($config[0]->afiliationID)
            ->amount("$total")
            ->description($data['QTY'] . $desc)
            ->currency("MXN")
            ->order_id(uniqid())
            ->redirect_url($config[0]->url)
            ->pay()];
    }
    private function saveCustomer($request)
    {
        $model = new Purchase();
        $fullName = $request['name'] . " " . $request['lastName'];
        $total = round($request['total'], 2);
        $model->QTY($request['QTY'])
            ->item($this->setDescription($request['item']))
            ->fullName($fullName)
            ->total("$total")
            ->address($request['address'])
            ->email($request['email'])
            ->tel($request['tel'])
            ->token($request['token'])
            ->save();
    }
    private function getBank()
    {
        $config = (new Config())->latest();
        $bank = new BbvaController($config[0]->bankID, $config[0]->apiKey);
        return $bank;
    }
    /**
     * Formatea la descripcion
     *
     * @param String $item
     * @return void
     */
    private function setDescription(string $item)
    {
        return ($item == "gas") ? " Litros de Gas" : "Unidades de $item";
    }
}
