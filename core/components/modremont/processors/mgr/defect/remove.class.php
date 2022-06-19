<?php

class modRemontDefectRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'modRemontDefect';
    public $classKey = 'modRemontDefect';
    public $languageTopics = ['modremont'];
    //public $permission = 'remove';


    /**
     * @return array|string
     */
    public function process()
    {
        if (!$this->checkPermissions()) {
            return $this->failure($this->modx->lexicon('access_denied'));
        }

        $ids = $this->modx->fromJSON($this->getProperty('ids'));
        if (empty($ids)) {
            return $this->failure($this->modx->lexicon('modremont_item_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var modRemontDefect $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('modremont_item_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'modRemontDefectRemoveProcessor';