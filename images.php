<?php
error_reporting(-1);
ini_set('display_errors', 'On');

include ('simple_html_dom.php');

function request($url)    {

    $c = curl_init();

    curl_setopt($c, CURLOPT_URL, $url);
    curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($c, CURLOPT_HEADER, 0);

    $d = curl_exec($c);
    curl_close($c);
    return $d;

}

if(isset($_GET["key"])) {
    $html = request("https://www.bing.com/images/search?q=".urlencode($_GET["key"]));

    $pattern = '/https?:\/\/[^ ]+?(?:\.jpg|\.png|\.gif)/';

    $m = preg_match_all($pattern,$html,$matches);

    echo json_encode($matches[0]);
}