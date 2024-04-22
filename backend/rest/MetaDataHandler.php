<?php

namespace rest;
use builder\DatabaseBuilder;
use database\CustomPDO;

class MetaDataHandler
{
    private CustomPDO $dbConnection;
    public function __construct() {
        $this->dbConnection = DatabaseBuilder::getDatabaseConnectorInstance();

    }

    public function getCompanyMeta() {
        $this->dbConnection->simpleFetchTable('company_categories');

   }

}
