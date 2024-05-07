<?php

namespace builder;

use Exception;
use interface\DatabaseConnectionInterface;

class DatabaseBuilder
{
    private static DatabaseConnectionInterface|null $databaseConnectorInstance = null;

    public static function getDatabaseConnectorInstance(): DatabaseConnectionInterface {
        if (self::$databaseConnectorInstance !== null) {
            return self::$databaseConnectorInstance;
        } else {
            throw new Exception('database connector instance not exists');
        }
    }

    public static function createDatabaseConnection($databaseHandlerClassName): void {
        if (self::$databaseConnectorInstance === null) {
            $dbClass = '\\database\\' . $databaseHandlerClassName;
            self::$databaseConnectorInstance = new $dbClass();
        } else {
            throw new Exception('database connector instance already exists');
        }
    }
}
