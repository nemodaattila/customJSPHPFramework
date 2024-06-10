<?php

namespace model;
class Company extends EntityModelParent
{
   private int $id;
   private string $name;

    private string $address;

    private string $vat_number;
    private int $category;

    private string $comment;

    public function getId(): int {
        return $this->id;
    }

    public function setId(int $id): void {
        $this->id = $id;
    }

    public function getName(): string {
        return $this->name;
    }

    public function setName(string $name): void {
        $this->name = $name;
    }

    public function getAddress(): string {
        return $this->address;
    }

    public function setAddress(string $address): void {
        $this->address = $address;
    }

    public function getVatNumber(): string {
        return $this->vat_number;
    }

    public function setVatNumber(string $vat_number): void {
        $this->vat_number = $vat_number;
    }

    public function getCategory(): int {
        return $this->category;
    }

    public function setCategory(int $category): void {
        $this->category = $category;
    }

    public function getComment(): string {
        return $this->comment;
    }

    public function setComment(string $comment): void {
        $this->comment = $comment;
    }




    public function __construct($companyData) {
        var_dump($companyData);
        foreach ($companyData as $key => $value)
            $this->$key=$value;
    }
}
