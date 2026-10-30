let follower = document.querySelector(".selectedSquare");
let wrapper = document.querySelector(".wrapper");

const followerWidth = 23;
const followerOffset = 0;

let isToggled = false;
let followerX, followerY;
let savedX;
let savedY;

let mouseFollower = (e) => {
  follower.style['transition-duration'] = '0s';

  moveFollower(e, isToggled);

  // console.log(`Grid position: X: ${gridX} Y: ${gridY} Mask offset: X: ${remainderX} Y: ${remainderY} Mouse Pos: X: ${e.clientX} Y: ${e.clientY}`);  
}

function moveFollower(e, updateGridOnly) {
  let x = e.clientX;
  let y = e.clientY;

  let remainderX = x%followerWidth;
  let remainderY = y%followerWidth;

  followerY = (y-remainderY)-(followerOffset*followerWidth);
  followerX = (x-remainderX)-(followerOffset*followerWidth);

  let gridY = (y-remainderY)-((followerOffset+1)*followerWidth);
  let gridX = (x-remainderX)-((followerOffset+1)*followerWidth);

  wrapper.style['mask-position'] = `${remainderX-(followerWidth/2)}px ${remainderY-(followerWidth/2)}px`;

  if (updateGridOnly == false) {
    follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
  }

  if (updateGridOnly == true) {
    updateBoxShadow(x, y, savedY, savedX);
  }

  wrapper.style.transform = `translate3d(${gridX}px, ${gridY}px, 0)`;
}

function animateClick(e) {
  isToggled = !isToggled;
    if (isToggled == true) {
    follower.classList.add('active');
    follower.style.transform = `translate3d(${followerX}px, ${followerY-5}px, 0)`;

    savedX = followerX;
    savedY = followerY;
  } else {
    follower.classList.remove('active');
    follower.style['transition-duration'] = '0.5s';
    follower.style['box-shadow'] = 'none';
    moveFollower(e, isToggled);  
  }
}

function updateBoxShadow(x, y, followerY, followerX) {
  let xD = x-followerX;
  let yD = y-followerY;

  let shadowX = Math.cbrt(xD);
  let shadowY = Math.cbrt(yD);

  // console.log(shadowX, shadowY, xD, yD);
  
  follower.style.setProperty(
    'box-shadow', 
    `0px 5px 0px 0px rgba(0,0,0,0.75), ${-(shadowX)}px ${5+(-(shadowY))}px 5px 1px rgba(0,0,0,0.25)`,
    'important'
  );
}

document.addEventListener("mousemove", (e) => {
  mouseFollower(e);
})

document.addEventListener("click", (e) => {
  animateClick(e);
})




