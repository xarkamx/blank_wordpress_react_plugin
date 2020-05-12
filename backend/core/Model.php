<?php
class Model
{
    protected $whereQuery = "";
    protected $numberOfRows = 0;
    function __construct()
    {
        global $wpdb;
        $this->tableName = $wpdb->prefix . $this->table;
        $this->count();
    }
    function __call($func, $params)
    {
        if (in_array($func, $this->columns)) {
            $this->data[$func] = $params[0];
            return $this;
        }
    }
    /**
     * Muestra todos los valores almacenados hasta el momento.
     *
     * @return array
     */
    function toArray()
    {
        return $this->data;
    }
    /**
     * Almacena los valores en la base de datos
     *
     * @return Model
     */
    function save()
    {
        global $wpdb;
        $wpdb->insert($this->tableName, $this->data, $this->setSpaces());
    }
    /**
     * Localiza elemento en la tabla por medio de su ID
     *
     * @param integer $id
     * @return Model
     */
    function find(int $id)
    {

        global $wpdb;
        $sql = "select * from $this->tableName where id='$id' order by id desc limit 0,1";
        $this->data = $this->stdTOArray(($wpdb->get_results($sql))[0]);
        $this->whereQuery = "where id='$id'";
        return $this;
    }
    /**
     * Busca por medio del arreglo elementos que coincidan 
     *
     * @param array $args
     * @return Model
     */
    function where(array $args)
    {
        $this->customWhere($args, "and");
        return $this;
    }
    /**
     * Genera una consulta where or
     *
     * @param array $args
     * @return Model
     */
    function orWhere(array $args)
    {
        $this->customWhere($args, "or");
        return $this;
    }
    /**
     * Permite buscar una cadena en todas las columnas validas.
     *
     * @param string $search
     * @return Model
     */
    function search(string $search)
    {
        if ($search && $search != "") {
            $args = [];
            foreach ($this->columns as $column) {
                $args[$column] = $search;
            }
            $this->customWhere($args, "or", true);
        }
        return $this;
    }
    function update()
    {

        global $wpdb;
        $setters = [];
        foreach ($this->data as $key => $value) {
            if (!isset($value) || $key == "id") {
                continue;
            }
            $setters[] = "$key = '$value'";
        }
        $sets = implode(",", $setters);

        $query = "UPDATE $this->tableName 
	    SET $sets
	    $this->whereQuery";
        $wpdb->query($query);
        return $this;
    }
    /**
     * Obtiene el valor más reciente de la tabla asignada.
     *
     * @return array
     */
    function latest()
    {
        global $wpdb;
        $sql = "select * from $this->tableName $this->whereQuery order by id desc limit 0,1";
        return $wpdb->get_results($sql);
    }
    function get()
    {
        global $wpdb;
        $sql = "select * from $this->tableName $this->whereQuery";
        return $wpdb->get_results($sql);
    }
    /**
     * Paginar resultado
     *
     * @param integer $perPage
     * @return Model
     */
    function paginate(int $perPage)
    {
        $orderType = $_GET['orderType'] ?? "desc";
        $orderBy = $_GET['orderBy'] ?? "id";
        $page = $_GET['page'] - 1 ?? 1;
        $offset = $page  * $perPage;
        global $wpdb;
        $sql = "select * from $this->tableName $this->whereQuery order by $orderBy $orderType limit $offset,$perPage";
        return ["data" => $wpdb->get_results($sql), "meta" => ["page" => $page, "last_page" => ceil($this->numberOfRows / $perPage)]];
    }
    private function setSpaces()
    {
        $number = count($this->columns);
        $spaces = [];
        for ($index = 0; $index < $number; $index++) {
            $spaces[] = "%s";
        }
    }
    private function count()
    {
        global $wpdb;
        $sql = "select count(*) as items from $this->tableName";
        $this->numberOfRows = ($wpdb->get_results($sql))[0]->items;
    }
    private function stdTOArray($std)
    {
        $data = [];
        foreach ($std as $key => $item) {
            $data[$key] = $item;
        }
        return $data;
    }
    /**
     * Genera consultas where
     *
     * @param Array $args
     * @param string $type
     * @param Bool $like
     * @return Model
     */
    private function customWhere(array $args, string $type, Bool $like = false)
    {
        $query = "where ";
        $wheres = [];
        foreach ($args as $key => $column) {
            $wheres[] = ($like) ? "$key like '%$column%'" : "$key = '$column'";
        }
        $query .= implode(" $type ", $wheres);
        $this->whereQuery = $query;
    }
}
