exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('podcasts').del()
    .then(function() {
      // Inserts seed entries
      return knex('podcasts').insert([{
          email: 'kill@tony.com',
          password: '1234',
          name: "Kill Tony",
          itunes_url: "https://itunes.apple.com/us/podcast/kill-tony/id1042361179?mt=2",
          website: "http://www.deathsquad.tv/category/kill-tony/",
          reader: 'Tony Hinchcliffe',
          summary: "The weekly live show recorded at the world famous Comedy Store with your hosts Tony Hinchcliffe and Brian Redban.",
          demo: '20 - 40 males and females.',
          subject: 'Comedy',
          profile_image: 'http://is1.mzstatic.com/image/thumb/Music62/v4/a2/28/46/a22846be-aa37-a34f-b0b1-82f2eda98fff/source/1200x630bb.jpg',
          images: '',
          contact: 'jakem@avalon-usa.com',
          tags: 'comedian Tony Hinchcliffe live comedy store Redban funny'
        },
        {
          email: 'jre@jre.com',
          password: '1234',
          name: 'The Joe Rogan Experience',
          itunes_url: 'https://itunes.apple.com/us/podcast/the-joe-rogan-experience/id360084272?mt=2',
          website: 'http://podcasts.joerogan.net/',
          reader: 'Joe Rogan',
          summary: "The Joe Rogan Experience podcast is a long form conversation hosted by comedian, UFC color commentator, and actor Joe Rogan with friends and guests that have included comedians, actors, musicians, MMA instructors and commentators, authors, and artists. The Joe Rogan Experience was voted the Best Comedy Podcast of 2012 on iTunes. In addition online listening, fans can watch a videocast of the show live on Ustream or tune in on Sirius XM’s “The Virus” channel on Saturdays at Noon ET and Sundays at 5:00 AM and 6:00 PM ET.",
          demo: '25 - 40 males',
          subject: 'Talk',
          profile_image: "http://is4.mzstatic.com/image/thumb/Music127/v4/d0/e6/5f/d0e65f81-c2cf-7f59-38e4-6abcfab7e38a/source/1200x630bb.jpg",
          images: '',
          contact: 'jresponsorship@joerogan.net',
          tags: 'joe rogan comedy'
        },
        {
          email: 'star@talk.com',
          password: '1234',
          name: 'Star Talk',
          itunes_url: "https://itunes.apple.com/us/podcast/startalk-radio/id325404506?mt=2",
          website: "https://www.startalkradio.net/",
          reader: 'Neil deGrasse Tyson',
          summary: "StarTalk is a podcast on space, science, and popular culture hosted by astrophysicist Neil deGrasse Tyson, with various comic and celebrity co-hosts and frequent guests from the worlds of science and entertainment.",
          demo: "30 - 40 males and females.",
          subject: 'Science',
          profile_image: "http://is2.mzstatic.com/image/thumb/Music62/v4/8e/0a/70/8e0a7014-9ccc-b532-5eb7-2b803d1a571a/source/1200x630bb.jpg",
          images: '',
          contact: 'advertising@startalkradio.net',
          tags: 'science space neil degreasse tyson'
        },
        {
          email: 's@town.com',
          password: '1234',
          name: 'S Town',
          itunes_url: "https://itunes.apple.com/us/podcast/s-town/id1212558767?mt=2",
          website: "https://stownpodcast.org/",
          reader: 'Brian Reed',
          summary: "S-Town is a new podcast from Serial and This American Life, hosted by Brian Reed, about a man named John who despises his Alabama town and decides to do something about it. He asks Brian to investigate the son of a wealthy family who’s allegedly been bragging that he got away with murder. But then someone else ends up dead, and the search for the truth leads to a nasty feud, a hunt for hidden treasure, and an unearthing of the mysteries of one man’s life.",
          demo: "30 - 40 males and females.",
          subject: 'Personal Journal',
          profile_image: "http://is3.mzstatic.com/image/thumb/Music111/v4/e3/6f/f6/e36ff694-9e7d-c46e-7687-3856749d670f/source/1200x630bb.jpg",
          images: '',
          contact: 'press@stownpodcast.org',
          tags: 'personal Journal clock NPR this american life'
        },
        {
          email: 'the@vergecast.com',
          password: '1234',
          name: 'The Vergecast',
          itunes_url: "https://itunes.apple.com/us/podcast/the-vergecast/id430333725?mt=2",
          website: "https://art19.com/shows/vergecast",
          reader: 'Nilay Patel',
          summary: "The Vergecast is your source for an irreverent and informative look at what's happening right now (and next) in the world of technology and gadgets. Hosted by Nilay Patel and Dieter Bohn, alongside a cavalcade of tech luminaries, Vergecast is the only podcast you need to make sense of the week in tech news. And your life.",
          demo: "30 - 40 tech enthusiasts",
          subject: 'Technology',
          profile_image: "http://is5.mzstatic.com/image/thumb/Music19/v4/b5/f3/1e/b5f31eaa-a3d3-2c30-377f-cc74713cc07b/source/1200x630bb.jpg",
          images: '',
          contact: 'https://www.theverge.com/contact-the-verge',
          tags: 'science technology tech apple samsung'
        },
      ]);
    });
};
