$(document).ready(function() {
  const ids = [];
  const names = [];

  $('div.amenities .popover ul li input').change(function() {
    if ($(this).is(':checked')) {
      ids.push(this.dataset.id);
      names.push(this.dataset.name);

      let text = names.join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.amenities h4').text(text);
    } else {
      const index = ids.indexOf(this.dataset.id);
      ids.splice(index, 1);
      names.splice(index, 1);

      let text = names.join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.amenities h4').text(text);
    }
  });

  $.get('http://localhost:5001/api/v1/status/', (data, textStatus) => {
    if (data.status == "OK") {
      $('header div#api_status').addClass('available');
    } else {
      $('header div#api_status').removeClass('available');
    }
  });

  $.post(
    {
      'url': 'http://localhost:5001/api/v1/places_search/',
      'contentType': 'application/json',
      'data': '{}'
  }).done(function (data, textStatus) {
      for (const place of data) {
        const guest = place.max_guest !== 1 ? 'Guests': 'Guest';
        const bedroom = place.number_rooms !== 1? 'Bedrooms': 'Bedroom'
        const bathroom = place.number_rooms !== 1? 'Bathrooms': 'Bathroom'
        const article = `
          <article>
	          <div class="title_box">
	            <h2>${ place.name }</h2>
	            <div class="price_by_night">$${ place.price_by_night }</div>
	          </div>
	          <div class="information">
	            <div class="max_guest">
                ${place.max_guest} ${guest}
              </div>
              <div class="number_rooms">${ place.number_rooms } ${bedroom}</div>
              <div class="number_bathrooms">${ place.number_bathrooms } ${bathroom}</div>
	          </div>
            <div class="description">
	            ${ place.description || ''}
            </div>
	        </article>`;

        $('section.places').append(article)
      }
    })
});