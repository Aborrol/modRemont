<?php

class modRemontModelGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'modRemontModel';
    public $classKey = 'modRemontModel';
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

        return $this->success('', $data);
    }

}

return 'modRemontModelGetProcessor';