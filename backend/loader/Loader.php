<?php



use App\Helpers\Tools;

function cr_getArrayOfFiles(string $dir, $filter)
{
    $cdir = getDirContent($dir);
    return array_filter($cdir, function ($item) use ($filter) {
        return preg_match("/$filter/i", $item);
    });
}
function cr_requireFolder($dirPath, $ext)
{
    $dir = getDirContent($dirPath);
    foreach ($dir as $item) {
        $path = "$dirPath/$item";
        if ($item == "." || $item == "..") {
            continue;
        }
        if (is_dir($path)) {
            cr_requireFolder($path, $ext);
            continue;
        }
        if (preg_match("/\.$ext/", $item)) {
            require_once($path);
        }
    }
}
function getDirContent($dir)
{
    if (!is_dir($dir)) {
        return [$dir];
    }

    return scandir($dir);
}
