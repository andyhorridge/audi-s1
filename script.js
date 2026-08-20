const galleryGrid =
    document.getElementById(
        "galleryGrid"
    );

const galleryStatus =
    document.getElementById(
        "galleryStatus"
    );



const photos = [];



let currentPhoto = 0;



const extensions = [

    "jpg",

    "jpeg",

    "png",

    "webp"

];



function numberName(number) {

    return String(number)
        .padStart(
            3,
            "0"
        );

}



function checkImage(url) {

    return new Promise(
        resolve => {

            const image =
                new Image();

            image.onload =
                () =>
                    resolve(
                        url
                    );

            image.onerror =
                () =>
                    resolve(
                        null
                    );

            image.src =
                url;

        }
    );

}



async function findPhoto(
    number
) {

    const formatted =
        numberName(
            number
        );


    for (
        const extension
        of extensions
    ) {

        const filename =

            `photo${formatted}.${extension}`;


        const exists =

            await checkImage(
                filename
            );


        if (
            exists
        ) {

            return exists;

        }

    }


    return null;

}



async function loadGallery() {


    let number = 1;

    let missing = 0;


    while (
        number <= 999
    ) {


        galleryStatus.textContent =

            `Checking photo ${numberName(number)}...`;


        const image =

            await findPhoto(
                number
            );


        if (
            image
        ) {


            addPhoto(
                image,
                number
            );


            missing = 0;


        } else {


            missing++;


        }



        /*
        Stops looking after
        5 missing numbers.
        */

        if (
            missing >= 5
        ) {

            break;

        }


        number++;

    }



    if (
        photos.length === 0
    ) {


        galleryStatus.innerHTML =

            "No photographs added yet.<br>" +

            "Upload <strong>photo001.jpg</strong> to begin.";


    } else {


        galleryStatus.textContent =

            `${photos.length} photographs loaded`;


    }

}



function addPhoto(
    source,
    number
) {


    const button =

        document.createElement(
            "button"
        );


    button.className =
        "gallery-item";


    const image =

        document.createElement(
            "img"
        );


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


    photos.push(
        {
            source,
            number
        }
    );


    button.onclick =
        () => {

            openLightbox(
                index
            );

        };


    galleryGrid.appendChild(
        button
    );

}



/* LIGHTBOX */

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



function openLightbox(
    index
) {

    currentPhoto =
        index;


    updateLightbox();


    lightbox.classList.add(
        "open"
    );


    document.body.style.overflow =
        "hidden";

}



function closeLightbox() {

    lightbox.classList.remove(
        "open"
    );


    document.body.style.overflow =
        "";

}



function updateLightbox() {

    if (
        photos.length === 0
    ) {

        return;

    }


    lightboxImage.src =

        photos[
            currentPhoto
        ].source;


    photoCounter.textContent =

        `${currentPhoto + 1} / ${photos.length}`;

}



function nextPhoto() {


    currentPhoto =

        (
            currentPhoto + 1
        )

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
    .getElementById(
        "closeLightbox"
    )
    .onclick =
        closeLightbox;


document
    .getElementById(
        "nextPhoto"
    )
    .onclick =
        nextPhoto;


document
    .getElementById(
        "previousPhoto"
    )
    .onclick =
        previousPhoto;



lightbox.onclick =
    event => {

        if (
            event.target ===
            lightbox
        ) {

            closeLightbox();

        }

    };



loadGallery();
