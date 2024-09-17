const Cart = ({item})=>{
    const title = item.title;
    const img = item.thumbnail;
    const rate = item.rating;
    const price = item.price;
    const category = item.category;
    let brand = item.brand;
    if (brand == null) {
        brand = "no brand";
    }
    return(
    <div className="box">
        <img src={img} className="pic"/>
        <div className="discription">        
        <div className="title">{title}</div>
        <div>Brand: {brand}</div>
        <div>Rating: {rate}/5</div>
        <div>Price: {price}$</div>
        <div>Category: {category}</div>
        </div>
    </div>)
}
export default Cart;