// This script can be used to scrape an array of ride data from the DippieDoe website:
// URL: https://www.dippiedoe.nl/nl/dippiedoe-attracties

document.querySelectorAll('.elementor-element-e7e5e2a').forEach((item) => {
  item.style.opacity = 1;
  item.style.visibility = 'visible';
  item.style.height = '200px';
});

if (typeof rides === undefined) {
  let rides = [];
} else {
  rides = [];
}

document.querySelectorAll('.row-attracties .elementor-post.elementor-grid-item.ecs-post-loop').forEach(item => {
  let title = item.querySelector('.elementor-page-title').innerText.replace(/(\r\n|\n|\r)/gm, '');
  let description = item.querySelector('.attractie-beschrijving').innerText;
  let area = item.querySelector('.elementor-heading-title.elementor-size-default').innerText;
  let img = item.querySelector('img').getAttribute('src');
  let video = item.querySelector('video').getAttribute('src');

  let constructor = item.querySelector('elementor-element-6745541');
  if (constructor) {
    constructor = constructor.innerText;
  }

  let openingYear = item.querySelector('elementor-element-8471bf7');
  if (openingYear) {
    openingYear = openingYear.innerText;
  }

  // Fix NBSP in description
  const re = new RegExp(String.fromCharCode(160), 'g');
  description = description.replace(re, ' ');

  let lengthResponse = item.querySelector('.elementor-element-885fd6d');
  let minLength, maxLength, minAge, maxAge, minLengthAlone = undefined;

  if (lengthResponse && lengthResponse.innerText.includes('cm')) {
    minLength = parseFloat(lengthResponse.innerText.split(' cm')[0]);
  }

  rides.push({
    id: title.replace(/[\W_]+/g, ' ').replace(/ /g, '_').toLowerCase(),
    title,
    description,
    area,
    minLength,
    maxLength,
    minAge,
    maxAge,
    minLengthAlone,
    image_url: img,
    video_url: video,
    constructor,

  });
});

rides;
