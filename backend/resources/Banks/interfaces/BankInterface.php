<?php 
interface BankInterface {
    public function setParams();
    public function setPayment();
    public function getPaymentStatus(string $token);
}