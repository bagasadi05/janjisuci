import React, { useEffect, useRef, useState } from 'react'
import { Disc3, VolumeX, Music2, SkipForward, ListMusic, X, Check, Play, Pause } from 'lucide-react'
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
          console.warn('Audio play prevented:', error)
        })
      }
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying, activeTrack])

  const handleToggle = () => {
    if (isPlaying) {
      showToast('Musik dijeda', 'info')
      onToggle()
    } else {
      if (audioRef.current) {
        audioRef.current
          .play()
          .then(() => {
            showToast(`Memutar: ${activeTrack.title}`, 'success')
            onToggle()
          })
          .catch((err) => {
            console.error('Playback failed:', err)
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
    showToast(`Mengganti lagu: ${nextTrack.title}`, 'info')
  }

  const handleSelectTrack = (track: AudioTrack) => {
    onTrackChange(track)
    setShowPlaylist(false)
    showToast(`Memutar: ${track.title}`, 'success')
  }

  // Modern Web API: MediaSession integration for lock-screen & notification audio controls
  useEffect(() => {
    if (typeof window !== 'undefined' && 'mediaSession' in navigator) {
      try {
        navigator.mediaSession.metadata = new MediaMetadata({
          title: activeTrack.title,
          artist: activeTrack.artist || 'JanjiSuci.id',
          album: 'Undangan Pernikahan Digital JanjiSuci',
          artwork: [
            {
              src: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=512&q=80',
              sizes: '512x512',
              type: 'image/jpeg'
            }
          ]
        })

        navigator.mediaSession.setActionHandler('play', () => {
          if (!isPlaying) onToggle()
        })
        navigator.mediaSession.setActionHandler('pause', () => {
          if (isPlaying) onToggle()
        })
        navigator.mediaSession.setActionHandler('nexttrack', () => {
          handleNextTrack()
        })
      } catch (err) {
        console.warn('MediaSession initialization warning:', err)
      }
    }
  }, [activeTrack, isPlaying])

  return (
    <>
      <audio
        ref={audioRef as React.RefObject<HTMLAudioElement>}
        src={activeTrack.src}
        loop
        preload="auto"
      />

      {/* Playlist Drawer Modal */}
      {showPlaylist && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl bg-stone-900 border border-amber-500/30 p-5 shadow-2xl text-stone-100">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <ListMusic className="w-4 h-4 text-amber-400" />
                <h3 className="font-serif font-bold text-base text-amber-200">
                  Daftar Lagu Pernikahan
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowPlaylist(false)}
                className="p-1 rounded-full text-stone-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
              {weddingData.audio.playlist.map((track) => {
                const isCurrent = track.id === activeTrack.id
                return (
                  <button
                    key={track.id}
                    type="button"
                    onClick={() => handleSelectTrack(track)}
                    className={`w-full p-2.5 rounded-2xl flex items-center justify-between text-left transition-all ${
                      isCurrent
                        ? 'bg-amber-500/20 border border-amber-400/40 text-amber-200'
                        : 'bg-stone-800/60 hover:bg-stone-800 border border-transparent text-stone-300'
                    }`}
                  >
                    <div className="min-w-0 pr-2">
                      <p className="text-xs font-semibold truncate">{track.title}</p>
                      <p className="text-[10px] text-stone-400 truncate">{track.artist}</p>
                    </div>
                    {isCurrent ? (
                      <div className="flex items-end gap-0.5 h-3 px-1 shrink-0" aria-hidden="true">
                        <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-1" />
                        <span className="w-0.5 bg-amber-300 rounded-full animate-soundwave-2" />
                        <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-3" />
                      </div>
                    ) : (
                      <Play className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* Floating Audio Controller */}
      <div className="fixed bottom-20 right-4 sm:right-6 z-40 flex items-center gap-2">
        {/* Track Title Badge with Animated Soundwaves & Playlist Button */}
        {isPlaying && (
          <div className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900/90 border border-amber-500/40 text-amber-200 text-xs shadow-xl backdrop-blur-md select-none">
            <Music2 className="w-3.5 h-3.5 text-amber-400 shrink-0" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setShowPlaylist(true)}
              className="max-w-[140px] truncate text-[11px] font-sans font-medium hover:underline text-left cursor-pointer"
              title="Klik untuk membuka daftar lagu"
            >
              {activeTrack.title}
            </button>
            <div className="flex items-end gap-0.5 h-3 px-1" aria-hidden="true">
              <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-1" />
              <span className="w-0.5 bg-amber-300 rounded-full animate-soundwave-2" />
              <span className="w-0.5 bg-amber-400 rounded-full animate-soundwave-3" />
            </div>
            <button
              type="button"
              onClick={handleNextTrack}
              aria-label="Ganti lagu berikutnya"
              title="Lagu Berikutnya"
              className="min-w-[28px] min-h-[28px] rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <SkipForward className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => setShowPlaylist(true)}
              aria-label="Buka daftar pilihan lagu"
              title="Pilihan Lagu"
              className="min-w-[28px] min-h-[28px] -mr-1 rounded-full text-amber-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              <ListMusic className="w-3.5 h-3.5" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Floating Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          aria-label={isPlaying ? 'Jeda musik latar belakang' : 'Putar musik latar belakang'}
          title={isPlaying ? 'Jeda Musik Latar' : 'Putar Musik Latar'}
          className={`relative min-w-[48px] min-h-[48px] p-3.5 sm:p-4 rounded-full backdrop-blur-md shadow-2xl transition-all duration-300 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 ${
            isPlaying
              ? 'bg-stone-900/90 text-amber-300 border border-amber-400/50 hover:scale-105 active:scale-95 ring-2 ring-amber-500/30 shadow-[0_0_20px_rgba(245,158,11,0.25)]'
              : 'bg-stone-800/85 text-stone-300 border border-stone-600/40 hover:text-white hover:scale-105 active:scale-95'
          }`}
        >
          {isPlaying ? (
            <div className="relative flex items-center justify-center">
              <Disc3 className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300 animate-spin-slow" aria-hidden="true" />
              <span className="absolute w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping opacity-60" aria-hidden="true" />
            </div>
          ) : (
            <VolumeX className="w-5 h-5 sm:w-6 sm:h-6 text-stone-300" aria-hidden="true" />
          )}
        </button>
      </div>
    </>
  )
}
