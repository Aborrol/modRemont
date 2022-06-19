<?php

class modRemontProblemGetListProcessor extends modObjectGetListProcessor
{
    public $objectType = 'modRemontProblem';
    public $classKey = 'modRemontProblem';
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
        $c->leftJoin('modRemontCategory', 'modRemontCategory', 'modRemontCategory.id = modRemontProblem.category_id');
        $c->select(array($this->modx->getSelectColumns('modRemontProblem', 'modRemontProblem')));
        $c->select(array('modRemontCategory.pagetitle as category_name'));

        $c->select(array($this->modx->getSelectColumns('modRemontProblem', 'modRemontProblem')));
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
        // Edit
        $array['actions'] = [];
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-edit',
            'title' => $this->modx->lexicon('modremont_problem_update'),
            'action' => 'updateProblem',
            'button' => true,
            'menu' => true,
        ];

        if (!$array['active']) {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-green',
                'title' => $this->modx->lexicon('modremont_problem_enable'),
                'multiple' => $this->modx->lexicon('modremont_problems_enable'),
                'action' => 'enableProblem',
                'button' => true,
                'menu' => true,
            ];
        } else {
            $array['actions'][] = [
                'cls' => '',
                'icon' => 'icon icon-power-off action-gray',
                'title' => $this->modx->lexicon('modremont_problem_disable'),
                'multiple' => $this->modx->lexicon('modremont_problems_disable'),
                'action' => 'disableProblem',
                'button' => true,
                'menu' => true,
            ];
        }
           // Duplicate
           $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-files-o',
            'title' => $this->modx->lexicon('modremont_duplicate'),
            'action' => 'duplicateProblem',
            'button' => true,
            'menu' => true,
];
        // Remove
        $array['actions'][] = [
            'cls' => '',
            'icon' => 'icon icon-trash-o action-red',
            'title' => $this->modx->lexicon('modremont_problem_remove'),
            'multiple' => $this->modx->lexicon('modremont_problems_remove'),
            'action' => 'removeProblem',
            'button' => true,
            'menu' => true,
        ];

        return $array;
    }

}

return 'modRemontProblemGetListProcessor';