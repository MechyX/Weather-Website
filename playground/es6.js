
const product={
    label: 'red notebook',
    price : 3
}


const trans = (type,{ label,price} ={})=>{
    console.log(type,label,price);
    
}

trans('order',undefined)