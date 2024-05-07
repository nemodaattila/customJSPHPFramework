<?php

namespace rest;
class MetaDataHandler extends RestParent
{
    public function getCompanyMeta(): void {
        $this->result = $this->dbConnection->simpleFetchTable('company_categories');
    }
}
