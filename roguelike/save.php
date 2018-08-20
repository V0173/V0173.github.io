<?php

$loc="save.txt";
$str="hello world!";

file_put_contents($loc,$str);

$str=file_get_contents($loc);

echo $str;

?>
