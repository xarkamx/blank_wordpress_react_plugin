<?php 

class Bank{
    /**
     * Instansea la filial bancaria que sera utilizada.
     * @param $filial;
     */
    public function __constructor(BankInterface $filial){
        $this->filial = $filial;
    }
    
    public function setValues(array $values) {

    }
}