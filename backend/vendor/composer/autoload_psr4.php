<?php

// autoload_psr4.php @generated by Composer

$vendorDir = dirname(dirname(__FILE__));
$baseDir = dirname($vendorDir);

return array(
    'simpleDatabaseProcessor\\' => array($baseDir . '/database/queryProcessor/simple'),
    'service\\' => array($baseDir . '/service'),
    'routes\\' => array($baseDir . '/routes'),
    'rest\\' => array($baseDir . '/rest'),
    'interfaces\\' => array($baseDir . '/interfaces'),
    'helper\\' => array($baseDir . '/helper'),
    'exception\\' => array($baseDir . '/exception'),
    'database\\' => array($baseDir . '/database'),
    'databaseSource\\' => array($baseDir . '/database/querySource'),
    'controller\\' => array($baseDir . '/controller'),
    'complexDatabaseProcessor\\' => array($baseDir . '/database/queryProcessor/complex'),
    'classModel\\' => array($baseDir . '/model/class'),
    'classDbHandler\\' => array($baseDir . '/model/classDBHandler'),
    'bookDataManipulator\\' => array($baseDir . '/controller/BookDataManipulator'),
);
