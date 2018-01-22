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
          profile_image: "https://images-na.ssl-images-amazon.com/images/I/41PxhFG1VTL.png",
          contact: '(877) 252-1062',
          tags: 'jobs, recruiter, employment',
          loginType: 'advertiser'
        },
        {
          email: 'nature@box.com',
          hashed_password: '1234',
          name: "Nature Box",
          website: "https://naturebox.com/",
          location: "San Fancisco, CA",
          summary: "We are a deliever service that offers healthy snacks delievered right to your door",
          demo: 'Males and females of all ages',
          profile_image: "https://tctechcrunch2011.files.wordpress.com/2014/04/naturebox-snacksontable.jpg",
          contact: 'naturebox@accelerationpartners.com',
          tags: 'snacks, naturebox, health, nuts, hungry, food',
          loginType: 'advertiser'
        },
        {
          email: 'lyft@lyft.com',
          hashed_password: '1234',
          name: "lyft",
          website: "https://www.lyft.com/",
          location: "San Fancisco, CA",
          summary: "Lyft is an on-demand transportation company based in San Francisco, California. It develops, markets and operates the Lyft car transportation mobile app",
          demo: 'Males and females of all ages',
          profile_image: "https://s3.amazonaws.com/lyft-assets/gift/og-image-gift.png",
          contact: 'https://www.lyft.com/partnerships',
          tags: 'ride sharing, uber, lyft, transportation, ride',
          loginType: 'advertiser'
        },
        {
          email: 'for@hims.com',
          hashed_password: '1234',
          name: "For Hims",
          website: "https://www.forhims.com/",
          location: "San Fancisco, CA",
          summary: "hims is a men’s wellness brand dedicated to empowering men to be the best version of themselves through proactivity around health and preventative self-care. With hims, men have easier and more affordable access to FDA-approved, medical-grade products across an array of categories including skin, hair loss and sexual wellness. We connect men with a staff of credible doctors to receive necessary prescriptions for preventative care, while the direct-to-consumer platform ensures products are available at 80% less than what’s currently offered over the counter or through prescription.",
          demo: 'Males 25-55',
          profile_image: "https://www.forhims.com/home/Hims_Home_LearnMore_01.jpg",
          contact: 'mailto:press@forhims.com',
          tags: 'health, hair, men, shampoo',
          loginType: 'advertiser'
        },
        {
          email: 'bolls@branch.com',
          hashed_password: '1234',
          name: "Bolls & Branch",
          website: "https://www.bollandbranch.com/",
          location: "San Fancisco, CA",
          summary: "Boll & Branch was founded in 2014 with a simple mission: produce sheets that feel good, inside and out. After coming up empty-handed to questions about the quality and origin of an in-store bed sheet, Scott and Missy Tannen realized they were onto something; so, they began to dig. What they unearthed was an industry that needed change.",
          demo: 'Males and females 21-55',
          profile_image: "https://www.shescribes.com/wp-content/uploads/2014/02/Boll-and-Branch-Bedding.jpg",
          contact: '800-678-3234',
          tags: 'home, bed, sheets',
          loginType: 'advertiser'
        },
        {
          email: 'quip@quip.com',
          hashed_password: '1234',
          name: 'Quip',
          website: 'https://www.getquip.com/products',
          location: '45 Main St Brooklyn, NY 11201',
          summary: "we design products that guide good habits (and exclude the gimmicks that don't to simplify a healthy routine! Quip is a new(ish) electric toothbrush that is very, very pretty. There are two models: a $25 plastic one (either blue or green), and a $45 metal one (silver, gold, black, or copper). When you buy a Quip, you also sign up to get a replacement brush head delivered to you every three months",
          demo: 'All ages',
          profile_image: 'http://www.brandchannel.com/wp-content/uploads/2017/04/quip-toothbrushes-range-1024x576.jpg',
          contact: 'partners@getquip.com',
          tags: 'teeth, dental, clean, design, brush',
          loginType: 'advertiser'
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
          tags: 'razors, shave, men, butter, shower',
          loginType: 'advertiser'
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
          tags: 'adultswim, Cartoon, animated, comedy, tv',
          loginType: 'advertiser'
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
          tags: 'razors, shave, men, butter, shower',
          loginType: 'advertiser'
        },
      ]);
    });
};
