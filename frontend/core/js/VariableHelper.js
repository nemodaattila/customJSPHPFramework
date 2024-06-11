/**
 * assistant class for variables
 */
class VariableHelper {
    /**
     *  returns true if parameter "str" is string, false if not
     */
    static isString(str) {
        return (typeof str === 'string') || (str instanceof String)
    }
}

