// js/data.js

const cloudName = 'dphdjjfvr';

const slideData = [
    {
        id: 1,
        type: 'video',
        // REPLACE with your actual Cloudinary ID for Muzica Populara
        cloudinaryId: 'v1778750404/muzica-populara_tycoja',
        mainColor: '#dbdada',
        secondaryColor: '#1A1A1A',
        invertLogo: false,
        links: {
            youtube: 'https://www.youtube.com/watch?v=8gjnvh8ExPo&list=PLbZn4O68h1F34fqdi0lPfZBukdtjENZnx',
            listen: 'https://orcd.co/muzicapopulara',
            audioUrl: 'https://res.cloudinary.com/dphdjjfvr/video/upload/v1778750164/Dreea_-_Muzica_Populara_v9qtpx.mp3' // Update to cloudinary link if uploaded there
        }
    },
    {
        id: 2,
        type: 'video',
        // This is the one from your link!
        cloudinaryId: 'v1778750402/scuze_veqzvh',
        mainColor: '#dbdada',
        secondaryColor: '#1A1A1A',
        invertLogo: false,
        links: {
            youtube: 'https://www.youtube.com/watch?v=X4wvbntnDfI&list=PLbZn4O68h1F34fqdi0lPfZBukdtjENZnx&index=2',
            listen: 'https://orcd.co/scuze',
            audioUrl: 'https://res.cloudinary.com/dphdjjfvr/video/upload/v1778750164/Dreea_-_Scuze_xfrqh5.mp3'
        }
    },
    {
        id: 3,
        type: 'video',
        cloudinaryId: 'v1778750401/ceau-bau_zlurfr',
        mainColor: '#dbdada',
        secondaryColor: '#1A1A1A',
        invertLogo: true,
        links: {
            youtube: 'https://www.youtube.com/watch?v=ihxxiyqWfNY&list=PLbZn4O68h1F34fqdi0lPfZBukdtjENZnx&index=3',
            listen: 'https://orcd.co/ceaubau',
            audioUrl: 'https://res.cloudinary.com/dphdjjfvr/video/upload/v1778750164/Dreea_-_Ceau_Bau_o6xrdp.mp3'
        }
    },
    {
        id: 4,
        type: 'image',
        // For images, Cloudinary uses /image/upload/ instead of /video/upload/
        cloudinaryId: 'v1778750400/ma-ntelegi_t8avpu',
        mainColor: '#dbdada',
        secondaryColor: '#1A1A1A',
        invertLogo: true,
        links: {
            youtube: 'https://www.youtube.com/watch?v=uRtGYW9ws-8&list=PLbZn4O68h1F34fqdi0lPfZBukdtjENZnx&index=4',
            listen: 'https://orcd.co/ma-ntelegi',
            audioUrl: 'https://res.cloudinary.com/dphdjjfvr/video/upload/v1778750164/Dreea_X_Bruja_-_Ma-ntelegi_l6ol8i.mp3'
        }
    },
    {
        id: 5,
        type: 'image',
        cloudinaryId: 'v1778750399/drama-pe-hartie_ufcs1a',
        mainColor: '#dbdada',
        secondaryColor: '#1A1A1A',
        invertLogo: true,
        links: {
            youtube: 'https://www.youtube.com/watch?v=R9mutf7KxUg&list=PLbZn4O68h1F34fqdi0lPfZBukdtjENZnx&index=5',
            listen: 'https://bfan.link/drama-pe-hartie',
            audioUrl: 'https://res.cloudinary.com/dphdjjfvr/video/upload/v1778750164/Dreea_-_Drama_pe_hartie_v0oprm.mp3'
        }
    }
];