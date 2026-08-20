const galleryGrid = document.getElementById("galleryGrid");

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


/*
    BUILD DIARY
*/

const diarySections = [

    {
        title: "Collection Day",
        date: "19th July 2026",
        items: [
            { type: "photos", start: 1, end: 3 }
        ]
    },

    {
        title: "Front End Respray — Road and Race",
        date: "11th August 2026",
        items: [
            { type: "photos", start: 4, end: 7 }
        ]
    },

    {
        title: "Wheel Refurb — Radar International",
        date: "19th August 2026",
        items: [
            { type: "photos", start: 8, end: 15 },

            {
                type: "youtube",
                videoId: "NTnjmzblHOc"
            },

            { type: "photos", start: 16, end: 17 }
        ]
    }

];


function numberName(number) {

    return String(number).padStart(3, "0");

}


function checkImage(url) {

    return new Promise(resolve => {

        const image = new Image();

        image.onload = () => resolve(url);

        image.onerror = () => resolve(null);

        image.src = url;

    });

}


async function findPhoto(number) {

    const formatted = numberName(number);

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


function createPhotoGrid() {

    const grid =
        document.createElement("div");

    grid.className =
        "diary-photo-grid";

    return grid;

}


function createVideo(videoId) {

    const wrapper =
        document.createElement("div");

    wrapper.className =
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


    wrapper.appendChild(iframe);

    return wrapper;

}


async function loadDiary() {

    galleryGrid.innerHTML = "";


    for (const section of diarySections) {

        const diarySection =
            document.createElement("section");

        diarySection.className =
            "diary-entry";


        const heading =
            createDiaryHeading(section);


        diarySection.appendChild(heading);

        galleryGrid.appendChild(diarySection);


        for (const item of section.items) {

            if (item.type === "photos") {

                const photoGrid =
                    createPhotoGrid();


                diarySection.appendChild(photoGrid);


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


            if (item.type === "youtube") {

                const video =
                    createVideo(item.videoId);

                diarySection.appendChild(video);

            }

        }

    }

}


function addPhoto(
    source,
    number,
    targetGrid
) {

    const button =
        document.createElement("button");

    button.className =
        "gallery-item";


    const image =
        document.createElement("img");

    image.src =
        source;

    image.alt =
        `Dan's Audi S1 photo ${numberName(number)}`;

    image.loading =
        "lazy";


    button.appendChild(image);


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


    targetGrid.appendChild(button);

}



/*
    LIGHTBOX
*/

const lightbox =
    document.getElementById("lightbox");

const lightboxImage =
    document.getElementById("lightboxImage");

const photoCounter =
    document.getElementById("photoCounter");


function openLightbox(index) {

    currentPhoto = index;

    updateLightbox();

    lightbox.classList.add("open");

    document.body.style.overflow =
        "hidden";

}


function closeLightbox() {

    lightbox.classList.remove("open");

    document.body.style.overflow =
        "";

}


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


function nextPhoto() {

    currentPhoto =
        (currentPhoto + 1)
        %
        photos.length;

    updateLightbox();

}


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

        if (
            event.target === lightbox
        ) {

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


loadDiary();
