<?php

class modRemontDefectGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modRemontDefect';
    public $classKey = 'modRemontDefect';
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
        $c->leftJoin('modRemontProblem', 'modRemontProblem', 'modRemontProblem.id = modRemontDefect.problem_id');
        $c->select(array($this->modx->getSelectColumns('modRemontDefect', 'modRemontDefect')));
        $c->select(array('modRemontProblem.pagetitle as problem_name'));

        $c->select(array($this->modx->getSelectColumns('modRemontDefect', 'modRemontDefect')));
        if ($query) {
            $c->where([
                'pagetitle:LIKE' => "%{$query}%",
            ]);
        }
        if ($categoryquery) {
            $c->where([
                'problem_id' => $categoryquery
            ]);
        }
        $c->prepare();
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
        // Edit
        $array['actions'] = [];
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit action-red',
            'title' => $this->modx->lexicon('modremont_problem_update'),
            'action' => 'updateDefect',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('modremont_problem_enable'),
                'multiple' => $this->modx->lexicon('modremont_problems_enable'),
                'action' => 'enableDefect',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('modremont_problem_disable'),
                'multiple' => $this->modx->lexicon('modremont_problems_disable'),
                'action' => 'disableDefect',
                'button' => true,
                'menu' => true,
            ];
        }
           // Duplicate
           $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-files-o',
            'title' => $this->modx->lexicon('modremont_duplicate'),
            'action' => 'duplicateDefect',
            'button' => true,
            'menu' => true,
];
        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('modremont_problem_remove'),
            'multiple' => $this->modx->lexicon('modremont_problems_remove'),
            'action' => 'removeDefect',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'modRemontDefectGetListProcessor';