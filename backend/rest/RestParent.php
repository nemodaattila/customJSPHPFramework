<?php

namespace rest;
use builder\DatabaseBuilder;
use interface\DatabaseConnectionInterface;

class RestParent
{
    protected DatabaseConnectionInterface $dbConnection;

    protected mixed $result;

    public function getResult(): mixed {
        return $this->result;
    }
    public function __construct() {
        $this->dbConnection = DatabaseBuilder::getDatabaseConnectorInstance();

    }
}
