// Custom Cursor
document.addEventListener('mousemove', (e) => {
    const cursor = document.getElementById('cursor');
    
    cursor.style.top = `${e.clientY}px`;
    cursor.style.left = `${e.clientX}px`;
});

(function() {
    // Svg
    let svgNS = "http://www.w3.org/2000/svg",
        svg   = document.querySelector("#svg"),
  
        randomX = 0,
        randomY = 0,
        randomR = 0,
        randomDelay = 0,
        ViewportX = window.innerWidth,
        ViewportY = window.innerHeight,
        listItems = Array.from(
          document.querySelectorAll(".list-item")
        )
    // Func 0
    function createPathStr(pArr) {
      let path = 'M';
      let index = 1;
      // The index here to iterate at numbers and to omit letters
      // --> 74[1] - 34.4[2] - L[omit] - 65.1[3]
      pArr.forEach(function(p) {
        if(typeof p === "number") {
          if(index % 2 == 0) {
            // Find percentage of coord according to viewport --> 74% of 1920px = ~500px and 
            // 1. 74 / 100 = 0.74
            // 2. 0.74 * 1920 = ~1420
            // 3. 1920 - 1420 = 500
            path += " " + 
              (ViewportY - ((p / 100) * ViewportY)).toFixed(0);
            index++;
          } else {
            path += " " + 
              (ViewportX - ((p / 100) * ViewportX)).toFixed(0);
            index++;
          }
        } else {
          path += " " + p; 
        }
      });
      return path;
    }
  
    // Func 1
    function setCoords(c, rX, rY, fill, isRandom) {
      c.setAttribute("cx", rX);
      c.setAttribute("cy", rY);
      c.setAttribute("fill", fill);
      // If isRandom is an integer, set specific radius, otherwise set a random number
      c.setAttribute("r", 2) ? Nubmer.isInteger(ifRandom) : c.setAttribute("r", isRandom);
      svg.appendChild(c);
      // UPDATED 1/22/19
      // For a better performance use DocumentFragment for 
      // appending multiple child nodes to parent.
      return;
    }
    // Func 2
    function setProps(el, classArr, attrArr) {
      if(el !== undefined) {
        if(classArr !== undefined && classArr.length && Array.isArray(classArr) ) {
          classArr.forEach(function(clas) {
            el.classList.add(clas);
          });
        }
        if (attrArr !== undefined && attrArr.length && Array.isArray(attrArr)) {
          attrArr.forEach(function(attr) {
            el.setAttribute(attr.style, attr.val);
          }); 
        }
      } 
      return;
    }
    // Func 3
    function setGroupCoords(group, rX, rY) {
      let txy = "translate(" + rX + "," + rY + ")"
      group.setAttribute("transform", txy);
      svg.appendChild(group);
      return;
    }
    // Func 4
    function setPath(pathStr) {
      let pathEl       = document.createElementNS(svgNS, "path");
      setProps(pathEl, [], [
        {
        style: "id", 
        val: "constellation"
        }, 
        {
          style: "fill", 
          val: "none"
        }, 
        {
          style: "stroke", 
          val: "#fff"
        }, 
        {
          style: "style",
          val: "opacity: .5;"
        }, 
        {
          style: "stroke-width", 
          val: 2
        }, 
        {
          style: "d", val: pathStr
        }
      ]);
  
      let total_length = pathEl.getTotalLength();
      pathEl.setAttribute("stroke-dasharray", total_length);
      pathEl.setAttribute("stroke-dashoffset", total_length);
      svg.appendChild(pathEl);
    }
    // Func 5
    function setDesc(pathDesc) {
      let descEl         = document.createElementNS(svgNS, "text");
      let i              = 0;
      let indentX        = 0;
      let paragraphs     = pathDesc.split(".");
      let txtNode        = {};
      let tspam          = {};
      let x              = (ViewportX - ((67.54 / 100) * ViewportX  )).toFixed(0);
      let y              = (ViewportY - ((67.3 / 100) * ViewportY)).toFixed(0);
      let txy            = "translate(" + x + "," + y + ")";
      let verticalIndent = 20;
  
        for(i, textNode = paragraphs.length; i < textNode; i++) {
          if(paragraphs[i].length) {
            tspan = document.createElementNS(svgNS, "tspan");
            indentX = i < 1 ? 0 : - 10;
            txtNode = document.createTextNode(paragraphs[i]);
            tspan.appendChild(txtNode);
            setProps(tspan, [], [
              {
                style: "y", 
                val: verticalIndent
              }, 
              {
                style: "x", 
                val: indentX
              }
            ]); 
            descEl.appendChild(tspan);              
            verticalIndent += 25; 
          }
        } 
        svg.appendChild(descEl);
        descEl.classList.add("desc");
        descEl.setAttribute("transform", txy);
    }
  
    // ==============
    // Main Functions
    // ==============
      
    // Func 0
    function drawStars() {
      let allCoords = [],
      n = (ViewportX >= 1000 && ViewportY >= 600) ? 40 : 20,
      n1 = (ViewportX >= 1000 && ViewportY >= 600) ? 400 : 200;
  
      // Stars Loop
      for (var i = 0, stars = 300; i < stars; i++) {
        let circle   = document.createElementNS(svgNS, "circle");
        randomX      = +(Math.random() * (ViewportX - 0) + 0).toFixed(2);
        randomY      = +(Math.random() * (ViewportY - 0) + 0).toFixed(2);
        randomR      = +(Math.random() * 2.5).toFixed(2);
        setCoords(
          circle, 
          randomX, 
          randomY, 
          "#fff", 
          randomR
        );
        allCoords.push(circle);
      }
      
      // Animated Stars Loop
      for(let i = 0, animStars = n1; i < animStars; i++) {
        let circle = document.createElementNS(svgNS, "circle");
  
        randomX = +(Math.random() * (ViewportX - 0) + 0).toFixed(2);
        randomY = +(Math.random() * (ViewportY - 0) + 0).toFixed(2);
        randomDelay = +(Math.random() * (-4 - 2.5)  + -4).toFixed(2);
  
        circle.classList.add("animate");
        circle.style.animationDelay = randomDelay + "s";
        setCoords(circle, randomX, randomY, "#fff", 2);
        
        // Causing additional 2-3s of JS execution  
        // allCoords.push(circle);
      }
  
      // For each circle get its coords
      allCoords.forEach(function(el) {
        let elX = +el.attributes["cx"].value, arrElX = 0;
        let elY = +el.attributes["cy"].value, arrElY = 0;
        let pathStr = "";
        let i = 0;
        let path;
        let arr;
      
        for(i, arr = allCoords; i < arr.length; i++) {
          arrElX = arr[i].attributes["cx"].value;
          arrElY = arr[i].attributes["cy"].value;
          // Check for each circle whether other circles' coordinates enter to the its 40x40 range 
          // If so, create a path with M (circle's coordinates) as well as L (other's coordinates)
          // and then put the path to "d" attribute   
          if( 
            (elY - arrElY <= n && elY - arrElY >= -n) && 
            (elX - arrElX <= n && elX - arrElX >= -n) 
          ) {
            path = document.createElementNS(svgNS, "path");
            pathStr = 
              "M" + " " + elX + 
              " " + elY + " L" + 
              " " + arrElX + " " + arrElY; 
            setProps(path, [], [
              {
                style: "fill", 
                val: "none"
              }, 
              {
                style: "stroke", 
                val: "#fff"
              }, 
              {
                style: "style", 
                val: "opacity: .05;"
              }, 
              {
                style: "stroke-width", 
                val: 1
              }, 
              {
                style: "d", 
                val: pathStr
              }
            ])  
            svg.appendChild(path);
          }
        }
      });
      return;     
    }
    // Func 1
    function drawPath() {
       let element = this;
        let id = +element.id;
        let stars = 10;
        // Return the obj according to the ID
        let currentPathObj = pathArr.find(function(obj) {return obj.id === id});
        let pathStr = currentPathObj.path;
        let pathDesc = currentPathObj.description;
        let descPos = currentPathObj.descPosition;
        let pathRegex = /\w\s\d+\s\d+/gi;
        let filterM = /M\s\d+\s\d+/g;
        let cleanCoords = /[MLZ]\s/gi;
        let xRegex = /\d+/;
        let yRegex = /\d+$/;
        let newCoords  = [];
        let X = 0;
        let Y = 0;
        let c = svg.querySelectorAll(".animate");
        // Create path element --> 137 line
        setPath(pathStr);
        // eventListener on "animationend" wasn't used because of its delay
        for (let i = 0, circle = c.length / 1.4; i < circle; i++) {
          c[i].classList.add("paused")
        }
        let onAnimation = svg.querySelector("#constellation");
        setTimeout(
          function() {
            for(var i = 0, circle = c.length; i < circle; i++) {
              c[i].classList.remove("paused")
            }
          }, 3000);
        // Drop a path by x and y coords --> "M 109 542 L 100 435 M 0 345..." to ["M 109 542", "L 100 435", "M 0 345"]
        coordsArr = pathStr.match(pathRegex);
        coordsArr[0] = coordsArr[0].replace(/M\s/gi, '');
        // Return coords without M comamnd to avoid several points in the same place
        coordsArr = coordsArr.filter(function(coord) {return !coord.match(filterM)});
        // Return coords without commands --> e.g "M 131.20 500.11" to "131.20 500.11"
        coordsArr = coordsArr.forEach(function(coord) {newCoords.push(coord.replace(cleanCoords, ''))});
        // Create constellation's description --> 150 line
        setDesc(pathDesc);
      // Create (n) amount of a constellation's star 
      for (var i = 0, coords = newCoords.length; i < coords; i++) {
        let group = document.createElementNS(svgNS, "g"); 
        let circle  = document.createElementNS(svgNS, "circle");
        X = +newCoords[i].match(xRegex);
        Y = +newCoords[i].match(yRegex);
        // randomX is in range to avoid a circle creation over of the list
        randomX = +(Math.random() * ((ViewportX - 100) - 250) + 250).toFixed(2);
        randomY = +(Math.random() * ((ViewportY - 100) - 50) + 50).toFixed(2);
        randomR = +(Math.random() * (4 - 1.5) + 1.5).toFixed(2);
        setProps(circle, ["cStar"], [
          {
            style: "stroke-width", 
            val: 10
          }, 
          {
            style: "stroke", 
            val: "rgba(225,225,225,.1)"
          }, 
          {
            style: "r", 
            val: randomR
          }
        ]);
        setProps(group, ["star-group"], []);
        group.appendChild(circle);
        setGroupCoords(group, X, Y);
      }
      // Func 1/2
      function deleteEl() {
        let path = svg.querySelector("#constellation");
        let text = svg.querySelector(".desc");
        // make animation runing again
        for (var i = 0, circle = c.length; i < circle; i++) {
          c[i].classList.contains("paused") ? 
            c[i].classList.remove("paused") : false
        }
        if(path) {svg.removeChild(path); path = null}
        if(text) {svg.removeChild(text); text = null}
        svg
          .querySelectorAll(".star-group")
          .forEach(function(el) {
          if(el)
          svg.removeChild(el);
          el = null;
        });
      }
      this.addEventListener("mouseout", deleteEl);
    }
    drawStars();
    listItems.forEach(function(el) {
      el.addEventListener("mouseover", drawPath);
    });
  })();