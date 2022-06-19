<?php

class modRemontServiceGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modRemontService';
    public $classKey = 'modRemontService';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    protected $item_id = 0;
    //public $permission = 'list';

    /**
     * @return bool
     */
    public function initialize()
    {
        if ($this->getProperty('combo') && !$this->getProperty('limit') && $id = (int)$this->getProperty('id')) {
            $this->item_id = $id;
        }

        return true;
    }

    /**
     * We do a special check of permissions
     * because our objects is not an instances of modAccessibleObject
     *
     * @return boolean|string
     */
    public function beforeQuery()
    {
        if (!$this->checkPermissions()) {
            return $this->modx->lexicon('access_denied');
        }

        return true;
    }


    /**
     * @param xPDOQuery $c
     *
     * @return xPDOQuery
     */
    public function prepareQueryBeforeCount(xPDOQuery $c)
    {
        $query = trim($this->getProperty('query'));
        $categoryquery= trim($this->getProperty('categoryquery'));
        
        $c->select(array($this->modx->getSelectColumns('modRemontService', 'modRemontService')));


        $c->select(array($this->modx->getSelectColumns('modRemontService', 'modRemontService')));
        if ($query) {
            $c->where([
                'pagetitle:LIKE' => "%{$query}%",
            ]);
        }
        if ($categoryquery) {
            $c->where([
                "FIND_IN_SET('\"{$categoryquery}\"', REPLACE(REPLACE(categories, '[', ''),']','')) > 0"
            ]);
        }

        return $c;
    }


    /**
     * @param xPDOObject $object
     *
     * @return array
     */
    public function prepareRow(xPDOObject $object)
    {
        $array = $object->toArray();



        $is_priceby = '';
        $is_timeby = '';
        if($array['priceby'] && $array['priceby'] == 1){
            $is_priceby = 'От ';
        }
        if($array['timeby'] && $array['timeby'] == 1){
            $is_timeby = 'От ';
        }
        $array['f_price'] = $is_priceby.$array['price'].' руб.';
        $array['f_time'] = $is_timeby.$array['time'].' мин.';
        $array['categories_names'] = [];
        $q = $this->modx->newQuery('modRemontCategory');
        $q->where(array('id:IN' => $array['categories']));
        $q->select(array('pagetitle'));
        if($q->prepare() && $q->stmt->execute()) {
            $resources = $q->stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($resources as $v){
                $array['categories_names'][] = $v['pagetitle'];
            }
        }
        $array['categories_names'] = implode(', ', $array['categories_names']);


        $array['defect_names'] = [];
        $q = $this->modx->newQuery('modRemontDefect');
        $q->where(array('id:IN' => $array['defects']));
        $q->select(array('pagetitle'));
        if($q->prepare() && $q->stmt->execute()) {
            $resources = $q->stmt->fetchAll(PDO::FETCH_ASSOC);
            foreach($resources as $v){
                $array['defect_names'][] = $v['pagetitle'];
            }
        }
        $array['defect_names'] = implode(', ', $array['defect_names']);

        $array['actions'] = [];

        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('modremont_model_update'),
            'action' => 'updateService',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('modremont_model_enable'),
                'multiple' => $this->modx->lexicon('modremont_models_enable'),
                'action' => 'enableService',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('modremont_model_disable'),
                'multiple' => $this->modx->lexicon('modremont_models_disable'),
                'action' => 'disableService',
                'button' => true,
                'menu' => true,
            ];
        }
            // Duplicate
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-files-o',
                'title' => $this->modx->lexicon('modremont_duplicate'),
                'action' => 'duplicateService',
                'button' => true,
                'menu' => true,
    ];
        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('modremont_model_remove'),
            'multiple' => $this->modx->lexicon('modremont_models_remove'),
            'action' => 'removeService',
            'button' => true,
            'menu' => true,
        ];
        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-laptop action-green',
            'title' => $this->modx->lexicon('modremont_service_add_to_model'),
            'multiple' => $this->modx->lexicon('modremont_services_add_to_model'),
            'action' => 'addServiceToModel',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'modRemontServiceGetListProcessor';