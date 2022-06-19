<?php

class modRemontProblemGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'modRemontProblem';
    public $classKey = 'modRemontProblem';
    public $languageTopics = ['modremont:default'];
    //public $permission = 'view';


    /**
     * We doing special check of permission
     * because of our objects is not an instances of modAccessibleObject
     *
     * @return mixed
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        return parent::process();
    }

    public function cleanup()
    {
        $data = $this->object->toArray();

        if($data['categories']){
            $data['categories[]'] = [];
            foreach($data['categories'] as $id){
                $data['categories[]'][]['id'] = $id;
            }
        }
        return $this->success('', $data);
    }
}

return 'modRemontProblemGetProcessor';