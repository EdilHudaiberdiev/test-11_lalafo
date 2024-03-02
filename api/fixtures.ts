import mongoose from 'mongoose';
import config from './config';
import Item from './models/./Item';
import Category from './models/Category';
import User from './models/User';


const dropCollection = async (
    db: mongoose.Connection,
    collectionName: string,
) => {
    try {
        await db.dropCollection(collectionName);
    } catch (e) {
        console.log(`Collection ${collectionName} was missing, skipping drop...`);
    }
};

const run = async () => {
    await mongoose.connect(config.mongoose.db);
    const db = mongoose.connection;

    const collections = ['users' , 'categories', 'items'];

    for (const collectionName of collections) {
        await dropCollection(db, collectionName);
    }

    const [user1, user2] = await User.create({
            username: 'user1',
            displayName: 'User First',
            phone: '+996555243434',
            password: '123',
            token: '1'
        },
        {
            username: 'user2',
            displayName: 'User Second',
            phone: '+9965458888',
            password: '123',
            token: '2'
        });

    const [category1, category2, category3] = await Category.create(
        {
            title: "Computers",
        },
        {
            title: "Cars",
        },
        {
            title: "Clothes",
        },
    );

    await Item.create(
        {
            user: user1._id,
            category: category1._id,
            title: 'Computer for sale',
            description: "used computers fos sale",
            image: 'fixtures/comp1.jpg',
            price: 17000,
        },

        {
            user: user1._id,
            category: category2._id,
            title: 'Computer for sale, only today',
            description: "Black Friday sale",
            image: 'fixtures/comp2.jpg',
            price: 15000,
        },
        {
            user: user1._id,
            category: category2._id,
            title: 'Sale family crossover',
            description: "V3.3, not crashed",
            image: 'fixtures/car1.jpg',
            price: 80000,
        },

        {
            user: user1._id,
            category: category2._id,
            title: 'Cars for sale',
            description: "USED CARS, LOW PRICE",
            image: 'fixtures/car2.jpg',
            price: 120000,
        },
        {
            user: user2._id,
            category: category3._id,
            title: 'clothes for sale',
            description: "low price",
            image: 'fixtures/clothes1.jpg',
            price: 2500,
        }, {
            user: user2._id,
            category: category3._id,
            title: 'clothes for sale',
            description: "low price",
            image: 'fixtures/clothes2.jpeg',
            price: 1500,
        },
    );
    await db.close();
};

void run();



