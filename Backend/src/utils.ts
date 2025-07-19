export function random(len: number){
    let options = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let length = options.length;

    let and = "";
    for(let i = 0; i < len; i++){
        and += options[Math.floor(Math.random() * length)];
    }
    return and;
}