export function isEmpty(obj){
    for(var key in obj){
        if(typeof key === 'object' && key !== null)
            return isEmpty(key)
        if(obj.hasOwnProperty(key))
            return false
    }
    return true
}