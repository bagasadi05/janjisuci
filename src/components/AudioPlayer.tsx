import React, { useEffect, useRef, useState } from 'react'
import { Disc3, VolumeX, Music2, SkipForward } from 'lucide-react'
import { weddingData, AudioTrack } from '../config/weddingData'
import { useToast } from './Toast'

interface AudioPlayerProps {
  isPlaying: boolean
  onToggle: () => void
  activeTrack: AudioTrack
  onTrackChange: (track: AudioTrack) => void
  audioElementRef?: React.RefObject<HTMLAudioElement | null>
  src?: string
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  isPlaying,
  onToggle,
  activeTrack,
  onTrackChange,
  audioElementRef
}) => {
  const localAudioRef = useRef<HTMLAudioElement | null>(null)
  const audioRef = audioElementRef || localAudioRef
  const { showToast } = useToast()
  const [showPlaylist, setShowPlaylist] = useState(false)

  // Sync isPlaying state with audio element
  useEffect(() => {
    if (!audioRef.current) return

    if (isPlaying) {
      audioRef.current.volume = 1.0
      const playPromise = audioRef.current.play()
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.warn("Audio play prevented:", error)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, activeTrack])

  const handleToggle = () => {
    if (isPlaying) {
      showToast("Musik dijeda", "info")
      onToggle()
    } else {
      if (audioRef.current) {
        audioRef.current.play().then(() => {
          showToast(`Memutar: ${activeTrack.title}`, "success")
          onToggle()
        }).catch((err) => {
          console.error("Playback failed:", err)
        })
      } else {
        onToggle()
      }
    }
  }

  const handleNextTrack = () => {
    const currentIndex = weddingData.audio.playlist.findIndex((t) => t.id === activeTrack.id)
    const nextIndex = (currentIndex + 1) % weddingData.audio.playlist.length
    const nextTrack = weddingData.audio.playlist[nextIndex]
    onTrackChange(nextTrack)
    showToast(`Mengganti lagu: ${nextTrack.title}`, "info")
  }

  return (
    <>
      <audio
        ref={audioRef as React.RefObject<HTMLAudioElement>}
        src={activeTrack.src}
        loop
        preload="auto"
      />

      {/* Floating Audio Controller */}
      <div className="fixed bottom-20 right-4 sm:right-6 z-40 flex items-center gap-2">
        {/* Track Title Badge with Animated Soundwaves */}
        {isPlaying && (
          <div
            onClick={() => setShowPlaylist(!showPlaylist)}
            className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-200 text-xs shadow-xl backdrop-blur-md cursor-pointer hover:bg-stone-900 transition-all select-none"
            title="Klik untuk melihat lagu"
          >
            <Music2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="max-w-[150px] truncate text-[11px] font-sans font-medium">
              {activeTrack.title}
            </span>
            <div className="flex items-end gap-0.5 h-3 px-1">
              <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-1" />
              <span className="w-0.5 bg-amber-300 rounded-full animate-soundwave-2" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-3" />
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleNextTrack()
              }}
              title="Ganti Lagu"
              className="p-1 hover:text-white transition-colors"
            >
              <SkipForward className="w-3 h-3 text-amber-300" />
            </button>
          </div>
        )}

        {/* Floating Button */}
        <button
          onClick={handleToggle}
          aria-label={isPlaying ? "Jeda Musik" : "Putar Musik"}
          title={isPlaying ? "Jeda Musik Latar" : "Putar Musik Latar"}
          className={`relative p-3.5 sm:p-4 rounded-full backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer ${
            isPlaying
              ? 'bg-stone-900/90 text-amber-300 border border-amber-400/50 hover:scale-105 active:scale-95 ring-2 ring-amber-500/25'
              : 'bg-stone-800/85 text-stone-400 border border-stone-600/40 hover:text-stone-200 hover:scale-105 active:scale-95'
          }`}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Disc3 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 animate-spin-slow" />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping opacity-60" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6" />
          )}
        </button>
      </div>
    </>
  )
}
