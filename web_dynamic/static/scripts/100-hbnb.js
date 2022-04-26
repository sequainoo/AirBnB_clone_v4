$(document).ready(function() {
  const amenity_ids = [];
  const amenity_names = [];
  const state_ids = [];
  const state_names = [];
  const city_ids = [];
  const city_names = [];

  // add change event listeners to amenity checkboxes
  $('div.amenities .popover ul li input').change(function() {
    if ($(this).is(':checked')) {
      amenity_ids.push(this.dataset.id);
      amenity_names.push(this.dataset.name);

      let text = amenity_names.join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.amenities h4').text(text);
    } else {
      const index = amenity_ids.indexOf(this.dataset.id);
      amenity_ids.splice(index, 1);
      amenity_names.splice(index, 1);

      let text = amenity_names.join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.amenities h4').text(text);
    }
  });

  // add change event listeners to states checkboxes
  $(".locations > .popover > ul > li > input[type=checkbox]").change(function() {
    if ($(this).is(":checked")) {
      state_ids.push(this.dataset.id);
      state_names.push(this.dataset.name);

      let text = state_names.concat(city_names).join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.locations h4').text(text);
    } else {
      const index = state_ids.indexOf(this.dataset.id);
      state_ids.splice(index, 1);
      state_names.splice(index, 1);

      let text = state_names.concat(city_names).join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.locations h4').text(text);
    }
  });

  // add change listeners to city checkboxes
  $(".locations > .popover > ul > li > ul > li > input[type=checkbox]").change(function() {
    if ($(this).is(":checked")) {
      city_ids.push(this.dataset.id);
      city_names.push(this.dataset.name);

      let text = state_names.concat(city_names).join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.locations h4').text(text);
    } else {
      const index = state_ids.indexOf(this.dataset.id);
      city_ids.splice(index, 1);
      city_names.splice(index, 1);

      let text = state_names.concat(city_names).join(', ');
      if (text.length > 35) {
        text = text.slice(0, 32) + '...';
      }
      $('div.locations h4').text(text);
    }
  });

  $.get('http://localhost:5001/api/v1/status/', (data, textStatus) => {
    if (data.status == "OK") {
      $('header div#api_status').addClass('available');
    } else {
      $('header div#api_status').removeClass('available');
    }
  });

  // initial request for all places
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
	            ${ place.description || 'No description'}
            </div>
	        </article>`;

        $('section.places').append(article)
      }
    });

  // search button for all selected place filters
    $('button[type=button]').on('click', function() {
    data = {
      'states': state_ids,
      'cities': city_ids,
      'amenities': amenity_ids
    };
    data = JSON.stringify(data);

    $.post({
      url: 'http://localhost:5001/api/v1/places_search',
      contentType: 'application/json',
      data
    }).done(function(data, status) {
      $('section.places').empty();

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
              ${ place.description || 'No description'}
            </div>
          </article>`;

        $('section.places').append(article)
      }
    });
  });
});