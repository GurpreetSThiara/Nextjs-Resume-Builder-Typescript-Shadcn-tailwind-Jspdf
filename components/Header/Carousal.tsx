'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

import classicResume from '../../public/images/1.png'
import ModernProfessional from '../../public/images/2.png'
import ImpactProfessional from '../../public/images/3.png'

interface CarouselProps {

  autoPlayInterval?: number
}

export default function Carousel({  autoPlayInterval = 5000 }: CarouselProps) {
    const images = [ {
        src: classicResume,
        alt: "Free Classic Resume",
        title: "Free Classic Resume",
        subtitle: "Free Resume No hidden Charges",
      },{
        src: ModernProfessional,
        alt: "Free Modern Professional Resume",
        title: "Free Modern Professional Resume",
        subtitle: "Free Resume No hidden Charges",
      },{
        src: ImpactProfessional,
        alt: "Free Impact Professional Resume",
        title: "Free Impact Professional Resume",
        subtitle: "Free Resume No hidden Charges",
      },{
        src: ModernProfessional,
        alt: "Free Modern Professional Resume",
        title: "Free Modern Professional Resume",
        subtitle: "Free Resume No hidden Charges",
      },{
        src: ImpactProfessional,
        alt: "Free Impact Professional Resume",
        title: "Free Impact Professional Resume",
        subtitle: "Free Resume No hidden Charges",
      }]
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const [isAnimating, setIsAnimating] = React.useState(false)
  const [isPlaying, setIsPlaying] = React.useState(true)

  const goToSlide = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextSlide = React.useCallback(() => {
    if (isAnimating) return
    const newIndex = (currentIndex + 1) % images.length
    goToSlide(newIndex)
  }, [currentIndex, images.length, isAnimating])

  const prevSlide = () => {
    if (isAnimating) return
    const newIndex = (currentIndex - 1 + images.length) % images.length
    goToSlide(newIndex)
  }

  const toggleAutoPlay = () => {
    setIsPlaying(!isPlaying)
  }

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null
    if (isPlaying) {
      intervalId = setInterval(nextSlide, autoPlayInterval)
    }
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isPlaying, nextSlide, autoPlayInterval])

  return (
    <div className=" relative h-[80vh] w-full overflow-hidden bg-gradient-to-b from-background to-muted px-4 ">
        
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform perspective-[1000px]">
        {images.map((image, index) => {
          let offset = index - currentIndex
          if (offset < -2) offset += images.length
          if (offset > 2) offset -= images.length

          return (
            <div
              key={index}
              className={cn(
                "absolute left-1/2 top-1/2 h-[400px] w-[300px] -translate-x-1/2 -translate-y-1/2 transform-gpu transition-all duration-500 ease-in-out",
                isAnimating && "pointer-events-none"
              )}
              style={{
                zIndex: 2 - Math.abs(offset),
                transform: `
                  translate(-50%, -50%)
                  translateX(${offset * 50}%)
                  translateZ(${-Math.abs(offset) * 100}px)
                  rotateY(${offset * 25}deg)
                  scale(${1 - Math.abs(offset) * 0.2})
                `,
                opacity: Math.abs(offset) >= 3 ? 0 : 1,
              }}
            >
              <div className="group relative h-full w-full overflow-hidden rounded-lg shadow-xl transition-transform hover:scale-105">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={Math.abs(offset) <= 1}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{image.title}</h3>
                  <p className="text-sm opacity-90">{image.subtitle}</p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute bottom-4 right-4 rounded-full"
        onClick={toggleAutoPlay}
        aria-label={isPlaying ? "Pause auto-play" : "Resume auto-play"}
      >
        {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </Button>

      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full transition-all",
              index === currentIndex ? "bg-primary w-4" : "bg-muted-foreground/30"
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

