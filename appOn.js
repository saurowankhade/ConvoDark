(function () {
    const htmlElement = document.querySelector('html');
   
    const toggleDarkMode = () => {
        htmlElement.style.filter = "invert(1) hue-rotate(180deg)";
        handleMediaFilters("invert(1) hue-rotate(180deg)");
        handleTransparentImages("invert(0) hue-rotate(360deg)"); 
        handleBackgroundImages("invert(1) hue-rotate(180deg)");
    };
  
    // Apply filter to images and videos
    const handleMediaFilters = (filterValue) => {
      let media = document.querySelectorAll("img, video");
      media.forEach((mediaItem) => {
        mediaItem.style.filter = filterValue;
      });
    };
  
    // Apply filter to elements with background images
    const handleBackgroundImages = (filterValue) => {
      let elements = document.querySelectorAll("*");
      elements.forEach((element) => {
        const bgImage = window.getComputedStyle(element).backgroundImage;
        if (bgImage && bgImage !== 'none') {
          element.style.filter = filterValue;
        }
      });
    };
  
    // Apply filter to <img> tags with style `color: transparent`
    const handleTransparentImages = (filterValue) => {
      let images = document.querySelectorAll("img");
      images.forEach((image) => {
        const imgStyle = window.getComputedStyle(image);
        if (imgStyle.color === 'rgba(0, 0, 0, 0)' || imgStyle.color === 'transparent') {
          image.style.filter = filterValue;
        }
      });
    };
  
    // Observe changes to the DOM to handle new media and background image elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList") {
            handleMediaFilters("invert(1) hue-rotate(180deg)");
            handleTransparentImages("invert(0) hue-rotate(360deg)"); 
            handleBackgroundImages("invert(1) hue-rotate(180deg)");
        }
      });
    });
  
    // Start observing the document for changes in child nodes
    observer.observe(document.body, { childList: true, subtree: true });
  
    // Initial dark mode setup
    toggleDarkMode();
  
  })();
  