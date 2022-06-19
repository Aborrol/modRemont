<?php

class modRemontModelServiceGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modRemontModelService';
    public $classKey = 'modRemontModelService';
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

        $c->select(array($this->modx->getSelectColumns('modRemontModelService', 'modRemontModelService')));
        $c->where(array(
            'model_id' => $this->getProperty('model_id'),
        ));
        $c->select(array($this->modx->getSelectColumns('modRemontModelService', 'modRemontModelService')));

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
            'action' => 'updateModelService',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('modremont_model_enable'),
                'multiple' => $this->modx->lexicon('modremont_models_enable'),
                'action' => 'enableModelService',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('modremont_model_disable'),
                'multiple' => $this->modx->lexicon('modremont_models_disable'),
                'action' => 'disableModelService',
                'button' => true,
                'menu' => true,
            ];
        }
            // Duplicate
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-files-o',
                'title' => $this->modx->lexicon('modremont_duplicate'),
                'action' => 'duplicateModelService',
                'button' => true,
                'menu' => true,
    ];
        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('modremont_model_remove'),
            'multiple' => $this->modx->lexicon('modremont_models_remove'),
            'action' => 'removeModelService',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'modRemontModelServiceGetListProcessor';