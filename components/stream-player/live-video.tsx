"use client"
import { useEffect, useRef, useState } from "react";

import { useTracks } from "@livekit/components-react";
import { Participant, Track } from "livekit-client"

import { useEventListener } from "usehooks-ts";

import { FullscreenControl } from "./fullscreen-control";
import { VolumeControl } from "./volume-control";

interface LiveVideoProps {
  participant: Participant;
}

export const LiveVideo = ({ participant }: LiveVideoProps) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [volume, setVolume] = useState(0);

  const onVolumeChange = (value: number) => {
    setVolume(+value);
    if (videoRef?.current) {
      videoRef.current.muted = value === 0;
      videoRef.current.volume = +value * 0.01;

    }
  }
  const toggleMute = () => {
    const isMuted = volume === 0;

    setVolume(isMuted ? 50 : 0);

    if (videoRef?.current) {
      videoRef.current.muted = !isMuted;
      videoRef.current.volume = isMuted ? 0.5 : 0;
    }

  };
  useEffect(() => {
    onVolumeChange(0);
  }, [])
  
  // function to handle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (isFullscreen) {
      document.exitFullscreen();
    } else if (wrapperRef?.current) {
      wrapperRef.current.requestFullscreen()
    }
  }

  // function to check fullscreen state
  const handleFullscreenChange = () => {
    const isCurrentFullscreen = document.fullscreenElement !== null;
    setIsFullscreen(isCurrentFullscreen)
  }
  useEventListener('fullscreenchange', handleFullscreenChange, wrapperRef)

  useTracks([Track.Source.Camera, Track.Source.Microphone])
    .filter((track) => track.participant.identity === participant.identity)
    .forEach((track) => {
      if (videoRef.current) {
        track.publication.track?.attach(videoRef.current)
      }
    })


  return (
    <div ref={wrapperRef} className="relative h-full flex">
      <video width="100%"
        ref={videoRef} />
      <div className="absolute top-0 size-full opacity-0 hover:opacity-100 hover:translate-all">
        <div className="absolute bottom-0 flex h-14 justify-between w-full items-center bg-gradient-to-r from-neutral-900 px-4">
          <VolumeControl
            onChange={onVolumeChange}
            onToggle={toggleMute}
            value={volume}
          />

          <FullscreenControl
            isFullscreen={isFullscreen}
            onToggle={toggleFullscreen}
          />
        </div>
      </div>
    </div>
  )
}

