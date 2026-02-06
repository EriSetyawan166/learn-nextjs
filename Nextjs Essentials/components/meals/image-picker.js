'use client';

import Image from 'next/image';
import classes from './image-picker.module.css';
import { useRef, useState } from 'react';

export default function ImagePicker({ label, name }) {
    const [pickedImage, setPickedImage] = useState(null);
    const imageInput = useRef();

    const handlePickClick = () => {
        imageInput.current.click();
    }

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (!file) {
            setPickedImage(null);
            return;
        }

        const fileReader = new FileReader();

        fileReader.onload = () => {
            setPickedImage(fileReader.result);
        };

        fileReader.readAsDataURL(file);
    }


    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
                <div className={classes.preview}>
                    {!pickedImage && <p>No Image Picked Yet</p>}
                    {pickedImage && (
                        <Image
                            src={pickedImage}
                            fill
                            alt="picked image"
                        />
                    )}
                </div>
                <input className={classes.input}
                    ref={imageInput}
                    type="file"
                    id={name}
                    name={name}
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    required
                />
                <button
                    className={classes.button}
                    type='button'
                    onClick={handlePickClick}
                >
                    Pick an image
                </button>
            </div>
        </div>
    )
}