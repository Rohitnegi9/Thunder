const users = [
  {
    name: "Aarav Sharma",
    age: 24,
    photo: "https://randomuser.me/api/portraits/men/1.jpg"
  },
  {
    name: "Priya Verma",
    age: 22,
    photo: "https://randomuser.me/api/portraits/women/2.jpg"
  },
  {
    name: "Rahul Mehta",
    age: 26,
    photo: "https://randomuser.me/api/portraits/men/3.jpg"
  },
  {
    name: "Sneha Kapoor",
    age: 23,
    photo: "https://randomuser.me/api/portraits/women/4.jpg"
  },
  {
    name: "Karan Malhotra",
    age: 28,
    photo: "https://randomuser.me/api/portraits/men/5.jpg"
  },
  {
    name: "Ananya Singh",
    age: 21,
    photo: "https://randomuser.me/api/portraits/women/6.jpg"
  },
  {
    name: "Rohan Gupta",
    age: 25,
    photo: "https://randomuser.me/api/portraits/men/7.jpg"
  },
  {
    name: "Neha Joshi",
    age: 27,
    photo: "https://randomuser.me/api/portraits/women/8.jpg"
  },
  {
    name: "Aditya Raj",
    age: 24,
    photo: "https://randomuser.me/api/portraits/men/9.jpg"
  },
  {
    name: "Isha Agarwal",
    age: 22,
    photo: "https://randomuser.me/api/portraits/women/10.jpg"
  }
];



const products = [
  {
    title: "Laptop",
    price: 55000,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    category: "Electronics",
    brand: "Dell",
    rating: 4.5,
    discount: 10,
    inStock: true
  },
  {
    title: "Headphones",
    price: 2500,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    category: "Electronics",
    brand: "Sony",
    rating: 4.3,
    discount: 15,
    inStock: true
  },
  {
    title: "Smartphone",
    price: 35000,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    category: "Electronics",
    brand: "Samsung",
    rating: 4.6,
    discount: 12,
    inStock: true
  },
  {
    title: "Smart Watch",
    price: 7000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    category: "Wearables",
    brand: "Noise",
    rating: 4.1,
    discount: 20,
    inStock: false
  },
  {
    title: "Keyboard",
    price: 1500,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3",
    category: "Accessories",
    brand: "Logitech",
    rating: 4.4,
    discount: 8,
    inStock: true
  },
  {
    title: "Mouse",
    price: 800,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    category: "Accessories",
    brand: "HP",
    rating: 4.2,
    discount: 5,
    inStock: true
  },
  {
    title: "Monitor",
    price: 12000,
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf",
    category: "Electronics",
    brand: "LG",
    rating: 4.5,
    discount: 18,
    inStock: true
  },
  {
    title: "Camera",
    price: 45000,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
    category: "Electronics",
    brand: "Canon",
    rating: 4.7,
    discount: 10,
    inStock: false
  },
  {
    title: "Tablet",
    price: 28000,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0",
    category: "Electronics",
    brand: "Apple",
    rating: 4.8,
    discount: 6,
    inStock: true
  },
  {
    title: "Bluetooth Speaker",
    price: 3000,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1",
    category: "Audio",
    brand: "JBL",
    rating: 4.4,
    discount: 14,
    inStock: true
  },
  {
    title: "Gaming Chair",
    price: 15000,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267",
    category: "Furniture",
    brand: "Green Soul",
    rating: 4.2,
    discount: 22,
    inStock: true
  },
  {
    title: "Backpack",
    price: 2000,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62",
    category: "Fashion",
    brand: "Wildcraft",
    rating: 4.1,
    discount: 10,
    inStock: true
  },
  {
    title: "Shoes",
    price: 4000,
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    category: "Fashion",
    brand: "Nike",
    rating: 4.6,
    discount: 25,
    inStock: false
  },
  {
    title: "Sunglasses",
    price: 1200,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083",
    category: "Fashion",
    brand: "Ray-Ban",
    rating: 4.3,
    discount: 16,
    inStock: true
  },
  {
    title: "T-Shirt",
    price: 700,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab",
    category: "Clothing",
    brand: "H&M",
    rating: 4.0,
    discount: 30,
    inStock: true
  },
  {
    title: "Coffee Mug",
    price: 300,
    image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a",
    category: "Kitchen",
    brand: "Home Centre",
    rating: 4.2,
    discount: 5,
    inStock: true
  },
  {
    title: "Desk Lamp",
    price: 1800,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c",
    category: "Home Decor",
    brand: "Philips",
    rating: 4.4,
    discount: 12,
    inStock: false
  },
  {
    title: "Water Bottle",
    price: 500,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8",
    category: "Fitness",
    brand: "Milton",
    rating: 4.1,
    discount: 9,
    inStock: true
  },
  {
    title: "Notebook",
    price: 150,
    image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57",
    category: "Stationery",
    brand: "Classmate",
    rating: 4.0,
    discount: 3,
    inStock: true
  },
  {
    title: "Pen",
    price: 50,
    image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd",
    category: "Stationery",
    brand: "Cello",
    rating: 4.2,
    discount: 2,
    inStock: true
  }
];
