<?php

namespace rest;
class CompanyHandler extends RestParent
{
    private string $tableName = "companies";

    public function getCompanyIds(): void {
        $searchParams = json_decode(getallheaders()["Search-And-Order-Params"], true);
        $searchParams["orderAndLimitParams"]['limit']++;
        $res = $this->dbConnection->getRecordsFromServer(
            ["tableName" => $this->tableName,
                "attributes" => ['id'],
                "conditionalAttributes" => ['name'],
                "orderLimit" => $searchParams["orderAndLimitParams"],
                "fetchType" => 7, //FETCH COLUMN
            ]
        );
        $hasNext = false;
        if (count($res)===$searchParams["orderAndLimitParams"]['limit'])
        {
            $hasNext=true;
               array_pop($res);
        }
        $this->result =['ids'=>$res, 'hasNext'=>$hasNext];
    }

    public function getOne($parameters): void {
        $this->result = $this->dbConnection->getARecordByID($this->tableName, $parameters->getUrlParameters()[1]);
    }
}
