<?php

class modRemontModelGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modRemontModel';
    public $classKey = 'modRemontModel';
    public $defaultSortField = 'id';
    public $defaultSortDirection = 'DESC';
    protected $item_id = 0;


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
        $c->leftJoin('modRemontCategory', 'modRemontCategory', 'modRemontCategory.id = modRemontModel.category_id');
        $c->select(array($this->modx->getSelectColumns('modRemontModel', 'modRemontModel')));
        $c->select(array('modRemontCategory.pagetitle as category_name'));

        $c->select(array($this->modx->getSelectColumns('modRemontModel', 'modRemontModel')));
        if ($query) {
            $c->where([
                'pagetitle:LIKE' => "%{$query}%",
                'OR:year:LIKE' => "%{$query}%",
                'OR:article:LIKE' => "%{$query}%"
            ]);
        }
        if ($categoryquery) {
            $c->where([
                'category_id' => $categoryquery
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

        $array['s_year'] = $array['season'].' '.$array['year'];



        // Edit
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('modremont_model_update'),
            'action' => 'updateModel',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('modremont_model_enable'),
                'multiple' => $this->modx->lexicon('modremont_models_enable'),
                'action' => 'enableModel',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('modremont_model_disable'),
                'multiple' => $this->modx->lexicon('modremont_models_disable'),
                'action' => 'disableModel',
                'button' => true,
                'menu' => true,
            ];
        }
           // Duplicate
           $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-files-o',
            'title' => $this->modx->lexicon('modremont_duplicate'),
            'action' => 'duplicateModel',
            'button' => true,
            'menu' => true,
];
        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('modremont_model_remove'),
            'multiple' => $this->modx->lexicon('modremont_models_remove'),
            'action' => 'removeModel',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'modRemontModelGetListProcessor';