<?php
/**
 * Crea un segmento de codigo pretryficado 
 * @param {} $data
 * */
function dd($data){
    echo '<pre>' . var_export($data, true) . '</pre>';
}
/**
 * Analiza carptas para buscar archivos por tipo
 *
 * @param string $type
 * @param string $folder
 * @param function $callback
 * @return void
 */
function getFilesByTypeInFolder(string $type,string $folder,$callback=null){
    $paths = [];
     
    if(!is_dir($folder)){
        return [];
    }
    $files = scandir($folder);
    foreach($files as $key=>$file){
        if($file =="." || $file==".."){
            continue;
        }
        if(is_dir($file)){
            $paths=array_merge($paths,getFilesByTypeInFolder($type,$file,$callback));
            continue;
        }
        $paths[] = $folder."/".$file;
        $parts = preg_split("/\./",$file);
        $fileType = end($parts);
        if($fileType == $type && $callback!=null) {
            $callback($folder,$file);
        }
    }
    return $paths;

}