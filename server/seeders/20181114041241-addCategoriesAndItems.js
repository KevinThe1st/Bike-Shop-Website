'use strict';
const truncate = require('../test/truncate.js');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Bike',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Brand',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Gear',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Misc.',
        type: null,
        parentId: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const categories = await queryInterface.sequelize.query(
      `SELECT id from CATEGORIES;`
    );
    const categoryRows = categories[0];

    await queryInterface.bulkInsert('Categories', [
      {
        name: 'Mountain Bike',
        type: null,
        parentId: categoryRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Road Bike',
        type: null,
        parentId: categoryRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Shirts',
        type: null,
        parentId: categoryRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Tools',
        type: null,
        parentId: categoryRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    await queryInterface.bulkInsert('Items', [
      {
        name: 'Trek Domane 4.0 Disc',
        price: 2199.99,
        stock: 2,
        descShort: 'Carbon hydraulic disc break road bike',
        descLong: 'Put the 4 Series Domane through its paces and revel in its unmatched ride quality and quickness. Graced with race-winning Trek technology like defense-grade OCLV carbon tubing, IsoSpeed, and stable endurance geometry, the Domane is a true game changer. It masters long, epic rides with ease while also giving you unrivaled speed and comfort over the roughest roads that dare to challenge you. If the going gets too rough, know you can stop on a dime with TRP hydraulic disc' + 'brakes. The 4.0 comes equipped with a tapered carbon fork for responsive cornering, a wide-range Shimano Sora 9-speed drivetrain, and a full complement of Bontrager components so it climbs uphill as quickly as it climbs up race categories.',
        picName: '../assets/shop2.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Domane AL 3',
        price: 1019.99,
        stock: 3,
        descShort: 'Versatile aluminum road bike for the avid cyclist',
        descLong: 'Domane AL 3 is smooth, stable, and confidence-inspiring. Perfect for new riders and anyone looking to upgrade to an aluminum road bike built for a comfortable riding experience.  The quality parts are ready to tackle fast group rides and adventures that stray from the beaten path to rougher roads.',
        picName: '../assets/shop1.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emonda SLR 6 H2',
        price: 3799.99,
        stock: 4,
        descShort: 'Trek\'s lightest production road line ever',
        descLong: 'Every detail of the Emonda line, from frame design to each component choice on every model, serves the same audacious goal: to create the lightest line of production road bikes ever offered.',
        picName: '../assets/shop3.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Speed Concept',
        price: 4199.99,
        stock: 1,
        descShort: 'Carbon DuraAce component TT bike for the fastest cyclists',
        descLong: 'Speed Concept is a lot of thigns, but above all, its fast.  Its our most aerodynamic bike, which makes it an ideal triathlon bike and a great choice for TT enthusiasts who know every second matters. Plus, its an exceptional value: adjustability, integration, customization options, carbon aero wheels, and an 11-speed drivetrain-all in a super aero bike built for flat-out speed.',
        picName: '../assets/shop4.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emonda SL 5',
        price: 1899.99,
        stock: 10,
        descShort: 'Great entry-level carbon road bike',
        descLong: 'Emonda SL 5 is the gateway to carbon road bike models in our lightest road bike family.  Its fast and light, with a balanced ride quality, superior handling characteristics, and a parts group thats fast and dependable over the long haul.  Its a great choice for century rides on hilly terrain, fast climbs, and speedy descents.',
        picName: '../assets/shop5.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Emonda SL 5 WSD',
        price: 2099.99,
        stock: 8,
        descShort: 'SL 5 Womens road bike',
        descLong: 'Emonda SL 5 Womens is fast and lightweight womens carbon road bike, with a balanced ride quality, superior handling characteristics, touchpoints designed speciffically for women, and parts group thats fast and dependable over the long haul.',
        picName: '../assets/shop6.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Domane SLR F/S',
        price: 2499.99,
        stock: 8,
        descShort: 'Frameseet for the Domae SLR',
        descLong: 'Smooth advantage, front and adjustable rear IsoSpeed decouplers, and 600 series OCLV Carbon frame lets you ride stronger and longer',
        picName: '../assets/shop7.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Castelli Distanza Jersey FZ',
        price: 239.99,
        stock: 50,
        descShort: 'Cycling jersey for the avid road cyclist',
        descLong: 'The all new Castelli Distanza Jersey features aerodynamic mesh that is guaranteed to make you go faster on your ride!',
        picName: '../assets/shop8.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smith Podium TT Helmet',
        price: 349.99,
        stock: 20,
        descShort: 'Lightweight aero TT helmet',
        descLong: 'AirEvac Ventilation and two exhaust vents provide laminar airflow for the optimal aerodynamic performance.',
        picName: '../assets/shop9.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Smith Vantage MIPS Helmet',
        price: 159.99,
        stock: 30,
        descShort: 'Aerodynamic comfortable helmet for a range of cyclists',
        descLong: 'Hybrid shell construction and aerocore featuring Koroyd gives a low-profile dual regulated helmet with climate control.',
        picName: '../assets/shop10.png',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bell Sports Air Attack High Power Air Pump',
        price: 16.99,
        stock: 70,
        descShort: 'Reliable floor pump for standard bicycles',
        descLong: 'Bell sports 350 volume bicycle floor pump offers reliable high pressured tire filling.',
        picName: '../assets/shop11.png',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});

    const categories2 = await queryInterface.sequelize.query(
      `SELECT id from CATEGORIES;`
    );
    const categoryRows2 = categories2[0];

    const items = await queryInterface.sequelize.query(
      `SELECT id from ITEMS;`
    );
    const itemRows = items[0];

    return await queryInterface.bulkInsert('ItemCategories', [
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[0].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[3].id,
        itemId: itemRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[4].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[2].id,
        itemId: itemRows[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[0].id,
        itemId: itemRows[3].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[1].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[5].id,
        itemId: itemRows[2].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[1].id,
        itemId: itemRows[5].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[2].id,
        itemId: itemRows[6].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[3].id,
        itemId: itemRows[7].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[8].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[9].id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        categoryId: categoryRows2[4].id,
        itemId: itemRows[10].id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      truncate(),
      queryInterface.bulkDelete('ItemCategories', null, {}),
      queryInterface.bulkDelete('Items', null, {}),
    ])
  }
};
