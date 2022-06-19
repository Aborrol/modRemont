<?php

class modRemontCategoryRemoveProcessor extends modObjectProcessor
{
    public $objectType = 'modRemontCategory';
    public $classKey = 'modRemontCategory';
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
            return $this->failure($this->modx->lexicon('modremont_category_err_ns'));
        }

        foreach ($ids as $id) {
            /** @var modRemontCategory $object */
            if (!$object = $this->modx->getObject($this->classKey, $id)) {
                return $this->failure($this->modx->lexicon('modremont_category_err_nf'));
            }

            $object->remove();
        }

        return $this->success();
    }

}

return 'modRemontCategoryRemoveProcessor';