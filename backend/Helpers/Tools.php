<?php

namespace App\Helpers;


class Tools
{
    public function tokenizer($credentials)
    {
        $user = $credentials['username'];
        $password = $credentials['password'];
        $date = date("Y-m-d H:i:s");
        $rand = uniqid();
        return md5("$user:$password:$date:$rand");
    }
    public function splitAtUpperCase($s)
    {
        $split = preg_split('/(?=[A-Z])/', $s, -1, PREG_SPLIT_NO_EMPTY);
        return implode(' ', $split);
    }

    public function exist_in_modal($modal, $column, $value)
    {
        if ($value == null) {
            return false;
        }
        $values = $modal->where($column, $value);
        return (count($values->get()) > 0) ? $values : false;
    }
    public function b64toFile($folderName, $b64file, $filename = 'myfile', $ext = null)
    {
        if (!file_exists($folderName)) {
            mkdir($folderName, 0775, true);
        }
        $b64file = trim($b64file);
        $data = preg_split('/[,\.]/', $b64file);
        $type = preg_split('/\//', $data[0]);

        if (count($type) <= 1) {
            throw 'Invalid b64 string';
        }
        $ext = ($ext == null) ? preg_replace("/;base64/", '', $type[1]) : $ext;
        $file = str_replace(' ', '+', $data[1]);
        $file = base64_decode($file);
        $filePath = "$folderName/$filename.$ext";
        file_put_contents($filePath, $file);
        $image_compress = $this->scaleImage($filePath);
        return "/$folderName/$filename.$ext";
    }

    /**
     * retorna una imagen con una escala en factor de N.
     *
     * @param String $path
     * @param float $factor
     * @return boolean
     */
    public function scaleImage(String $path, float $factor = .5)
    {
        list($width, $height, $type) = \getimagesize($path);
        $width *= $factor;
        $height *= $factor;

        $type = \image_type_to_mime_type($type);
        switch ($type) {
            case 'image/gif':
                $image = \imagecreatefromgif($path);
                break;
            case 'image/jpeg':
                $image = \imagecreatefromjpeg($path);
                break;
            case 'image/png':
                $image = \imagecreatefrompng($path);
                break;
            default:
                return false;
                break;
        }

        $newImage = \imagescale($image, $width, $height);
        switch ($type) {
            case 'image/gif':
                \imagegif($newImage, $path, 3);
                break;
            case 'image/jpeg':
                \imagejpeg($newImage, $path);
                break;
            case 'image/png':
                \imagepng($newImage, $path, 3);
                break;
            default:
                return false;
                break;
        }



        return true;
    }


    public function systemPathToUrl($path)
    {
        return "http://" . str_replace($_SERVER['DOCUMENT_ROOT'], $_SERVER['HTTP_HOST'], $path);
    }
    public function replaceWeirdChar($r)
    {
        $r = preg_replace("/ /", "_", $r);
        $r = preg_replace("/\+/", "plus", $r);
        $r = preg_replace("/\:/", "", $r);
        $r = preg_replace("/-/", "_", $r);
        $r = strtolower($r);
        $r = iconv('ISO-8859-1', 'ASCII//TRANSLIT//IGNORE', $r);
        $r = preg_replace("/ú/i", "u", $r);
        $r = preg_replace("/[\.\?\¿\(\)]/", "", $r);
        return $r;
    } //elimina todos los caracteres que podrian dar problemas en una db
    public function replaceHtmlchar($string)
    {
        $avoid = preg_replace("/\</", "", $string);
        $avoid = preg_replace("/\>/", "", $avoid);
        return $avoid;
    } //elimina corchetes angulares.
    public function replaceSimpleQuote($string)
    {
        return preg_replace("/'/", "\'", $string);
    }
    public function downfile($archivo)
    {

        if (file_exists($archivo)) {

            header("Content-Length: " . filesize($archivo));

            header("Content-type: application/octet-stream");

            header("Content-disposition: attachment; filename=" . basename($archivo));

            header('Expires: 0');

            header('Cache-Control: must-revalidate, post-check=0, pre-check=0');

            ob_clean();

            flush();

            readfile($archivo);
        } else {

            echo $archivo[0];
        }
    } //descarga archivos
    public function crearCarpeta($direccion)
    {

        if (!file_exists($direccion)) {

            mkdir($direccion, 0777);
        }
    }

    public function exist_on_array($array, $element)
    {

        for ($x = 0; $x < count($array); $x++) {

            if ($array[$x] == $element) {

                return true;
            }
        }

        return false;
    } //busca un elemento en el array, y regresa true de existir y false de no hacerlo
    public function listDirectory($dir)
    {

        $result = array();

        $root = scandir($dir);

        foreach ($root as $value) {

            if ($value === '.' || $value === '..') {

                continue;
            }

            if (is_file("$dir $value")) {

                $result[] = "$dir $value";

                continue;
            }

            if (is_dir("$dir $value")) {

                $result[] = "$dir  $value/";
            }

            foreach (self::listDirectory("$dir  $value/") as $value) {

                $result[] = $value;
            }
        }

        return $result;
    } //enlista todos los directorios del camino asignado
    public function arr_to_form($args)
    {
        if ($args == null) {
            return 0;
        }

        $title = '';
        if ($args['titulo']) {
            $title = $args['titulo'];
            unset($args['titulo']);
        }
        $html = "<div class='g_form'>
        <h3>$title</h3>
        ";

        foreach ($args as $element) {
            $id = $element['id'];
            unset($element['id']);
            $keys = array_keys($element);
            $html .= "<div class='g_input' id='li-$id-$title'>
                   ";
            foreach ($keys as $key) {
                $html .= " <div class='gr_input'>
                    <label>$key</label>
                    <input id='$id-$key-$title' class='gen_input' name='$id-$key-$title' value='$element[$key]'></div>";
            }
            $html .= "
                    <div class='gr_input'>
                        <div class='deleteButton' id='d-$id-$title' onclick='killElement(this.id)'>X</div>
                    </div>
                </div>";
        }
        $html .= '</from></div>';
        return $html;
    } //convierte un arreglo en formulario
    public function fileToPath($path, $files, $name = '')
    {
        $plugin_path = dirname(__DIR__);
        if (!is_dir($path)) {
            mkdir($path);
        }
        $result = [];
        foreach ($files['name'] as $key => $file) {
            if ($files["error"][$key] == UPLOAD_ERR_OK) {
                $tmp_name = $files["tmp_name"][$key];
                pathinfo($files["name"][$key], PATHINFO_EXTENSION);
                $name = $files["name"][$key];
                $result[] = (move_uploaded_file($tmp_name, "$path/$name")) ? "$name" : 'El archivo no se copio correctamente.';
            }
        }
        return $result;
    }
    public function find_repeat_on_matrix($args, $colum)
    {
        $repeat = array();
        foreach ($args as $row) {
            $repeat[$row[$colum]] = ($repeat[$row[$colum]] == '') ? 1 : 1 + $repeat[$row[$colum]];
        }
        return $repeat;
    }
    public function array_unshift_assoc($arr, $key, $val, $species = '', $type = '')
    {
        $arr = array_reverse($arr, true);
        if ($arr[$key] != '') {
            unset($arr[$key]);
        }
        $arr[$key] = (is_array($val)) ? $val : array($val);
        if ($type == 'vendor') {
            $arr[$key]['class'] = $species;
        }
        return array_reverse($arr, true);
    } //esta no me acuerdo que hace XD creo que agrega un item al principio del array
    public function console($data)
    {
        if (is_array($data)) {
            $output = "<script>console.log( 'Debug Objects: " . implode(',', $data) . "' );</script>";
        } else {
            $output = "<script>console.log( 'Debug Objects: " . $data . "' );</script>";
        }

        echo $output;
    } //imprime en consola de js
    public function camelCase($str, $separator = ' ')
    {
        $words = explode($separator, strtolower($str));
        $return = '';
        foreach ($words as $word) {
            if ($words[0] == $word) {
                $return .= trim($word);
                continue;
            }
            $return .= ucfirst(trim($word));
        }
        return $return;
    } //cameliza un STR
    public function date_us_to_iso($str)
    {
        $str = new \DateTime($str);
        $str = $str->format('Y-m-d');
        return $str;
    } // Fecha US 12/31/2016 a 2016-12-31
    public function array_date_us_to_iso($arr)
    {
        foreach ($arr as $k => $v) {
            if (!is_array($v)) {
                if (\DateTime::createFromFormat('m/d/Y', $v) !== false) {
                    $arr[$k] = date("Y-m-d", strtotime($v));
                }
            }
        }
        return $arr;
    } // Fecha US 12/31/2016 a 2016-12-31
    public function array_date_iso_to_us($arr)
    {
        foreach ($arr as $k => $v) {
            if (!is_array($v)) {
                if (\DateTime::createFromFormat('Y-m-d', $v) !== false) {
                    $arr[$k] = date("m/d/Y", strtotime($v));
                }
            } else {
                $arr[$k] = $this->array_date_iso_to_us($v);
            }
        }
        return $arr;
    } // Fecha ISO 2016-12-31 a 12/31/2016
    public function is_json($string)
    {
        $json = json_decode($string);
        return (is_object($json) || is_array($json));
    }
    public function replace_key_function($array, $key1, $key2)
    {
        $keys = array_keys($array);
        $index = array_search($key1, $keys);

        if ($index !== false) {
            $keys[$index] = $key2;
            $array = array_combine($keys, $array);
        }

        return $array;
    }

    public function dateDiff($date1, $date2)
    {
        $datetime1 = new \DateTime($date1);
        $datetime2 = new \DateTime($date2);
        $interval = $datetime1->diff($datetime2);
        return $interval->format('%R%a') + 0;
    }
    public function isCalledByAjax()
    {
        return $_SERVER['HTTP_ACCEPT'] == '*/*';
    }
    public function searchInAssocArray($arr, $key, $keyword)
    {

        foreach ((array) $arr as $k => $item) {
            $selected = $item->$key;
            if (is_array($selected)) {

                if (array_search($keyword, $selected) !== false) {
                    return $item;
                }
            } else {
                if ($selected == $keyword) {
                    return $item;
                }
            }
        }
        return false;
    }
    public function easyCurl($url, $headers = null, $data = null)
    {
        $curl = curl_init($url);
        if (isset($headers)) {
            curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
        }
        if (isset($data)) {
            curl_setopt($curl, CURLOPT_POST, 1);
            curl_setopt($curl, CURLOPT_POSTFIELDS, $data);
        }

        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);
        $response = json_decode($result, true);
        $response = (count($response) <= 0) ? $result : $response;
        curl_close($curl);
        return $response;
    }
    public function XMLFileToAssocArray($filePath)
    {
        $file = file_get_contents($filePath);
        $ob = simplexml_load_string($file);
        $json = json_encode($ob);
        $configData = json_decode($json, true);
        return $configData;
    }
    public function foldersToJson($path)
    {
        $files = scandir($path);
        $data = [];
        foreach ($files as $file) {
            if (is_dir($path . $file) && ($file != "." && $file != "..")) {
                $npath = $path . $file . "/";
                $data[$file] = $this->foldersToJson($npath);
            }
            if (!is_dir($path . $file) && ($file != "." && $file != "..")) {
                $name = preg_split('/\./', $file)[0];
                $data[$name] = $file;
            }
        }
        return $data;
    }


    /**
     * Convierte el value en un json de ser necesario.
     *
     * @param [type] $value
     * @return string
     */
    public function jsonWhenNeeded($value)
    {
        if (\gettype($value) === "array") {
            $value = json_encode($value);
        }
        return $value;
    }
    /**
     * Elimina un archivo
     *
     * @param string $pathFile
     * @return void
     */
    public function unlink(string $pathFile)
    {
        if (file_exists($pathFile)) {
            unlink($pathFile);
        }
    }
    /**
     * En base a un archivo csv genera un arreglo asosiativo
     */
    public function CSVToObjects(String $path)
    {
        $file = file_get_contents($path);
        $lines = preg_split("/\n/", $file);
        $titles = explode(",", $lines[0]);
        $object =  [];
        foreach ($lines as $index => $line) {
            if ($index == 0) {
                continue;
            }
            $items = explode(",", $line);
            $object[] = $this->arrayCombine($titles, $items);
        }
        return $object;
    }
    /**
     * Convierte un objeto en un archivo csv
     *
     * @param [] $args
     * @return void
     */
    public function objectToCSV($args)
    {
        $keys = implode(",", array_keys($args[0]));
        $values = [];
        $values[] = $keys;
        foreach ($args as $items) {
            $values[] = implode(",", $items);
        }
        $val = implode("\n", $values);
        header('Content-Type: application/csv');
        header('Content-Disposition: attachment; filename=example.csv');
        header('Pragma: no-cache');
        echo $val;
        exit();
    }
    public function arrayCombine($keys, $array)
    {
        $combine = [];
        foreach ($keys as $index => $title) {
            $title = preg_replace('/["\r]+/', '', $title);
            $value = $array[$index] ?? "";
            $value = preg_replace('/["\r]+/', '', $value);
            $combine[$title] = $value;
        }
        return $combine;
    }
    /**
     * Permite ordernar por llave
     * @param [] $array
     * @param String $orderBy
     */
    public function orderAssocArray(array $array, String $orderBy, String $orderType)
    {
        usort($array,  function ($a, $b) use ($orderBy, $orderType) {
            $type = is_numeric($a[$orderBy]);
            if ($type) {
                return ($orderType === "desc") ? $b[$orderBy] - $a[$orderBy] : $a[$orderBy] - $b[$orderBy];
            }
            return ($orderType === "desc") ? strcmp($b[$orderBy], $a[$orderBy]) : strcmp($a[$orderBy], $b[$orderBy]);
        });
        return $array;
    }

    public function searchQuery(array $array, String $query)
    {
        return array_filter($array, function ($item) use ($query) {
            foreach ($item as $data) {
                if (preg_match("/{$query}/i", $data)) {
                    return true;
                }
            }
            return false;
        });
    }
    /**
     * obtiene los valores un objeto iterable
     * @param {} $args
     */
    public function objectValues($args)
    {
        $result = [];
        foreach ($args as $item) {
            $result[] = $item;
        }
        return $result;
    }
    public function numberToMoney($number)
    {
        $number = abs($number);
        setlocale(LC_MONETARY, 'es_MX');
        $money = money_format('%.2n', $number);
        return "$money MXN";
    }
    /**
     * Valida si una fecha ya ha pasado.
     *
     * @param string $date
     * @return void
     */
    public function dateHasPassed($date)
    {
        $time = strtotime($date);
        $today = strtotime(date("Y-m-d"));
        return ($today >= $time);
    }
}
