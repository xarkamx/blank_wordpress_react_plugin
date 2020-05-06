<?php



use App\Helpers\Tools;

function cr_getArrayOfFiles(string $dir, $filter)
{

    if (!is_dir($dir)) {
        return [$dir];
    }

    $cdir = scandir($dir);
    return array_filter($cdir, function ($item) use ($filter) {
        return preg_match("/$filter/i", $item);
    });
}
