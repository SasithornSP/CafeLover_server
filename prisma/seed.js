const { date } = require('zod');
const prisma =require('../configs/prisma')

const categories = [
    {
        id: 1,
        name: "Coffee"
    },
    {
        id: 2,
        name: "Tea"
    }
]
const productData = [
    {
        id: 1,
        image: "https://i.pinimg.com/736x/9c/0b/b5/9c0bb5d32b8427edaec6398479db840c.jpg",
        name: "Americano",
        description: "เอสเพรสโซ่ + น้ำ",
        price: 90,
        categoryId: 1
      },
      {
        id: 2,
        image: "https://i.pinimg.com/736x/a5/29/a7/a529a766ae2e8577b07d232b615e7316.jpg",
        name: "Latte",
        description: "เอสเพรสโซ่ + นม",
        price: 110,
        categoryId: 1
      },
      {
        id: 3,
        image: "https://i.pinimg.com/736x/f1/4e/70/f14e7007806beed9f34ff9cf733e5e52.jpg",
        name: "Mocha",
        description: "เอสเพรสโซ่ + นม + ช็อกโกแลต",
        price: 120,
        categoryId: 1
      },
      {
        id: 4,
        image: "https://i.pinimg.com/736x/f8/00/2a/f8002a4817cffce8bd434b79290d44b0.jpg",
        name: "Caramel Macchiato",
        description: "เอสเพรสโซ่ + นม + ซอสคาราเมล",
        price: 130,
        categoryId: 1
      },
      {
        id: 5,
        image: "https://i.pinimg.com/736x/52/cf/3f/52cf3fa9e77fd775fe2614c1568df44c.jpg",
        name: "Espresso Tonic",
        description: "เอสเพรสโซ่ + โทนิค",
        price: 130,
        categoryId: 1
      },
      {
        id: 6,
        image: "https://i.pinimg.com/736x/9d/f5/05/9df5056452487f63014dfd3bdb6f35c9.jpg",
        name: "Flat White",
        description: "เอสเพรสโซ่ + นมเนียนละเอียด",
        price: 110,
        categoryId: 1
      },
      {
        id: 7,
        image: "https://i.pinimg.com/736x/6f/10/1a/6f101a41ca9a7426ba2323b5ed076318.jpg",
        name: "Café au Lait",
        description: "กาแฟดำ + นม",
        price: 100,
        categoryId: 1
      },
      {
        id: 8,
        image: "https://i.pinimg.com/736x/a0/ff/cf/a0ffcfabafc5368c1770b6dfd1867997.jpg",
        name: "Vietnamese Coffee",
        description: "กาแฟเวียดนาม + นมข้นหวาน",
        price: 100,
        categoryId: 1
      },
      {
        id: 9,
        image: "https://i.pinimg.com/736x/30/9b/0f/309b0f8f8fd98fb5da5d916ab6272060.jpg",
        name: "Hazelnut Latte",
        description: "เอสเพรสโซ่ + นม + เฮเซลนัทไซรัป",
        price: 120,
        categoryId: 1
      },
      {
        id: 10,
        image: "https://i.pinimg.com/736x/8e/36/2e/8e362e193e88957b13a5c7e5a125344a.jpg",
        name: "Honey Coffee",
        description: "เอสเพรสโซ่ + น้ำผึ้ง + นม",
        price: 110,
        categoryId: 1
      },
      {
        id: 11,
        image: "https://i.pinimg.com/736x/4b/05/d0/4b05d0772acb205c8481bb1db1fb7408.jpg",
        name: "Black Tea",
        description: "ชาดำ + น้ำ",
        price: 90,
        categoryId: 2
      },
      {
        id: 12,
        image: "https://i.pinimg.com/736x/66/94/18/669418a7ce785579a11e5c6ffd261828.jpg",
        name: "Green Tea",
        description: "ชาเขียว + น้ำ",
        price: 110,
        categoryId: 2
      },
      {
        id: 13,
        image: "https://i.pinimg.com/736x/55/a1/8d/55a18d0389b9d223533da10ce0376987.jpg",
        name: "Matcha Latte",
        description: "ผงมัทฉะ + นม",
        price: 140,
        categoryId: 2
      },
      {
        id: 14,
        image: "https://i.pinimg.com/736x/92/38/02/9238022ed34c8666cfbc622578fb073b.jpg",
        name: "Earl Grey Tea",
        description: "ชาดำ + น้ำมันเบอร์กาม็อท + น้ำ",
        price: 90,
        categoryId: 2
      },
      {
        id: 15,
        image: "https://i.pinimg.com/736x/c1/c2/3e/c1c23ea8b41145d6e1b5ff69916bacf9.jpg",
        name: "Chai Tea Latte",
        description: "ชาดำ + เครื่องเทศ + นม",
        price: 110,
        categoryId: 2
      },
      {
        id: 16,
        image: "https://i.pinimg.com/736x/59/51/3f/59513f458ee89e204e4aaddff1082415.jpg",
        name: "Jasmine Tea",
        description: "ชามะลิ + น้ำ",
        price: 95,
        categoryId: 2
      },
      {
        id: 17,
        image: "https://i.pinimg.com/736x/2f/c5/9d/2fc59d2c8f0a1a589479013e7fde3356.jpg",
        name: "Oolong Tea",
        description: "ชาอู่หลง + น้ำ",
        price: 110,
        categoryId: 2
      },
      {
        id: 18,
        image: "https://i.pinimg.com/736x/bc/87/60/bc8760a65e45726959dfb0368b32a3bb.jpg",
        name: "Hojicha Latte",
        description: "ชาโฮจิฉะ + นม",
        price: 130,
        categoryId: 2
      },
      {
        id: 19,
        image: "https://i.pinimg.com/736x/13/04/1a/13041a8337d2ed322e8dc19a37e97d7e.jpg",
        name: "Thai Milk Tea",
        description: "ชาดำ + นมข้นหวาน + นมข้นจืด",
        price: 100,
        categoryId: 2
      },
      {
        id: 20,
        image: "https://i.pinimg.com/736x/92/77/bb/9277bbd2c9aa8df867f5af49556a58dd.jpg",
        name: "Honey Lemon Tea",
        description: "ชาดำ + น้ำผึ้ง + น้ำมะนาว",
        price: 110,
        categoryId: 2
      },
   ]
//npx prisma db seed
console.log('DB seed...');

async function createCategories() {
    try {
        await prisma.category.createMany({data: categories})
    } catch (error) {
        console.error("Error creating categories:", error)
    }
}
createCategories()

async function seedDB() {
    try {
      await prisma.product.createMany({ data: productData });
      console.log('Database seeded successfully!');
    } catch (error) {
      console.error('Error seeding database:', error);
    } 
    // finally {
    //   await prisma.$disconnect(); // ปิดการเชื่อมต่อฐานข้อมูล
    // }
  }
seedDB()