/* =====================================================================
   PREMIERE LANDING PAGE — ALL TEXT & PICTURES LIVE HERE
   ---------------------------------------------------------------------
   Change any value below, save, refresh. No HTML or CSS needed.
   • Wrap a word in <em>…</em> to make it italic + accent colour in a headline.
   • {days} is replaced with TRIAL_DAYS from cloud-config.js.
   • Delete an item from a list to remove it; copy one to add another.
   • Two audiences: "couple" and "friends". Link straight to one with
     index.html?for=couple  or  index.html?for=friends  (great for ads).
   ===================================================================== */
window.SITE = {
  brand: {
    name: 'premiere',
    mark: 'P',
    tagline: 'A little cinema for the people who matter most.',
  },

  links: {
    create: 'gift-create.html',
    sample: 'netflix.html',
    signIn: 'login.html',
    myGifts: 'my-gifts.html',
  },

  nav: [
    { label: 'How it works', href: '#how' },
    { label: 'Two ways', href: '#ways' },
    { label: 'The experience', href: '#experience' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ],

  // Which audience shows first when someone arrives without ?for=
  defaultAudience: 'couple',
  switchLabel: 'Who is it for?',

  /* -------------------------------------------------------------------
     AUDIENCES — everything that changes when the visitor flips the switch
     ------------------------------------------------------------------- */
  audiences: {
    couple: {
      label: 'For my partner',
      icon: '♥',
      hero: {
        eyebrow: 'For the one you love',
        title: 'Their birthday. <em>Your love story.</em>',
        lead: 'Turn your photos, videos and inside jokes into a private, cinematic birthday page — a love letter they can press play on.',
        primaryCta: 'Make it for my partner',
        chips: ['Private — just the two of you', 'A love note as the finale', 'Ready before midnight'],
        previewTitle: 'Happy Birthday',
        previewDefaultName: 'My Love',
        previewPlaceholder: 'Their name or nickname',
        // Replace with real photos of the two of you for the best result.
        images: ['assets/netflix/slide-2.jpg', 'assets/netflix/slide-7.jpg', 'assets/netflix/slide-4.jpg', 'assets/netflix/slide-6.jpg'],
      },
      steps: {
        title: 'Three steps to <em>“you did this for me?”</em>',
        lead: 'No design skills, no editing apps. Just your favourite moments together.',
        items: [
          { icon: '♥', title: 'Start your love story', text: 'Add their name or nickname and a love note. Your private gift link is ready instantly.' },
          { icon: '＋', title: 'Add your moments', text: 'Upload photos and videos of you two — first dates, trips, silly selfies. Invite their best friends to add a surprise or two.' },
          { icon: '▶', title: 'Send it at midnight', text: 'Share one link when the clock strikes twelve. They get an intro, your story in rows, and your message as the finale.' },
        ],
      },
      roles: {
        title: 'Made by you, <em>starring them.</em>',
        items: [
          { tag: 'You', title: 'The storyteller', points: ['Pick the moments that tell your story', 'Write the note they’ll read last', 'Change any photo or line, any time'] },
          { tag: 'Close friends', title: 'Surprise guests (optional)', points: ['Send them the upload link', 'They add a video message or old photo', 'No app, no sign-up, no passwords'] },
          { tag: 'Your partner', title: 'The star of the show', points: ['A cinematic intro with their name', 'Your memories, like their own streaming app', 'Your love note as the finale'] },
        ],
      },
      ideas: {
        title: 'Ideas for <em>your story.</em>',
        lead: 'Not sure what to add? Start with these.',
        items: ['The first photo of you two', 'The day you met', 'Your first trip together', 'Every “us” selfie', 'Date nights', 'A video saying why you love them', 'Their favourite song moment', 'Places you’ll go next'],
      },
      messagePlaceholder: 'Happy birthday, my love. Here’s every moment I never want to forget…',
    },

    friends: {
      label: 'For friends & family',
      icon: '✦',
      hero: {
        eyebrow: 'For the people who make life a story',
        title: 'Every life deserves a <em>premiere.</em>',
        lead: 'Collect photos and videos from everyone who loves them, and turn it all into a private, cinematic birthday page they can press play on.',
        primaryCta: 'Create their gift',
        chips: ['Everyone adds their photos', 'Guests need no app or login', 'Free for {days} days'],
        previewTitle: 'Happy Birthday',
        previewDefaultName: 'Nuel',
        previewPlaceholder: 'Type a name',
        images: ['assets/netflix/hero-1.jpg', 'assets/netflix/moment-6.jpg', 'assets/netflix/moment-2.jpg', 'assets/netflix/moment-1.jpg'],
      },
      steps: {
        title: 'Three small steps. <em>One very big feeling.</em>',
        lead: 'You set the scene. Friends and family bring the memories. Then you share the surprise.',
        items: [
          { icon: '✧', title: 'Start their story', text: 'Sign in, add their name and a short note. You get a private gift link and a QR code instantly.' },
          { icon: '＋', title: 'Bring everyone in', text: 'Share the link in the group chat. Anyone can drop in photos and videos from their phone — no account needed.' },
          { icon: '▶', title: 'Press play together', text: 'On the big day, send them the link. They get an intro, their own profile, rows of memories and a finale.' },
        ],
      },
      roles: {
        title: 'One gift, <em>a whole crowd of love.</em>',
        items: [
          { tag: 'The organiser', title: 'You set it up', points: ['Create the gift in under two minutes', 'Share one link or a QR code', 'Edit any text or picture right on the page'] },
          { tag: 'Friends & family', title: 'They add the memories', points: ['Open the link, tap upload, done', 'Photos and videos straight from the camera roll', 'Grandparents included — it opens in any browser'] },
          { tag: 'The birthday star', title: 'They press play', points: ['A cinematic intro made just for them', 'Browse every memory like a streaming app', 'A slideshow and a personal finale message'] },
        ],
      },
      ideas: {
        title: 'Ideas to ask <em>everyone for.</em>',
        lead: 'Drop these into the group chat with the upload link.',
        items: ['Childhood photos from family', 'Old school & college pics', 'The best night out', 'Group trips', 'Birthday video wishes', 'Messages from people far away', 'Family celebrations', 'That one photo they hate (lovingly)'],
      },
      messagePlaceholder: 'Happy birthday! We all put this together for you…',
    },
  },

  // The "Two ways to celebrate" cards
  ways: {
    eyebrow: 'Two ways to celebrate',
    title: 'Who are you <em>making it for?</em>',
    cards: [
      {
        audience: 'couple',
        image: 'assets/netflix/slide-2.jpg',
        tag: 'For couples',
        title: 'A love letter they can press play on',
        text: 'Your relationship, told like a series. Just you, or with a little help from their best friends.',
        points: ['Your story in rows: firsts, trips, date nights', 'A love note as the grand finale', 'Perfect for a midnight surprise'],
        cta: 'Make it for my partner',
      },
      {
        audience: 'friends',
        image: 'assets/netflix/hero-1.jpg',
        tag: 'For friends & family',
        title: 'Everyone’s memories, one premiere',
        text: 'One link in the group chat. Friends, cousins and grandparents all add their favourite moments.',
        points: ['Unlimited contributors, no sign-up', 'Photos & videos from every phone', 'Great for milestone birthdays'],
        cta: 'Create a group gift',
      },
    ],
  },

  // The scrolling strip of memories under the hero
  reel: [
    'assets/netflix/moment-1.jpg', 'assets/netflix/slide-2.jpg', 'assets/netflix/moment-2.jpg',
    'assets/netflix/slide-7.jpg', 'assets/netflix/moment-6.jpg', 'assets/netflix/slide-4.jpg',
    'assets/netflix/slide-1.jpg', 'assets/netflix/slide-9.jpg', 'assets/netflix/moment-5.jpg',
    'assets/netflix/slide-5.jpg', 'assets/netflix/moment-3.jpg', 'assets/netflix/slide-6.jpg',
  ],

  experience: {
    eyebrow: 'The experience',
    title: 'Their story, <em>on the big screen.</em>',
    lead: 'From the first logo reveal to the final “Happy Birthday”, the page turns a pile of photos into something they’ll want to watch twice.',
    screenshot: 'assets/myflix/hero.jpg',
    screenshotAlt: 'Sample birthday page with a personal title, Play button and rows of photos',
    screenLabel: 'premiere / sample birthday page',
    features: [
      { title: 'Intro reveal', text: 'A logo animation that opens the show.' },
      { title: 'Who’s watching?', text: 'Profiles with the faces that love them.' },
      { title: 'Rows of memories', text: 'Special Moments, Top 10, Continue Watching.' },
      { title: 'Slideshow player', text: 'Photos and videos play like an episode.' },
      { title: 'The finale', text: 'Their name and your closing message.' },
      { title: 'Works on any screen', text: 'Phone, tablet, laptop or TV browser.' },
    ],
    cta: 'Open the sample page',
  },

  pricing: {
    eyebrow: 'Pricing',
    title: 'Start free. <em>Keep it forever.</em>',
    plans: [
      {
        name: 'Free trial',
        price: '₹0',
        period: 'for {days} days',
        text: 'Everything you need to make the gift and collect memories.',
        features: ['Unlimited contributors', 'Photos & videos', 'Private link + QR code', 'Full birthday experience'],
        note: 'Uploads are deleted automatically after {days} days.',
        cta: 'Start for free',
      },
      {
        name: 'Keep forever',
        // Leave price empty ('') to show "Coming soon".
        price: '',
        period: 'one-time',
        text: 'Make the gift permanent so they can rewatch it every year.',
        features: ['Everything in the free trial', 'Never expires', 'Memories kept safely in the cloud', 'Rewatch on every birthday'],
        note: 'Upgrade any time from your gift page.',
        cta: 'Create a gift first',
        featured: true,
        badge: 'Most loved',
      },
    ],
  },

  faq: {
    eyebrow: 'Good to know',
    title: 'A few things you might be wondering.',
    items: [
      { q: 'Can I make it just from me, for my partner?', a: 'Yes. You can add every photo and video yourself — inviting friends is completely optional.' },
      { q: 'Does the birthday person need an account?', a: 'No. They just open the viewing link and press play.' },
      { q: 'Do friends and family need to sign in to upload?', a: 'No. Anyone with the upload link can add photos and videos from any phone browser — no app, no account.' },
      { q: 'Who can see the gift?', a: 'Only people with the link. Each gift has a long, random code and there is no public gallery or search.' },
      { q: 'Can I preview it before sharing?', a: 'Yes. After creating a gift you get a link to open its birthday page, and you can <a href="netflix.html">explore the sample</a> right now.' },
      { q: 'What happens when the free trial ends?', a: 'After {days} days the gift expires and its uploads are deleted, unless you keep it forever.' },
      { q: 'Can I change the text and photos later?', a: 'Yes. Open the birthday page, tap Edit, then click any text or picture to change it.' },
    ],
  },

  closing: {
    eyebrow: 'The credits start with you',
    title: 'Make their next birthday <em>unforgettable.</em>',
    text: 'For the love of your life, or everyone who loves them.',
  },

  footer: {
    links: [
      { label: 'How it works', href: '#how' },
      { label: 'For couples', href: 'index.html?for=couple' },
      { label: 'For friends & family', href: 'index.html?for=friends' },
      { label: 'Sample page', href: 'netflix.html' },
      { label: 'My gifts', href: 'my-gifts.html' },
      { label: 'Sign in', href: 'login.html' },
    ],
    note: 'Made for birthdays, not feeds.',
    copyright: '© 2026 Premiere',
  },
};
