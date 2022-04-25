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
});