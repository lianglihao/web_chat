function remove(arr,name) {
    var index = arr.lastIndexOf(name);
    arr.splice(index,1);
}

function pushUser(arr,name) {
    if((arr.filter( item => item == name).length)){
        console.log('有此用户');
    }else {
        arr.push(name);
    }
}

module.exports = {
    removeUser : remove,
    pushUser : pushUser
}