<?php

class modRemontDefectGetProcessor extends modObjectGetProcessor
{
    public $objectType = 'modRemontDefect';
    public $classKey = 'modRemontDefect';
    public $languageTopics = ['modremont:default'];


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

return 'modRemontDefectGetProcessor';