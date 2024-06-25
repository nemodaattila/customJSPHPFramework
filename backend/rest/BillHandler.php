<?php

namespace rest;
use model\Company;
use service\EntityComparator;

class BillHandler extends RestParent
{
    private string $tableName = "bills";

    public function getIds(): void {
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

    public function create($parameters): void {
        $data = $parameters->getRequestData();
        $this->dbConnection->insertARecord($this->tableName, $data);
//TODO       $this->saveEvent(1, 1, $companyId, null);
        $this->result = true;
    }

    function edit($parameters = null): void {
        $eu = new EntityComparator();
        $company = new Company($this->dbConnection->getARecordByID($this->tableName, $parameters->getUrlParameters()[1]));
        $newData = $parameters->getRequestData();
        [$difference, $differenceWithOldValue] = $eu->compareObjects($company, $newData);
        if (count($difference) === 0)
            $this->result = true;
        $this->dbConnection->updateRecord($this->tableName, $company->getId(), $difference);
//        $this->saveEvent(3, 1, $id, $change);
        $this->result = true;
    }

    function delete($parameters = null) {
        $companyId=$parameters->getUrlParameters()[1];

                $contData = $this->dbConnection->getARecordByID($this->tableName, $companyId);
                if ($contData === null)
                    throw new Exception('Számla nem létezik');
                $this->dbConnection->deleteARecordById($this->tableName, $companyId);
//                $this->saveEvent(4, 3, $id, ['name' => ['oldValue' => $name, 'newValue' => null], 'company' => ['oldValue' => $company, 'newValue' => null]]);
        $this->result = true;

        }

}
