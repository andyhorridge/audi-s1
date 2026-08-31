const galleryGrid =
    document.getElementById("galleryGrid");

const photos = [];

let currentPhoto = 0;


const extensions = [
    "jpg",
    "JPG",
    "jpeg",
    "JPEG",
    "png",
    "PNG",
    "webp",
    "WEBP"
];


/* ==================================================
   DAN'S AUDI S1
   BUILD DIARY
================================================== */

const diarySections = [


    /* ==================================================
       COLLECTION DAY
       19 JULY 2026
    ================================================== */

    {
        title: "Collection Day",
        date: "19th July 2026",

        items: [

            {
                type: "photos",
                start: 1,
                end: 3
            }

        ]
    },


    /* ==================================================
       FRONT END RESPRAY
       11 AUGUST 2026
    ================================================== */

    {
        title: "Front End Respray — Road and Race",
        date: "11th August 2026",

        items: [

            {
                type: "subheading",
                title: "Condition of Front End — Pre Paint"
            },

            {
                type: "photos",
                start: 25,
                end: 28
            },


            {
                type: "subheading",
                title: "Front End Respray"
            },

            {
                type: "photos",
                start: 4,
                end: 7
            }

        ]
    },


    /* ==================================================
       WHEEL REFURB
       19 AUGUST 2026
    ================================================== */

    {
        title: "Wheel Refurb — Radar International",
        date: "19th August 2026",

        items: [

            {
                type: "subheading",
                title: "Car on Stands — Pre Wheel Refurb"
            },

            {
                type: "photos",
                start: 23,
                end: 24
            },


            {
                type: "subheading",
                title: "Wheel Refurbishment"
            },

            {
                type: "photos",
                start: 8,
                end: 15
            },


            {
                type: "youtube",
                videoId: "NTnjmzblHOc"
            },


            {
                type: "subheading",
                title: "Finished Wheels"
            },

            {
                type: "photos",
                start: 16,
                end: 17
            }

        ]
    },


    /* ==================================================
       QUATTRO FRONT GRILLE + FRONT END PPF
       28 AUGUST 2026
    ================================================== */

    {
        title: "Quattro Front Grille & Front End PPF",
        date: "28th August 2026",

        items: [

            {
                type: "photos",
                start: 18,
                end: 22
            }

        ]
    },


    /* ==================================================
       PORSCHE FUEL FILLER CAP
       29 AUGUST 2026
    ================================================== */

    {
        title: "Porsche Fuel Filler Cap",
        date: "29th August 2026",

        items: [

            {
                type: "photos",
                start: 30,
                end: 31
            }

        ]
    },


    /* ==================================================
       REAR WIPER DELETE
       31 AUGUST 2026
    ================================================== */

    {
        title: "Rear Wiper Delete",
        date: "31st August 2026",

        items: [

            {
                type: "photos",
                start: 32,
                end: 37
            }

        ]
    }

];



/* ==================================================
   PHOTO NUMBER FORMAT
================================================== */

function numberName(number) {

    return String(number)
        .padStart(3, "0");

}



/* ==================================================
   CHECK IF IMAGE EXISTS
================================================== */

function checkImage(url) {

    return new Promise(resolve => {

        const image = new Image();

        image.onload =
            () => resolve(url);

        image.onerror =
            () => resolve(null);

        image.src =
            url;

    });

}



/* ==================================================
   FIND NUMBERED PHOTO
================================================== */

async function findPhoto(number) {

    const formatted =
        numberName(number);


    for (const extension of extensions) {

        const filename =
            `photo${formatted}.${extension}`;


        const exists =
            await checkImage(filename);


        if (exists) {

            return exists;

        }

    }


    return null;

}



/* ==================================================
   CREATE MAIN DIARY HEADING
================================================== */

function createDiaryHeading(section) {

    const heading =
        document.createElement("div");

    heading.className =
        "diary-heading";


    const title =
        document.createElement("h3");

    title.textContent =
        section.title;


    const date =
        document.createElement("p");

    date.className =
        "diary-date";

    date.textContent =
        section.date;


    heading.appendChild(title);

    heading.appendChild(date);


    return heading;

}



/* ==================================================
   CREATE DIARY SUBHEADING
================================================== */

function createSubheading(text) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
        "diary-subheading";


    const title =
        document.createElement("h4");

    title.textContent =
        text;


    wrapper.appendChild(title);


    return wrapper;

}



/* ==================================================
   CREATE PHOTO GRID
================================================== */

function createPhotoGrid() {

    const grid =
        document.createElement("div");

    grid.className =
        "diary-photo-grid";


    return grid;

}



/* ==================================================
   CREATE YOUTUBE VIDEO
================================================== */

function createYouTubeVideo(videoId) {

    const videoBox =
        document.createElement("div");

    videoBox.className =
        "diary-video";


    const iframe =
        document.createElement("iframe");


    iframe.src =
        `https://www.youtube.com/embed/${videoId}`;


    iframe.title =
        "Dan's Audi S1 video";


    iframe.loading =
        "lazy";


    iframe.allow =
        "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";


    iframe.allowFullscreen =
        true;


    videoBox.appendChild(iframe);


    return videoBox;

}



/* ==================================================
   LOAD COMPLETE BUILD DIARY
================================================== */

async function loadDiary() {

    galleryGrid.innerHTML = "";


    for (const section of diarySections) {


        const diarySection =
            document.createElement("section");


        diarySection.className =
            "diary-entry";


        const heading =
            createDiaryHeading(section);


        diarySection.appendChild(
            heading
        );


        galleryGrid.appendChild(
            diarySection
        );


        for (const item of section.items) {


            /* =========================================
               SUBHEADING
            ========================================== */

            if (item.type === "subheading") {

                const subheading =
                    createSubheading(
                        item.title
                    );


                diarySection.appendChild(
                    subheading
                );

            }


            /* =========================================
               PHOTOS
            ========================================== */

            if (item.type === "photos") {

                const photoGrid =
                    createPhotoGrid();


                diarySection.appendChild(
                    photoGrid
                );


                for (
                    let number = item.start;
                    number <= item.end;
                    number++
                ) {


                    const image =
                        await findPhoto(number);


                    if (image) {


                        addPhoto(
                            image,
                            number,
                            photoGrid
                        );

                    }

                }

            }


            /* =========================================
               YOUTUBE
            ========================================== */

            if (item.type === "youtube") {

                const videoGrid =
                    createPhotoGrid();


                const video =
                    createYouTubeVideo(
                        item.videoId
                    );


                videoGrid.appendChild(
                    video
                );


                diarySection.appendChild(
                    videoGrid
                );

            }

        }

    }

}



/* ==================================================
   ADD PHOTO TO GALLERY
================================================== */

function addPhoto(
    source,
    number,
    targetGrid
) {

    const button =
        document.createElement("button");


    button.className =
        "gallery-item";


    button.type =
        "button";


    const image =
        document.createElement("img");


    image.src =
        source;


    image.alt =
        `Dan's Audi S1 photo ${numberName(number)}`;


    image.loading =
        "lazy";


    button.appendChild(
        image
    );


    const index =
        photos.length;


    photos.push({

        source: source,

        number: number

    });


    button.onclick =
        () => {

            openLightbox(index);

        };


    targetGrid.appendChild(
        button
    );

}



/* ==================================================
   LIGHTBOX ELEMENTS
================================================== */

const lightbox =
    document.getElementById(
        "lightbox"
    );


const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );


const photoCounter =
    document.getElementById(
        "photoCounter"
    );



/* ==================================================
   OPEN LIGHTBOX
================================================== */

function openLightbox(index) {

    currentPhoto =
        index;


    updateLightbox();


    lightbox.classList.add(
        "open"
    );


    document.body.style.overflow =
        "hidden";

}



/* ==================================================
   CLOSE LIGHTBOX
================================================== */

function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );


    document.body.style.overflow =
        "";

}



/* ==================================================
   UPDATE LIGHTBOX IMAGE
================================================== */

function updateLightbox() {

    if (photos.length === 0) {

        return;

    }


    lightboxImage.src =
        photos[currentPhoto].source;


    lightboxImage.alt =
        `Dan's Audi S1 photo ${numberName(
            photos[currentPhoto].number
        )}`;


    if (photoCounter) {

        photoCounter.textContent =
            `${currentPhoto + 1} / ${photos.length}`;

    }

}



/* ==================================================
   NEXT PHOTO
================================================== */

function nextPhoto() {

    currentPhoto =
        (currentPhoto + 1)
        %
        photos.length;


    updateLightbox();

}



/* ==================================================
   PREVIOUS PHOTO
================================================== */

function previousPhoto() {

    currentPhoto =
        (
            currentPhoto
            - 1
            + photos.length
        )
        %
        photos.length;


    updateLightbox();

}



/* ==================================================
   LIGHTBOX CONTROLS
================================================== */

document
    .getElementById("closeLightbox")
    .onclick =
        closeLightbox;


document
    .getElementById("nextPhoto")
    .onclick =
        nextPhoto;


document
    .getElementById("previousPhoto")
    .onclick =
        previousPhoto;


lightbox.onclick =
    event => {

        if (event.target === lightbox) {

            closeLightbox();

        }

    };


document.addEventListener(
    "keydown",
    event => {

        if (
            !lightbox.classList.contains("open")
        ) {

            return;

        }


        if (event.key === "Escape") {

            closeLightbox();

        }


        if (event.key === "ArrowRight") {

            nextPhoto();

        }


        if (event.key === "ArrowLeft") {

            previousPhoto();

        }

    }
);



/* ==================================================
   START BUILD DIARY
================================================== */

loadDiary();
