  import SharedStyle from "./SharedStyle";

 
 export const isDropZone = (hole, itemX, itemY, width, height, headerHeight) => {
  if (
    !hole.filled &&
    (hole.x <= itemX && hole.x + width >= itemX) &&
    (hole.y+headerHeight < itemY && hole.y + height+headerHeight > itemY)
  ) {
    return true;
  } else {
    return false;
  }
};

export const hoverDropZone = (holes, itemX, itemY, width, height,headerHeight) => {
  for (let i = 0; i < holes.length; i++) {
    if (isDropZone(holes[i], itemX, itemY, width, height,headerHeight)) {
        holes[i].hovering = true;
    } else {
        holes[i].hovering = false;
    }
  }

  return holes;
};

export const selectDropZone = (holes, itemX, itemY, width, height,balls, ball,headerHeight) => {
  for (let i = 0; i < holes.length; i++) {
    if (isDropZone(holes[i], itemX, itemY, width, height,headerHeight)) {
      
      holes[i].hovering = false;
      holes[i].filled = true;
      holes[i].color = ball.color;
      holes[i].value = ball.value;
    
      balls = selectBall(balls, ball);
    }
  }

  return {holes, balls};
};


export const selectBall=(balls ,ball)=>{
  for (let i = 0; i < balls.length; i++) {
          if (balls[i].id === ball.id) {
               balls[i].selected = true;
          }
  }

  return balls
}

export const didGameOver=(holes)=>{
    let ret = true;
    for(let i=0; i<holes.length; i++){
         if(holes[i].filled===false){
             ret = false;
             return ret;
         }
    }
    return ret;
}

export const didIwin=(holes)=>{
    if( (holes[0].value === holes[3].value && holes[0].value=== holes[6].value) && 
        (holes[1].value === holes[4].value && holes[1].value=== holes[7].value) && 
        (holes[2].value === holes[5].value && holes[2].value=== holes[8].value) ){
        return true;
    }else{
        return false;
    }
}

export const refreshBoard=(holes)=>{
    for(let i=0; i<holes.length; i++){
         holes[i].filled = false;
         holes[i].color  = SharedStyle.color.white; 
         holes[i].value  = null

    }

    return holes;
}

export const refreshBalls=(balls)=>{
    for (let i = 0; i < balls.length; i++) {
           balls[i].selected=false
   }

   return balls;
}