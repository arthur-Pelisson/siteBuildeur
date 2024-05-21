interface IframeVideoProps {
    url: string;
    width?: string;
    height?: string;
}

const IframeVideo = ({url, width = "1000px", height = "562px"} : IframeVideoProps) => {

    if (url.includes("youtube") || url.includes("youtu.be") && !url.includes('embed') && !url.includes('shorts')) {
        const videoId = url.split("v=")[1];
        url = `https://www.youtube.com/embed/${videoId}`;
    }

    if (url.includes("vimeo") && !url.includes('player.vimeo.com')) {
        const videoId = url.split("vimeo.com/")[1];
        url = `https://player.vimeo.com/video/${videoId}`;
    }

    return (
        <div className="iframe-video" style={{width: width, height: height, margin: "auto"}}>
            <iframe
                width="100%"
                height="100%"
                src={url}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
            ></iframe>
        </div>
    )
};

export default IframeVideo