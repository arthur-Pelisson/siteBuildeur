const centerGrid = (mainDiv: any, setReady: any) => {
    // console.log("mainDiv", mainDiv.current);
    // console.log("setReady" , setReady);
    if (mainDiv.current) {
        // console.log("parentWidth", mainDiv.current.parentElement.clientWidth);
      if (mainDiv.current.parentElement == null) return;
      const computedStyleParent = window.getComputedStyle(mainDiv.current.parentElement);
      const parentWidth = parseFloat(computedStyleParent.width);
        // console.log("children", mainDiv.current.children);
      if (mainDiv.current.children.length === 0) {
        // console.log("mainDiv.current.children.length", mainDiv.current.children.length);
        recursive(mainDiv, setReady);
        return;
      };
      
      const childrenElement = mainDiv.current.children[0];
      //look if the image is loaded
      const getImgChildren = childrenElement.querySelector("img");
      // console.log("getImgChildren", getImgChildren);
      if (!getImgChildren || !getImgChildren.complete ) { 
        //if not loaded, wait 200ms and try again
        recursive(mainDiv, setReady);
        return;
      };
      const computedStyles = window.getComputedStyle(childrenElement);
  
      const childreWidth = parseFloat(computedStyles.width);
    //   console.log("childreWidth", childreWidth);
      const marginLeft = parseFloat(computedStyles.marginLeft);
      const marginRight = parseFloat(computedStyles.marginRight);
  
      let count = 1;
        while ((childreWidth + marginLeft + marginRight) * (count+1) <= parentWidth) {
            // console.log((childreWidth + marginLeft + marginRight) * (count+1))
            // console.log(parentWidth)
            // console.log(count)
            count++;
        }
        // console.log("count", count)
        // console.log("childrenElement.length", mainDiv.current.children.length)
        if (mainDiv.current.children.length < count) {
            count = mainDiv.current.children.length;
        }
      // console.log(childreWidth, marginLeft, marginRight, count)
      const totalWidth = (childreWidth + marginLeft + marginRight) * count;
      mainDiv.current.style.width = `${totalWidth}px`;
      setReady(true);
      // console.log("mainDiv", mainDiv);
      // console.log("mainDiv.current.style.width", mainDiv.current.style.width);
    }
  };

  const recursive = (mainDiv: any, setReady: any) => {
    setTimeout(() => {
      centerGrid(mainDiv, setReady);
    }, 200);
  };

  export default centerGrid;