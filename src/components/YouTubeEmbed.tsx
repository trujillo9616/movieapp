import React from "react";

interface YouTubeEmbedProps {
  embedId: string;
  title: string;
}

const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({ embedId, title }) => {
  return (
    <div className="video-responsive">
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${embedId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title={title}
      />
    </div>
  );
};

export default YouTubeEmbed;
