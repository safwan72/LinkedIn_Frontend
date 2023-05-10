import React from 'react'
import './renderImage.css'
const RenderImage = ({ src, alt, style }) => {
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [isValidSrc, setIsValidSrc] = React.useState(true);
    return (
        <div className="smooth-image-wrapper">
            {isValidSrc ? (
                <img
                    style={style}
                    src={src}
                    alt={alt}
                    className={`smooth-image image-${imageLoaded ? 'visible' : 'hidden'
                        }`}
                    onLoad={() => {
                        setImageLoaded(true)
                        setIsValidSrc(true)
                    }}
                    onError={() => {
                        setIsValidSrc(false)
                        console.log("error")
                    }}
                />
            ) : (
                <div className="smooth-no-image">{alt}</div>
            )}
            {isValidSrc && !imageLoaded && (
                <div className="smooth-preloader">
                    <span className="loader" />
                </div>
            )}
        </div>
    )
}

export default RenderImage