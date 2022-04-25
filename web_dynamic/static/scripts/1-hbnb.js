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
      if (text.length > 36) {
        text = text.slice(0, 35) + text[35] + '..';
      }
      $('div.amenities h4').text(text);
    }
  });
});