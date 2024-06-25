<?php

namespace rest;
class MetaDataHandler extends RestParent
{
    public function getCompanyMeta(): void {
        $this->result = $this->dbConnection->simpleFetchTable('company_categories');
    }

    public function getBillMeta(): void {
        $this->result = [$this->dbConnection->simpleFetchTable('bill_currencies'),
            $this->dbConnection->simpleFetchTable('bill_paymentmethods'),
            $this->dbConnection->simpleFetchTable('bill_states')];
    }
}
