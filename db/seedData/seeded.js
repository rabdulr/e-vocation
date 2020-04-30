
const client = require('../client');
const { users, posts, bids, contracts, ratings, comments, chats } = require('../models');
const { Users, Posts, Bids, Contracts, Ratings, Comments, Chats } = require('../models/constructors')

const runSeed = async() => {
    //Users using Users constructor
    const jack = await users.create(new Users('Jack', 'Skellington', null, '1540 Froom Ranch Way', 'San Luis Obispo', 'CA', '93405', '35.250420', '-120.689770', 'Jack', 'JackPass'));

    const eva = await users.create(new Users('Eva', 'Winters', null, '817 Palm', 'San Luis Obispo', 'CA', '93401', '35.281440', '-120.663700', 'Eva', 'EvasPass'));

    const guy = await users.create(new Users('Guy', 'Fieri', null, '1005 Monterey St', 'San Luis Obispo', 'CA', '93401', '35.281690', '-120.661060', 'Guy', 'FLAVORTOWN'));

    const admin = await users.create(new Users('Capstone', 'Admin', 'E-Vocation', 'Local Host', 'Atascadero', 'CA', '93422', '35.488892', '-120.667732', 'Admin', 'AdminPass'));

    await client.query('UPDATE users SET role=$1 WHERE id=$2 RETURNING *', ['ADMIN', admin.id]);

    const santa = await users.create(new Users('Santa', 'Claus', 'Christmas', '4141 Postmark Dr', 'Anchorage', 'AK', '99530', '61.181210', '-149.984060', 'Santa', 'SantaPass'));

    const gordon = await users.create(new Users( 'Gordon', 'Ramsey', 'Hell\'s Kitchen', '888 Higuera', 'San Luis Obispo', 'CA', '93401', '35.28051186', '-120.66195073', 'Gordon', 'GordonPass'));

    await client.query('UPDATE users SET role=$1 WHERE id=$2 RETURNING *', ['COMPANY', gordon.id]);

    await client.query('UPDATE users SET role=$1 WHERE id=$2 RETURNING *', ['COMPANY', santa.id]);

    //Posts using Posts constructor
    const item1 = await posts.createSeed(new Posts(jack.id, null, 'Create Santa Land', 'Make Halloween Town into an amazing winter wonderland! We are a bunch of ghouls and monsters who know nothing', 'Packaging', `${jack.address}, ${jack.city}, ${jack.state}, ${jack.zip}`, `${jack.latitude}`, `${jack.longitude}`, new Date('2020-5-20'), new Date('2020-5-25'), 1000, 'Active'));

    const item2 = await posts.createSeed(new Posts(eva.id, gordon.id, 'Cater My Event', 'I am hosting an event that needs to be catered to 1000 people and the food needs to be excellent. Anything less is a travesty', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, `${eva.latitude}`, `${eva.longitude}`, new Date('2020-5-31'), new Date('2020-5-31'), 1000000, 'Active'));

    const item3 = await posts.createSeed(new Posts(eva.id, gordon.id, 'Fancy Hot Dogs','Hosting a fashion show. The models have ice to chew. Guests can have fancy hot dogs', 'Food', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, `${eva.latitude}`, `${eva.longitude}`, new Date('2020-5-10'), new Date('2020-5-10'), 10000, 'Active'));

    const item4 = await posts.createSeed(new Posts(eva.id, admin.id, 'Create a Post','This site is cool, but i\'m so confused... someone help me make a post', 'Tech', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, `${eva.latitude}`, `${eva.longitude}`, new Date('2020-5-1'), new Date('2020-5-1'), 10000, 'Completed'));

    const item5 = await posts.createSeed(new Posts(eva.id, admin.id, 'Delete a post','Ok, so now i feel really silly and am looking to remove a post. Someone help?', 'Tech', `${eva.address}, ${eva.city}, ${eva.state}, ${eva.zip}`, `${eva.latitude}`, `${eva.longitude}`, new Date('2020-5-2'), new Date('2020-5-2'), 10000, 'Completed'));

    const item6 = await posts.createSeed(new Posts(guy.id, null, 'Surprise Birthday Party','I am throwing a birthday party for my son and I need a clown and fireworks expert', 'Entertainment', `${guy.address}, ${guy.city}, ${guy.state}, ${guy.zip}`, `${guy.latitude}`, `${guy.longitude}`, new Date('2020-5-14'), new Date('2020-5-14'), 10000, 'Active'));

    const item7 = await posts.createSeed(new Posts(guy.id, null, 'Taste Test','I need new tasters for my ULTRA-SPICY sauce after previous tasters hospitalized', 'Food', `${guy.address}, ${guy.city}, ${guy.state}, ${guy.zip}`, `${guy.latitude}`, `${guy.longitude}`, new Date('2020-5-26'), new Date('2020-5-26'), 10000, 'Active'));

    //await client.query('UPDATE posts SET status=$1 WHERE "userId"=$2 RETURNING *', ['Completed', eva.id]);

    //Comments using Comments Constructor
    const com1 = await comments.create(new Comments(item2.id, gordon.id, 'What do you mean fancy? Need details!'));
    const com2 = await comments.create(new Comments(item2.id, santa.id, 'How do you feel about cookies as an entree?'));
    const com3 = await comments.create(new Comments(item2.id, eva.id, 'Cookies? Fancy? I\'m not the cooks. You are!'));

    //Bids using Bids constructor
    const bid1 = await bids.create(new Bids(item1.id, jack.id, santa.id, 'Jolly good! My elves can set a very festive holiday for you! We will do it for free!', 0));

    const bid2 = await bids.create(new Bids(item2.id, eva.id, gordon.id, 'You have got to be joking. What kind of event is this? Who\'s attending? I need more information', 50000));

    const bid3 = await bids.create(new Bids(item2.id, eva.id, santa.id, 'We can do this for free!', 0));

    const bid4 = await bids.create(new Bids(item3.id, eva.id, gordon.id, 'This is a weird request. But it sounds interesting', 500));

    const bid5 = await bids.create(new Bids(item4.id, eva.id, admin.id, 'This should never have been posted.', 0));

    const bid6 = await bids.create(new Bids(item5.id, eva.id, admin.id, 'Seriously learn how to internet. You should not be here.', 0));

    //Contracts using Contracts constructor
    const contract1 = await contracts.create(new Contracts(eva.id, gordon.id, item2.id, 'I will cook your damn food.', 'Completed'))

    const contract2 = await contracts.create(new Contracts(eva.id, gordon.id, item3.id, "Fancy hot dogs? You'll get what you get. Calm down.", 'Active'))

    const contract3 = await contracts.create(new Contracts(eva.id, admin.id, item5.id, "You again? Use Google. Google is your friend.", 'Completed'))

    const contract4 = await contracts.create(new Contracts(eva.id, admin.id, item4.id, "You must be new here. Check your chat messages", 'Completed'))

    //Ratings using Ratings constructor
    const rating1 = await ratings.create(new Ratings(contract1.id, gordon.id, 5, 'You were rude, annoying, and I could not stand you. I will hire you again in a heartbeat.'))

    const rating2 = await ratings.create(new Ratings(contract1.id, eva.id, 1, 'Fancy hot dogs? You had no idea what you wanted. It was horrible working with you.'))

    //seeding some chat messages
    const chat01 = await chats.create(new Chats(santa.id, jack.id, "Ho Ho Ho! did you get my bid proposal?"))

    const chat02 = await chats.create(new Chats(jack.id, santa.id, "sure did, but its not much of a bid being free and all"))

    const chat03 = await chats.create(new Chats(santa.id, jack.id, "Sounds like the best bid you've gotten yet!"))

    const chat04 = await chats.create(new Chats(jack.id, santa.id, "Yea but actually it'd be better if you bid something for tax purposes"))

    const chat05 = await chats.create(new Chats(santa.id, jack.id, "Ho Ho Ho! Well I couldn't do that, isn't that illigal??"))

    const chat06 = await chats.create(new Chats(jack.id, santa.id, " Don't worry about it, you are Santa, no ones going to put you in jail"))

    const chat08 = await chats.create(new Chats(gordon.id, eva.id, "I'm ready to cook for you."))

};

module.exports = {runSeed}
