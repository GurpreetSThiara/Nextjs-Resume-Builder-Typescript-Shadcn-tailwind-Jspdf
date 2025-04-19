import Script from 'next/script';
import React, { useEffect } from 'react'

const Interstitial = () => {
  

    useEffect(() => {
        // Define the global functions that the script expects

        (window as Window & typeof globalThis)._zdrqc = () => {
          console.error("Propeller script failed to load")
        }
        ;(window as Window & typeof globalThis)._xzhdi = () => {
         // console.log("Propeller script loaded successfully")
        }
      }, [])
    
    
  return (
    <Script
    src="https://reetahoo.com/401/8507022"
    strategy="afterInteractive" // Ensures the script is loaded after the page becomes interactive
    onLoad={() => {}}
    onError={(e) => console.error('Error loading Propeller Ads script', e)}
  />

   
  )
}

export default Interstitial