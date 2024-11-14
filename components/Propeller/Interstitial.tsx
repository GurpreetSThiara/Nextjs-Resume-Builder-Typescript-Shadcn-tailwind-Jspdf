import Script from 'next/script';
import React, { useEffect } from 'react'

const Interstitial = () => {
    console.log("ssssssssssssssssssssssssssssss")

    useEffect(() => {
        // Define the global functions that the script expects

        (window as Window & typeof globalThis)._zdrqc = () => {
          console.log("Propeller script failed to load")
        }
        ;(window as Window & typeof globalThis)._xzhdi = () => {
          console.log("Propeller script loaded successfully")
        }
      }, [])
    
    
  return (
    <Script
    src="https://reetahoo.com/401/8507022"
    strategy="afterInteractive" // Ensures the script is loaded after the page becomes interactive
    onLoad={() => console.log('Propeller Ads script loaded successfully')}
    onError={(e) => console.error('Error loading Propeller Ads script', e)}
  />
    //   https://chikraighotoops.com/4/8506878
   
  )
}

export default Interstitial