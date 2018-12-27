//Get Elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
//Build functions
// console.dir(video);
// console.dir(toggle);
function togglePlay() {
  if(video.paused) {
    video.play();
  }else{
    video.pause();
  }
}

function updateButton() {
  // console.log('update the button');
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  // console.dir(this);
  // console.log(this.dataset);
  video.currentTime += +this.dataset.skip;
}
function handleRangeUpdate() {
  video[this.name] = this.value;
  // console.log(this.name)
  // console.log(this.value);
}
function handleProgress() {
  const present = (video.currentTime / video.duration) * 100; 
  progressBar.style.flexBasis = `${present}%`;
}
// console.dir(progress)
function selectTime(e) {
  // console.log(e);
  const time = (e.offsetX / progress.clientWidth)* video.duration;
  video.currentTime = time;
}
//Hook up event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
skipButtons.forEach(btn => btn.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate)); 
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate)); 

let mousedown = false;
progress.addEventListener('click', selectTime);
progress.addEventListener('mousemove', (e) => mousedown && selectTime(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mouseout', () => mousedown = false);
