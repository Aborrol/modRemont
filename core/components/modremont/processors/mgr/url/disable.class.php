<?php

class modRemontUrlDisableProcessor extends modObjectProcessor
{
    public $objectType = 'modRemontUrl';
    public $classKey = 'modRemontUrl';
    public $languageTopics = ['modremont'];
    //public $permission = 'save';


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
            return $this->failure($this->modx->lexicon('modremont_url_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var modRemontUrl $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('modremont_url_err_nf'));
            }

            $object->set('active', false);
            $object->save();
        }

        return $this->success();
    }

}

return 'modRemontUrlDisableProcessor';
