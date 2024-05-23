<?php
require '/vendor/autoload.php';

DB::$user = 'sql12708572';
DB::$password = 'VJvLZLjbsE';
DB::$dbName = 'sql12708572';
DB::$host = 'sql12.freemysqlhosting.net';
DB::$port = '3306';

extract($_POST);

DB::insert('tbl_registration', $_POST);

echo json_encode(["response" => 1]);

?>