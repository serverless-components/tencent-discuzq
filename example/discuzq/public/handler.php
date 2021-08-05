<?php

// A special handler.

// All requests through API Gateway are HTTPS.
# $_SERVER['HTTPS'] = 'on';

$extension_map = array(
    "css" => "text/css",
    "js" => "application/javascript",
    "png" => "image/png",
    "jpeg" => "image/jpeg",
    "jpg" => "application/x-jpg",
    "svg" => "image/svg+xml",
    "gif" => "image/gif",
    "pdf" => "application/pdf",
    "mp4" => "video/mpeg4",
    "bmp" => "application/x-bmp",
    "c4t" => "application/x-c4t",
    "img" => "application/x-img",
    "m2v" => "video/x-mpeg",
    "mp2v" => "video/mpeg",
    "mpeg" => "video/mpg",
    "ppt" => "application/x-ppt",
    "rm" => "application/vnd.rn-realmedia",
    "swf" => "video/mpeg4",
    "tif" => "image/tiff",
    "tiff" => "image/tiff",
    "vcf" => "text/x-vcard",
    "wav" => "audio/wav",
    "wma" => "audio/x-ms-wma",
    "wmv" => "video/x-ms-wmv",
    "apk" => "application/vnd.android.package-archive",
    "m1v" => "video/x-mpeg",
    "m3u" => "audio/mpegurl",
    "mp2" => "audio/mp2",
    "mp3" => "audio/mp3",
    "mpa" => "video/x-mpg",
    "mpe" => "video/x-mpeg",
    "mpg" => "video/mpg",
    "mpv2" => "video/mpeg",
    "rmvb" => "application/vnd.rn-realmedia-vbr",
    "torrent" => "application/x-bittorrent",
);

$request_uri = explode("?", $_SERVER['REQUEST_URI']);
$public_path = $_SERVER['DOCUMENT_ROOT'];
$local_file_path = $public_path . urldecode($request_uri[0]);

$split = explode(".", $local_file_path);
$extension = end($split);
$mapped_type = $extension_map[$extension];

if ( $mapped_type && file_exists( $local_file_path ) ) {

    header("Content-Type: {$mapped_type}");
    $file_size=filesize($local_file_path);
    header("Accept-Length:$file_size");
    $fp=fopen($local_file_path,"r");
    $buffer=1024;
    $file_count=0;
    while(!feof($fp)&&($file_size-$file_count>0)){
        $file_data=fread($fp,$buffer);
        //统计读了多少个字节
        $file_count+=$buffer;
        echo $file_data;
    }
    fclose($fp);

} elseif ( $extension == "php" && file_exists( $local_file_path ) ) {

    header("X-ExecFile: {$local_file_path}");
    require_once( $local_file_path );

} else {
    // 修改$_SERVER变量，这一步很重要
    $_SERVER['SCRIPT_FILENAME'] = $public_path . 'index.php';
    $_SERVER['SCRIPT_NAME'] = 'index.php';
    $exec_file_path = $public_path . "/index.php";
    header("X-ExecFile: {$exec_file_path}");
    require_once( $exec_file_path );
}

