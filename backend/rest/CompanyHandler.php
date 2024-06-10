<?php

namespace rest;
use model\Company;
use service\EntityComparator;

class CompanyHandler extends RestParent
{
    private string $tableName = "companies";

    public function getCompanyIds(): void {
        $searchParams = json_decode(getallheaders()["Search-And-Order-Params"], true);
        $searchParams["orderAndLimitParams"]['limit']++;
        $res = $this->dbConnection->getRecordsFromServer(
            ["tableName" => $this->tableName,
                "attributes" => ['id'],
                "conditionalAttributes" => [$searchParams["orderAndLimitParams"]['order']],
                "orderLimit" => $searchParams["orderAndLimitParams"],
                'filterParameters' => $searchParams["filterParams"],
                "fetchType" => 7, //FETCH COLUMN
            ]
        );
        $hasNext = false;
        if (count($res) === $searchParams["orderAndLimitParams"]['limit']) {
            $hasNext = true;
            array_pop($res);
        }
        $this->result = ['ids' => $res, 'hasNext' => $hasNext];
    }

    public function getOne($parameters): void {
        $this->result = $this->dbConnection->getARecordByID($this->tableName, $parameters->getUrlParameters()[1]);
    }

    public function createCompany($parameters): void {
    $data = $parameters->getRequestData();
$this->dbConnection->insertARecord($this->tableName, $data);

//TODO       $this->saveEvent(1, 1, $companyId, null);
    $this->result = true;
    }

    function editCompany($data = null):void{
        $eu = new EntityComparator();
            $company = new Company($this->dbConnection->getARecordByID($this->tableName, $data->getUrlParameters()[1]));
            $newData = $data->getRequestData();
            [$difference, $differenceWithOldValue] = $eu->compareObjects($company, $newData);
        if (count($difference) === 0)
            $this->result = true;
        $this->dbConnection->updateRecord('companies', $company->getId(), $difference);
//        $this->saveEvent(3, 1, $id, $change);
        $this->result = true;
    }
}
