<?php

namespace rest;
class CompanyHandler extends RestParent
{
    private string $tableName = "companies";

    public function getCompanyIds(): void {
        $searchParams = json_decode(getallheaders()["Search-And-Order-Params"], true);
        $this->result = $this->dbConnection->getRecordsFromServer(
            ["tableName" => $this->tableName,
                "attributes" => ['id'],
                "conditionalAttributes" => ['name'],
                "orderLimit" => $searchParams["orderAndLimitParams"],
                "fetchType" => 7, //FETCH COLUMN
            ]
        );
    }

    public function getOne($parameters): void {
        $this->result = $this->dbConnection->getARecordByID($this->tableName, $parameters->getUrlParameters()[1]);
    }
}
