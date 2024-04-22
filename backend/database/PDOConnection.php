<?php

namespace database;
use PDO;
use PDOStatement;

final class PDOConnection
{
    /**
     * @var PDO|null PDO példány
     */
    private ?PDO $pdo = null;
    /**
     * előkészített PDO lekérdezés
     * @var PDOStatement|false|null
     */
    public PDOStatement|null|false $query = null;

    /**
     * PDO kapcsolat létrehozása, a paramétereket a backend/config/PDOConfig.php fájlból olvasssa be
     */
    public function createPDO(): void {
        if ($this->pdo === null) {
            $config = parse_ini_file('./database/PDOConfig.php');
                $this->pdo = new PDO('mysql:host=' . $config['dbHost'] . ';dbname=' . $config['dbName']
                . ';charset=utf8mb4', $config['dbUser'], $config['dbPassword'], [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ]);
        }
    }

    /**
     * Új tranzakciót nyit
     * @return void
     */
    public function beginTransaction(): void {
        $this->query?->closeCursor();
        if ($this->pdo->inTransaction() === false)
            $this->pdo->beginTransaction();
    }

    /**
     * lezár egy tranzakciót
     * @return void
     */
    public function commitTransaction(): void {
        $this->query?->closeCursor();
        if ($this->pdo->inTransaction() === true)
            $this->pdo->commit();
    }

    /**
     * visszagörget egy tranzakciót hiba esetén
     * @return void
     */
    public function rollBackTransaction(): void {
        $this->query?->closeCursor();
        if ($this->pdo->inTransaction() === true)
            $this->pdo->rollBack();
    }

    /**
     * végrehajt egy mysql queryt
     * @param string $queryString - query szöveges formáában
     * @param array $parameters - paraméterek asszociatív tömb formában pl : ['name'=>'valami',...]
     * @return bool sikeres volt e a művelet
     * @throws Exception
     */
    public function executeQuery(string $queryString, array $parameters = []): bool {
        $this->query?->closeCursor();
        $this->query = null;
        $this->query = $this->pdo->prepare($queryString);
        $success = $this->query->execute($parameters);
        if (!$success)
            throw new Exception('mysql execution failed: ' . $queryString);
        return true;
    }
}
