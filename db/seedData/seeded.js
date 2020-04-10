
const client = require('../client');
const { companies, users, posts, bids, contracts } = require('../models');
const { Users, Companies, Posts, Bids, Contracts } = require('../models/constructors')
    
const runSeed = async() => {
    //Users using Users constructor
    const jack = await users.create(new Users('Jack', 'Skellington', '123 Halloween', 'Halloween Town', 'CA', '93405', 'Jack', 'JackPass'));
    
    const eva = await users.create(new Users('Eva', 'Winters', '888 Palm', 'San Luis Obispo', 'CA', '93401', 'Eva', 'EvasPass'));
    
    const admin = await users.create(new Users('Capstone', 'Admin', 'Local Host', 'Atascadero', 'CA', '93422', 'Admin', 'AdminPass'));
    
    await client.query('UPDATE users SET role=$1 WHERE id=$2 RETURNING *', ['ADMIN', admin.id]);
    
    //Companies using Companies constructor
    const santa = await companies.create(new Companies('Christmas', 'Christmas', '1 North Pole', 'North Pole', 'AK', '99501', 'Packaging', 'Santa', 'Claus', 'SantaPass'));
    
    const gordon = await companies.create(new Companies('Hell\'s Kitchen', 'Gordon', '888 Higuera', 'San Luis Obispo', 'CA', '93401', 'Catering', 'Gordon', 'Ramsey', 'GordonPass'));
    
    //Posts using Posts constructor
    const item1 = await posts.create(new Posts(jack.id, 'Create Santa Land', 'Make Halloween Town into an amazing winter wonderland! We are a bunch of ghouls and monsters who know nothing', 'Packaging', `${jack.address}, ${jack.city}, ${jack.state}, ${jack.zip}`, new Date('2020-9-20'), new Date('2020-10-25'), 1000));
    
    const item2 = await posts.create(new Posts(eva.id, 'Cater My Event', 'I am hosting an event that needs to be catered to 1000 people and the food needs to be excellent. Anything less is a travesty', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, new Date('2020-8-31'), new Date('2020-8-31'), 1000000));
    
    const item3 = await posts.create(new Posts(eva.id, 'Fancy Hot Dogs','Hosting a fashion show. The models have ice to chew. Guests can have fancy hot dogs', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, new Date('2020-7-31'), new Date('2020-7-31'), 10000));
    
    const item4 = await posts.create(new Posts(eva.id, 'Fancy Hot Dogs','Hosting a fashion show. The models have ice to chew. Guests can have fancy hot dogs', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, new Date('2020-7-31'), new Date('2020-7-31'), 10000));

    const item5 = await posts.create(new Posts(eva.id, 'Fancy Hot Dogs','Hosting a fashion show. The models have ice to chew. Guests can have fancy hot dogs', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, new Date('2020-7-31'), new Date('2020-7-31'), 10000));
    const item6 = await posts.create(new Posts(eva.id, 'Fancy Hot Dogs','Hosting a fashion show. The models have ice to chew. Guests can have fancy hot dogs', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, new Date('2020-7-31'), new Date('2020-7-31'), 10000));
    const item7 = await posts.create(new Posts(eva.id, 'Fancy Hot Dogs','Hosting a fashion show. The models have ice to chew. Guests can have fancy hot dogs', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, new Date('2020-7-31'), new Date('2020-7-31'), 10000));

    await client.query('UPDATE posts SET status=$1 WHERE "userId"=$2 RETURNING *', ['Accepted', eva.id]);
    
    //Bids using Bids constructor
    const bid1 = await bids.create(new Bids(item1.id, jack.id, santa.id, 'Jolly good! My elves can set a very festive holiday for you! We will do it for free!', 'Active', 0));
    
    const bid2 = await bids.create(new Bids(item2.id, eva.id, gordon.id, 'You have got to be joking. What kind of event is this? Who\'s attending? I need more information', 'Active', 50000));
    
    const bid3 = await bids.create(new Bids(item2.id, eva.id, gordon.id, 'We can do this for free!', 'Active', 0));
    
    //Contracts using Contracts constructor
    const contract1 = await contracts.create(new Contracts(eva.id, gordon.id, 'I will cook your damn food.', 'Active'))

};

module.exports = {runSeed}