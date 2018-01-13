exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('advertisers').del()
    .then(function() {
      // Inserts seed entries
      return knex('advertisers').insert([{
          email: 'zip@recruiter.com',
          hashed_password: '1234',
          name: "Zip Recruiter",
          website: "https://www.ziprecruiter.com/",
          location: 'Santa Monica, CA',
          summary: "We’re Helping People Find Great Jobs and Helping Employers Build Great Companies",
          demo: 'Males and females ages 22 - 35',
          profile_image: "https://www.ziprecruiter.com/zrs/f810ae13/img/logos/ziprecruiter-blacktext.svg",
          contact: '(877) 252-1062',
          tags: ''
        },
        {
          email: 'nature@box.com',
          hashed_password: '1234',
          name: "Nature Box",
          website: "https://naturebox.com/",
          location: "San Fancisco, CA",
          summary: "We are a deliever service that offers healthy snacks delievered right to your door",
          demo: 'Males and females of all ages',
          profile_image: "https://naturebox.com/assets/images/logo_739x739.jpg",
          contact: 'naturebox@accelerationpartners.com',
          tags: 'snacks naturebox health nuts hungry food'
        },
        {
          email: 'quip@quip.com',
          hashed_password: '1234',
          name: 'Quip',
          website: 'https://www.getquip.com/products',
          location: '45 Main St Brooklyn, NY 11201',
          summary: "we design products that guide good habits (and exclude the gimmicks that don't to simplify a healthy routine! Quip is a new(ish) electric toothbrush that is very, very pretty. There are two models: a $25 plastic one (either blue or green), and a $45 metal one (silver, gold, black, or copper). When you buy a Quip, you also sign up to get a replacement brush head delivered to you every three months",
          demo: 'All ages',
          profile_image: 'https://workablehr.s3.amazonaws.com/uploads/account/logo/195847/quip_LOGO_raw.png',
          contact: 'partners@getquip.com',
          tags: 'teeth dental clean design brush'
        },
        {
          email: 'dsc@dsc.com',
          hashed_password: '1234',
          name: 'Dollar Shave Club',
          website: 'https://www.dollarshaveclub.com',
          location: 'Venice, Los Angeles, CA',
          summary: "Dollar Shave Club is a Venice, California-based company that delivers razors and other personal grooming products to customers by mail. It delivers razor blades on a monthly basis and offers additional grooming products for home delivery.",
          demo: 'Men ages 21 - 55',
          profile_image: 'https://fortunedotcom.files.wordpress.com/2015/03/dollar-shave-club-dubin-blades-ad-01.png',
          contact: 'partnerships@dollarshaveclub.com',
          tags: 'razors shave men butter shower'
        },
        {
          email: 'adult@swim.com',
          hashed_password: '1234',
          name: 'Adult Swim',
          website: 'https://www.adultswim.com',
          location: 'Atlanta, GA',
          summary: "Adult Swim is the adult-oriented nighttime programming block of the American children's cable network Cartoon Network, operating daily 8 p.m.–6 a.m. Eastern and Pacific Time.",
          demo: 'Men and women ages 16 - 35',
          profile_image: 'https://i0.wp.com/www.columbusunderground.com/wp-content/uploads/2016/08/adult-swim-02.jpg?fit=1200%2C738',
          contact: 'https://www.adultswim.com/footer/contact/',
          tags: 'adultswim Cartoon animated comedy tv'
        },
        {
          email: 'stitch@fix.com',
          hashed_password: '1234',
          name: 'Stitch Fix',
          website: 'https://www.stitchfix.com/',
          location: 'San Francisco, CA',
          summary: "Find clothes you'll actually love! Stitch Fix is personal styling for men & women that sends clothing to your door (with free shipping & returns). Get started!",
          demo: 'Men and women ages 21 - 65',
          profile_image: 'https://d1b5h9psu9yexj.cloudfront.net/21897/Stitch-Fix_20171018-180155_fullsize.jpg',
          contact: 'https://support.stitchfix.com/hc/en-us/requests/new?ticket_form_id=25334',
          tags: 'razors shave men butter shower'
        },
      ]);
    });
};
