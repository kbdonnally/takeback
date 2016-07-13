<?php

/**
 * Adds theme assets to queues.
 *
 * - Modernizr
 * - Respond.js
 * - Selectivizr
 * - Google Fonts style sheet
 * - Theme style sheet
 */
function queue_theme_assets() {
    queue_js_file('modernizr.min');
    queue_js_file(array('respond.min', 'selectivizr.min'), 'javascripts', array('conditional' => 'lt IE 9'));

    get_view()->headLink()->prependStylesheet('http://fonts.googleapis.com/css?family=Open+Sans:400,700');
    queue_css_file('style');
}

function queue_slides_assets() {
    queue_js_file('deck/deck.core');
    queue_js_file('deck/extensions/scale/deck.scale');
    queue_js_file('deck/extensions/automatic/deck.automatic');
    queue_js_file('slides');
}

add_filter(array('Display', 'Item', 'Item Type Metadata', 'URL'), 'make_url_link');

function make_url_link($url)
{
    if(empty($url)) {
        return;
    }
    return '<a href="'.$url.'">'.$url.'</a>';
}

add_filter(array('Display', 'Item', 'Dublin Core', 'Subject'), 'make_subject_link');

function make_subject_link($subject) {
    if(empty($subject)) {
        return;
    }

    /* TODO: Query for element_id, instead of assuming it is 49. */
    $url = 'http://local.dev/takeback/items/browse?search=&advanced[0][element_id]=49&advanced[0][type]=is+exactly&advanced[0][terms]='.$subject;

    return '<a href="'.$url.'">'.$subject.'</a>';
}

add_filter(
  array('Display', 'Item', 'Dublin Core', 'Title'),
  'filter_item_title'
);


function filter_item_title($title) {
  /*
  $patterns = array();
  $patterns[0] = 'Cavalier Daily';
  $patterns[1] = '+?(?=-\=)/';
  $replacements = array('','');

*/

  //$pattern = '/Cavalier\ Daily/';

  //return $pattern;
  //return preg_replace($pattern, '', $title);

  $title = 'foobar';
  return $title;
}

function get_unique_subjects() {
  $db = get_db();
  $table = $db->getTable('ElementText');
  $elementId = 49;
  $subjects = $table->getSelect()->where('element_texts.element_id = ?', (int)$elementId)->distinct();

  return count($table->fetchObjects($subjects));
}

