<?php

namespace rest;

class CompanyHandler extends RestParent
{
    private string $tableName = "companies";

    public function getCompanyIds() {
//        var_dump($this->dbConnection);



        $searchParams = json_decode(getallheaders()["Search-And-Order-Params"],true);
        $this->result=  $this->dbConnection->getRecordsFromServer(
            ["tableName" => $this->tableName,
                "attributes" => ['id'],
                "conditionalAttributes" => ['name'],
                "orderLimit" => $searchParams["orderAndLimitParams"],
                "fetchType"=>7, //FETCH COLUMN
                ]

        );
//        $this->result = $this->dbConnection->simpleFetchTable('company_categories');
    }
}
