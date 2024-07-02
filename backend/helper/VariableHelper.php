<?php

namespace helper;

use JetBrains\PhpStorm\NoReturn;

class VariableHelper
{
    #[NoReturn] public static function debug($input): void {
        echo '<pre>';
        print_r($input);
        echo '</pre>';
        die();
    }

    public static function checkIfAnArrayElementMeetsCondition($array, $conditionalFunction): bool {
        foreach ($array as $value) {
            if ($conditionalFunction($value))
                return true;
        }
        return false;
    }
}
