import React, { useEffect } from "react";

let player;

let currentVideoId = null;

const loadVideo = (videoId, PlayerId, onPlayerStateChange, onPlayerError) => {
  // the Player object is created uniquely based on the PlayerId

  currentVideoId = videoId;

  player = new window.YT.Player(PlayerId, {
    // videoId: videoId,
    height: "100%",
    width: "100%",
    playerVars: {
      controls: 1,
      enablejsapi: 0,
      showinfo: 0,
      origin: "https",
    },
    events: {
      //onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
      onError: onPlayerError,
    },
  });
};

// const onPlayerReady = (event) => {
//   try {
//     event.target.playVideo();
//   } catch (error) {
//     console.log("onPlayerReady error :", error);
//   }
// };

export const PauseVideo = () => {
  try {
    player.pauseVideo();
  } catch (error) {
    console.log("PauseVideo error :", error);
  }
};
export const PlayVideo = () => {
  try {
    player.playVideo();
  } catch (error) {
    console.log("PlayVideo error :", error);
  }
};

export const getCurrentTime = () => {
  if (player !== undefined) {
    try {
      return player.getCurrentTime();
    } catch (error) {
      return 0;
    }
  } else {
    return 0;
  }
};

const VideoPlayer = React.memo(
  ({
    check,
    HandlePlayingVideo,
    PlayerId,
    onPlayerStateChange,
    onPlayerError,
  }) => {
    console.log("<::-VideoPlayer-::>");

    useEffect(() => {
      if (check) {
        if (currentVideoId === null || currentVideoId !== HandlePlayingVideo())
          if (!window.YT) {
            // If not, load the script asynchronously
            const tag = document.createElement("script");
            tag.src = "https://www.youtube.com/iframe_api";

            // onYouTubeIframeAPIReady will load the video after the script is loaded
            window.onYouTubeIframeAPIReady = loadVideo(
              HandlePlayingVideo(),
              PlayerId,
              onPlayerStateChange,
              onPlayerError
            );
            const firstScriptTag = document.getElementsByTagName("script")[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          } else {
            // If script is already there, load the video directly
            loadVideo(
              HandlePlayingVideo(),
              PlayerId,
              onPlayerStateChange,
              onPlayerError
            );
            // Update the PlayerId
            document.getElementById(
              PlayerId
            ).src = `https://www.youtube.com/embed/${HandlePlayingVideo()}?autoplay=1&fs=0&modestbranding=1&rel=0&enablejsapi=1&start=0&showinfo=0&controls=1`;
          }
      }
    }, [
      check,
      HandlePlayingVideo,
      PlayerId,
      onPlayerStateChange,
      onPlayerError,
    ]);

    return <div id={PlayerId}></div>;
  }
);

export default VideoPlayer;
