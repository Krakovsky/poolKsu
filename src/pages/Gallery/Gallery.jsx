import React, { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

import fisrtPhoto from '../../media/photos/1.jpg';
import secondPhoto from '../../media/photos/2.jpg';
import thirdPhoto from '../../media/photos/3.jpg';
import fourthPhoto from '../../media/photos/4.jpg';
import fifthPhoto from '../../media/photos/5.jpg';
import sixthPhoto from '../../media/photos/6.jpg';
import seventhPhoto from '../../media/photos/7.jpg';
import eighthPhoto from '../../media/photos/8.jpg';
import ninthPhoto from '../../media/photos/9.jpg';

const photos = [
    {
        src: fisrtPhoto,
        width: 4,
        height: 3
    },
    {
        src: secondPhoto,
        width: 4,
        height: 3
    },
    {
        src: thirdPhoto,
        width: 4,
        height: 3
    },
    {
        src: fourthPhoto,
        width: 4,
        height: 3
    },
    {
        src: fifthPhoto,
        width: 4,
        height: 3
    },
    {
        src: sixthPhoto,
        width: 4,
        height: 3
    },
    {
        src: seventhPhoto,
        width: 4,
        height: 3
    },
    {
        src: eighthPhoto,
        width: 4,
        height: 3
    },
    {
        src: ninthPhoto,
        width: 4,
        height: 3
    },
];

const GalleryPage = () => {
    const [currentImage, setCurrentImage] = useState(0);
    const [viewerIsOpen, setViewerIsOpen] = useState(false);

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrentImage(index);
        setViewerIsOpen(true);
    }, []);

    const closeLightbox = () => {
        setCurrentImage(0);
        setViewerIsOpen(false);
    };

    return (
        <div className="Contacts Page">
            <div className="Title">Галерея</div>
            <div className="Container">
                <Gallery photos={photos} onClick={openLightbox} />
                <ModalGateway>
                    {viewerIsOpen ? (
                        <Modal onClose={closeLightbox}>
                            <Carousel
                                currentIndex={currentImage}
                                views={photos.map(x => ({
                                    ...x,
                                    srcset: x.srcSet,
                                    caption: x.title
                                }))}
                            />
                        </Modal>
                    ) : null}
                </ModalGateway>
            </div>
        </div>
    );
}

export default GalleryPage;