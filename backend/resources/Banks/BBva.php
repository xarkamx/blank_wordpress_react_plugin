<?php
require_once(__DIR__ . "/interfaces/BankInterface.php");
class BbvaController implements BankInterface
{
    public $customer = ["name", "last_name", "email", "phone_number", "address"];
    public $product = [
        'affiliation_bbva',
        'amount',
        'description',
        'currency',
        'order_id',
        'redirect_url',
        'use_3d_secure',
    ];
    public $paymentPlan = [ "payments",
   "payments_type",
   "deferred_months"];

    protected $data = ["customer" => [], "product" => [],"payments"=>[]];
    /**
     * instancea valores de acceso.
     * @param $id
     * @param $apiKey 
     */
    public function __construct(String $id, String $apiKey)
    {
        $this->bbva = Bbva::getInstance($id, $apiKey);
        //var_dump($this->bbva->tokens->add(PARAMETERS));
        //af 846600
        // ipebancomer01@eglobal.com.mx ipebancomer02 ipebancomer04 tel:55125353 20 ! 48

        //$this->setPayment();

    }
    public function __call($name, $arguments)
    {
        if (in_array($name, $this->customer)) {
            $this->data['customer'][$name] = $arguments[0];
            return $this;
        }
        if (in_array($name, $this->paymentPlan)) {
            $this->data['payments'][$name] = $arguments[0];
            return $this;
        }
        if (in_array($name, $this->product)) {
            $this->data['product'][$name] = $arguments[0];
            return $this;
        }
    }
    public function toArray()
    {
        return $this->data;
    }
    /**
     * Setea los parametros para el uso de la interfaz bancaria.
     *
     * @param [type] $id
     * @param [type] $apiKey
     * @return void
     */
    public function setParams()
    { }
    public function setPayment()
    {
        $chargeData =  $this->data['product'];
        if(count($this->data['customer'])>0){
            $chargeData['customer'] = $this->data['customer'];
        }
        if(count($this->data['payments'])>0){
            $chargeData['payment_plan'] = $this->data['payments'];
        }
        return $chargeData;
    }
    /**
     * Obtiene informacion del pago realizado.
     *
     * @param string $token
     * @return array
     */
    public function getPaymentStatus(string $token)
    {
        return $this->bbva->charges->get($token);
    }

    public function pay()
    {
        $charge = $this->setPayment();
        try {

            $pay = $this->bbva->charges->create($charge);
            return ["token" => $pay->id, "url" => $pay->payment_method->url];
        } catch (BbvaApiAuthError $e) {
            return ["error" => "No se ha podivo validar el token revisa la llave secreta el el id de bbva"];
        }
        //BbvaApiAuthError
    }
    public function refound($token,$amount,$desc=""){
        $charge = $this->bbva->charges->get($token);
        try{

        }catch (BbvaApiRequestError $e){

            $charge->refund(["amount"=>$amount,"description"=>$desc]);
        }
    }

    public function test()
    {
        /*
        <b>Notice</b>:  Undefined property: stdClass::$resourceName in <b>/home/alberto/Documentos/projects/wordpress/wp-content/plugins/bbvaIntegration/vendors/BBVA/data/BbvaApiResourceBase.php</b> on line <b>161</b><br />
<br />

        */
        $bbva = Bbva::getInstance('m3uurgmkfhsxytvexmkf', 'sk_e98b853feb534772b2aad22ab26016f5');
        $chargeRequest = array('method' => 'card',
    'affiliation_bbva' => '846600',
    'amount' => 100,
    'description' => 'Cargo bbb a mi merchant'.date("y-m h-i-s"),
    'currency' => 'MXN',
    'order_id' => date("y-m h-i-s"),
    'redirect_url' => 'http://localhost:8000',
    'use_3d_secure'=>true,
    'card' => array(
        "holder_name" => "Juan Vazquez",
        "card_number" => "4111 1111 1111 1111",
        "expiration_month" => "12",
        "expiration_year" => "21",
        "cvv2" => "842"),
    'customer' => array(
        'name' => 'Juan',
        'last_name' => 'Vazquez Juarez',
        'email' => 'juan.vazquez@empresa.com.mx',
        'phone_number' => '554-170-3567')
);


        $charge = $bbva->charges->create($chargeRequest);
        dd($charge);
    }
}
