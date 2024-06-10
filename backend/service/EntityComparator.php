<?php

namespace service;
use model\EntityModelParent;

class EntityComparator
{
    public function compareObjects(EntityModelParent $modelInstance, $newData): array {
        $difference=[];
        $differenceWithOldValue=[];
        foreach ($newData as $key=>$value)
        {
            $namePieces = explode('_',$key);
            foreach ( $namePieces as  &$item)
                $item=ucfirst($item);

            $attribName = 'get'.implode('',$namePieces);;
            if(gettype($modelInstance->$attribName()) === 'integer')
                $value = (int)$value;
            if(gettype($modelInstance->$attribName()) === 'double')
                $value = (float)$value;
            if ($modelInstance->$attribName()!=$value) {
                $difference[$key] = $value;
                $differenceWithOldValue[$key] = [$modelInstance->$attribName(),$value];
            }
        }
        return [$difference, $differenceWithOldValue];
    }
}
