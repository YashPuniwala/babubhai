export interface Artist {
  name: string;
  image: string | null;
  instagram: string | null;
}

export interface ArtistCategory {
  id: string;
  label: string;
  shortLabel: string;
  direction: 'left' | 'right';
  duration: number;
  artists: Artist[];
}

export const ARTIST_CATEGORIES: ArtistCategory[] = [
  {
    id: 'actor-female',
    label: 'Actor — Female',
    shortLabel: 'ACTOR / FEMALE',
    direction: 'left',
    duration: 36,
    artists: [
      { name: 'Manjari Fadnis',      image: '/images/actor-female/Manjari_Fadnnis.jpg',        instagram: 'https://www.instagram.com/manjarifadnis/' },
      { name: 'Mugdha Godse',        image: '/images/actor-female/mugdha_veira.jpg',           instagram: 'https://www.instagram.com/mugdhagodse/' },
      { name: 'Kainaat Arora',       image: '/images/actor-female/kaineet_arora.jpg',          instagram: 'https://www.instagram.com/ikainaatarora/' },
      { name: 'Bidita Bag',          image: '/images/actor-female/Bidita_Bag.jpg',             instagram: 'https://www.instagram.com/biditabag/' },
      { name: 'Shraddha Nigam',      image: '/images/actor-female/Shraddha_Nigam.jpg',         instagram: 'https://www.instagram.com/shraddhanigam.official/' },
      { name: 'Sapna Sikarwar',      image: '/images/actor-female/Sapna_Sikarwar.jpg',         instagram: 'https://www.instagram.com/sapna_sikarwar08/' },
      { name: 'Arshin Mehta',        image: '/images/actor-female/arshin_mehta.webp',          instagram: 'https://www.instagram.com/arshinmofficial/' },
      { name: 'Sherlin Seth',        image: '/images/actor-female/sherlinsheth.jpg',          instagram: 'https://www.instagram.com/sherlinseth/' },
      { name: 'Sonika Jehan',        image: '/images/actor-female/Sonika_Jihan.jpg',           instagram: 'https://www.instagram.com/sonikaajihan/' },
      { name: 'Alliviya Mukkherjee', image: '/images/actor-female/Allivviya_Mukkherjee.webp', instagram: 'https://www.instagram.com/reel/DAGBYlCoPVf/?igsh=MTVpejdyM3J3NGtvMw==' },
      { name: 'Puja Pradyut',        image: '/images/actor-female/Puja_Prodyut.jpg',          instagram: 'https://www.instagram.com/pujaaprodyut/' },
      { name: 'Riya Kapoor',         image: '/images/actor-female/Riya_Kapoor.jpg',           instagram: 'https://www.instagram.com/riyaakapoor416/' },
      { name: 'Navpreet Kaur',       image: '/images/actor-female/Navpreet_Kaur.jpg',         instagram: 'https://www.instagram.com/navpreetkaur01/' },
      { name: 'Aarti Sharma',        image: '/images/actor-female/aarti_sharma.jpg',           instagram: 'https://www.instagram.com/aartisharmaoriginal/' },
    ],
  },
  {
    id: 'actor-male',
    label: 'Actor — Male',
    shortLabel: 'ACTOR / MALE',
    direction: 'right',
    duration: 38,
    artists: [
      { name: 'Sharman Joshi',      image: '/images/actor_male/sharman_joshi.jpg',     instagram: 'https://www.instagram.com/sharmanjoshi/' },
      { name: 'Rajnish Duggal',     image: '/images/actor_male/rajneesh_duggal.jpg',    instagram: 'https://www.instagram.com/rajneesh_duggal_02/' },
      { name: 'Hitu Kanodia',       image: '/images/actor_male/Hitu_Kanodia.png',       instagram: 'https://www.instagram.com/hitukanodia/' },
      { name: 'Hiten Tejwani',      image: '/images/actor_male/hiten_tejwani.webp',     instagram: 'https://www.instagram.com/hitentejwani/' },
      { name: 'Manav Gohil',        image: '/images/actor_male/manav_gohil.jpg',                                        instagram: 'https://www.instagram.com/manavgohil/' },
      { name: 'Amar Upadhyay',      image: '/images/actor_male/Amar_Upadhyay.jpeg',     instagram: 'https://www.instagram.com/amarupadhyay_official/' },
      { name: 'Sharad Malhotra',    image: '/images/actor_male/Sharad_Malhotra.jpg',    instagram: 'https://www.instagram.com/sharadmalhotra009/' },
      { name: 'Nishant Malkani',    image: '/images/actor_male/Nishant Malkan.jpg',     instagram: 'https://www.instagram.com/nishantsinghm_official/' },
      { name: 'Fahman Khan',        image: '/images/actor_male/fahmaan_khan.jpg',       instagram: 'https://www.instagram.com/fehman3/' },
      { name: 'Dev Sharma',         image: '/images/actor_male/Dev_Sharmaa.jpg',        instagram: 'https://www.instagram.com/idevsharma/' },
      { name: 'Vinay Anand',        image: '/images/actor_male/Vinay_anand.jpg',        instagram: 'https://www.instagram.com/vinayanand786/' },
      { name: 'Kashyap Barbhaya',   image: '/images/actor_male/Kashyap_Barbhaya.jpg',   instagram: 'https://www.instagram.com/yourskashyap/' },
    ],
  },
  {
    id: 'character-female',
    label: 'Character — Female',
    shortLabel: 'CHARACTER / FEMALE',
    direction: 'left',
    duration: 32,
    artists: [
      { name: 'Mandakini',          image: '/images/character_female/Mandakini.jpg',              instagram: 'https://www.instagram.com/mandakiniofficial/' },
      { name: 'Sujata Mehta',       image: '/images/character_female/sujata_Mehta.jpg',          instagram: 'https://www.instagram.com/sujatamehtaofficial/' },
      { name: 'Supriya Karnik',     image: '/images/character_female/supriya_karnik.jpg',        instagram: 'https://www.instagram.com/supriya_karnik_official/' },
      { name: 'Sudha Chandran',     image: '/images/character_female/Sudha_Chandran.jpg',        instagram: 'https://www.instagram.com/sudhachandranfanclub/' },
      { name: 'Sonika Gill',        image: '/images/character_female/Sonika_Gill.jpg',            instagram: 'https://www.instagram.com/officialsonikagill/' },
      { name: 'Varsha Usgaonkar',   image: '/images/character_female/Varsha_Usgaonker.jpg',     instagram: 'https://www.instagram.com/varshausgaonker/' },
      { name: 'Gargi Patel',        image: '/images/character_female/gargii_patel.jpeg',         instagram: 'https://www.instagram.com/gargii.patel/' },
      { name: 'Maya Yadav',         image: '/images/character_female/Maya_Yadav.jpg',            instagram: 'https://www.instagram.com/maya.yadav_offical/' },
      { name: 'Vaishnavi Macdonald',image: '/images/character_female/Vaishnavi_Macdonald.webp', instagram: 'https://www.instagram.com/vaishnavimacdonald_official/' },
      { name: 'Garima Agarwal',     image: '/images/character_female/Garima_Agnihotri_Agarwal.jpg', instagram: 'https://www.instagram.com/actress_garimaagarwal_official/' },
      { name: 'Pushpa Verma',       image: '/images/character_female/pushpa_verma.webp',         instagram: 'https://www.instagram.com/pushpaverma_6/' },
    ],
  },
  {
    id: 'character-male',
    label: 'Character — Male',
    shortLabel: 'CHARACTER / MALE',
    direction: 'right',
    duration: 48,
    artists: [
      { name: 'Darshan Jariwala',   image: '/images/character_male/darshan_jariwala.jpg',   instagram: 'https://www.instagram.com/jariwalladarshan/' },
      { name: 'Rahul Dev',          image: '/images/character_male/Rahul_Dev.jpg',           instagram: 'https://www.instagram.com/rahuldevofficial/' },
      { name: 'Shakti Kapoor',      image: '/images/character_male/Shakti_Kapoor.jpeg',      instagram: 'https://www.instagram.com/shaktikapoor/' },
      { name: 'Dalip Tahil',        image: '/images/character_male/Dalip_Tahil.jpg',          instagram: 'https://www.instagram.com/daliptahil/' },
      { name: 'Bijendra Kala',      image: '/images/character_male/bijendra_kalal.jpeg',     instagram: 'https://www.instagram.com/bijjugkalaa/' },
      { name: 'Milind Gunaji',      image: '/images/character_male/Milind_Gunaji.webp',      instagram: 'https://www.instagram.com/milindgunaji/' },
      { name: 'Govind Namdev',      image: '/images/character_male/Govind_Namdev.avif',      instagram: 'https://www.instagram.com/realgovindnamdev/' },
      { name: 'Ali Asgar',          image: '/images/character_male/Ali_Asgar.jpg',           instagram: 'https://www.instagram.com/kingaliasgar/' },
      { name: 'Sudesh Berry',       image: '/images/character_male/Sudesh_Berry.avif',       instagram: 'https://www.instagram.com/sudeshberry/' },
      { name: 'Atul Srivastava',    image: '/images/character_male/Atul_Srivastava.jpg',     instagram: 'https://www.instagram.com/atul_srivastava31/' },
      { name: 'Yashpal Sharma',     image: '/images/character_male/Yashpal_Sharmajpg.jpg',   instagram: 'https://www.instagram.com/iyashpalsharma/' },
      { name: 'Mahesh Thakur',      image: '/images/character_male/Mahesh_Thakur.jpg',       instagram: 'https://www.instagram.com/official_mahesh_thakur/' },
      { name: 'Anant Mahadevan',    image: '/images/character_male/Anant_Mahadevan.jpg',    instagram: 'https://www.instagram.com/ananthmahadevanofficial/' },
      { name: 'Akhilendra Mishra',  image: '/images/character_male/Akhilendra_Mishra.jpg',  instagram: 'https://www.instagram.com/akhilendram/' },
      { name: 'Anang Desai',        image: '/images/character_male/Anang_Desai.jpg',         instagram: 'https://www.instagram.com/desaianang/' },
      { name: 'Anurag Prapanna',    image: '/images/character_male/Anurag_Prapanna.avif',   instagram: 'https://www.instagram.com/anuraag_prapanna/' },
      { name: 'Pankaj Berry',       image: '/images/character_male/Pankaj_Berry.jpg',        instagram: 'https://www.instagram.com/pankajberry.official/' },
      { name: 'Shekhar Shukla',     image: '/images/character_male/Shekhar_Shukla.jpg',     instagram: 'https://www.instagram.com/shekharshukla.06/' },
      { name: 'Naveen Bawa',        image: '/images/character_male/Naveen_Bawa.jpg',         instagram: 'https://www.instagram.com/naveenbawa1/' },
      { name: 'Ashok Samarth',      image: '/images/character_male/Ashok_Samarth.jpg',      instagram: 'https://www.instagram.com/ashoksamarth/' },
      { name: 'Shahbaaz Khan',     image: '/images/character_male/Shahbaaz_Khan.avif',     instagram: 'https://www.instagram.com/reel/DPBHhZvkdCG/?hl=en' },
      { name: 'Mehul Buch',         image: '/images/character_male/Mehul_Buch.avif',        instagram: 'https://www.instagram.com/buchmehulofficial/' },
      { name: 'Hemant Pandey',      image: '/images/character_male/Hemant_Pandey.jpg',      instagram: 'https://www.instagram.com/hemantpandeyji/' },
      { name: 'Paintal',            image: '/images/character_male/Paintal.jpg',             instagram: 'https://www.instagram.com/paintalofficial/' },
      { name: 'Aroon Bakshi',       image: '/images/character_male/Aroon_Bakshi.jpg',       instagram: 'https://www.instagram.com/bakshiaroon/' },
      { name: 'Heital Puniwala',    image: '/images/character_male/hetal_puniwala.jpg',     instagram: 'https://www.instagram.com/hetalpuniwala_official/' },
    ],
  },
];

/**
 * Log warnings for artists without images (dev only).
 * Call once on mount in the ArtistListSection component.
 */
export function logMissingImages(): void {
  if (import.meta.env.DEV) {
    ARTIST_CATEGORIES.forEach((category) => {
      category.artists.forEach((artist) => {
        if (!artist.image) {
          console.warn(
            `No image found for: ${artist.name} (${category.id})`
          );
        }
      });
    });
  }
}
