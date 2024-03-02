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
            username: 'me',
            displayName: 'User Second',
            phone: '+996545433434',
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
            title: 'title 1',
            description: "text1",
            image: 'fixtures/test-image.jpg',
            price: 500,
        }, {
            user: user1._id,
            category: category2._id,
            title: 'title 2',
            description: "text1",
            image: 'fixtures/test-image.jpg',
            price: 500,
        },
        {
            user: user2._id,
            category: category3._id,
            title: 'title 3',
            description: "text1",
            image: 'fixtures/test-image.jpg',
            price: 500,
        }, {
            user: user2._id,
            category: category3._id,
            title: 'title 4',
            description: "text1",
            image: 'fixtures/test-image.jpg',
            price: 500,
        },
    );
    await db.close();
};

void run();



