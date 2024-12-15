import React from 'react';
import '../css/style.css';
import a1 from '../assets/images/cow.jpg'
import a2 from '../assets/images/cat.jpeg'
import a3 from '../assets/images/pig.jpeg'


const Gallery = () => {
    const galleryItems = [
        { src: a1, lightbox: 'gallery-1' },
        { src: a2, lightbox: 'gallery-2' },
        { src: a3, lightbox: 'gallery-3' },
    ];

    return (
        <div className="container-fluid gallery py-5 my-5">
            <div className="mx-auto text-center mb-5" style={{ maxWidth: '900px' }}>
                <h5 className="section-title px-3">Our Gallery</h5>
                <h1 className="mb-4">Veterinarian Gallery</h1>
            </div>
            <div className="tab-class text-center">
                <ul className="nav nav-pills d-inline-flex justify-content-center mb-5">
                    <li className="nav-item">
                        <a
                            className="d-flex mx-3 py-2 border border-primary bg-light rounded-pill active"
                            data-bs-toggle="pill"
                            href="#GalleryTab-1"
                        >
                            <span className="text-dark" style={{ width: '150px' }}>
                                Visit Our Gallery
                            </span>
                        </a>
                    </li>
                </ul>
                <div className="tab-content">
                    <div id="GalleryTab-1" className="tab-pane fade show p-0 active">
                        <div className="row g-4 justify-content-center">
                            {galleryItems.map((item, index) => (
                                <div
                                    key={index}
                                    className="col-sm-6 col-md-4 col-lg-3"
                                >
                                    <div className="gallery-item position-relative overflow-hidden">
                                        <img
                                            src={item.src}
                                            className="img-fluid w-100 rounded"
                                            alt="Gallery"
                                            style={{ width: '150px', height: '150px' }}
                                        />
                                        <div className="gallery-overlay d-flex align-items-center justify-content-center">
                                            <a
                                                href={item.src}
                                                data-lightbox={item.lightbox}
                                                className="text-white text-decoration-none"
                                            >
                                                <i className="fas fa-plus fa-2x"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;
