<?php

namespace builder;
class DatabaseBuilder
{
    private static $databaseConnectorInstance = null;

    public static function getDatabaseConnectorInstance(): null {

        if (self::$databaseConnectorInstance !== null) {
            return self::$databaseConnectorInstance;
        }
        else{
            throw new \Exception('database connector instance not exoists');
        }
    }

    public static function createDatabaseConnection($databaseHandlerClassName) {
        if (self::$databaseConnectorInstance === null) {
            $dbClass = '\\database\\' . $databaseHandlerClassName;
            self::$databaseConnectorInstance = new $dbClass();
        }
        else{
            throw new \Exception('database connector instance already exists');
        }
    }


}
