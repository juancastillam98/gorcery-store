export const idGenerator = ()=>{
    let a = Date.now().toString(30);
    let b= Math.random().toString(36).substring(2);
    return a + b;
}