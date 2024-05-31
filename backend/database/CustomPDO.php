<?php
/**
 * http request kezelő osztályok ősosztálya
 */

namespace database;

use interface\DatabaseConnectionInterface;
use PDO;
use PDOStatement;

class CustomPDO implements DatabaseConnectionInterface
{
//    /**
//     * @var mixed user id
//     */
//    protected mixed $user;
    /**
     * PDO lekérdezés
     */
    /**
     * @var PDOStatement|null
     */
    protected ?PDOStatement $query;
    protected ?PDOConnection $connection;

    public function __construct() {
        $this->connection = new PDOConnection();
        $this->connection->createPDO();
//        $this->startTransaction();
//        PDOConnection::beginTransaction();
//        $this->user = filter_input(INPUT_POST, 'userId', FILTER_VALIDATE_INT);
        $this->query =& $this->connection->query;
    }

    public function startTransaction(): void {
        $this->connection->beginTransaction();
    }

    public function simpleFetchTable($tableName): false|array {
        $this->executeQuery('select * from ' . $tableName);
        return $this->query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * sql utasasítás végrehajtása , PDOConnection::executeQuery-t hívja meg
     * @param string $queryString query string
     * @param array $parameters paraméterek
     * @return bool sikeresség
     * @throws Exception mysql hiba
     */
    protected function executeQuery(string $queryString, array $parameters = []): bool {
        return $this->connection->executeQuery($queryString, $parameters);
    }

    public function getRecordsFromServer(array $params): array|bool|null {
        $orderParams = $params['orderLimit'] ?? [];
        $filters = $params['filterParameters'] ?? [];
        $tables = [];
        if (!str_contains($params['tableName'], '.')) {
            [$databaseName, $tableName] = ['customJSPHPFramework', $params['tableName']];
            $tables[$tableName] = 't1';
        } else {
            [$databaseName, $tableName] = explode('.', $params['tableName']);
            $tables[$databaseName . '.' . $tableName] = 't1';
        }
        if (isset($params['attributes'])) {
            $attributes = $params['attributes'];
        } elseif (isset($params['excludeAttributes'])) {
            $sql = "SELECT column_name FROM  information_schema.columns	WHERE table_schema='" . $databaseName . "' and table_name = '" . $tableName . "'";
            $this->executeQuery($sql);
            $attributes = $this->query->fetchAll(PDO::FETCH_COLUMN);
            $attributes = array_diff($attributes, $params['excludeAttributes']);
        } else
            $attributes = ['*'];
        $conditionalAttributes = [];
        if (isset($params['conditionalAttributes']))
            $conditionalAttributes = $params['conditionalAttributes'];
        $tableName = $params['tableName'];
        $what = [];
        $outerWhat = [];
        foreach ($attributes as $value) {
            $what[] = 't1.' . $value;
            $outerWhat[] = $value;
        }
        foreach ($conditionalAttributes as $value)
            $what[] = 't1.' . $value;
        foreach ($filters as $filter)
            $what[] = 't1.' . $filter[0]; //DO
        $joins = '';
        $id = 2;
        if (isset($params['connectedTableParams'])) {
            $joins = [];
            foreach ($params['connectedTableParams'] as $join) {
                $tables[$join['table']] = 't' . $id;
                if (!str_contains($join['connectedAttribute'], '.')) {
                    [$leftTableName, $leftAttrName] = ['t1', $join['connectedAttribute']];
                } else {
                    $temp = explode('.', $join['connectedAttribute']);
                    [$leftTableName, $leftAttrName] = [$tables[$temp[0]], $temp[1]];
                }
                foreach ($join['targetAttributes'] as $key => $value)
                    $what[] = 't' . $id . '.' . $key . ' AS ' . $value;
                $joins[] = "LEFT JOIN " . $join['table'] . " as t" . $id . " ON t" . $id . "." . $join['foreignKey'] . "=" . $leftTableName . '.' . $leftAttrName;
                $id++;
            }
            $joins = implode(' ', $joins);
        }
        $innerFrom = [];
        $innerWhere = '';
        if (isset($params['innerWhere'])) {
            $innerWhere = [];
            foreach ($params['innerWhere'] as $where) {
                $temp = '';
                ['leftParameter' => $leftParam, 'operator' => $operator, 'rightParameter' => $rightParam] = $where;
                ['table' => $table, 'attribute' => $attribute] = $leftParam;
                if (!isset($tables[$table])) {
                    $tables[$table] = 't' . $id;
                    $innerFrom[] = $table . ' AS ' . $tables[$table];
                    $id++;
                }
                $table = $tables[$table];
                $temp .= $table . '.' . $attribute . ' ' . $operator . ' ';
                if (is_array($rightParam)) {
                    ['table' => $table, 'attribute' => $attribute] = $rightParam;
                    if (!isset($tables[$table])) {
                        $tables[$table] = 't' . $id;
                        $innerFrom[] = $table . ' AS ' . $tables[$table];
                        $id++;
                    }
                    $table = $tables[$table];
                    $temp .= $table . '.' . $attribute;
                } else
                    $temp .= $rightParam;
                $innerWhere[] = $temp;
            }
            $innerWhere = " WHERE " . implode(' AND ', $innerWhere);
        }
        $what = array_unique($what);
        $innerFrom = (count($innerFrom) === 0 ? '' : ' ' . implode(', ', $innerFrom) . ', ');
        $sql = 'SELECT ' . implode(", ", $outerWhat) . ' FROM (SELECT ' . implode(", ", $what) . ' FROM ' . $innerFrom . ' ' . $tableName . ' AS t1 ' . $joins . $innerWhere . ') as fi';
        $where = [];
        foreach ($filters as [$attrName, $filterType, $filterValue]) {
            if (isset($filter[3]) && $filter[3] === 1) {
                $where[] = 'fi.' . $attrName . ' BETWEEN \'' . $filterType . '\' and \'' . $filterValue . '\'';
            } else {
                $where[] = match ($filterType) {
                    'cont' => 'fi.' . $attrName . ' LIKE \'%' . $filterValue . '%\'',
                    'notcont' => 'fi.' . $attrName . ' NOT LIKE \'%' . $filterValue . '%\'',
                    'start' => 'fi.' . $attrName . ' LIKE \'' . $filterValue . '%\'',
                    'end' => 'fi.' . $attrName . ' LIKE \'%' . $filterValue . '\'',
                    'null' => '(fi.' . $attrName . ' IS NULL OR fi.' . $attrName . ' = \'\')',
                    'notnull' => '(fi.' . $attrName . ' IS NOT NULL AND fi.' . $attrName . ' != \'\')',
                    default => 'fi.' . $attrName . ' ' . $filterType . ' \'' . $filterValue . '\'',
                };
            }
        }
        if (count($where) > 0)
            $sql .= ' WHERE ' . implode(' AND ', $where);
        if (isset($orderParams['order']))
            $sql .= ' ORDER BY ' . $orderParams['order'] . " " . ($orderParams['orderDir'] ?? 'ASC');
        if (isset($orderParams['limit']))
            $sql .= ' LIMIT ' . $orderParams['limit'] . " OFFSET " . ($orderParams['offset'] ?? '0');
//        var_dump($sql);
        $this->executeQuery($sql);
        return $this->query->fetchAll($params['fetchType'] ?? PDO::FETCH_ASSOC);
    }

//    /**
//     * entitások/rekordok lekérdezése szerverről szűrésekkel, paramterek jöhetnek függvényparaméterként, vagy $_POST-ból
//     * @param string $tableName tábla neve
//     * @param null $orderParams rendezési paraméterek
//     * @param array|null $connectedTableParams - kapcsoladó táblákból származó
//     * @param array|false|null $filterParams szűrési feltételek
//     * @return array|bool|null [paramétereknek megfelelő rekordok (limit-tel), a paramétereknek megfelelő ÖSSZES rekord száma]
//     * @throws Exception mysql hiba
//     */
//    protected function getRecordsFromServer(string $tableName, $orderParams = null, ?array $connectedTableParams = null, array|false|null $filterParams = null): array|bool|null {
//        $filter = ($filterParams === false) ? filter_input(INPUT_POST, 'filters') :
//            (($filterParams === null) ? '' : json_encode($filterParams, JSON_UNESCAPED_UNICODE));
//        if ($orderParams === null) {
//            $orderParams = [];
//        } else if ($orderParams === false)
//            $orderParams = (array)json_decode(filter_input(INPUT_POST, 'orderLimit'));
//        $this->executeQuery('call getRecordsFromTableFiltered2(?,?,?,?,?,?,?)', [
//            $tableName,
//            $orderParams['limit'] ?? '',
//            $orderParams['offset'] ?? '',
//            $orderParams['order'] ?? '',
//            $orderParams['orderDir'] ?? '',
//            ($filter !== '[]' && $filter !== '') ? $filter : '[]',
//            ($connectedTableParams !== null) ?
//                json_encode($connectedTableParams, JSON_UNESCAPED_UNICODE) : '[]'
//        ]);
//        return $this->query->fetchAll(PDO::FETCH_ASSOC);
//    }
    /**
     * entitások/rekordok lekérdezése szerverről szűrésekkel, új verzió, db fügvény nélkül
     * @param array $params szűrési és rendezési paraméterek:
     * tableName => táblanév
     * attributes => táblaattribútumok neve, amiket visszaad,
     * excludeAttributes => azon attribúumok melyeket nem kell visszaadni
     * innerWhere => feltételek
     * connectedTableParams => más táblákkal való kapcsolatok (left Join))
     * filterParameters => szűrőparaméterek
     * orderLimit => limit, offset, order, orderDir
     * @return array|bool|null rekordok
     * @throws Exception
     * @example $res = $this->getRecordsFromServerNew(
     * ['tableName' => 'areas',
     * 'attributes' => ['id', 'name', 'enteredToArea', 'stayInArea'],
     * 'innerWhere' => [[
     * 'leftParameter' => ['table' => 'users', 'attribute' => 'enteredToArea'],
     * 'operator' => '!=',
     * 'rightParameter' => ['table' => 'users', 'attribute' => 'stayInArea'],
     * ]],
     * 'connectedTableParams' =>
     * [['table' => 'areas', 'foreignKey' => 'id', 'connectedAttribute' => 'enteredToArea', 'targetAttributes' => ['name' => 'enteredAreaName']],
     * ['table' => 'areas', 'foreignKey' => 'id', 'connectedAttribute' => 'stayInArea', 'targetAttributes' => ['name' => 'stayAreaName']]
     * ]
     * ]);
     */
    /**
     * rekord/entitás lekérése attributum alapján
     * @param string $tableName táblanév
     * @param string $attrib attributumnév
     * @param string $value attributum érték
     * @return array|null rekord
     * @throws Exception mysql hiba
     */
    protected function getARecordByAttribute(string $tableName, string $attrib, string $value): ?array {
        $this->executeQuery('call getARecordFromTableByAttribute(?,?,?)', [$tableName, $attrib, $value]);
        $res = $this->query->fetch(PDO::FETCH_ASSOC);
        if (!$res) $res = null;
        return $res;
    }

    /**
     * rekord egy attributum-értékének lekérdezése attributum alapján - pillanatnyilag csak int, string support?
     * @param $tableName - téblanév
     * @param string $attrName - keresett attributum neve
     * @param string $keyAttrName - attributumnév ami alapján keresünk
     * @param int $keyAttrValue - kereső attributum értéke
     * @return string| int| null - keresett érték - elvileg bármilyen
     * @throws Exception mysql hiba
     */
    protected function getAValueByAttributeName($tableName, string $attrName, string $keyAttrName, int $keyAttrValue): int|string|null {
        $this->executeQuery('call getValueByAttributeName(?,?,?,?)', [$tableName, $attrName, $keyAttrName, $keyAttrValue]);
        $res = $this->query->fetch(PDO::FETCH_COLUMN);
        if (!$res) $res = null;
        return $res;
    }

    /**
     * egy rekord frissítése id alapján
     * @param string $tableName tábla neve
     * @param int $id rekord/entitás id
     * @param array $values módosítandó adatok
     * @return bool sikeresség
     * @throws Exception mysql hiba
     */
    protected function updateRecord(string $tableName, int $id, array $values): bool {
        $attr = [];
        $attrVal = [];
        foreach ($values as $key => $val) {
            $attr[] = $key;
            $attrVal[] = $val;
        }
        return $this->executeQuery('call updateARecordById(?,?,?,?)', [$tableName, $id, json_encode($attr), json_encode($attrVal, JSON_UNESCAPED_UNICODE)]);
    }

    /**
     *  rekord/entitás módosítása attributum alapján
     * @param string $tableName táblanév
     * @param string $keyName feltétel (WHERE feltétel) attributum
     * @param $keyValue - feltétel atributum értéke
     * @param array $values módosítandó adatok
     * @return bool sikeresség
     * @throws Exception mysql hiba
     */
    protected function updateRecordByAttribute(string $tableName, string $keyName, $keyValue, array $values): bool {
        $attr = [];
        $attrVal = [];
        foreach ($values as $key => $val) {
            $attr[] = $key;
            $attrVal[] = $val;
        }
        return $this->executeQuery('call updateARecordByAttribute(?,?,?,?,?)', [$tableName, $keyName, $keyValue, json_encode($attr), json_encode($attrVal, JSON_UNESCAPED_UNICODE)]);
    }

    protected function getARecord(array $params) {
        if ($params['value'] === null) return null;
        $tables = [];
        if (!str_contains($params['tableName'], '.')) {
            [$databaseName, $tableName] = ['everlink_client', $params['tableName']];
        } else
            [$databaseName, $tableName] = explode('.', $params['tableName']);
        if (isset($params['attributes'])) {
            $attributes = $params['attributes'];
        } elseif (isset($params['excludeAttributes'])) {
            $sql = "SELECT column_name FROM  information_schema.columns	WHERE table_schema='" . $databaseName . "' and table_name = '" . $tableName . "'";
            $this->executeQuery($sql);
            $attributes = $this->query->fetchAll(PDO::FETCH_COLUMN);
            $attributes = array_diff($attributes, $params['excludeAttributes']);
        } else
            $attributes = ['*'];
        $what = [];
        foreach ($attributes as $key => $value) {
            $what[$key] = 't1.' . $value;
        }
        $joins = '';
        if (isset($params['connectedTableParams'])) {
            $id = 2;
            $joins = [];
            foreach ($params['connectedTableParams'] as $join) {
                $tables[$join['table']] = 't' . $id;
                if (!str_contains($join['connectedAttribute'], '.')) {
                    [$leftDatabaseName, $leftTableName] = ['t1', $join['connectedAttribute']];
                } else {
                    $temp = explode('.', $join['connectedAttribute']);
                    [$leftDatabaseName, $leftTableName] = [$tables[$temp[0]], $temp[1]];
                }
                foreach ($join['targetAttributes'] as $key => $value) {
                    $what[] = 't' . $id . '.' . $key . ' AS ' . $value;
                }
                $joins[] = "LEFT JOIN " . $join['table'] . " as t" . $id . " ON t" . $id . "." . $join['foreignKey'] . "=" . $leftDatabaseName . '.' . $leftTableName;
                $id++;
            }
            $joins = implode(' ', $joins);
        }
        $sql = 'SELECT * FROM (SELECT ' . implode(", ", $what) . ' FROM ' . $tableName . ' AS t1 ' . $joins . ') as fi';
        if (!isset($params['attribute']))
            $params['attribute'] = 'id';
        $sql .= ' WHERE ' . $params['attribute'] . ' = \'' . $params['value'] . '\'';
        $this->executeQuery($sql);
        $res = $this->query->fetch(PDO::FETCH_ASSOC);
        if (!$res) $res = null;
        return $res;
    }

    /**
     * record/entitás törlése id alapján
     * @param string $tableName táblanév
     * @param int $id rekord id
     * @return bool sikeresség
     * @throws Exception mysql hiba
     */
    protected function deleteARecordById(string $tableName, int $id): bool {
        return $this->executeQuery('call deleteARecordById(?,?)', [$tableName, $id]);
    }

    /**
     * record/entitás törlése NEM ID alapján
     * @param string $tableName táblanév
     * @param string $keyAttrName WHERE feltétel attribútum
     * @param $keyAttrValue - WHERE feltétel attribútum értéke
     * @return bool sikeresség
     * @throws Exception mysql hiba
     */
    protected function deleteARecordByAttribute(string $tableName, string $keyAttrName, $keyAttrValue): bool {
        return $this->executeQuery('call deleteARecordByAttribute(?,?,?)', [$tableName, $keyAttrName, $keyAttrValue]);
    }

    /**
     * módosítás előtt az új adatok összehasonlítása a régivel, változások keresése
     * @param string $tableName táblanév
     * @param int $id entitás id
     * @param array $newData módosítandó adatok
     * @return array [változott adatok, változtatott paraméterek eredeti értéke stringként]
     * @throws Exception mysql hiba
     */
    protected function compareValuesBeforeUpdate(string $tableName, int $id, array $newData): array {
        $old = $this->getARecordByID($tableName, $id);
        $changeForEvents = [];
        foreach ($newData as $key => $value) {
            if ($value == $old[$key]) {
                unset($newData[$key]);
            } else
                $changeForEvents[$key] = ['oldValue' => $old[$key], 'newValue' => $value];
        }
        return [$newData, $changeForEvents];
    }

    /**
     * egy entitás/rekord lekérdezése
     * @param string $tableName táblanév
     * @param int|null $id rekord id
     * @return array|null rekord
     * @throws Exception mysql hiba
     */
    public function getARecordByID(string $tableName, int $id = null): ?array {
        if ($id === null) return null;
        $this->executeQuery('call getARecordFromTableById(?,?)', [$tableName, $id]);
        $res = $this->query->fetch(PDO::FETCH_ASSOC);
        if (!$res) $res = null;
        return $res;
    }

    protected function addPropertyToCommentJSON($json, $key, $value = null, $value2 = null): bool|string {
        $json = json_decode($json);
        $json[$key] = ['oldValue' => $value, 'newValue' => $value2];
        return json_encode($json);
    }

    /**
     * a fájlnév elejére beszúrja az entitás id-ját
     * @param int $recordId - entitás id
     * @param string $path - fájl elérési útja névvel
     * @return string kiegészített fájlnév
     */
    protected function appendFileNameWithId(int $recordId, string $path): string {
        $temp = preg_split("/(\/|\\\)/", $path);
        $temp[count($temp) - 1] = $recordId . '_' . $temp[count($temp) - 1];
        return implode('/', $temp);
    }

    /**
     * base64 string formátumú fájlt dekódolja és menti
     * @param string $path - fájl elérési útja + fájlnév
     * @param string $base64File base64 string file
     * @return void
     * @throws CustomException ha a mentés nem sikerült
     */
    protected function decodeAndSaveFile(string $path, string $base64File): void {
        $file = base64_decode(str_replace(' ', '+', explode(',', $base64File)[1]));
        if (file_put_contents('./image/' . $path, $file) === false)
            throw new CustomException('Fájl mentése nem sikerült: ' . $path);
//        if (file_put_contents('./../../projectmanager_file_backup/' . $path, $file) === false)
//            throw new CustomException('Backup Fájl mentése nem sikerült: ' . $path);
    }

    /**
     * @throws Exception
     */
    protected function saveEvent($eventTypeId, $elementGroupId, $elementId, $oldValue, $user = null): int {
        if ($oldValue !== null) {
            $oldValue = json_encode($oldValue);
            $oldValueId = $this->insertARecord('eventlist_elementoldvalues', ['oldvalue' => $oldValue]);
        }
        return $this->insertARecord('eventlist', ['user' => $user ?? $this->user, 'event' => $eventTypeId, 'elementGroup' => $elementGroupId, 'element' => $elementId, "oldvalue" => $oldValue === null ? null : $oldValueId]);
    }

    /**
     * rekord/entitás beszúrása
     * @param string $tableName táblanév
     * @param array $values paraméterek
     * @return int - a beszúrt rekord Id-je (lastinsertedId)
     * @throws Exception mysql hiba
     */
    public function insertARecord(string $tableName, array $values): int {
        $params = [];
        foreach ($values as $key => $val)
            $params[] = [$key, $val];
        $this->executeQuery('call insertARecord(?,?)', [$tableName, json_encode($params, JSON_UNESCAPED_UNICODE)]);
        return $this->query->fetch(PDO::FETCH_COLUMN);
    }
}
