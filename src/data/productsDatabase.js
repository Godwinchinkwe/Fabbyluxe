// Product Database with 8 Categories
import round from "./ProductImage/round-quartz.png"
import watch1 from "./ProductImage/watch1.png"
import watch3 from "./ProductImage/watch3.png"
import watch2 from "./ProductImage/watch2.png"
import watch4 from "./ProductImage/watch4.png"
import watch5 from "./ProductImage/watch5.png"
import watch6 from "./ProductImage/watch6.png"
import watch7 from "./ProductImage/watch7.png"
import watch8 from "./ProductImage/watch8.png"
import watch9 from "./ProductImage/watch9.png"

export const productsDatabase = [
  // Electronics (Category 1)
  {
    id: 1,
    name: 'Couple Fashion Romantic Business',
    category: 'watches',
    price: 18000,
    oldPrice:24000,
    image: watch1,
    rating: 4.5,
    reviews: 342,
    description: 'This isn’t just a watch — it’s a statement. Romantic Business Leisure Roman Scale Pointer Quartz Watch Set Suitable for Couples Daily Decoration Girlfriend Boyfriend Birthday Gift Graduation Season Party Christmas Halloween Valentines Day Perfect Gift for Girlfriend',
    inStock:true,
    badge: 'sale',
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Noise Cancellation': 'Active ANC',
      'Weight': '250g'
    }
  },
    {
    id: 31,
    name: 'Unisex Luxury quartz',
    category: 'watches',
    price: 18000,
    oldPrice:24000,
    image: watch3,
    rating: 4.5,
    reviews: 342,
    description: 'Luxury Quartz Watch with Roman Numerals, Date & Day Display, Green Dial & Golden-Tone Markers, -Accented Zinc Alloy Case & Bracelet, Casual & Formal Business Watch, Suitable for Women&women This isn’t just a watch — it’s a statement. This isn’t just a watch — it’s a statement. ',
    inStock:true,
    badge: 'sale',
    specifications: {
      'Battery Life': '30 hours',
      'Connectivity': 'Bluetooth 5.0',
      'Noise Cancellation': 'Active ANC',
      'Weight': '250g'
    }
  },
  {
    id: 2,
    name: 'Round Quartz wrist watch',
    category: 'watches',
    price: 12000,
    oldPrice: 18000,
    image: round,
    rating: 4.7,
    reviews: 289,
    description: '4pcs New Mens Luxury Fashion Round Quartz Watch and Braided Bracelet Combo Set for Daily Wear, Parties, Valentines Day, Men, Dad, Gift for Friends and Family. Gift Box Not Included.Designed for men who want to look sharp, confident, and successful.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Colour': 'Brown',
      'Resolution': 'Luxury Fashion',
      'Smart Features': 'Yes',
      'HDR': 'HDR10'
    }
  },
  {
    id: 3,
    name: 'Geneva Elegant Quartz',
    category: 'watches',
    price: 15509.,
    oldPrice: 19999,
    image: watch2,
    rating: 4.8,
    reviews: 156,
    description:'A Stylish And Elegant Quartz Watch Featuring a Round Display, Complemented by a Fashionable Plastic Strap. with Its Electronic Movement, It Is Precise And Durable. Designed for men who want to look sharp, confident, and successful',
    inStock: true,
    badge: 'new',
    specifications: {
      'Processor': 'Intel i7',
      'Graphics': 'RTX 3060',
      'RAM': '16GB',
      'Storage': '512GB SSD'
    }
  },
  {
    id: 4,
    name: 'Set of Men Stylish watch',
    category: 'watches',
    price: 23406,
    oldPrice: 27099,
    image: watch4,
    rating: 4.6,
    reviews: 512,
    description: 'Set of 4 MenS Stylish Watches, Designed for Business, Featuring an Alloy Case, Quartz Movement, Faux Leather And Alloy Straps, Powered by a Non-Rechargeable Button Battery, an Ideal Present for Holidays And FatherS Day. Designed for men who want to look sharp, confident, and successful',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Display': '6.7" OLED',
      'Camera': '108MP Triple',
      'Battery': '5000mAh',
      '5G': 'Yes'
    }
  },
    {
    id: 32,
    name: 'Set of Men Stylish watch',
    category: 'watches',
    price: 11240,
    oldPrice:18000,
    image: watch5,
    rating: 4.6,
    reviews: 512,
    description: '4pcs/set, Men-s Business Fashion Yellow Digital English Small Dial Pointer Round Quartz Watch & Brown Beads Woven String Bracelet Set, Gift for Him.Designed for men who want to look sharp, confident, and successful.',
    inStock: true,
    badge: 'sales',
    specifications: {
      'Display': '6.7" OLED',
      'Camera': '108MP Triple',
      'Battery': '5000mAh',
      '5G': 'Yes'
    }
  },
      {
    id: 33,
    name: 'Geneva Equisite For Men',
    category: 'watches',
    price: 12370,
    oldPrice: null,
    image: watch7,
    rating: 4.6,
    reviews: 512,
    description: '2pcs/Set Exquisite MenS Quartz Timepieces And Fashionable Stainless Steel Watch Chains - Fashionable, Durable, - Perfect Gift for ValentineS Day, FatherS Day for Dad Or Boyfriend.Designed for men who want to look sharp, confident, and successful.',
    inStock: true,
    badge: 'sales',
    specifications: {
      'Display': '6.7" OLED',
      'Camera': '108MP Triple',
      'Battery': '5000mAh',
      '5G': 'Yes'
    }
  },
        {
    id: 34,
    name: 'Geneva Equisite For Men',
    category: 'watches',
    price: 13955,
    oldPrice: null,
    image: watch6,
    rating: 4.6,
    reviews: 512,
    description: '2pcs/Set Exquisite MenS Quartz Timepieces And Fashionable Stainless Steel Watch Chains - Fashionable, Durable, - Perfect Gift for ValentineS Day, FatherS Day for Dad Or Boyfriend.Designed for men who want to look sharp, confident, and successful.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Display': '6.7" OLED',
      'Camera': '108MP Triple',
      'Battery': '5000mAh',
      '5G': 'Yes'
    }
  },
          {
    id: 35,
    name: 'Fensir Exquisite For Men',
    category: 'watches',
    price: 19955,
    oldPrice: null,
    image: watch8,
    rating: 4.6,
    reviews: 512,
    description: 'A Trendy Casual Watch for Men, Part of The MenS Work Log Collection, Featuring a Middle Eastern Style, Roman Numerals, a Calendar, And a Steel Band. Ideal for Work, Shopping, And Parties, Making It a Great Gift Option for Holidays',
    inStock: true,
    badge: 'new',
    specifications: {
      'Display': '6.7" OLED',
      'Camera': '108MP Triple',
      'Battery': '5000mAh',
      '5G': 'Yes'
    }
  },
  {
    id: 36,
    name: 'Diamond Exquisite Unisex',
    category: 'watches',
    price: 11495,
    oldPrice: null,
    image: watch9,
    rating: 4.6,
    reviews: 512,
    description: 'MenS 6pcs Casual Fashion Quartz Watch Set - Includes a Round Dial Watch, Square Pendant Bracelet, Necklace, Earrings, And Ring, Ideal for Sports Trends, a Great Gift for Him',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Display': '6.7" OLED',
      'Camera': '108MP Triple',
      'Battery': '5000mAh',
      '5G': 'Yes'
    }
  },
  {
    id: 45,
    name: '5pcs Mens Quartz Watch & Bracelet Set',
    category: 'watches',
    price: 12499,
    oldPrice: null,
    image: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/76c1a3a25d3f92edc74fa31199fe1d21.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 512,
    description: '5pcs Mens Fashion Quartz Watch and Bracelet Set, Designed for Business,, Quartz Movement, Faux Leather And Alloy Straps, Powered by a Non-Rechargeable Button Battery, an Ideal Present for Holidays And FatherS Day',
    inStock: true,
    badge: 'sales',
    specifications: {
      'Display': '6.7" OLED',
      'Camera': '108MP Triple',
      'Battery': '5000mAh',
      '5G': 'Yes'
    }
  },


  // Accessories (Category 2)
  {
    id: 5,
    name: 'Leather Braclet - Vintage Infinity Bead',
    category: 'accessories',
    price: 3500,
    oldPrice: 5279,
    image: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/fe8e0d36932e182e5899d04d2ab53862.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.4,
    reviews: 234,
    description: 'Mens 4pcs Mobius Loop Denim Faux Leather Bracelet Set - Vintage Infinity Bead Multi-Layer Band for Rock & Carnival Fashion, Band, Faux Leather. Designed for men who want to look sharp, confident, and successful.' ,
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': '100% Genuine Leather',
      'Lining': 'Polyester',
      'Closure': 'Zipper',
      'Care': 'Professional Clean'
    }
  },
  {
    id: 6,
    name: 'Retro Minimalist Style Blue Light Blocking Glasses ',
    category: 'accessories',
    price: 6329,
    oldPrice: null,
    image: 'https://img.kwcdn.com/product/open/371c91514ca04905ba7c04dfe1fc9ee2-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.5,
    reviews: 189,
    description: 'Retro Minimalist Style Blue Light Blocking Glasses with Square Frames And Imitation Wood Grain Temples. Designed to Reduce Eye Strain from Digital Screens, These Glasses Are Perfect for Both Work and Leisure. Suitable for Men and Women.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Material': 'Cotton Blend',
      'Pattern': 'Floral',
      'Fit': 'Regular',
      'Occasion': 'Casual'
    }
  },
  {
    id: 7,
    name: 'Anti-Blue Light Glasses',
    category: 'accessories',
    price: 7160,
    oldPrice: null,
    image: 'https://img.kwcdn.com/product/fancy/99dcfd9e-f873-4263-8e3f-b94e92814b84.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.7,
    reviews: 445,
    description: 'Anti-Blue Light Glasses - Black Metal Frame with Anti-Eye Strain Lens, Modern Y2K Computer Glasses for Men & Women, Lightweight Metal Frame Eyewear with, Compatible with Smartphones, Tablets, Laptops - Office, Gaming, Everyday Use, Techfriendly Eyewear, Sleek Eyewear Design, Durable Eyeglasses, Office Accessories, Stylish Frames, Sturdy Hinges, Digital Users',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Type': 'Running',
      'Cushioning': 'Max Comfort',
      'Upper': 'Breathable Mesh',
      'Sole': 'Rubber'
    }
  },
  {
    id: 37,
    name: 'Cross Faltw Necklace',
    category: 'accessories',
    price: 3050,
    oldPrice: 5302,
    image: 'https://img.kwcdn.com/product/fancy/79e88309-4617-400c-a3a5-483f3003c119.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: 'The Stylish And Exquisite Minimalist Cross Faltw Necklace Is Perfect for Everyday Outfits, Making It an Ideal Accessory For. It Serves As a Perfect Birthday Gift, Anniversary Present, Jewelry Gift, Party Favor, Or Holiday Gift for Women.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Premium Leather',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
   {
    id: 38,
    name: 'Trendy Cross Double Layered Necklace',
    category: 'accessories',
    price: 3020,
    oldPrice: 5302,
    image: 'https://img.kwcdn.com/product/open/0f7a0dcfadb548c687189a7e7ecb0398-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: 'The Stylish And Exquisite Minimalist Cross Faltw Necklace Is Perfect for Everyday Outfits, Making It an Ideal Accessory For. It Serves As a Perfect Birthday Gift, Anniversary Present, Jewelry Gift, Party Favor, Or Holiday Gift for Women.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Premium Leather',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
   {
    id: 40,
    name: 'Oil-Dripped Cross Pendant Designed',
    category: 'accessories',
    price: 3500,
    oldPrice: 5302,
    image: 'https://img.kwcdn.com/product/fancy/eed49df3-3a5c-41fc-bbcc-665e4f21853a.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: 'A Minimalist Oil-Dripped Cross Pendant Designed in a Baroque Style, Exuding a Sense of Sophistication And Versatility for MenS Fashion',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Clear Lenses ',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
   {
    id: 39,
    name: 'Unisex Square Glasses',
    category: 'accessories',
    price: 4000,
    oldPrice: 5302,
    image: 'https://img.kwcdn.com/product/open/c4122d1b0cc54c1c8c81e0f4aa6bd642-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: 'Unisex Square Glasses That Are Suitable for Everyday Wear, Featuring Clear Lenses And a Lightweight, Comfortable Design',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Clear Lenses ',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
  {
    id: 41,
    name: ' Unisex Religious Faith Jewelry',
    category: 'accessories',
    price: 3700,
    oldPrice: 5802,
    image: 'https://img.kwcdn.com/product/Fancyalgo/VirtualModelMatting/8ea0975234c76dd274476de6be59f568.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: '1pc Classic Fashion Mens Cross Pendant Necklace, Unisex Religious Faith Jewelry Gift, Suitable For Any Occasion Wear',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Clear Lenses ',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
  {
    id: 42,
    name: ' Unisex Religious Faith Jewelry',
    category: 'accessories',
    price: 3700,
    oldPrice: 5802,
    image: 'https://img.kwcdn.com/product/open/3f834111301147a091f732cf79abdff4-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: '1pc Classic Fashion Mens Cross Pendant Necklace, Unisex Religious Faith Jewelry Gift, Suitable For Any Occasion Wear',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Clear Lenses ',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
  {
    id: 43,
    name: ' Handwoven Faux Leather Braided',
    category: 'accessories',
    price: 3500,
    oldPrice: 5299,
    image: 'https://img.kwcdn.com/product/fancy/86bca519-f5be-45b9-adc3-fe0ffe6bc1bf.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: 'Autumn-Winter Fashion All-in-One Leaf Alloy Accessory Handwoven Faux Leather Braided Unisex Outdoor Wear 4pcs Gift Box Set',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Clear Lenses ',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
  {
    id: 46,
    name: 'A Pair of Ladies Claw-set Rhinestone Earrings',
    category: 'accessories',
    price: 3000,
    oldPrice: 4299,
    image: 'https://img.kwcdn.com/product/fancy/306d1ec4-dbc2-4394-a424-ec842f86142f.jpg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: 'A Pair of Ladies Claw-set Rhinestone Earrings, Dazzling, Luxurious, Elegant, and Chic, Suitable for Wearing on Various Occasions',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Clear Lenses ',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },
  {
    id: 47,
    name: ' Vintage Artistic Plain Glass',
    category: 'accessories',
    price: 5000,
    oldPrice: 7299,
    image: 'https://img.kwcdn.com/product/open/28d8c9be5e3a44b69039b72128151557-goods.jpeg?imageView2/2/w/800/q/70/format/avif',
    rating: 4.6,
    reviews: 178,
    description: '1 Pair of Vintage Artistic Plain Glasses - Minimalist Round Non- Frames, Black Frame - Unisex Daily and Formal Eyewear, Suitable for Daily Commuting',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Material': 'Clear Lenses ',
      'Compartments': 'Multiple',
      'Closure': 'Zipper',
      'Strap': 'Adjustable'
    }
  },

  // Home & Living (Category 3)
  {
    id: 9,
    name: 'Modern Sofa Set',
    category: 'home',
    price: 899.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=500',
    rating: 4.5,
    reviews: 267,
    description: '3-seater modern sofa with premium upholstery and comfort.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Seating': '3-Seater',
      'Material': 'Fabric',
      'Frame': 'Solid Wood',
      'Assembly': 'Required'
    }
  },
  {
    id: 10,
    name: 'Luxury Bedding Set',
    category: 'home',
    price: 149.99,
    oldPrice: 199.99,
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=500',
    rating: 4.8,
    reviews: 423,
    description: 'Premium cotton bedding set with duvet cover and pillowcases.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Material': '100% Cotton',
      'Thread Count': '800',
      'Set Includes': 'Duvet + Pillows',
      'Size': 'Queen'
    }
  },
  {
    id: 11,
    name: 'Contemporary Table Lamp',
    category: 'home',
    price: 79.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500',
    rating: 4.4,
    reviews: 156,
    description: 'Stylish table lamp with adjustable brightness settings.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Style': 'Contemporary',
      'Light Source': 'LED',
      'Dimmable': 'Yes',
      'Height': '18 inches'
    }
  },
  {
    id: 12,
    name: 'Persian Area Rug',
    category: 'home',
    price: 349.99,
    oldPrice: 449.99,
    image: 'https://images.unsplash.com/photo-1600166898405-da9535204843?w=500',
    rating: 4.7,
    reviews: 198,
    description: 'Hand-woven area rug with traditional Persian design.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Size': "8' x 10'",
      'Material': 'Wool',
      'Pattern': 'Persian',
      'Made': 'Handmade'
    }
  },

  // Beauty & Personal Care (Category 4)
  {
    id: 13,
    name: 'Anti-Aging Face Serum',
    category: 'beauty',
    price: 59.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500',
    rating: 4.6,
    reviews: 534,
    description: 'Premium anti-aging serum with vitamin C and hyaluronic acid.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Volume': '30ml',
      'Key Ingredients': 'Vitamin C, Hyaluronic Acid',
      'Skin Type': 'All Types',
      'Cruelty-Free': 'Yes'
    }
  },
  {
    id: 14,
    name: 'Professional Hair Dryer',
    category: 'beauty',
    price: 89.99,
    oldPrice: 119.99,
    image: 'https://images.unsplash.com/photo-1522338140262-f46f5913618a?w=500',
    rating: 4.5,
    reviews: 312,
    description: 'Ionic hair dryer with multiple heat and speed settings.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Power': '1875W',
      'Technology': 'Ionic',
      'Settings': 'Multiple',
      'Attachments': '2 Included'
    }
  },
  {
    id: 15,
    name: 'Makeup Brush Set',
    category: 'beauty',
    price: 49.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=500',
    rating: 4.7,
    reviews: 421,
    description: 'Professional makeup brush set with 12 essential brushes.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Pieces': '12 Brushes',
      'Bristles': 'Synthetic',
      'Handle': 'Wood',
      'Case': 'Included'
    }
  },
  {
    id: 16,
    name: 'Luxury Perfume Set',
    category: 'beauty',
    price: 129.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500',
    rating: 4.8,
    reviews: 267,
    description: 'Premium fragrance collection with three signature scents.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Set Includes': '3 Bottles',
      'Volume': '50ml each',
      'Type': 'Eau de Parfum',
      'Notes': 'Floral, Woody, Citrus'
    }
  },

  // Sports & Fitness (Category 5)
  {
    id: 17,
    name: 'Yoga Mat Premium',
    category: 'sports',
    price: 39890.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
    rating: 4.6,
    reviews: 389,
    description: 'Non-slip yoga mat with extra cushioning for comfort.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Thickness': '6mm',
      'Material': 'TPE',
      'Length': '72 inches',
      'Non-Slip': 'Yes'
    }
  },
  {
    id: 18,
    name: 'Adjustable Dumbbell Set',
    category: 'sports',
    price: 19989.99,
    oldPrice: 24990.99,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=500',
    rating: 4.7,
    reviews: 234,
    description: 'Space-saving adjustable dumbbells with quick weight selection.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Weight Range': '5-52.5 lbs',
      'Increments': '2.5 lbs',
      'Material': 'Steel',
      'Stand': 'Included'
    }
  },
  {
    id: 19,
    name: 'Fitness Tracker Watch',
    category: 'sports',
    price: 149.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500',
    rating: 4.5,
    reviews: 512,
    description: 'Advanced fitness tracker with heart rate monitoring and GPS.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Display': 'AMOLED',
      'Battery': '7 days',
      'GPS': 'Built-in',
      'Water Resistant': '50m'
    }
  },
  {
    id: 20,
    name: 'Resistance Band Set',
    category: 'sports',
    price: 2909.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=500',
    rating: 4.4,
    reviews: 445,
    description: 'Complete resistance band set with multiple resistance levels.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Bands': '5 Pieces',
      'Resistance': 'Light to Heavy',
      'Material': 'Latex',
      'Accessories': 'Included'
    }
  },

  // Books & Media (Category 6)
  {
    id: 21,
    name: 'Bestselling Novel Collection',
    category: 'books',
    price: 49.99,
    oldPrice: 69.99,
    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500',
    rating: 4.8,
    reviews: 678,
    description: 'Collection of top bestselling novels from award-winning authors.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Books': '5 Novels',
      'Genre': 'Fiction',
      'Format': 'Hardcover',
      'Language': 'English'
    }
  },
  {
    id: 22,
    name: 'Educational Learning Kit',
    category: 'books',
    price: 79.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500',
    rating: 4.6,
    reviews: 289,
    description: 'Interactive learning kit for children with books and activities.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Age Range': '6-12 years',
      'Content': 'Books + Activities',
      'Subjects': 'Multiple',
      'Interactive': 'Yes'
    }
  },
  {
    id: 23,
    name: 'Cookbook Collection',
    category: 'books',
    price: 39.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500',
    rating: 4.7,
    reviews: 356,
    description: 'Comprehensive cookbook collection with recipes from around the world.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Books': '3 Cookbooks',
      'Recipes': '500+',
      'Cuisines': 'International',
      'Format': 'Paperback'
    }
  },

  // Toys & Games (Category 7)
  {
    id: 24,
    name: 'Board Game Family Pack',
    category: 'toys',
    price: 59.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=500',
    rating: 4.6,
    reviews: 423,
    description: 'Collection of classic board games for family entertainment.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Games': '4 Included',
      'Players': '2-6',
      'Age': '8+',
      'Duration': 'Varies'
    }
  },
  {
    id: 25,
    name: 'Remote Control Car',
    category: 'toys',
    price: 89.99,
    oldPrice: 109.99,
    image: 'https://images.unsplash.com/photo-1558584673-c834fb56d7e5?w=500',
    rating: 4.5,
    reviews: 312,
    description: 'High-speed remote control car with all-terrain capabilities.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Speed': '30 mph',
      'Battery': 'Rechargeable',
      'Range': '100m',
      'Terrain': 'All-Terrain'
    }
  },
  {
    id: 26,
    name: 'Building Blocks Set',
    category: 'toys',
    price: 69.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=500',
    rating: 4.8,
    reviews: 567,
    description: 'Creative building blocks set with 1000+ pieces.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Pieces': '1000+',
      'Material': 'ABS Plastic',
      'Age': '6+',
      'Compatible': 'Yes'
    }
  },

  // Garden & Outdoor (Category 8)
  {
    id: 27,
    name: 'Garden Tool Set',
    category: 'garden',
    price: 79.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500',
    rating: 4.5,
    reviews: 234,
    description: 'Complete gardening tool set with ergonomic handles.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Pieces': '10 Tools',
      'Material': 'Stainless Steel',
      'Handles': 'Ergonomic',
      'Bag': 'Included'
    }
  },
  {
    id: 28,
    name: 'Outdoor Patio Furniture',
    category: 'garden',
    price: 499.99,
    oldPrice: 599.99,
    image: 'https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=500',
    rating: 4.7,
    reviews: 178,
    description: 'Weather-resistant patio furniture set for outdoor relaxation.',
    inStock: true,
    badge: 'sale',
    specifications: {
      'Pieces': '4-Piece Set',
      'Material': 'Wicker',
      'Weather Resistant': 'Yes',
      'Cushions': 'Included'
    }
  },
  {
    id: 29,
    name: 'Smart Sprinkler System',
    category: 'garden',
    price: 199.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=500',
    rating: 4.6,
    reviews: 267,
    description: 'WiFi-enabled smart sprinkler system with app control.',
    inStock: true,
    badge: 'new',
    specifications: {
      'Zones': '8',
      'Control': 'WiFi/App',
      'Weather Aware': 'Yes',
      'Installation': 'Easy'
    }
  },
  {
    id: 30,
    name: 'LED Garden Lights',
    category: 'garden',
    price: 49.99,
    oldPrice: null,
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=500',
    rating: 4.4,
    reviews: 389,
    description: 'Solar-powered LED garden lights for pathway illumination.',
    inStock: true,
    badge: 'bestseller',
    specifications: {
      'Lights': '12 Pack',
      'Power': 'Solar',
      'Brightness': 'Adjustable',
      'Waterproof': 'Yes'
    }
  }
];

export const categories = [
  { id: 'watches', name: 'Wrist Watches', icon: 'FaLaptop' },
  { id: 'accessories', name: 'Accessories', icon: 'FaTshirt' },
  { id: 'home', name: 'Home & Living', icon: 'FaHome' },
  { id: 'beauty', name: 'Beauty & Personal Care', icon: 'FaSpa' },
  { id: 'sports', name: 'Sports & Fitness', icon: 'FaDumbbell' },
  { id: 'books', name: 'Books & Media', icon: 'FaBook' },
  { id: 'toys', name: 'Toys & Games', icon: 'FaGamepad' },
  { id: 'garden', name: 'Garden & Outdoor', icon: 'FaLeaf' }
];
