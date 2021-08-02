// This script can be used to scrape an array of ride data from the DippieDoe website:
// URL: https://www.dippiedoe.nl/nl/dippiedoe-attracties

if (typeof rides === undefined) {
  let rides = [];
} else {
  rides = [];
}

document.querySelectorAll('.product-holder').forEach(item => {
  let title = item.querySelector('h3').innerHTML;
  let description = item.querySelector('p:not(:empty)').innerText;
  let area = item.querySelector('.locatie').innerText;
  let img = item.querySelector('img').getAttribute('src');

  // Fix NBSP in description
  const re = new RegExp(String.fromCharCode(160), "g");
  description = description.replace(re, " ");

  let lengthResponse = item.querySelector('.lengte').innerText;
  let minLength, maxLength, minAge, maxAge, minLengthAlone = undefined;

  if (lengthResponse.includes('cm')) {
    minLength = parseFloat(lengthResponse.split(' cm')[0]);
  } else if (lengthResponse.includes('jaar')) {
    minAge = parseInt(lengthResponse.split('-')[0]);
    maxAge = parseInt(lengthResponse.split('-')[1].split(' jaar')[0]);
  }

  item.querySelectorAll('p').forEach(lengthItem => {
    if (lengthItem.innerText.includes('alleen onder begeleiding')) {
      let minAloneLengthResponse = lengthItem.querySelector('span').innerText;

      if (minAloneLengthResponse.includes('-')) {
        minLength = parseInt(minAloneLengthResponse.split('-')[0]);
        minLengthAlone = parseInt(minAloneLengthResponse.split('-')[1]);
      } else if (minAloneLengthResponse.toLowerCase().includes('tot')) {
        minLength = parseInt(minAloneLengthResponse.toLowerCase().split('tot')[0]);
        minLengthAlone = parseInt(minAloneLengthResponse.toLowerCase().split('tot')[1].split('cm')[0]);
      }
    }

    if (lengthItem.innerText.includes('Minimum leeftijd:')) {
      let minAgeResponse = lengthItem.innerText;

      minAge = parseInt(minAgeResponse.split('Minimum leeftijd:')[1]);
    }
  })

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
  });
});

rides;
